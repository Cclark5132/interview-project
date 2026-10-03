import { describe, expect, it } from "vitest";
import { weightedOverall, rubricSchema } from "@/lib/rubric";
import { validateGrade, quoteInAnswer } from "@/lib/grading/validate";
import { gradeAnswer, GradingError } from "@/lib/grading";
import { DemonstrationProvider } from "@/lib/grading/demo";
import type { GradeInput, GradeProvider } from "@/lib/grading/types";
import { rankQuestions, relevanceLabels, type RankContext, type RankQuestion, type RankTarget } from "@/lib/ranking";
import { parseHeuristic, parseJobDescription, sanitizeParsed } from "@/lib/jd-parser";
import { parseImportCsv, parseImportJson } from "@/lib/import";
import { transcribeAudio, TranscriptionError } from "@/lib/transcribe";
import { SEED_QUESTIONS, buildRubric } from "@/content/seed-questions";
import { TOPICS, ROLES, DISCIPLINES } from "@/content/taxonomy";
import example from "../examples/import-example.json";

const rubric = buildRubric(SEED_QUESTIONS[0]);
const answer = "I would use a thermal resistance network from junction to ambient. Allowed total is about 0.30 K/W. Natural convection has low heat transfer so area matters.";
const input: GradeInput = {
  questionTitle: "t",
  prompt: "p",
  idealAnswer: "i",
  rubric,
  answer,
  topics: [{ id: "heat-transfer", name: "Heat transfer" }],
};
const goodRaw = (over: Record<string, unknown> = {}) => ({
  criteria: rubric.map((c, i) => ({
    id: c.id,
    score: [80, 60, 40, 100][i],
    evidence: ["thermal resistance network from junction to ambient"],
    rationale: "ok",
  })),
  summary: "Decent.",
  correct: [{ point: "network", quote: "thermal resistance network" }],
  missing: ["margin"],
  improvementTopicIds: ["heat-transfer"],
  ...over,
});

describe("rubric + scoring", () => {
  it("all seed rubrics are valid and total 100", () => {
    for (const q of SEED_QUESTIONS) {
      expect(rubricSchema.safeParse(buildRubric(q)).success, q.title).toBe(true);
      expect(q.ideal.length).toBeGreaterThan(80);
    }
    expect(SEED_QUESTIONS.length).toBeGreaterThanOrEqual(30);
    expect(SEED_QUESTIONS.length).toBeLessThanOrEqual(40);
  });
  it("seed topic/role/discipline ids exist in taxonomy", () => {
    for (const q of SEED_QUESTIONS) {
      expect(DISCIPLINES.some((d) => d.id === q.discipline), q.title).toBe(true);
      for (const t of q.topics) expect(TOPICS.some((x) => x.id === t), t).toBe(true);
      for (const r of q.roles) expect(ROLES.some((x) => x.id === r), r).toBe(true);
    }
  });
  it("rejects rubrics whose weights do not total 100", () => {
    const bad = rubric.map((c, i) => (i === 0 ? { ...c, weight: c.weight + 5 } : c));
    expect(rubricSchema.safeParse(bad).success).toBe(false);
  });
  it("computes the weighted overall from weights, not model output", () => {
    expect(weightedOverall([{ weight: 50 }, { weight: 30 }, { weight: 20 }], [100, 50, 0])).toBe(65);
    expect(weightedOverall([{ weight: 25 }, { weight: 75 }], [80, 40])).toBe(50);
  });
});

describe("grading validation", () => {
  it("accepts valid output and computes the weighted score server-side", () => {
    const out = validateGrade(goodRaw({ overall: 99 }), input);
    expect(out.ok).toBe(true);
    if (out.ok) {
      const [wa, wr, wc, wl] = SEED_QUESTIONS[0].weights;
      expect(out.result.overall).toBeCloseTo((wa * 80 + wr * 60 + wc * 40 + wl * 100) / 100, 1);
      expect(out.result.improvementTopics[0].name).toBe("Heat transfer");
    }
  });
  it("rejects invented quotes, unknown criteria and topics, and out-of-range scores", () => {
    const fabricated = goodRaw({ correct: [{ point: "x", quote: "I computed the Reynolds number" }] });
    expect(validateGrade(fabricated, input).ok).toBe(false);
    const raw = goodRaw();
    raw.criteria[0].id = "made-up";
    expect(validateGrade(raw, input).ok).toBe(false);
    expect(validateGrade(goodRaw({ improvementTopicIds: ["not-a-topic"] }), input).ok).toBe(false);
    const hi = goodRaw();
    hi.criteria[0].score = 140;
    expect(validateGrade(hi, input).ok).toBe(false);
    expect(validateGrade("garbage", input).ok).toBe(false);
  });
  it("matches quotes case/whitespace-insensitively", () => {
    expect(quoteInAnswer("THERMAL   resistance network", answer)).toBe(true);
    expect(quoteInAnswer("heat pipe", answer)).toBe(false);
  });
  it("allows exactly one repair retry, then returns a recoverable error", async () => {
    let calls = 0;
    const flaky: GradeProvider = {
      mode: "live",
      model: "m",
      async grade(_i, repair) {
        calls++;
        return calls === 1 ? { nope: true } : (expect(repair?.length).toBeGreaterThan(0), goodRaw());
      },
    };
    const r = await gradeAnswer(input, flaky);
    expect(calls).toBe(2);
    expect(r.mode).toBe("live");

    let bad = 0;
    const broken: GradeProvider = { mode: "live", model: "m", async grade() { bad++; return { nope: true }; } };
    await expect(gradeAnswer(input, broken)).rejects.toBeInstanceOf(GradingError);
    expect(bad).toBe(2);

    const down: GradeProvider = { mode: "live", model: "m", async grade() { throw new Error("network"); } };
    await expect(gradeAnswer(input, down)).rejects.toBeInstanceOf(GradingError);
  });
  it("demonstration mode is labeled and produces valid, evidence-backed output", async () => {
    const r = await gradeAnswer(input, new DemonstrationProvider());
    expect(r.mode).toBe("demonstration");
    expect(r.summary).toMatch(/DEMONSTRATION/);
    expect(r.overall).toBeGreaterThan(0);
  });
});

const target: RankTarget = { disciplineId: "mechanical", companyId: "tesla", roleId: "thermal-engineer", level: "entry", skills: ["heat-transfer"], focusTopics: [] };
const mk = (id: string, over: Partial<RankQuestion> = {}): RankQuestion => ({
  id, disciplineId: "mechanical", difficulty: 1, topicIds: ["heat-transfer"], roleIds: ["thermal-engineer"], companies: [], ...over,
});
const ctx: RankContext = { topicPerformance: {}, attemptsPerQuestion: {}, recentTopicIds: [], topicNames: { "heat-transfer": "Heat transfer" } };

describe("ranking", () => {
  it("prefers discipline/role/topic matches and explains why", () => {
    const r = rankQuestions(target, [mk("off", { disciplineId: "civil", topicIds: ["geotechnical"], roleIds: [] }), mk("on")], ctx);
    expect(r[0].id).toBe("on");
    expect(r[0].reasons.join(" ")).toMatch(/heat transfer/i);
  });
  it("only credits reviewed company associations", () => {
    const unreviewed = mk("a", { companies: [{ companyId: "tesla", evidence: "role_relevant", reviewed: false }] });
    const reviewed = mk("b", { companies: [{ companyId: "tesla", evidence: "role_relevant", reviewed: true }] });
    const [first] = rankQuestions(target, [unreviewed, reviewed], ctx);
    expect(first.id).toBe("b");
    expect(rankQuestions(target, [unreviewed], ctx)[0].score).toBeLessThan(rankQuestions(target, [reviewed], ctx)[0].score);
  });
  it("penalizes repetition, boosts weak topics, and prefers fitting difficulty", () => {
    const base = rankQuestions(target, [mk("x")], ctx)[0].score;
    expect(rankQuestions(target, [mk("x")], { ...ctx, attemptsPerQuestion: { x: 2 } })[0].score).toBeLessThan(base);
    expect(rankQuestions(target, [mk("x")], { ...ctx, topicPerformance: { "heat-transfer": { avg: 40, count: 3 } } })[0].score).toBeGreaterThan(base);
    expect(rankQuestions(target, [mk("hard", { difficulty: 3 })], ctx)[0].score).toBeLessThan(base);
  });
  it("labels company relevance honestly", () => {
    const labels = relevanceLabels(target, { ...mk("z", { companies: [{ companyId: "tesla", evidence: "role_relevant", reviewed: true }] }), evidenceCategory: "original" });
    expect(labels.map((l) => l.text).join(" ")).toMatch(/not evidence the company asked/i);
  });
});

describe("job description parsing", () => {
  const jd = "Thermal Engineer II at SpaceX. 3+ years experience in heat transfer, convection and radiator design for propulsion systems. CFD experience a plus.";
  it("extracts discipline, role, company, level and topics heuristically", () => {
    const p = parseHeuristic(jd);
    expect(p.disciplineId).toBe("mechanical");
    expect(p.roleId).toBe("thermal-engineer");
    expect(p.companyId).toBe("spacex");
    expect(p.level).toBe("mid");
    expect(p.topicIds).toContain("heat-transfer");
  });
  it("caches the extraction and clamps unknown ids", async () => {
    const store = new Map<string, string>();
    const cache = { get: async (h: string) => store.get(h) ?? null, set: async (h: string, r: string) => void store.set(h, r) };
    const a = await parseJobDescription(jd, cache);
    expect(store.size).toBe(1);
    const b = await parseJobDescription(jd, cache);
    expect(b).toEqual(a);
    const s = sanitizeParsed({ disciplineId: "mechanical", roleId: "ignore-previous-instructions", companyId: "evilcorp", level: "mid", topicIds: ["heat-transfer", "drop-tables"] });
    expect(s.roleId).toBeNull();
    expect(s.companyId).toBeNull();
    expect(s.topicIds).toEqual(["heat-transfer"]);
  });
});

describe("import", () => {
  it("validates the documented example file", () => {
    const parsed = parseImportJson(JSON.stringify(example));
    expect(parsed.errors).toEqual([]);
    expect(parsed.rows.length).toBe(example.length);
  });
  it("reports per-row errors and rejects bad JSON", () => {
    const r = parseImportJson(JSON.stringify([{ title: "x" }]));
    expect(r.rows).toHaveLength(0);
    expect(r.errors[0].message).toMatch(/prompt|title|discipline/);
    expect(parseImportJson("{nope").errors).toHaveLength(1);
  });
  it("parses CSV with quotes, commas and newlines", () => {
    const csv = 'title,prompt,discipline,difficulty,topics,roles,companies,sourceNote\n"A title, with comma","Prompt with ""quotes""\nand a newline that is long enough",mechanical,advanced,heat-transfer;fluid-mechanics,thermal-engineer,tesla:company_reported,"Owner note"\n';
    const r = parseImportCsv(csv);
    expect(r.errors).toEqual([]);
    expect(r.rows[0].row.difficulty).toBe(3);
    expect(r.rows[0].row.topics).toEqual(["heat-transfer", "fluid-mechanics"]);
    expect(r.rows[0].row.companies[0]).toMatchObject({ company: "tesla", evidence: "company_reported" });
    expect(r.rows[0].row.prompt).toContain('"quotes"');
  });
});

describe("transcription adapter", () => {
  const blob = (n: number, type = "audio/webm") => new Blob([new Uint8Array(n)], { type });
  it("returns the transcript from a controlled provider", async () => {
    expect(await transcribeAudio(blob(100), "a.webm", async () => "hello world")).toBe("hello world");
  });
  it("maps validation and provider failures to clear errors", async () => {
    await expect(transcribeAudio(blob(0), "a", async () => "x")).rejects.toMatchObject({ status: 400 });
    await expect(transcribeAudio(blob(11 * 1024 * 1024), "a", async () => "x")).rejects.toMatchObject({ status: 413 });
    await expect(transcribeAudio(blob(10, "video/mp4"), "a", async () => "x")).rejects.toMatchObject({ status: 415 });
    await expect(transcribeAudio(blob(10), "a", async () => "")).rejects.toMatchObject({ status: 422 });
    await expect(transcribeAudio(blob(10), "a", async () => { throw new TranscriptionError("boom"); })).rejects.toThrow("boom");
  });
});
