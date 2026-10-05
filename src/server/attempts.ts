import { db } from "@/lib/db";
import { parseJson } from "@/lib/json";
import { gradeAnswer, GradingError, getProvider, type GradeProvider, type GradeResult } from "@/lib/grading";
import { loadRubric } from "./questions";
import { HttpError } from "./access";

export const LIMITS = { minChars: 20, maxChars: 6000, windowMs: 10 * 60_000, maxPerWindow: 24 };

// Per-process guard against double-click / parallel submissions for the same user + question.
const inFlight = new Set<string>();

export type AttemptView = {
  id: string;
  createdAt: string;
  answerText: string;
  inputMode: string;
  assisted: boolean;
  status: string;
  overallScore: number | null;
  gradingMode: string | null;
  rubricVersion: number;
  errorMessage: string | null;
  result: GradeResult | null;
};

const toView = (a: {
  id: string;
  createdAt: Date;
  answerText: string;
  inputMode: string;
  assisted: boolean;
  status: string;
  overallScore: number | null;
  gradingMode: string | null;
  rubricVersion: number;
  errorMessage: string | null;
  breakdown: string | null;
}): AttemptView => ({
  id: a.id,
  createdAt: a.createdAt.toISOString(),
  answerText: a.answerText,
  inputMode: a.inputMode,
  assisted: a.assisted,
  status: a.status,
  overallScore: a.overallScore,
  gradingMode: a.gradingMode,
  rubricVersion: a.rubricVersion,
  errorMessage: a.errorMessage,
  result: a.breakdown ? parseJson<GradeResult | null>(a.breakdown, null) : null,
});

export async function submitAttempt(
  input: { userId: string; questionId: string; answer: string; inputMode?: "typed" | "transcribed"; requestKey?: string },
  deps: { provider?: GradeProvider; now?: () => Date } = {},
): Promise<{ attempt: AttemptView; duplicate: boolean }> {
  const { userId, questionId } = input;
  const answer = input.answer.trim();
  if (answer.length < LIMITS.minChars) throw new HttpError(400, `Answer must be at least ${LIMITS.minChars} characters.`);
  if (answer.length > LIMITS.maxChars) throw new HttpError(400, `Answer must be at most ${LIMITS.maxChars} characters.`);
  const requestKey = input.requestKey?.slice(0, 80);

  const question = await db.question.findFirst({
    where: { id: questionId, status: "approved" },
    include: { topics: { include: { topic: true } } },
  });
  if (!question) throw new HttpError(404, "Question not found");
  if (question.caseData) throw new HttpError(400, "This is a staged case. Answer it stage by stage in case mode.");

  if (requestKey) {
    const existing = await db.attempt.findUnique({ where: { userId_requestKey: { userId, requestKey } } });
    if (existing) return { attempt: toView(existing), duplicate: true };
  }

  const now = deps.now?.() ?? new Date();
  const recent = await db.attempt.count({ where: { userId, createdAt: { gte: new Date(now.getTime() - LIMITS.windowMs) } } });
  if (recent >= LIMITS.maxPerWindow) throw new HttpError(429, "Too many submissions. Take a short break and try again in a few minutes.");

  const lockKey = `${userId}:${questionId}`;
  if (inFlight.has(lockKey)) throw new HttpError(409, "This answer is already being evaluated.");
  inFlight.add(lockKey);
  try {
    const reveal = await db.idealReveal.findUnique({ where: { userId_questionId: { userId, questionId } } });
    const assisted = Boolean(reveal);
    const rubric = await loadRubric(questionId, question.rubricVersion);
    if (!rubric.length) throw new HttpError(500, "This question has no valid rubric.");

    const base = {
      userId,
      questionId,
      answerText: answer,
      inputMode: input.inputMode ?? "typed",
      assisted,
      rubricVersion: question.rubricVersion,
      requestKey,
    };
    let result: GradeResult;
    try {
      result = await gradeAnswer(
        {
          questionTitle: question.title,
          prompt: question.prompt,
          idealAnswer: question.idealAnswer,
          rubric,
          answer,
          topics: question.topics.map((t) => ({ id: t.topicId, name: t.topic.name })),
        },
        deps.provider ?? getProvider(),
      );
    } catch (e) {
      if (!(e instanceof GradingError)) throw e;
      const saved = await db.attempt.create({ data: { ...base, status: "error", errorMessage: e.message } });
      return { attempt: toView(saved), duplicate: false };
    }
    const saved = await db.attempt.create({
      data: {
        ...base,
        status: "graded",
        overallScore: result.overall,
        summary: result.summary,
        breakdown: JSON.stringify(result),
        gradingMode: result.mode,
        gradingModel: result.model,
      },
    });
    return { attempt: toView(saved), duplicate: false };
  } finally {
    inFlight.delete(lockKey);
  }
}

export async function listAttempts(userId: string, questionId: string): Promise<AttemptView[]> {
  const rows = await db.attempt.findMany({ where: { userId, questionId }, orderBy: { createdAt: "asc" } });
  return rows.map(toView);
}

export { compareAttempts, type Comparison } from "@/lib/compare";

/** Server-enforced: requires an approved question, at least one prior attempt, and an explicit confirmation. */
export async function revealIdeal(userId: string, questionId: string, confirmed: boolean): Promise<{ idealAnswer: string }> {
  const question = await db.question.findFirst({ where: { id: questionId, status: "approved" }, select: { idealAnswer: true } });
  if (!question) throw new HttpError(404, "Question not found");
  const existing = await db.idealReveal.findUnique({ where: { userId_questionId: { userId, questionId } } });
  if (existing) return { idealAnswer: question.idealAnswer };
  const attempts = await db.attempt.count({ where: { userId, questionId } });
  if (attempts < 1) throw new HttpError(403, "Submit at least one attempt before revealing the ideal answer.");
  if (!confirmed) throw new HttpError(400, "Confirmation required: revealing marks later attempts as assisted.");
  await db.idealReveal.create({ data: { userId, questionId } });
  return { idealAnswer: question.idealAnswer };
}

export async function getRevealedIdeal(userId: string, questionId: string): Promise<string | null> {
  const r = await db.idealReveal.findUnique({ where: { userId_questionId: { userId, questionId } } });
  if (!r) return null;
  const q = await db.question.findFirst({ where: { id: questionId, status: "approved" }, select: { idealAnswer: true } });
  return q?.idealAnswer ?? null;
}

export async function progressSummary(userId: string) {
  const attempts = await db.attempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { question: { select: { id: true, title: true, topics: { include: { topic: true } } } } },
  });
  const topics = new Map<string, { id: string; name: string; sum: number; count: number }>();
  let demo = 0;
  let assisted = 0;
  for (const a of attempts) {
    if (a.status !== "graded" || a.overallScore == null) continue;
    if (a.gradingMode === "demonstration") {
      demo++;
      continue;
    }
    if (a.assisted) {
      assisted++;
      continue;
    }
    for (const t of a.question.topics) {
      const e = topics.get(t.topicId) ?? { id: t.topicId, name: t.topic.name, sum: 0, count: 0 };
      e.sum += a.overallScore;
      e.count++;
      topics.set(t.topicId, e);
    }
  }
  const bookmarks = await db.bookmark.count({ where: { userId } });
  return {
    totalAttempts: attempts.length,
    demonstrationExcluded: demo,
    assistedExcluded: assisted,
    bookmarks,
    topics: [...topics.values()].map((t) => ({ id: t.id, name: t.name, avg: Math.round(t.sum / t.count), count: t.count })).sort((a, b) => a.avg - b.avg),
    recent: attempts.slice(0, 8).map((a) => ({
      id: a.id,
      questionId: a.question.id,
      title: a.question.title,
      createdAt: a.createdAt.toISOString(),
      score: a.overallScore,
      status: a.status,
      assisted: a.assisted,
      mode: a.gradingMode,
    })),
  };
}
