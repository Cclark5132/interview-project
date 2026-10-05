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
        <div className="border-b border-warn/30 bg-warn-soft px-5 py-2.5 text-[13px] text-warn" role="note">
          <strong className="font-semibold">Demonstration feedback.</strong> No grading key is configured, so this score comes from keyword matching and is not a real evaluation.
        </div>
      )}
      <div className="grid sm:grid-cols-[11rem_1fr]">
        <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
          <div className="label !mb-2">Overall</div>
          <div className="flex items-end gap-1.5">
            <span className="font-display text-[68px] font-semibold leading-[0.9] tracking-tight tabular-nums">{Math.round(result.overall)}</span>
            <span className="pb-1 font-mono text-xs text-muted">/100</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {heading && <span className="badge">{heading}</span>}
            {assisted && <span className="badge badge-warn">Assisted</span>}
            {rubricVersion && <span className="badge">REV {rubricVersion}</span>}
          </div>
        </div>
        <div className="p-5">
          <div className="label !mb-2">Summary</div>
          <p className="text-[15px] leading-relaxed">{result.summary}</p>
          {assisted && <p className="mt-2 text-[13px] text-warn">Submitted after the ideal answer was revealed, so it is kept out of independent progress.</p>}
        </div>
      </div>

      <section className="border-t border-line" aria-label="Rubric scores">
        <div className="label px-5 pb-0 pt-4">Rubric</div>
        <ul className="divide-y divide-line">
          {result.criteria.map((c) => (
            <li key={c.id} className="grid gap-x-6 gap-y-1 px-5 py-4 sm:grid-cols-[13rem_1fr]">
              <div>
                <div className="text-[14px] font-medium">{c.name}</div>
                <div className="font-mono text-[11px] text-muted">weight {c.weight}</div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="h-[3px] flex-1 bg-line" role="img" aria-label={`${c.name}: ${c.score} out of 100`}>
                    <div className="h-full bg-accent" style={{ width: `${c.score}%` }} />
                  </div>
                  <span className="w-12 text-right font-mono text-[13px] tabular-nums">{c.score}</span>
                </div>
                <p className="mt-2 text-[13.5px] text-muted">{c.rationale}</p>
                {c.evidence.map((e, i) => (
                  <blockquote key={i} className="mt-1.5 border-l-2 border-strong pl-3 font-mono text-[12px] leading-relaxed text-ink/80">“{e}”</blockquote>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid border-t border-line sm:grid-cols-2 sm:divide-x sm:divide-line">
        <section className="p-5" aria-label="What was correct">
          <div className="label">Correct</div>
          {result.correct.length === 0 ? (
            <p className="text-sm text-muted">No clearly correct points were identified.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {result.correct.map((c, i) => (
                <li key={i}>
                  {c.point}
                  <div className="mt-1 border-l-2 border-strong pl-3 font-mono text-[12px] text-ink/80">“{c.quote}”</div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="border-t border-line p-5 sm:border-t-0" aria-label="What was missing">
          <div className="label">Missing</div>
          {result.missing.length === 0 ? (
            <p className="text-sm text-muted">No expected concepts were flagged as missing.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {result.missing.map((m, i) => (
                <li key={i} className="flex gap-2"><span aria-hidden className="mt-2 size-1 shrink-0 bg-ink" />{m}</li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {result.improvementTopics.length > 0 && (
        <section className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-4" aria-label="Topics to improve">
          <span className="label !mb-0 mr-1">Study next</span>
          {result.improvementTopics.map((t) => <span key={t.id} className="badge badge-accent">{t.name}</span>)}
        </section>
      )}

      <footer className="border-t border-line bg-bg px-5 py-2.5 font-mono text-[11px] leading-relaxed text-muted">
        Scored automatically against the published rubric. Overall is the weighted sum of the criterion scores.
        {!demo && result.model ? ` Model: ${result.model}.` : ""}
      </footer>
    </article>
  );
}
