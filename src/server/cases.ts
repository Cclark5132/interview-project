import { db } from "@/lib/db";
import { parseJson } from "@/lib/json";
import { gradeAnswer, GradingError, getProvider, type GradeProvider, type GradeResult } from "@/lib/grading";
import { buildRubric } from "@/content/seed-questions";
import type { CaseStage } from "@/content/cases/types";
import { HttpError } from "./access";
import { LIMITS } from "./attempts";

/** Math stages cannot score above this when the final number is outside tolerance. */
export const WRONG_NUMBER_CAP = 60;

type Result = { stage: number; attemptId: string; score: number; numericOk: boolean | null };

export type StageView = {
  index: number;
  title: string;
  kind: CaseStage["kind"];
  prompt: string;
  exhibit: string | null;
  /** data the candidate has asked for */
  given: { index: number; label: string; content: string }[];
  /** data still available to ask for (labels only) */
  askable: { index: number; label: string }[];
  /** present once the stage is answered */
  done: null | {
    answerText: string;
    score: number;
    result: GradeResult | null;
    ideal: string;
    numeric: null | { expected: number; unit: string; ok: boolean };
  };
};

export type CaseView = {
  questionId: string;
  title: string;
  opening: string;
  runId: string;
  status: "active" | "complete";
  stageIndex: number;
  totalStages: number;
  stages: StageView[];
  overall: number | null;
  gradingMode: string | null;
};

const inFlight = new Set<string>();

function stagesOf(json: string | null): CaseStage[] {
  const stages = parseJson<CaseStage[]>(json ?? "[]", []);
  if (!stages.length) throw new HttpError(404, "This question is not a staged case.");
  return stages;
}

async function loadCaseQuestion(questionId: string) {
  const q = await db.question.findFirst({ where: { id: questionId, status: "approved", caseData: { not: null } }, include: { topics: { include: { topic: true } } } });
  if (!q) throw new HttpError(404, "Case not found");
  return q;
}

/** Numbers found in free text, tolerating thousands separators and k/m/b suffixes ("2.4m", "1,250"). */
export function extractNumbers(text: string): number[] {
  const out: number[] = [];
  for (const m of text.matchAll(/(-?\d[\d,]*(?:\.\d+)?|-?\.\d+)\s*(k|mm|m|bn|b|%|x)?(?![a-z])/gi)) {
    const base = Number(m[1].replace(/,/g, ""));
    if (!Number.isFinite(base)) continue;
    out.push(base);
    const suf = (m[2] ?? "").toLowerCase();
    if (suf === "k") out.push(base * 1e3);
    if (suf === "m" || suf === "mm") out.push(base * 1e6);
    if (suf === "bn" || suf === "b") out.push(base * 1e9);
  }
  return out;
}

export function numericMatches(text: string, expected: number, tolerance: number): boolean {
  const tol = Math.max(Math.abs(expected) * tolerance, 1e-9);
  return extractNumbers(text).some((n) => Math.abs(n - expected) <= tol);
}

function buildView(
  q: { id: string; title: string; prompt: string },
  stages: CaseStage[],
  run: { id: string; status: string; stageIndex: number; revealed: string; results: string; overallScore: number | null },
  attempts: Map<string, { answerText: string; breakdown: string | null; gradingMode: string | null }>,
): CaseView {
  const revealed = new Set(parseJson<string[]>(run.revealed, []));
  const results = parseJson<Result[]>(run.results, []);
  const visible = run.status === "complete" && results.length >= stages.length ? stages.length : Math.min(run.stageIndex + 1, stages.length);
  let mode: string | null = null;
  const views: StageView[] = stages.slice(0, visible).map((st, i) => {
    const given = (st.data ?? []).map((d, j) => ({ index: j, label: d.label, content: d.content })).filter((d) => revealed.has(`${i}:${d.index}`));
    const askable = (st.data ?? []).map((d, j) => ({ index: j, label: d.label })).filter((d) => !revealed.has(`${i}:${d.index}`));
    const res = results.find((r) => r.stage === i);
    const att = res ? attempts.get(res.attemptId) : undefined;
    if (att?.gradingMode) mode = att.gradingMode;
    return {
      index: i,
      title: st.title,
      kind: st.kind,
      prompt: st.prompt,
      exhibit: st.exhibit ?? null,
      given,
      askable: res ? [] : askable,
      done: res
        ? {
            answerText: att?.answerText ?? "",
            score: res.score,
            result: att?.breakdown ? parseJson<GradeResult | null>(att.breakdown, null) : null,
            ideal: st.ideal,
            numeric: st.answer && res.numericOk !== null ? { expected: st.answer.value, unit: st.answer.unit, ok: res.numericOk } : null,
          }
        : null,
    };
  });
  const finished = results.length >= stages.length;
  return {
    questionId: q.id,
    title: q.title,
    opening: q.prompt,
    runId: run.id,
    status: finished ? "complete" : "active",
    stageIndex: run.stageIndex,
    totalStages: stages.length,
    stages: views,
    overall: run.overallScore,
    gradingMode: mode,
  };
}

async function viewFor(questionId: string, runId: string, userId: string): Promise<CaseView> {
  const q = await loadCaseQuestion(questionId);
  const run = await db.caseRun.findFirst({ where: { id: runId, userId, questionId } });
  if (!run) throw new HttpError(404, "Case run not found");
  const results = parseJson<Result[]>(run.results, []);
  const rows = await db.attempt.findMany({ where: { id: { in: results.map((r) => r.attemptId) } }, select: { id: true, answerText: true, breakdown: true, gradingMode: true } });
  return buildView(q, stagesOf(q.caseData), run, new Map(rows.map((r) => [r.id, r])));
}

/** The user's latest run for this case (any status), or null if they have not started. */
export async function getLatestCaseView(userId: string, questionId: string): Promise<CaseView | null> {
  const run = await db.caseRun.findFirst({ where: { userId, questionId }, orderBy: { createdAt: "desc" }, select: { id: true } });
  if (!run) return null;
  return viewFor(questionId, run.id, userId);
}

/** Stage titles only, safe to show before the case starts. */
export async function caseOutline(questionId: string): Promise<string[] | null> {
  const q = await db.question.findFirst({ where: { id: questionId, status: "approved", caseData: { not: null } }, select: { caseData: true } });
  if (!q) return null;
  return parseJson<CaseStage[]>(q.caseData ?? "[]", []).map((s) => s.title);
}

/** Starts a fresh run; an unfinished run is reused so a page refresh never loses progress. */
export async function startCaseRun(userId: string, questionId: string, fresh = false): Promise<CaseView> {
  await loadCaseQuestion(questionId);
  if (!fresh) {
    const active = await db.caseRun.findFirst({ where: { userId, questionId, status: "active" }, orderBy: { createdAt: "desc" } });
    if (active) return viewFor(questionId, active.id, userId);
  }
  await db.caseRun.updateMany({ where: { userId, questionId, status: "active" }, data: { status: "complete" } });
  const run = await db.caseRun.create({ data: { userId, questionId } });
  return viewFor(questionId, run.id, userId);
}

/** Reveals one item the candidate asked for. Only the current, unanswered stage can be asked. */
export async function requestCaseData(userId: string, questionId: string, runId: string, stage: number, item: number): Promise<CaseView> {
  const q = await loadCaseQuestion(questionId);
  const run = await db.caseRun.findFirst({ where: { id: runId, userId, questionId } });
  if (!run) throw new HttpError(404, "Case run not found");
  if (run.status !== "active" || run.stageIndex !== stage) throw new HttpError(409, "That stage is not open.");
  const st = stagesOf(q.caseData)[stage];
  if (!st?.data?.[item]) throw new HttpError(400, "No such data request.");
  const revealed = new Set(parseJson<string[]>(run.revealed, []));
  revealed.add(`${stage}:${item}`);
  await db.caseRun.update({ where: { id: run.id }, data: { revealed: JSON.stringify([...revealed]) } });
  return viewFor(questionId, runId, userId);
}

function stageContext(opening: string, stages: CaseStage[], upTo: number, revealed: Set<string>): string {
  const parts = [`CASE: ${opening}`];
  for (let i = 0; i <= upTo; i++) {
    const st = stages[i];
    parts.push(`STAGE ${i + 1} (${st.title}): ${st.prompt}`);
    if (st.exhibit) parts.push(`EXHIBIT:\n${st.exhibit}`);
    (st.data ?? []).forEach((d, j) => {
      if (revealed.has(`${i}:${j}`)) parts.push(`DATA THE CANDIDATE ASKED FOR - ${d.label}: ${d.content}`);
    });
  }
  return parts.join("\n\n");
}

export async function answerCaseStage(
  input: { userId: string; questionId: string; runId: string; answer: string; requestKey?: string },
  deps: { provider?: GradeProvider } = {},
): Promise<CaseView> {
  const { userId, questionId, runId } = input;
  const answer = input.answer.trim();
  if (answer.length < LIMITS.minChars) throw new HttpError(400, `Answer must be at least ${LIMITS.minChars} characters.`);
  if (answer.length > LIMITS.maxChars) throw new HttpError(400, `Answer must be at most ${LIMITS.maxChars} characters.`);

  const q = await loadCaseQuestion(questionId);
  const run = await db.caseRun.findFirst({ where: { id: runId, userId, questionId } });
  if (!run) throw new HttpError(404, "Case run not found");
  if (run.status !== "active") throw new HttpError(409, "This case run is already finished.");
  const stages = stagesOf(q.caseData);
  const idx = run.stageIndex;
  const st = stages[idx];
  if (!st) throw new HttpError(409, "No open stage.");

  const recent = await db.attempt.count({ where: { userId, createdAt: { gte: new Date(Date.now() - LIMITS.windowMs) } } });
  if (recent >= LIMITS.maxPerWindow) throw new HttpError(429, "Too many submissions. Take a short break and try again in a few minutes.");

  const lock = `${runId}:${idx}`;
  if (inFlight.has(lock)) throw new HttpError(409, "This stage is already being evaluated.");
  inFlight.add(lock);
  try {
    const revealed = new Set(parseJson<string[]>(run.revealed, []));
    const half = Math.ceil(st.c.length / 2);
    const rubric = buildRubric({
      title: q.title,
      prompt: st.prompt,
      discipline: q.disciplineId,
      difficulty: (q.difficulty as 1 | 2 | 3) ?? 2,
      topics: q.topics.map((t) => t.topicId),
      roles: [],
      ideal: st.ideal,
      core: st.c.slice(0, half),
      reasoning: st.k,
      complete: st.c.length > half ? st.c.slice(half) : st.c.slice(-1),
      misconceptions: st.m?.length ? st.m : ["Stating conclusions without the reasoning behind them"],
      weights: [40, 25, 20, 15],
    });

    let result: GradeResult;
    try {
      result = await gradeAnswer(
        {
          questionTitle: `${q.title} - stage ${idx + 1}: ${st.title}`,
          prompt: stageContext(q.prompt, stages, idx, revealed),
          idealAnswer: st.ideal,
          rubric,
          answer,
          topics: q.topics.map((t) => ({ id: t.topicId, name: t.topic.name })),
        },
        deps.provider ?? getProvider(),
      );
    } catch (e) {
      if (!(e instanceof GradingError)) throw e;
      throw new HttpError(502, e.message);
    }

    const numericOk = st.answer ? numericMatches(answer, st.answer.value, st.answer.tolerance) : null;
    let score = result.overall;
    if (numericOk === false) score = Math.min(score, WRONG_NUMBER_CAP);
    const saved = await db.attempt.create({
      data: {
        userId,
        questionId,
        answerText: answer,
        inputMode: "typed",
        assisted: false,
        rubricVersion: q.rubricVersion,
        requestKey: input.requestKey?.slice(0, 80),
        status: "graded",
        overallScore: score,
        summary: result.summary,
        breakdown: JSON.stringify({ ...result, overall: score }),
        gradingMode: result.mode,
        gradingModel: result.model,
      },
    });

    const results = parseJson<Result[]>(run.results, []);
    results.push({ stage: idx, attemptId: saved.id, score, numericOk });
    const last = idx + 1 >= stages.length;
    const overall = last ? Math.round((results.reduce((s, r) => s + r.score, 0) / results.length) * 10) / 10 : null;
    await db.caseRun.update({
      where: { id: run.id },
      data: { results: JSON.stringify(results), stageIndex: last ? idx : idx + 1, status: last ? "complete" : "active", overallScore: overall },
    });
    return viewFor(questionId, runId, userId);
  } finally {
    inFlight.delete(lock);
  }
}
