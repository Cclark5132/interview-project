import { z } from "zod";
import { weightedOverall } from "@/lib/rubric";
import type { GradeInput, GradeResult } from "./types";

export const rawGradeSchema = z.object({
  criteria: z
    .array(
      z.object({
        id: z.string(),
        score: z.number().min(0).max(100),
        evidence: z.array(z.string().max(400)).max(5),
        rationale: z.string().min(1).max(600),
      }),
    )
    .min(1),
  summary: z.string().min(1).max(800),
  correct: z.array(z.object({ point: z.string().min(1).max(300), quote: z.string().max(400) })).max(8),
  missing: z.array(z.string().min(1).max(300)).max(10),
  improvementTopicIds: z.array(z.string()).max(6),
});

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();

/** A quote is valid only if it literally appears in the user's answer (whitespace/case-insensitive). */
export function quoteInAnswer(quote: string, answer: string): boolean {
  const q = norm(quote.replace(/\.\.\.|…/g, " ").replace(/^["']|["']$/g, ""));
  return q.length >= 3 && norm(answer).includes(q);
}

export type ValidationOutcome =
  | { ok: true; result: Omit<GradeResult, "mode" | "model"> }
  | { ok: false; errors: string[] };

export function validateGrade(raw: unknown, input: GradeInput): ValidationOutcome {
  const parsed = rawGradeSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.slice(0, 8).map((i) => `${i.path.join(".")}: ${i.message}`) };
  }
  const g = parsed.data;
  const errors: string[] = [];

  const expectedIds = input.rubric.map((c) => c.id);
  const gotIds = g.criteria.map((c) => c.id);
  for (const id of expectedIds) if (!gotIds.includes(id)) errors.push(`missing criterion "${id}"`);
  for (const id of gotIds) if (!expectedIds.includes(id)) errors.push(`unknown criterion "${id}"`);
  if (new Set(gotIds).size !== gotIds.length) errors.push("duplicate criterion ids");

  for (const c of g.criteria) {
    for (const q of c.evidence) {
      if (!quoteInAnswer(q, input.answer)) errors.push(`criterion "${c.id}" evidence is not a quote from the answer: "${q.slice(0, 60)}"`);
    }
  }
  for (const c of g.correct) {
    if (!quoteInAnswer(c.quote, input.answer)) errors.push(`"correct" item quote is not in the answer: "${c.quote.slice(0, 60)}"`);
  }
  const allowedTopics = new Map(input.topics.map((t) => [t.id, t.name]));
  for (const id of g.improvementTopicIds) if (!allowedTopics.has(id)) errors.push(`unknown improvement topic id "${id}"`);

  if (errors.length) return { ok: false, errors: errors.slice(0, 10) };

  const byId = new Map(g.criteria.map((c) => [c.id, c]));
  const ordered = input.rubric.map((r) => {
    const c = byId.get(r.id)!;
    return { id: r.id, name: r.name, weight: r.weight, score: Math.round(c.score), evidence: c.evidence, rationale: c.rationale };
  });
  return {
    ok: true,
    result: {
      overall: weightedOverall(input.rubric, ordered.map((o) => o.score)),
      summary: g.summary,
      criteria: ordered,
      correct: g.correct,
      missing: g.missing,
      improvementTopics: [...new Set(g.improvementTopicIds)].map((id) => ({ id, name: allowedTopics.get(id)! })),
    },
  };
}
