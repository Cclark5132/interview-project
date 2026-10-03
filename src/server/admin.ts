import { z } from "zod";
import { db } from "@/lib/db";
import { parseJson } from "@/lib/json";
import { rubricSchema, type RubricCriterion } from "@/lib/rubric";
import { gradeAnswer, getProvider, type GradeProvider } from "@/lib/grading";
import type { ImportRow, ParsedImport } from "@/lib/import";
import { assertAdmin, HttpError, type Actor } from "./access";
import { loadRubric } from "./questions";

export const questionInputSchema = z.object({
  title: z.string().min(5).max(200),
  prompt: z.string().min(20).max(4000),
  disciplineId: z.string().min(2),
  difficulty: z.number().int().min(1).max(3),
  topicIds: z.array(z.string()).max(10).default([]),
  roleIds: z.array(z.string()).max(10).default([]),
  companies: z
    .array(z.object({ companyId: z.string(), evidence: z.enum(["role_relevant", "company_reported"]), sourceUrl: z.string().url().nullish().or(z.literal("")) }))
    .max(10)
    .default([]),
  evidenceCategory: z.enum(["original", "role_relevant", "company_reported"]),
  sourceNote: z.string().max(1000).default(""),
  sourceUrl: z.string().url().nullish().or(z.literal("")),
  idealAnswer: z.string().max(8000).default(""),
  rubric: z.array(z.unknown()).max(8).optional(),
});
export type QuestionInput = z.infer<typeof questionInputSchema>;

const TRANSITIONS: Record<string, string[]> = {
  draft: ["in_review"],
  in_review: ["draft", "approved"],
  approved: ["archived"],
  archived: ["draft"],
};

type Full = NonNullable<Awaited<ReturnType<typeof getFull>>>;

function getFull(id: string) {
  return db.question.findUnique({
    where: { id },
    include: { topics: true, roles: true, companies: true },
  });
}

/** Everything required before a question may be approved/published. Returns human-readable problems. */
export async function publishProblems(q: Full): Promise<string[]> {
  const p: string[] = [];
  if (q.title.trim().length < 5) p.push("Question title is missing");
  if (q.prompt.trim().length < 20) p.push("Question prompt is missing or too short");
  if (q.idealAnswer.trim().length < 40) p.push("Ideal answer is missing or too short (min 40 characters)");
  if (!q.topics.length) p.push("At least one topic is required");
  const rubric = await db.rubric.findUnique({ where: { questionId_version: { questionId: q.id, version: q.rubricVersion } } });
  const parsed = rubricSchema.safeParse(parseJson(rubric?.criteria, null));
  if (!parsed.success) p.push(`Rubric is incomplete or invalid: ${parsed.error.issues[0]?.message ?? "missing"}`);
  if (!q.sourceNote.trim()) p.push("Provenance (source note) is required");
  if (q.evidenceCategory === "company_reported" && !q.sourceUrl) p.push("Company-reported material requires a source URL");
  for (const c of q.companies) {
    if (c.evidence === "company_reported" && !c.sourceUrl && !q.sourceUrl) p.push(`Company association "${c.companyId}" is company-reported but has no source URL`);
  }
  return p;
}

async function validateRefs(input: QuestionInput) {
  const [d, topics, roles, companies] = await Promise.all([
    db.discipline.findUnique({ where: { id: input.disciplineId } }),
    db.topic.findMany({ where: { id: { in: input.topicIds } } }),
    db.role.findMany({ where: { id: { in: input.roleIds } } }),
    db.company.findMany({ where: { id: { in: input.companies.map((c) => c.companyId) } } }),
  ]);
  if (!d) throw new HttpError(400, `Unknown discipline "${input.disciplineId}"`);
  if (topics.length !== new Set(input.topicIds).size) throw new HttpError(400, "Unknown topic id");
  if (roles.length !== new Set(input.roleIds).size) throw new HttpError(400, "Unknown role id");
  if (companies.length !== new Set(input.companies.map((c) => c.companyId)).size) throw new HttpError(400, "Unknown company id");
}

function parseRubricInput(raw: unknown[] | undefined): RubricCriterion[] | undefined {
  if (!raw || raw.length === 0) return undefined;
  const r = rubricSchema.safeParse(raw);
  if (!r.success) throw new HttpError(400, `Invalid rubric: ${r.error.issues[0]?.message}`, r.error.issues.slice(0, 5));
  return r.data;
}

const sameJson = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export async function createQuestion(actor: Actor, raw: unknown) {
  assertAdmin(actor);
  const input = questionInputSchema.parse(raw);
  await validateRefs(input);
  const rubric = parseRubricInput(input.rubric);
  return db.$transaction(async (tx) => {
    const q = await tx.question.create({
      data: {
        title: input.title,
        prompt: input.prompt,
        disciplineId: input.disciplineId,
        difficulty: input.difficulty,
        evidenceCategory: input.evidenceCategory,
        sourceNote: input.sourceNote,
        sourceUrl: input.sourceUrl || null,
        idealAnswer: input.idealAnswer,
        status: "draft",
        topics: { create: [...new Set(input.topicIds)].map((topicId) => ({ topicId })) },
        roles: { create: [...new Set(input.roleIds)].map((roleId) => ({ roleId })) },
        companies: { create: input.companies.map((c) => ({ companyId: c.companyId, evidence: c.evidence, sourceUrl: c.sourceUrl || null, reviewed: false })) },
      },
    });
    if (rubric) await tx.rubric.create({ data: { questionId: q.id, version: 1, criteria: JSON.stringify(rubric) } });
    return q;
  });
}

/**
 * Editing an approved question's rubric creates a NEW rubric version; old versions stay so historical
 * attempts keep the weights and criteria they were graded with. Drafts edit the current version in place.
 */
export async function updateQuestion(actor: Actor, id: string, raw: unknown) {
  assertAdmin(actor);
  const input = questionInputSchema.parse(raw);
  const existing = await getFull(id);
  if (!existing) throw new HttpError(404, "Question not found");
  if (existing.status === "archived") throw new HttpError(409, "Archived questions cannot be edited; restore to draft first.");
  await validateRefs(input);
  const rubric = parseRubricInput(input.rubric);

  return db.$transaction(async (tx) => {
    let rubricVersion = existing.rubricVersion;
    if (rubric) {
      const current = await tx.rubric.findUnique({ where: { questionId_version: { questionId: id, version: existing.rubricVersion } } });
      const changed = !current || !sameJson(parseJson(current.criteria, null), rubric);
      if (changed && current && existing.status === "approved") {
        rubricVersion = existing.rubricVersion + 1;
        await tx.rubric.create({ data: { questionId: id, version: rubricVersion, criteria: JSON.stringify(rubric) } });
      } else if (changed) {
        await tx.rubric.upsert({
          where: { questionId_version: { questionId: id, version: rubricVersion } },
          create: { questionId: id, version: rubricVersion, criteria: JSON.stringify(rubric) },
          update: { criteria: JSON.stringify(rubric) },
        });
      }
    }
    await tx.questionTopic.deleteMany({ where: { questionId: id } });
    await tx.questionRole.deleteMany({ where: { questionId: id } });
    await tx.questionCompany.deleteMany({ where: { questionId: id } });
    const prevReviewed = new Map(existing.companies.map((c) => [c.companyId, c]));
    return tx.question.update({
      where: { id },
      data: {
        title: input.title,
        prompt: input.prompt,
        disciplineId: input.disciplineId,
        difficulty: input.difficulty,
        evidenceCategory: input.evidenceCategory,
        sourceNote: input.sourceNote,
        sourceUrl: input.sourceUrl || null,
        idealAnswer: input.idealAnswer,
        rubricVersion,
        topics: { create: [...new Set(input.topicIds)].map((topicId) => ({ topicId })) },
        roles: { create: [...new Set(input.roleIds)].map((roleId) => ({ roleId })) },
        companies: {
          create: input.companies.map((c) => {
            const p = prevReviewed.get(c.companyId);
            const unchanged = p && p.evidence === c.evidence && (p.sourceUrl ?? "") === (c.sourceUrl ?? "");
            return { companyId: c.companyId, evidence: c.evidence, sourceUrl: c.sourceUrl || null, reviewed: Boolean(unchanged && p.reviewed) };
          }),
        },
      },
    });
  });
}

export async function transitionQuestion(actor: Actor, id: string, to: string, opts: { confirmApproval?: boolean } = {}) {
  assertAdmin(actor);
  const q = await getFull(id);
  if (!q) throw new HttpError(404, "Question not found");
  if (!(TRANSITIONS[q.status] ?? []).includes(to)) throw new HttpError(409, `Cannot move from ${q.status} to ${to}`);
  if (to === "approved") {
    // Approval is an explicit human action: admin actor + explicit confirmation + completeness checks.
    if (!opts.confirmApproval) throw new HttpError(400, "Explicit approval confirmation required");
    const problems = await publishProblems(q);
    if (problems.length) throw new HttpError(422, "Question is not ready to publish", problems);
    await db.$transaction([
      db.questionCompany.updateMany({ where: { questionId: id }, data: { reviewed: true } }),
      db.question.update({ where: { id }, data: { status: "approved", approvedAt: new Date(), approvedById: actor.id } }),
    ]);
  } else {
    await db.question.update({ where: { id }, data: { status: to } });
  }
  return { id, status: to };
}

export type AdminFilters = { status?: string; disciplineId?: string; q?: string };

export async function listAdminQuestions(actor: Actor, f: AdminFilters) {
  assertAdmin(actor);
  const rows = await db.question.findMany({
    where: {
      ...(f.status ? { status: f.status } : {}),
      ...(f.disciplineId ? { disciplineId: f.disciplineId } : {}),
      ...(f.q ? { OR: [{ title: { contains: f.q, mode: "insensitive" } }, { prompt: { contains: f.q, mode: "insensitive" } }] } : {}),
    },
    include: { discipline: true, topics: { include: { topic: true } } },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
  });
  return rows;
}

export async function getAdminQuestion(actor: Actor, id: string) {
  assertAdmin(actor);
  const q = await getFull(id);
  if (!q) throw new HttpError(404, "Question not found");
  const rubric = await loadRubric(id, q.rubricVersion);
  const versions = await db.rubric.findMany({ where: { questionId: id }, select: { version: true, createdAt: true }, orderBy: { version: "asc" } });
  return { question: q, rubric, versions, problems: await publishProblems(q) };
}

/** Grading preview with a sample answer. Never persisted and never attached to a user's progress. */
export async function previewGrade(
  actor: Actor,
  id: string,
  sampleAnswer: string,
  provider: GradeProvider = getProvider(),
) {
  assertAdmin(actor);
  if (sampleAnswer.trim().length < 10 || sampleAnswer.length > 6000) throw new HttpError(400, "Sample answer must be 10–6000 characters");
  const q = await db.question.findUnique({ where: { id }, include: { topics: { include: { topic: true } } } });
  if (!q) throw new HttpError(404, "Question not found");
  const rubric = await loadRubric(id, q.rubricVersion);
  if (!rubric.length) throw new HttpError(422, "Add a valid rubric before previewing grading");
  return gradeAnswer(
    {
      questionTitle: q.title,
      prompt: q.prompt,
      idealAnswer: q.idealAnswer,
      rubric,
      answer: sampleAnswer.trim(),
      topics: q.topics.map((t) => ({ id: t.topicId, name: t.topic.name })),
    },
    provider,
  );
}

/** Imports always create drafts. Unknown taxonomy slugs reject that row instead of silently creating taxonomy. */
export async function importQuestions(actor: Actor, parsed: ParsedImport) {
  assertAdmin(actor);
  const errors = [...parsed.errors];
  let created = 0;
  for (const { index, row } of parsed.rows) {
    try {
      await createQuestion(actor, rowToInput(row));
      created++;
    } catch (e) {
      const msg = e instanceof HttpError ? e.message : e instanceof z.ZodError ? e.issues[0]?.message : "could not import row";
      errors.push({ index, message: msg ?? "invalid row" });
    }
  }
  return { created, errors };
}

function rowToInput(r: ImportRow): QuestionInput {
  return {
    title: r.title,
    prompt: r.prompt,
    disciplineId: r.discipline,
    difficulty: r.difficulty,
    topicIds: r.topics,
    roleIds: r.roles,
    companies: r.companies.map((c) => ({ companyId: c.company, evidence: c.evidence, sourceUrl: c.sourceUrl ?? null })),
    evidenceCategory: r.evidenceCategory,
    sourceNote: r.sourceNote,
    sourceUrl: r.sourceUrl ?? null,
    idealAnswer: r.idealAnswer,
    rubric: r.rubric,
  };
}
