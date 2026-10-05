import type { SeedQuestion } from "../seed-questions";
import { TOPIC_ROLES } from "../bank/build";
import type { CaseDef } from "./types";

/** Turns a staged case into a seed question. The whole case is stored in caseData; the rubric here is a case-level summary. */
export function caseToSeed(c: CaseDef): SeedQuestion {
  const concepts = c.stages.flatMap((s) => s.c.slice(0, 2));
  const half = Math.ceil(concepts.length / 2);
  return {
    title: c.t,
    prompt: c.opening,
    discipline: c.discipline,
    difficulty: c.d,
    topics: [c.tp, ...(c.tp2 ? [c.tp2] : [])],
    roles: TOPIC_ROLES[c.tp] ?? [],
    ideal: c.stages.map((s, i) => `Stage ${i + 1} (${s.title}): ${s.ideal}`).join("\n\n"),
    core: concepts.slice(0, half),
    reasoning: c.stages.flatMap((s) => s.k.slice(0, 1)),
    complete: concepts.slice(half),
    misconceptions: c.stages.flatMap((s) => (s.m ?? []).slice(0, 1)).slice(0, 4),
    weights: [40, 25, 20, 15],
    caseData: JSON.stringify(c.stages),
  };
}
