export type Comparison = {
  independentCount: number;
  assistedCount: number;
  firstIndependent: number | null;
  latestIndependent: number | null;
  latestAssisted: number | null;
};

/** Independent progress is never blended with assisted attempts. */
export function compareAttempts(attempts: { status: string; assisted: boolean; overallScore: number | null; gradingMode?: string | null }[]): Comparison {
  // Demonstration-mode scores are keyword matches, not evaluations, so they never count toward comparisons.
  const graded = attempts.filter((a) => a.status === "graded" && a.overallScore != null && a.gradingMode !== "demonstration");
  const ind = graded.filter((a) => !a.assisted);
  const asst = graded.filter((a) => a.assisted);
  return {
    independentCount: ind.length,
    assistedCount: asst.length,
    firstIndependent: ind[0]?.overallScore ?? null,
    latestIndependent: ind.at(-1)?.overallScore ?? null,
    latestAssisted: asst.at(-1)?.overallScore ?? null,
  };
}

