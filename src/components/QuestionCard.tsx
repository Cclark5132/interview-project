import Link from "next/link";
import { DIFFICULTIES } from "@/content/taxonomy";
import type { QuestionSummary } from "@/server/questions";

export function difficultyName(d: number) {
  return DIFFICULTIES.find((x) => x.id === d)?.name ?? "—";
}

export function QuestionCard({ q, highlight = false }: { q: QuestionSummary; highlight?: boolean }) {
  return (
    <li className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Link href={`/questions/${q.id}`} className="font-display text-lg font-semibold leading-snug text-ink hover:text-accent">
          {q.title}
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted">
          {q.bookmarked && <span className="badge badge-accent">Bookmarked</span>}
          {q.attemptCount > 0 ? (
            <span>
              {q.attemptCount} attempt{q.attemptCount > 1 ? "s" : ""}
              {q.bestScore != null && <> · best {Math.round(q.bestScore)}</>}
            </span>
          ) : (
            <span>Not attempted</span>
          )}
        </div>
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-muted">{q.prompt}</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="badge">{q.disciplineName}</span>
        <span className="badge">{difficultyName(q.difficulty)}</span>
        {q.topics.map((t) => (
          <span key={t.id} className="badge">{t.name}</span>
        ))}
      </div>
      {highlight && q.reasons.length > 0 && (
        <p className="mt-3 border-t border-line pt-2 text-sm text-accent">
          <span className="font-medium">Why this question: </span>
          {q.reasons.join(" · ")}
        </p>
      )}
    </li>
  );
}
