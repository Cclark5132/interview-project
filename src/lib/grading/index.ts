import { GradingError, type GradeInput, type GradeProvider, type GradeResult } from "./types";
import { validateGrade } from "./validate";
import { AnthropicProvider } from "./anthropic";
import { DemonstrationProvider } from "./demo";

export function getProvider(): GradeProvider {
  if (process.env.ANTHROPIC_API_KEY) return new AnthropicProvider(process.env.ANTHROPIC_API_KEY);
  return new DemonstrationProvider();
}

/**
 * Validates provider output, allows exactly one repair retry, and computes the overall grade server-side.
 * Provider errors and invalid output surface as a recoverable GradingError.
 */
export async function gradeAnswer(input: GradeInput, provider: GradeProvider = getProvider()): Promise<GradeResult> {
  let errors: string[] | undefined;
  for (let attempt = 0; attempt < 2; attempt++) {
    let raw: unknown;
    try {
      raw = await provider.grade(input, errors);
    } catch (e) {
      const timedOut = e instanceof Error && /timeout|timed out|abort/i.test(`${e.name} ${e.message}`);
      throw new GradingError(
        timedOut ? "Grading timed out. Your answer was saved; try again." : "Grading is temporarily unavailable. Try again shortly.",
      );
    }
    const outcome = validateGrade(raw, input);
    if (outcome.ok) return { ...outcome.result, mode: provider.mode, model: provider.model };
    errors = outcome.errors;
  }
  throw new GradingError("The evaluation could not be completed reliably. Please try submitting again.");
}

export { GradingError };
export type { GradeInput, GradeResult, GradeProvider };
