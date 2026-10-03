import type { GradeResult } from "@/lib/grading/types";

export function EvaluationCard({
  result,
  rubricVersion,
  assisted,
  heading,
}: {
  result: GradeResult;
  rubricVersion?: number;
  assisted?: boolean;
  heading?: string;
}) {
  const demo = result.mode === "demonstration";
  return (
    <article className="card overflow-hidden" aria-label={heading ?? "Evaluation"}>
      {demo && (
        <div className="bg-warn-soft px-5 py-2 text-sm font-medium text-warn" role="note">
          Demonstration feedback — no grading API key is configured, so this score comes from simple keyword matching and is not a real evaluation.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-5 border-b border-line p-5">
        <div className="text-center">
          <div className="font-display text-5xl font-semibold leading-none">
            {Math.round(result.overall)}
            <span className="text-xl text-muted">/100</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-muted">Overall</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap gap-1.5">
            {heading && <span className="badge">{heading}</span>}
            {assisted && <span className="badge badge-warn">Assisted — ideal answer was revealed first</span>}
            {demo && <span className="badge badge-warn">Demonstration</span>}
          </div>
          <p className="text-[15px]">{result.summary}</p>
        </div>
      </div>

      <section className="p-5" aria-label="Rubric scores">
        <h3 className="mb-3 text-base">Rubric components</h3>
        <ul className="space-y-4">
          {result.criteria.map((c) => (
            <li key={c.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">
                  {c.name} <span className="font-normal text-muted">· weight {c.weight}</span>
                </span>
                <span className="tabular-nums">{c.score}/100</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-bg" role="img" aria-label={`${c.name}: ${c.score} out of 100`}>
                <div className="h-2 rounded-full bg-accent" style={{ width: `${c.score}%` }} />
              </div>
              <p className="mt-1 text-sm text-muted">{c.rationale}</p>
              {c.evidence.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {c.evidence.map((e, i) => (
                    <li key={i} className="border-l-2 border-line pl-3 text-sm italic text-muted">“{e}”</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
        <section className="bg-surface p-5" aria-label="What was correct">
          <h3 className="mb-2 text-base">What was correct</h3>
          {result.correct.length === 0 ? (
            <p className="text-sm text-muted">No clearly correct points were identified in this answer.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {result.correct.map((c, i) => (
                <li key={i}>
                  {c.point}
                  <div className="border-l-2 border-line pl-3 italic text-muted">“{c.quote}”</div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="bg-surface p-5" aria-label="What was missing">
          <h3 className="mb-2 text-base">What was missing</h3>
          {result.missing.length === 0 ? (
            <p className="text-sm text-muted">No expected concepts were flagged as missing.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {result.missing.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          )}
        </section>
      </div>

      {result.improvementTopics.length > 0 && (
        <section className="border-t border-line p-5" aria-label="Topics to improve">
          <h3 className="mb-2 text-base">Topics to improve</h3>
          <div className="flex flex-wrap gap-1.5">
            {result.improvementTopics.map((t) => <span key={t.id} className="badge badge-accent">{t.name}</span>)}
          </div>
        </section>
      )}

      <footer className="border-t border-line bg-bg/50 px-5 py-3 text-xs text-muted">
        Scored automatically against the reviewed rubric{rubricVersion ? ` (version ${rubricVersion})` : ""}; the overall score is calculated from the rubric weights.
        {!demo && result.model ? ` Evaluator: ${result.model}.` : ""}
      </footer>
    </article>
  );
}
