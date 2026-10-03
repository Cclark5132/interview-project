import { z } from "zod";

export const criterionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{2,40}$/, "criterion id must be a lowercase slug"),
  name: z.string().min(2).max(80),
  weight: z.number().int().min(1).max(100),
  description: z.string().min(10).max(600),
  anchors: z.object({
    low: z.string().min(3).max(400),
    mid: z.string().min(3).max(400),
    high: z.string().min(3).max(400),
  }),
  expectedConcepts: z.array(z.string().min(2).max(200)).min(1).max(20),
  alternatives: z.array(z.string().min(2).max(300)).max(10).default([]),
  misconceptions: z.array(z.string().min(2).max(300)).max(10).default([]),
});

export const rubricSchema = z
  .array(criterionSchema)
  .min(2)
  .max(8)
  .superRefine((criteria, ctx) => {
    const total = criteria.reduce((s, c) => s + c.weight, 0);
    if (total !== 100) ctx.addIssue({ code: "custom", message: `Rubric weights total ${total}, must total 100` });
    const ids = new Set<string>();
    for (const c of criteria) {
      if (ids.has(c.id)) ctx.addIssue({ code: "custom", message: `Duplicate criterion id ${c.id}` });
      ids.add(c.id);
    }
  });

export type RubricCriterion = z.infer<typeof criterionSchema>;

/** Overall grade is always computed here from rubric weights; the model never supplies it. */
export function weightedOverall(criteria: { weight: number }[], scores: number[]): number {
  const total = criteria.reduce((s, c) => s + c.weight, 0);
  if (total === 0 || criteria.length !== scores.length) throw new Error("Invalid rubric/score shape");
  const sum = criteria.reduce((s, c, i) => s + c.weight * scores[i], 0);
  return Math.round((sum / total) * 10) / 10;
}
