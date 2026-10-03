import { db } from "@/lib/db";
import { parseJson } from "@/lib/json";
import { rubricSchema, type RubricCriterion } from "@/lib/rubric";
import { rankQuestions, relevanceLabels, type RankContext, type RankQuestion, type RankTarget, type Level } from "@/lib/ranking";
import { HttpError } from "./access";

// Everything user-facing reads through these helpers, which hard-filter to status = approved.
const APPROVED = { status: "approved" } as const;

const include = {
  discipline: true,
  topics: { include: { topic: true } },
  roles: { include: { role: true } },
  companies: { include: { company: true } },
} as const;

type Row = Awaited<ReturnType<typeof loadApproved>>[number];

function loadApproved() {
  return db.question.findMany({ where: APPROVED, include, orderBy: { createdAt: "asc" } });
}

export type QuestionSummary = {
  id: string;
  title: string;
  prompt: string;
  disciplineId: string;
  disciplineName: string;
  difficulty: number;
  evidenceCategory: string;
  topics: { id: string; name: string }[];
  roles: { id: string; name: string }[];
  companies: { id: string; name: string; evidence: string; reviewed: boolean }[];
  attemptCount: number;
  bestScore: number | null;
  bookmarked: boolean;
  reasons: string[];
  score?: number;
};

const toRank = (r: Row): RankQuestion => ({
  id: r.id,
  disciplineId: r.disciplineId,
  difficulty: r.difficulty,
  topicIds: r.topics.map((t) => t.topicId),
  roleIds: r.roles.map((t) => t.roleId),
  companies: r.companies.map((c) => ({ companyId: c.companyId, evidence: c.evidence, reviewed: c.reviewed })),
});

export async function getTarget(userId: string): Promise<RankTarget | null> {
  const t = await db.userTarget.findUnique({ where: { userId } });
  if (!t) return null;
  return {
    disciplineId: t.disciplineId,
    companyId: t.companyId,
    roleId: t.roleId,
    level: t.level as Level,
    skills: parseJson<string[]>(t.skills, []),
    focusTopics: parseJson<string[]>(t.focusTopics, []),
  };
}

export async function buildRankContext(userId: string): Promise<RankContext> {
  const [attempts, topics] = await Promise.all([
    db.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { questionId: true, status: true, assisted: true, overallScore: true, gradingMode: true, question: { select: { topics: { select: { topicId: true } } } } },
    }),
    db.topic.findMany({ select: { id: true, name: true } }),
  ]);
  const perf: Record<string, { sum: number; count: number }> = {};
  const per: Record<string, number> = {};
  const recent: string[] = [];
  for (const a of attempts) {
    per[a.questionId] = (per[a.questionId] ?? 0) + 1;
    const ids = a.question.topics.map((t) => t.topicId);
    if (recent.length < 12) recent.push(...ids);
    // Only independent, live-graded attempts inform weak-topic targeting.
    if (a.status === "graded" && !a.assisted && a.gradingMode === "live" && a.overallScore != null) {
      for (const id of ids) {
        perf[id] ??= { sum: 0, count: 0 };
        perf[id].sum += a.overallScore;
        perf[id].count++;
      }
    }
  }
  return {
    topicPerformance: Object.fromEntries(Object.entries(perf).map(([k, v]) => [k, { avg: v.sum / v.count, count: v.count }])),
    attemptsPerQuestion: per,
    recentTopicIds: recent,
    topicNames: Object.fromEntries(topics.map((t) => [t.id, t.name])),
  };
}

async function summarize(rows: Row[], userId: string, extra?: Map<string, { score: number; reasons: string[] }>): Promise<QuestionSummary[]> {
  const [attempts, bookmarks] = await Promise.all([
    db.attempt.findMany({ where: { userId, questionId: { in: rows.map((r) => r.id) } }, select: { questionId: true, status: true, overallScore: true, assisted: true, gradingMode: true } }),
    db.bookmark.findMany({ where: { userId }, select: { questionId: true } }),
  ]);
  const marked = new Set(bookmarks.map((b) => b.questionId));
  return rows.map((r) => {
    const mine = attempts.filter((a) => a.questionId === r.id);
    // Demonstration-mode keyword scores are not evaluations, so they never show as a "best" score.
    const graded = mine.filter((a) => a.status === "graded" && a.overallScore != null && a.gradingMode !== "demonstration");
    return {
      id: r.id,
      title: r.title,
      prompt: r.prompt,
      disciplineId: r.disciplineId,
      disciplineName: r.discipline.name,
      difficulty: r.difficulty,
      evidenceCategory: r.evidenceCategory,
      topics: r.topics.map((t) => ({ id: t.topicId, name: t.topic.name })),
      roles: r.roles.map((t) => ({ id: t.roleId, name: t.role.name })),
      companies: r.companies.map((c) => ({ id: c.companyId, name: c.company.name, evidence: c.evidence, reviewed: c.reviewed })),
      attemptCount: mine.length,
      bestScore: graded.length ? Math.max(...graded.map((a) => a.overallScore!)) : null,
      bookmarked: marked.has(r.id),
      reasons: extra?.get(r.id)?.reasons ?? [],
      score: extra?.get(r.id)?.score,
    };
  });
}

export type LibraryFilters = {
  q?: string;
  disciplineId?: string;
  companyId?: string;
  roleId?: string;
  topicId?: string;
  difficulty?: number;
  progress?: "answered" | "unanswered";
  bookmarked?: boolean;
};

export async function searchLibrary(userId: string, f: LibraryFilters): Promise<QuestionSummary[]> {
  const rows = await loadApproved();
  const needle = f.q?.trim().toLowerCase();
  const filtered = rows.filter((r) => {
    if (f.disciplineId && r.disciplineId !== f.disciplineId) return false;
    if (f.companyId && !r.companies.some((c) => c.companyId === f.companyId)) return false;
    if (f.roleId && !r.roles.some((x) => x.roleId === f.roleId)) return false;
    if (f.topicId && !r.topics.some((x) => x.topicId === f.topicId)) return false;
    if (f.difficulty && r.difficulty !== f.difficulty) return false;
    if (needle && !`${r.title} ${r.prompt} ${r.topics.map((t) => t.topic.name).join(" ")}`.toLowerCase().includes(needle)) return false;
    return true;
  });
  let out = await summarize(filtered, userId);
  if (f.progress === "answered") out = out.filter((q) => q.attemptCount > 0);
  if (f.progress === "unanswered") out = out.filter((q) => q.attemptCount === 0);
  if (f.bookmarked) out = out.filter((q) => q.bookmarked);
  return out;
}

export async function recommend(userId: string, limit = 6): Promise<QuestionSummary[]> {
  const target = await getTarget(userId);
  if (!target) return [];
  const rows = await loadApproved();
  const ctx = await buildRankContext(userId);
  const ranked = rankQuestions(target, rows.map(toRank), ctx).filter((r) => r.score > 0).slice(0, limit);
  const byId = new Map(rows.map((r) => [r.id, r]));
  const extra = new Map(ranked.map((r) => [r.id, { score: r.score, reasons: r.reasons }]));
  const summaries = await summarize(ranked.map((r) => byId.get(r.id)!), userId, extra);
  return ranked.map((r) => summaries.find((s) => s.id === r.id)!);
}

export type PublicQuestion = QuestionSummary & {
  rubricVersion: number;
  rubric: { id: string; name: string; weight: number; description: string }[];
  labels: { text: string; tone: "match" | "note" }[];
  sourceNote: string;
  sourceUrl: string | null;
};

/** Never returns draft/in_review/archived content, and never includes the ideal answer. */
export async function getPublicQuestion(userId: string, id: string): Promise<PublicQuestion | null> {
  const row = await db.question.findFirst({ where: { id, ...APPROVED }, include });
  if (!row) return null;
  const [s] = await summarize([row], userId);
  const target = await getTarget(userId);
  const rubric = await loadRubric(id, row.rubricVersion);
  return {
    ...s,
    rubricVersion: row.rubricVersion,
    rubric: rubric.map((c) => ({ id: c.id, name: c.name, weight: c.weight, description: c.description })),
    labels: relevanceLabels(target, { ...toRank(row), evidenceCategory: row.evidenceCategory }),
    sourceNote: row.sourceNote,
    sourceUrl: row.sourceUrl,
  };
}

export async function loadRubric(questionId: string, version: number): Promise<RubricCriterion[]> {
  const r = await db.rubric.findUnique({ where: { questionId_version: { questionId, version } } });
  if (!r) return [];
  const parsed = rubricSchema.safeParse(parseJson(r.criteria, []));
  return parsed.success ? parsed.data : [];
}

export async function setBookmark(userId: string, questionId: string, on: boolean) {
  const q = await db.question.findFirst({ where: { id: questionId, ...APPROVED }, select: { id: true } });
  if (!q) throw new HttpError(404, "Question not found");
  if (on) {
    await db.bookmark.upsert({ where: { userId_questionId: { userId, questionId } }, create: { userId, questionId }, update: {} });
  } else {
    await db.bookmark.deleteMany({ where: { userId, questionId } });
  }
  return { bookmarked: on };
}
