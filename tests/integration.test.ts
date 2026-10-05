import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { syncTaxonomy } from "../prisma/taxonomy";
import { SEED_QUESTIONS, buildRubric } from "@/content/seed-questions";
import { assertAdmin, HttpError, loadActor, type Actor } from "@/server/access";
import { createQuestion, importQuestions, listAdminQuestions, previewGrade, publishProblems, transitionQuestion, updateQuestion } from "@/server/admin";
import { compareAttempts, LIMITS, listAttempts, progressSummary, revealIdeal, submitAttempt } from "@/server/attempts";
import { getPublicQuestion, recommend, searchLibrary, setBookmark } from "@/server/questions";
import { parseJd, saveTarget } from "@/server/target";
import { parseImportJson } from "@/lib/import";
import type { GradeProvider } from "@/lib/grading/types";
import { DemonstrationProvider } from "@/lib/grading/demo";
import type { PrismaClient } from "@/generated/prisma/client";

const sample = SEED_QUESTIONS[0];
let admin: Actor, alice: Actor, bob: Actor;

const live = (score: number): GradeProvider => ({
  mode: "live",
  model: "test-model",
  async grade(input) {
    const quote = input.answer.slice(0, 25);
    return {
      criteria: input.rubric.map((c) => ({ id: c.id, score, evidence: [quote], rationale: "r" })),
      summary: "s",
      correct: [{ point: "p", quote }],
      missing: [],
      improvementTopicIds: [input.topics[0].id],
    };
  },
});

const questionInput = (over: Record<string, unknown> = {}) => ({
  title: sample.title,
  prompt: sample.prompt,
  disciplineId: "mechanical",
  difficulty: 2,
  topicIds: ["heat-transfer"],
  roleIds: ["thermal-engineer"],
  companies: [{ companyId: "tesla", evidence: "role_relevant" as const }],
  evidenceCategory: "original" as const,
  sourceNote: "Original test question",
  idealAnswer: sample.ideal,
  rubric: buildRubric(sample),
  ...over,
});

async function approvedQuestion(over: Record<string, unknown> = {}) {
  const q = await createQuestion(admin, questionInput(over));
  await transitionQuestion(admin, q.id, "in_review");
  await transitionQuestion(admin, q.id, "approved", { confirmApproval: true });
  return q.id;
}

const answerText = "I would use a thermal resistance network from junction to ambient and compute the allowed total resistance.";

beforeAll(async () => {
  await syncTaxonomy(db as unknown as PrismaClient);
  const mkUser = (email: string, role: string) => db.user.create({ data: { email, passwordHash: "x", role } });
  admin = await loadActor((await mkUser("admin@test.local", "ADMIN")).id);
  alice = await loadActor((await mkUser("alice@test.local", "USER")).id);
  bob = await loadActor((await mkUser("bob@test.local", "USER")).id);
});

describe("admin authorization (server-enforced)", () => {
  it("rejects non-admin actors on every admin service", async () => {
    expect(() => assertAdmin(alice)).toThrow(HttpError);
    await expect(createQuestion(alice, questionInput())).rejects.toMatchObject({ status: 403 });
    await expect(listAdminQuestions(alice, {})).rejects.toMatchObject({ status: 403 });
    await expect(importQuestions(alice, { rows: [], errors: [] })).rejects.toMatchObject({ status: 403 });
    const id = await approvedQuestion();
    await expect(transitionQuestion(alice, id, "archived")).rejects.toMatchObject({ status: 403 });
    await expect(updateQuestion(alice, id, questionInput())).rejects.toMatchObject({ status: 403 });
    await expect(previewGrade(alice, id, "some sample answer text")).rejects.toMatchObject({ status: 403 });
  });
  it("re-reads role from the database, so a forged claim is useless", async () => {
    await expect(loadActor("does-not-exist")).rejects.toMatchObject({ status: 401 });
    await expect(loadActor(null)).rejects.toMatchObject({ status: 401 });
  });
});

describe("review workflow and draft exclusion", () => {
  it("keeps draft, in_review and archived questions out of every user-facing path", async () => {
    const q = await createQuestion(admin, questionInput({ title: "Draft only question title" }));
    expect(await getPublicQuestion(alice.id, q.id)).toBeNull();
    expect((await searchLibrary(alice.id, { q: "Draft only" })).length).toBe(0);
    await saveTarget(alice.id, { disciplineId: "mechanical", roleId: "thermal-engineer", level: "entry", topicIds: ["heat-transfer"] });
    expect((await recommend(alice.id, 50)).some((x) => x.id === q.id)).toBe(false);
    await expect(submitAttempt({ userId: alice.id, questionId: q.id, answer: answerText }, { provider: live(80) })).rejects.toMatchObject({ status: 404 });
    await expect(revealIdeal(alice.id, q.id, true)).rejects.toMatchObject({ status: 404 });
    await expect(setBookmark(alice.id, q.id, true)).rejects.toMatchObject({ status: 404 });

    await transitionQuestion(admin, q.id, "in_review");
    expect(await getPublicQuestion(alice.id, q.id)).toBeNull();
    await transitionQuestion(admin, q.id, "approved", { confirmApproval: true });
    expect(await getPublicQuestion(alice.id, q.id)).not.toBeNull();
    await transitionQuestion(admin, q.id, "archived");
    expect(await getPublicQuestion(alice.id, q.id)).toBeNull();
    expect((await searchLibrary(alice.id, { q: "Draft only" })).length).toBe(0);
  });
  it("requires complete content and explicit confirmation to approve", async () => {
    const incomplete = await createQuestion(admin, questionInput({ title: "Incomplete question here", idealAnswer: "", rubric: undefined, sourceNote: "", topicIds: [] }));
    await transitionQuestion(admin, incomplete.id, "in_review");
    const full = await db.question.findUniqueOrThrow({ where: { id: incomplete.id }, include: { topics: true, roles: true, companies: true } });
    const problems = await publishProblems(full);
    expect(problems.join(" ")).toMatch(/Ideal answer/);
    expect(problems.join(" ")).toMatch(/Rubric/);
    expect(problems.join(" ")).toMatch(/Provenance/);
    expect(problems.join(" ")).toMatch(/topic/);
    await expect(transitionQuestion(admin, incomplete.id, "approved", { confirmApproval: true })).rejects.toMatchObject({ status: 422 });

    const ok = await createQuestion(admin, questionInput({ title: "Ready question needing confirmation" }));
    await transitionQuestion(admin, ok.id, "in_review");
    await expect(transitionQuestion(admin, ok.id, "approved")).rejects.toMatchObject({ status: 400 });
    await expect(transitionQuestion(admin, ok.id, "archived")).rejects.toMatchObject({ status: 409 });
  });
  it("requires a source URL for company-reported material", async () => {
    const q = await createQuestion(admin, questionInput({ title: "Company reported without url", evidenceCategory: "company_reported" }));
    await transitionQuestion(admin, q.id, "in_review");
    await expect(transitionQuestion(admin, q.id, "approved", { confirmApproval: true })).rejects.toMatchObject({ status: 422 });
  });
  it("marks company associations reviewed only on owner approval", async () => {
    const q = await createQuestion(admin, questionInput({ title: "Association review question" }));
    expect((await db.questionCompany.findFirstOrThrow({ where: { questionId: q.id } })).reviewed).toBe(false);
    await transitionQuestion(admin, q.id, "in_review");
    await transitionQuestion(admin, q.id, "approved", { confirmApproval: true });
    expect((await db.questionCompany.findFirstOrThrow({ where: { questionId: q.id } })).reviewed).toBe(true);
  });
  it("imports always land as drafts, rejecting unknown taxonomy", async () => {
    const parsed = parseImportJson(
      JSON.stringify([
        { ...questionInput(), title: "Imported draft question A", discipline: "mechanical", topics: ["heat-transfer"], roles: [], companies: [], status: "approved" },
        { title: "Imported with bad topic", prompt: "A prompt that is long enough to pass validation.", discipline: "mechanical", difficulty: 1, topics: ["no-such-topic"] },
      ]),
    );
    const r = await importQuestions(admin, parsed);
    expect(r.created).toBe(1);
    expect(r.errors).toHaveLength(1);
    const row = await db.question.findFirstOrThrow({ where: { title: "Imported draft question A" } });
    expect(row.status).toBe("draft");
  });
});

describe("attempts, retries and assisted work", () => {
  it("stores graded attempts with rubric version and breakdown, and the overall is weighted server-side", async () => {
    const id = await approvedQuestion({ title: "Attempts question one" });
    const { attempt } = await submitAttempt({ userId: alice.id, questionId: id, answer: answerText }, { provider: live(70) });
    expect(attempt.status).toBe("graded");
    expect(attempt.overallScore).toBe(70);
    expect(attempt.rubricVersion).toBe(1);
    expect(attempt.result?.criteria).toHaveLength(4);
    expect(attempt.result?.mode).toBe("live");
    expect(attempt.assisted).toBe(false);
  });
  it("blocks the ideal answer until an attempt exists, requires confirmation, and flags later attempts as assisted", async () => {
    const id = await approvedQuestion({ title: "Reveal restrictions question" });
    await expect(revealIdeal(alice.id, id, true)).rejects.toMatchObject({ status: 403 });
    await submitAttempt({ userId: alice.id, questionId: id, answer: answerText }, { provider: live(40) });
    await expect(revealIdeal(alice.id, id, false)).rejects.toMatchObject({ status: 400 });
    const r = await revealIdeal(alice.id, id, true);
    expect(r.idealAnswer).toContain("thermal resistance");
    const second = await submitAttempt({ userId: alice.id, questionId: id, answer: answerText + " More detail here." }, { provider: live(90) });
    expect(second.attempt.assisted).toBe(true);
    const hist = await listAttempts(alice.id, id);
    expect(hist.map((h) => h.assisted)).toEqual([false, true]);
    const cmp = compareAttempts(hist);
    expect(cmp).toMatchObject({ firstIndependent: 40, latestIndependent: 40, latestAssisted: 90, independentCount: 1, assistedCount: 1 });
    // Bob never revealed: his state is unaffected and he still cannot see it.
    await expect(revealIdeal(bob.id, id, true)).rejects.toMatchObject({ status: 403 });
  });
  it("never exposes the ideal answer through the public question payload", async () => {
    const id = await approvedQuestion({ title: "No leak question title" });
    const q = await getPublicQuestion(alice.id, id);
    expect(JSON.stringify(q)).not.toContain("junction-to-case and the interface");
    expect(q).not.toHaveProperty("idealAnswer");
  });
  it("is isolated between users", async () => {
    const id = await approvedQuestion({ title: "Isolation question title" });
    await submitAttempt({ userId: alice.id, questionId: id, answer: answerText }, { provider: live(55) });
    expect(await listAttempts(bob.id, id)).toHaveLength(0);
    expect((await listAttempts(alice.id, id)).length).toBe(1);
    await setBookmark(alice.id, id, true);
    expect((await searchLibrary(bob.id, { bookmarked: true })).some((q) => q.id === id)).toBe(false);
    expect((await searchLibrary(alice.id, { bookmarked: true })).some((q) => q.id === id)).toBe(true);
    const p = await progressSummary(bob.id);
    expect(p.totalAttempts).toBe(0);
  });
  it("returns the same attempt for a duplicate request key and saves a recoverable error when grading fails", async () => {
    const id = await approvedQuestion({ title: "Duplicate protection question" });
    const a = await submitAttempt({ userId: bob.id, questionId: id, answer: answerText, requestKey: "k1" }, { provider: live(60) });
    const b = await submitAttempt({ userId: bob.id, questionId: id, answer: answerText, requestKey: "k1" }, { provider: live(10) });
    expect(b.duplicate).toBe(true);
    expect(b.attempt.id).toBe(a.attempt.id);
    expect(await db.attempt.count({ where: { userId: bob.id, questionId: id } })).toBe(1);

    const broken: GradeProvider = { mode: "live", model: "m", async grade() { return { bad: true }; } };
    const err = await submitAttempt({ userId: bob.id, questionId: id, answer: answerText + " again" }, { provider: broken });
    expect(err.attempt.status).toBe("error");
    expect(err.attempt.errorMessage).toBeTruthy();
    expect(err.attempt.answerText).toContain("again");
  });
  it("validates length and rate-limits per user", async () => {
    const id = await approvedQuestion({ title: "Rate limit question title" });
    await expect(submitAttempt({ userId: alice.id, questionId: id, answer: "short" }, { provider: live(50) })).rejects.toMatchObject({ status: 400 });
    await expect(submitAttempt({ userId: alice.id, questionId: id, answer: "x".repeat(LIMITS.maxChars + 1) }, { provider: live(50) })).rejects.toMatchObject({ status: 400 });
    const carol = await loadActor((await db.user.create({ data: { email: "carol@test.local", passwordHash: "x" } })).id);
    for (let i = 0; i < LIMITS.maxPerWindow; i++) await submitAttempt({ userId: carol.id, questionId: id, answer: answerText + i }, { provider: live(50) });
    await expect(submitAttempt({ userId: carol.id, questionId: id, answer: answerText + "over" }, { provider: live(50) })).rejects.toMatchObject({ status: 429 });
  });
  it("excludes demonstration-mode grades from progress statistics", async () => {
    const dana = await loadActor((await db.user.create({ data: { email: "dana@test.local", passwordHash: "x" } })).id);
    const id = await approvedQuestion({ title: "Demonstration progress question" });
    await submitAttempt({ userId: dana.id, questionId: id, answer: answerText }, { provider: new DemonstrationProvider() });
    await submitAttempt({ userId: dana.id, questionId: id, answer: answerText + " live" }, { provider: live(80) });
    const p = await progressSummary(dana.id);
    expect(p.demonstrationExcluded).toBe(1);
    expect(p.topics.find((t) => t.id === "heat-transfer")).toMatchObject({ avg: 80, count: 1 });
  });
});

describe("rubric versioning", () => {
  it("creates a new version when a published rubric changes and keeps historical attempts on the old one", async () => {
    const id = await approvedQuestion({ title: "Versioning question title" });
    const first = await submitAttempt({ userId: alice.id, questionId: id, answer: answerText }, { provider: live(50) });
    expect(first.attempt.rubricVersion).toBe(1);

    const changed = buildRubric(sample).map((c, i) => (i === 0 ? { ...c, weight: 45 } : i === 3 ? { ...c, weight: 5 } : c));
    const res = await updateQuestion(admin, id, questionInput({ title: "Versioning question title", rubric: changed }));
    expect(res.rubricVersion).toBe(2);
    expect(await db.rubric.count({ where: { questionId: id } })).toBe(2);

    // Saving the same rubric again does not create another version.
    expect((await updateQuestion(admin, id, questionInput({ title: "Versioning question title", rubric: changed }))).rubricVersion).toBe(2);

    const second = await submitAttempt({ userId: alice.id, questionId: id, answer: answerText + " Extra." }, { provider: live(50) });
    expect(second.attempt.rubricVersion).toBe(2);
    const history = await listAttempts(alice.id, id);
    expect(history[0].rubricVersion).toBe(1);
    expect(history[0].result?.criteria.find((c) => c.id === "technical-accuracy")?.weight).toBe(35);
    expect(history[1].result?.criteria.find((c) => c.id === "technical-accuracy")?.weight).toBe(45);
  });
  it("edits a draft rubric in place without versioning", async () => {
    const q = await createQuestion(admin, questionInput({ title: "Draft rubric edit question" }));
    const changed = buildRubric(sample).map((c, i) => (i === 0 ? { ...c, weight: 45 } : i === 3 ? { ...c, weight: 5 } : c));
    expect((await updateQuestion(admin, q.id, questionInput({ title: "Draft rubric edit question", rubric: changed }))).rubricVersion).toBe(1);
    expect(await db.rubric.count({ where: { questionId: q.id } })).toBe(1);
  });
  it("rejects invalid rubrics", async () => {
    const bad = buildRubric(sample).map((c, i) => (i === 0 ? { ...c, weight: 99 } : c));
    await expect(createQuestion(admin, questionInput({ title: "Bad rubric question", rubric: bad }))).rejects.toMatchObject({ status: 400 });
  });
});

describe("onboarding target and recommendations", () => {
  it("parses a pasted job description (heuristic without API key) and saves an edited target", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const parsed = await parseJd("Thermal Engineer II at SpaceX. 3+ years of heat transfer, convection and radiator design experience required.");
    expect(parsed.source).toBe("heuristic");
    expect(parsed.roleId).toBe("thermal-engineer");
    await expect(parseJd("too short")).rejects.toMatchObject({ status: 400 });
    await saveTarget(bob.id, { disciplineId: parsed.disciplineId, roleId: parsed.roleId, companyId: "tesla", level: "entry", topicIds: parsed.topicIds });
    const t = await db.userTarget.findUniqueOrThrow({ where: { userId: bob.id } });
    expect(t.companyId).toBe("tesla");
    await expect(saveTarget(bob.id, { disciplineId: "nope", level: "entry" })).rejects.toMatchObject({ status: 400 });
  });
  it("recommends matching approved questions first, with reasons, and filters the library", async () => {
    await approvedQuestion({ title: "Civil beam question for filters", disciplineId: "civil", topicIds: ["structural-analysis"], roleIds: [], companies: [] });
    const recs = await recommend(bob.id, 5);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].disciplineId).toBe("mechanical");
    expect(recs[0].reasons.length).toBeGreaterThan(0);
    const civil = await searchLibrary(bob.id, { disciplineId: "civil" });
    expect(civil.every((q) => q.disciplineId === "civil")).toBe(true);
    expect((await searchLibrary(bob.id, { difficulty: 3 })).every((q) => q.difficulty === 3)).toBe(true);
    expect((await searchLibrary(bob.id, { progress: "answered" })).every((q) => q.attemptCount > 0)).toBe(true);
    expect((await searchLibrary(bob.id, { q: "no-such-term-zzz" })).length).toBe(0);
  });
});

describe("guest access (no sign-up)", () => {
  it("creates unprivileged guests with unusable passwords and can practice", async () => {
    const { createGuestUser, isGuestEmail } = await import("@/server/guest");
    const g = await createGuestUser();
    expect(isGuestEmail(g.email)).toBe(true);
    const row = await db.user.findUniqueOrThrow({ where: { id: g.id } });
    expect(row.role).toBe("USER");
    expect(row.passwordHash.startsWith("$2")).toBe(true);
    const actor = await loadActor(g.id);
    await expect(createQuestion(actor, questionInput({ title: "Guest cannot create questions" }))).rejects.toMatchObject({ status: 403 });
    const id = await approvedQuestion({ title: "Guest practice question title" });
    const { attempt } = await submitAttempt({ userId: g.id, questionId: id, answer: answerText }, { provider: live(65) });
    expect(attempt.overallScore).toBe(65);
    const other = await createGuestUser();
    expect(await listAttempts(other.id, id)).toHaveLength(0);
  });
});
