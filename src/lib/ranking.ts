// Deterministic, transparent question ranking. No AI involved; every point has a stated reason.

export type Level = "intern" | "entry" | "mid" | "senior";
export const LEVELS: { id: Level; name: string }[] = [
  { id: "intern", name: "Intern / student" },
  { id: "entry", name: "Entry level (0–2 yrs)" },
  { id: "mid", name: "Mid level (3–6 yrs)" },
  { id: "senior", name: "Senior (7+ yrs)" },
];

export const WEIGHTS = {
  discipline: 30,
  role: 15,
  companyReviewedReported: 15,
  companyReviewedRelevant: 10,
  topicOverlapEach: 5,
  topicOverlapMax: 20,
  difficultyExact: 10,
  difficultyNear: 5,
  weakTopicMax: 10,
  unanswered: 5,
  repeatPenaltyEach: 6,
  repeatPenaltyMax: 18,
  diversityPenaltyEach: 3,
  diversityPenaltyMax: 9,
} as const;

export type RankTarget = {
  disciplineId: string;
  companyId?: string | null;
  roleId?: string | null;
  level: Level;
  /** topic slugs from job description / profile skills */
  skills: string[];
  focusTopics: string[];
};

export type RankQuestion = {
  id: string;
  disciplineId: string;
  difficulty: number;
  topicIds: string[];
  roleIds: string[];
  companies: { companyId: string; evidence: string; reviewed: boolean }[];
};

export type RankContext = {
  /** topicId -> { avg score 0-100, attempts } for independent (non-assisted) graded attempts */
  topicPerformance: Record<string, { avg: number; count: number }>;
  attemptsPerQuestion: Record<string, number>;
  /** topicIds of the most recent attempts, newest first */
  recentTopicIds: string[];
  topicNames: Record<string, string>;
};

export type Ranked = { id: string; score: number; reasons: string[] };

export function targetDifficulty(level: Level): number {
  return { intern: 1, entry: 1, mid: 2, senior: 3 }[level];
}

export function scoreQuestion(t: RankTarget, q: RankQuestion, ctx: RankContext): Ranked {
  let score = 0;
  const reasons: string[] = [];
  const name = (id: string) => ctx.topicNames[id] ?? id;

  if (q.disciplineId === t.disciplineId) {
    score += WEIGHTS.discipline;
    reasons.push("Matches your discipline");
  }
  if (t.roleId && q.roleIds.includes(t.roleId)) {
    score += WEIGHTS.role;
    reasons.push("Tagged for your target role");
  }
  if (t.companyId) {
    const c = q.companies.find((x) => x.companyId === t.companyId && x.reviewed);
    if (c) {
      score += c.evidence === "company_reported" ? WEIGHTS.companyReviewedReported : WEIGHTS.companyReviewedRelevant;
      reasons.push(c.evidence === "company_reported" ? "Reviewed company-reported material" : "Reviewed as role-relevant for this company");
    }
  }
  const wanted = new Set([...t.skills, ...t.focusTopics]);
  const overlap = q.topicIds.filter((id) => wanted.has(id));
  if (overlap.length) {
    score += Math.min(WEIGHTS.topicOverlapMax, overlap.length * WEIGHTS.topicOverlapEach * 2);
    reasons.push(`Matches your ${overlap.map(name).slice(0, 2).join(" and ")} focus`);
  }
  const dist = Math.abs(q.difficulty - targetDifficulty(t.level));
  if (dist === 0) {
    score += WEIGHTS.difficultyExact;
    reasons.push("Fits your experience level");
  } else if (dist === 1) {
    score += WEIGHTS.difficultyNear;
  }

  const weak = q.topicIds
    .map((id) => ({ id, p: ctx.topicPerformance[id] }))
    .filter((x) => x.p && x.p.count >= 2 && x.p.avg < 70)
    .sort((a, b) => a.p.avg - b.p.avg)[0];
  if (weak) {
    score += Math.round(WEIGHTS.weakTopicMax * ((70 - weak.p.avg) / 70) + 2);
    reasons.push(`Targets a weaker topic: ${name(weak.id)} (${Math.round(weak.p.avg)} avg over ${weak.p.count} attempts)`);
  }

  const attempts = ctx.attemptsPerQuestion[q.id] ?? 0;
  if (attempts === 0) {
    score += WEIGHTS.unanswered;
  } else {
    score -= Math.min(WEIGHTS.repeatPenaltyMax, attempts * WEIGHTS.repeatPenaltyEach);
  }
  const recent = ctx.recentTopicIds.slice(0, 6);
  const recentHits = q.topicIds.filter((id) => recent.includes(id)).length;
  if (recentHits) score -= Math.min(WEIGHTS.diversityPenaltyMax, recentHits * WEIGHTS.diversityPenaltyEach);

  return { id: q.id, score, reasons: reasons.slice(0, 3) };
}

/** Sort by score desc; ties break on id so ordering is stable and testable. */
export function rankQuestions(t: RankTarget, qs: RankQuestion[], ctx: RankContext): Ranked[] {
  return qs.map((q) => scoreQuestion(t, q, ctx)).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

export type RelevanceLabel = { text: string; tone: "match" | "note" };

/** Honest labels shown on a question; company relevance is never presented as proof the company asked it. */
export function relevanceLabels(t: RankTarget | null, q: RankQuestion & { evidenceCategory: string }): RelevanceLabel[] {
  const out: RelevanceLabel[] = [];
  if (t && q.disciplineId === t.disciplineId) out.push({ text: "Matches your discipline", tone: "match" });
  if (t?.roleId && q.roleIds.includes(t.roleId)) out.push({ text: "Tagged for your target role", tone: "match" });
  if (t?.companyId) {
    const c = q.companies.find((x) => x.companyId === t.companyId);
    if (c?.reviewed) {
      out.push({
        text:
          c.evidence === "company_reported"
            ? "Company-reported material (documented source)"
            : "Role-relevant for this company — not evidence the company asked it",
        tone: "note",
      });
    }
  }
  if (q.evidenceCategory === "original") out.push({ text: "Original practice question", tone: "note" });
  return out;
}
