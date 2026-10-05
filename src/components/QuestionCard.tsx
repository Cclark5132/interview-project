import Link from "next/link";
import { DIFFICULTIES } from "@/content/taxonomy";
import type { QuestionSummary } from "@/server/questions";

export function difficultyName(d: number) {
  return DIFFICULTIES.find((x) => x.id === d)?.name ?? "—";
}

function Level({ d }: { d: number }) {
  return (
    <span className="inline-flex items-center gap-1" title={difficultyName(d)} role="img" aria-label={difficultyName(d)}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`h-2.5 w-1.5 ${n <= d ? "bg-ink" : "bg-strong/60"}`} />
      ))}
    </span>
  );
}

/** One row of the question list. `index` is only passed for ranked lists, where order carries meaning. */
export function QuestionCard({ q, highlight = false, index }: { q: QuestionSummary; highlight?: boolean; index?: number }) {
  return (
    <li className={`group relative grid gap-x-4 px-4 py-4 transition-colors hover:bg-bg sm:px-5 ${index != null ? "grid-cols-[1.75rem_1fr_auto]" : "grid-cols-[1fr_auto]"}`}>
      {index != null && <span className="pt-0.5 font-mono text-[11px] text-muted">{String(index).padStart(2, "0")}</span>}
      <div className="min-w-0">
        <Link href={`/questions/${q.id}`} className="font-display text-[19px] font-semibold leading-snug tracking-tight after:absolute after:inset-0 group-hover:text-accent">
          {q.title}
        </Link>
        <p className="mt-0.5 line-clamp-1 text-[13.5px] text-muted">{q.prompt}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="badge">{q.disciplineName}</span>
          {q.topics.map((t) => (
            <span key={t.id} className="badge">{t.name}</span>
          ))}
          {q.bookmarked && <span className="badge badge-accent">Saved</span>}
        </div>
        {highlight && q.reasons.length > 0 && (
          <p className="mt-2.5 font-mono text-[11.5px] leading-relaxed text-accent">{q.reasons.join("  /  ")}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 pt-1 text-right">
        <Level d={q.difficulty} />
        <div className="font-mono text-[11px] text-muted">
          {q.attemptCount === 0 ? (
            "Not attempted"
          ) : (
            <>
              {q.attemptCount}× {q.bestScore != null && <span className="text-ink">best {Math.round(q.bestScore)}</span>}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
