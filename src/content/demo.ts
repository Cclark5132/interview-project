import type { GradeResult } from "@/lib/grading/types";

// Isolated interface preview. Static content: never stored, never in the question bank, never in progress.
export const DEMO_QUESTION = {
  title: "Why does a wing stall? (demo)",
  prompt: "A pilot says an aircraft stalled because it was flying too slowly. Explain whether that is accurate and what actually causes a wing to stall.",
  discipline: "Aerospace engineering",
  difficulty: "Introductory",
  rubric: [
    { name: "Technical accuracy", weight: 40 },
    { name: "Reasoning and trade-offs", weight: 25 },
    { name: "Completeness", weight: 20 },
    { name: "Clarity and structure", weight: 15 },
  ],
};

export const DEMO_ANSWER =
  "Partly. A wing stalls when the angle of attack goes past the critical angle and the airflow separates from the upper surface, so lift drops. Low speed matters because you need a higher angle of attack to make enough lift, but you can stall at any speed.";

export const DEMO_RESULT: GradeResult = {
  overall: 74,
  summary: "Sample evaluation shown for layout only. The answer correctly ties stall to angle of attack and flow separation but does not mention load factor or flaps.",
  criteria: [
    { id: "technical-accuracy", name: "Technical accuracy", weight: 40, score: 90, evidence: ["airflow separates from the upper surface"], rationale: "Correctly identifies separation at the critical angle of attack." },
    { id: "reasoning", name: "Reasoning and trade-offs", weight: 25, score: 75, evidence: ["you can stall at any speed"], rationale: "Explains why low speed correlates with stall without equating the two." },
    { id: "completeness", name: "Completeness", weight: 20, score: 35, evidence: [], rationale: "No mention of weight, load factor, or flaps changing stall speed." },
    { id: "clarity", name: "Clarity and structure", weight: 15, score: 80, evidence: ["Partly."], rationale: "Gives a direct answer first, then explains." },
  ],
  correct: [{ point: "Stall is tied to angle of attack and separation", quote: "angle of attack goes past the critical angle" }],
  missing: ["Stall speed rises with weight and load factor", "Flaps raise CLmax and lower stall speed"],
  improvementTopics: [{ id: "aerodynamics", name: "Aerodynamics" }],
  mode: "demonstration",
  model: "static-demo",
};
