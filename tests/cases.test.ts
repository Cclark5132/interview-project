import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/lib/db";
import { syncTaxonomy } from "../prisma/taxonomy";
import { answerCaseStage, extractNumbers, getLatestCaseView, numericMatches, requestCaseData, startCaseRun, WRONG_NUMBER_CAP } from "@/server/cases";
import { submitAttempt } from "@/server/attempts";
import { CASES } from "@/content/cases";
import type { CaseStage } from "@/content/cases/types";
import type { GradeProvider } from "@/lib/grading/types";
import type { PrismaClient } from "@/generated/prisma/client";

const stages: CaseStage[] = [
  {
    title: "Structure",
    kind: "structure",
    prompt: "How would you approach this?",
    data: [{ label: "Market data", content: "Market is 100m units." }],
    ideal: "A clear structure covering demand, supply, economics and risks with a stated hypothesis and priorities.",
    c: ["Demand drivers", "Supply and competition", "Unit economics", "Risks"],
    k: ["Hypothesis-driven", "Prioritised"],
  },
  {
    title: "Calculation",
    kind: "math",
    prompt: "What is break-even volume?",
    exhibit: "Fixed 1,200,000; price 50; variable 30",
    ideal: "Break-even is fixed costs divided by contribution margin: 1,200,000 / 20 = 60,000 units.",
    c: ["Contribution margin", "Fixed over margin", "60,000 units", "Sanity check"],
    k: ["Show the formula", "State units"],
    answer: { value: 60000, unit: "units", tolerance: 0.02 },
  },
];

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

let userId: string, otherId: string, qid: string;

beforeAll(async () => {
  await syncTaxonomy(db as unknown as PrismaClient);
  userId = (await db.user.create({ data: { email: "case-a@test.local", passwordHash: "x" } })).id;
  otherId = (await db.user.create({ data: { email: "case-b@test.local", passwordHash: "x" } })).id;
  const q = await db.question.create({
    data: {
      title: "Case: test break-even",
      prompt: "A client sells a product and asks whether to expand.",
      disciplineId: "consulting",
      difficulty: 2,
      status: "approved",
      idealAnswer: "n/a",
      caseData: JSON.stringify(stages),
      topics: { create: [{ topicId: "case-math" }] },
    },
  });
  qid = q.id;
});

describe("number matching", () => {
  it("finds numbers with separators and suffixes", () => {
    expect(extractNumbers("About 60,000 units, or 1.2m total")).toEqual(expect.arrayContaining([60000, 1.2, 1200000]));
    expect(numericMatches("Break-even is roughly 59,500 units", 60000, 0.02)).toBe(true);
    expect(numericMatches("Break-even is roughly 45,000 units", 60000, 0.02)).toBe(false);
  });
});

describe("staged case runs", () => {
  it("releases stages one at a time and hides data until asked", async () => {
    const v = await startCaseRun(userId, qid);
    expect(v.stages).toHaveLength(1);
    expect(v.stages[0].askable.map((a) => a.label)).toEqual(["Market data"]);
    expect(v.stages[0].given).toHaveLength(0);
    expect(JSON.stringify(v)).not.toContain("Market is 100m units");
    expect(JSON.stringify(v)).not.toContain("Break-even is fixed costs");
    expect((await startCaseRun(userId, qid)).runId).toBe(v.runId);

    const asked = await requestCaseData(userId, qid, v.runId, 0, 0);
    expect(asked.stages[0].given[0].content).toContain("100m");
    await expect(requestCaseData(userId, qid, v.runId, 1, 0)).rejects.toMatchObject({ status: 409 });
    await expect(requestCaseData(otherId, qid, v.runId, 0, 0)).rejects.toMatchObject({ status: 404 });
  });

  it("grades each stage, advances, caps a wrong number and completes", async () => {
    const run = (await getLatestCaseView(userId, qid))!;
    await expect(answerCaseStage({ userId, questionId: qid, runId: run.runId, answer: "short" })).rejects.toMatchObject({ status: 400 });
    const s1 = await answerCaseStage({ userId, questionId: qid, runId: run.runId, answer: "Demand, supply, economics and risks, with a hypothesis that expansion pays." }, { provider: live(90) });
    expect(s1.stages).toHaveLength(2);
    expect(s1.stages[0].done?.score).toBe(90);
    expect(s1.stages[0].done?.ideal).toContain("clear structure");
    expect(s1.status).toBe("active");

    const s2 = await answerCaseStage({ userId, questionId: qid, runId: run.runId, answer: "Contribution is 20 a unit so break-even is about 45,000 units." }, { provider: live(95) });
    expect(s2.status).toBe("complete");
    expect(s2.stages[1].done?.numeric?.ok).toBe(false);
    expect(s2.stages[1].done?.score).toBe(WRONG_NUMBER_CAP);
    expect(s2.overall).toBe((90 + WRONG_NUMBER_CAP) / 2);
    await expect(answerCaseStage({ userId, questionId: qid, runId: run.runId, answer: "Another answer after the case ended." }, { provider: live(90) })).rejects.toMatchObject({ status: 409 });
  });

  it("scores a right number in full and blocks plain attempts on cases", async () => {
    const v = await startCaseRun(userId, qid, true);
    await answerCaseStage({ userId, questionId: qid, runId: v.runId, answer: "A structure covering the main areas of the problem." }, { provider: live(80) });
    const done = await answerCaseStage({ userId, questionId: qid, runId: v.runId, answer: "1,200,000 divided by 20 is 60,000 units to break even." }, { provider: live(80) });
    expect(done.stages[1].done?.numeric?.ok).toBe(true);
    expect(done.overall).toBe(80);
    await expect(submitAttempt({ userId, questionId: qid, answer: "A plain answer that bypasses the stages entirely." }, { provider: live(80) })).rejects.toMatchObject({ status: 400 });
  });
});

describe("case content", () => {
  it("has well-formed staged cases", () => {
    expect(CASES.length).toBeGreaterThanOrEqual(20);
    for (const c of CASES) {
      expect(c.t.startsWith("Case: "), c.t).toBe(true);
      expect(c.stages.length, c.t).toBeGreaterThanOrEqual(4);
      expect(c.stages.length, c.t).toBeLessThanOrEqual(6);
      expect(c.stages.some((s) => s.kind === "math"), `${c.t} needs a math stage`).toBe(true);
      expect(c.stages.at(-1)?.kind, c.t).toBe("synthesis");
      for (const s of c.stages) {
        expect(s.ideal.length, `${c.t}/${s.title}`).toBeGreaterThanOrEqual(150);
        expect(s.c.length, `${c.t}/${s.title}`).toBeGreaterThanOrEqual(4);
        expect(s.k.length, `${c.t}/${s.title}`).toBeGreaterThanOrEqual(2);
        if (s.kind === "math") expect(s.answer, `${c.t}/${s.title}`).toBeTruthy();
      }
    }
  });
});
