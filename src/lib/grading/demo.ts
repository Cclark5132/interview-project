import type { GradeInput, GradeProvider } from "./types";

const STOP = new Set(["that", "this", "with", "from", "which", "their", "there", "about", "would", "should", "because", "where", "when", "into", "than", "then", "have", "been", "does", "also", "each", "such"]);

const tokens = (s: string) => s.toLowerCase().match(/[a-z][a-z0-9-]{3,}/g)?.filter((t) => !STOP.has(t)) ?? [];

function sentences(answer: string) {
  return answer
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 8);
}

/**
 * Development-only keyword-overlap stand-in used when no ANTHROPIC_API_KEY is configured.
 * Its output is labeled as demonstration feedback everywhere it is shown; it is NOT an evaluation.
 */
export class DemonstrationProvider implements GradeProvider {
  mode = "demonstration" as const;
  model = "keyword-overlap-demo";

  async grade(input: GradeInput): Promise<unknown> {
    const sents = sentences(input.answer);
    const answerTokens = new Set(tokens(input.answer));
    const covered = new Set<string>();
    const quotes: { point: string; quote: string }[] = [];
    const missing: string[] = [];

    const criteria = input.rubric.map((c) => {
      let hit = 0;
      const evidence: string[] = [];
      for (const concept of c.expectedConcepts) {
        const keys = tokens(concept);
        const matched = keys.filter((k) => answerTokens.has(k));
        const isHit = keys.length > 0 && matched.length / keys.length >= 0.5;
        if (isHit) {
          hit++;
          covered.add(concept);
          const s = sents.find((x) => matched.some((m) => x.toLowerCase().includes(m)));
          if (s && evidence.length < 2 && !evidence.includes(s)) evidence.push(s.slice(0, 300));
          if (s && quotes.length < 4 && !quotes.some((q) => q.quote === s.slice(0, 300))) {
            quotes.push({ point: `Mentions: ${concept}`, quote: s.slice(0, 300) });
          }
        } else if (!missing.includes(concept)) {
          missing.push(concept);
        }
      }
      const score = Math.round((hit / c.expectedConcepts.length) * 100);
      return {
        id: c.id,
        score,
        evidence,
        rationale: `Demonstration only: ${hit} of ${c.expectedConcepts.length} expected concepts matched by keyword.`,
      };
    });

    const total = new Set(input.rubric.flatMap((c) => c.expectedConcepts)).size;
    return {
      criteria,
      summary: `DEMONSTRATION FEEDBACK (no API key configured): scores come from simple keyword overlap with the rubric's expected concepts and are not a real evaluation. ${covered.size} of ${total} expected concepts detected.`,
      correct: quotes,
      missing: missing.slice(0, 10),
      improvementTopicIds: missing.length ? input.topics.slice(0, 2).map((t) => t.id) : [],
    };
  }
}
