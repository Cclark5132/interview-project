import type { RubricCriterion } from "@/lib/rubric";

export type GradeInput = {
  questionTitle: string;
  prompt: string;
  idealAnswer: string;
  rubric: RubricCriterion[];
  answer: string;
  topics: { id: string; name: string }[];
};

export type GradeProvider = {
  mode: "live" | "demonstration";
  model: string;
  /** Returns the raw (unvalidated) structured output. `repair` carries validation errors for the single retry. */
  grade(input: GradeInput, repair?: string[]): Promise<unknown>;
};

export type GradeResult = {
  overall: number;
  summary: string;
  criteria: {
    id: string;
    name: string;
    weight: number;
    score: number;
    evidence: string[];
    rationale: string;
  }[];
  correct: { point: string; quote: string }[];
  missing: string[];
  improvementTopics: { id: string; name: string }[];
  mode: "live" | "demonstration";
  model: string;
};

export class GradingError extends Error {
  constructor(
    message: string,
    public recoverable = true,
  ) {
    super(message);
    this.name = "GradingError";
  }
}
