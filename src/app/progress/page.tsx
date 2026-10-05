import Link from "next/link";
import { requireUser } from "@/server/session";
import { progressSummary } from "@/server/attempts";

export const metadata = { title: "Progress" };

export default async function ProgressPage() {
  const user = await requireUser();
  const p = await progressSummary(user.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">Progress</h1>
        <p className="mt-1 text-muted">Based only on your independent, evaluated attempts. Small samples are noisy, so treat averages as a rough guide, not a prediction of any interview outcome.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card p-4"><div className="text-xs uppercase tracking-wide text-muted">Attempts</div><div className="font-display text-3xl">{p.totalAttempts}</div></div>
        <div className="card p-4"><div className="text-xs uppercase tracking-wide text-muted">Bookmarks</div><div className="font-display text-3xl">{p.bookmarks}</div></div>
        <div className="card p-4">
          <div className="text-xs uppercase tracking-wide text-muted">Excluded from scores</div>
          <div className="text-sm">{p.assistedExcluded} assisted · {p.demonstrationExcluded} demonstration</div>
        </div>
      </div>

      <section aria-labelledby="topics-h">
        <h2 id="topics-h" className="mb-3 text-xl">Topic strengths and gaps</h2>
        {p.topics.length === 0 ? (
          <div className="card p-6 text-sm text-muted">
            No independent evaluated attempts yet. <Link href="/library" className="text-accent underline">Answer a question</Link> to start building topic statistics.
            {p.demonstrationExcluded > 0 && " Demonstration-mode scores are not counted."}
          </div>
        ) : (
          <ul className="card divide-y divide-line">
            {p.topics.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-40 flex-1 font-medium">{t.name}</div>
                <div className="h-[3px] w-40 bg-line" role="img" aria-label={`${t.name} average ${t.avg} out of 100`}>
                  <div className="h-[3px] bg-accent" style={{ width: `${t.avg}%` }} />
                </div>
                <div className="w-28 text-right text-sm tabular-nums">{t.avg}/100 <span className="text-muted">· n={t.count}</span></div>
                {t.count < 3 && <span className="badge">Few samples</span>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="recent-h">
        <h2 id="recent-h" className="mb-3 text-xl">Recent practice</h2>
        {p.recent.length === 0 ? (
          <div className="card p-6 text-sm text-muted">Nothing yet.</div>
        ) : (
          <ul className="card divide-y divide-line">
            {p.recent.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-3 p-4 text-sm">
                <Link href={`/questions/${a.questionId}`} className="min-w-48 flex-1 font-medium hover:text-accent">{a.title}</Link>
                <span className="text-muted">{new Date(a.createdAt).toLocaleDateString()}</span>
                {a.status === "graded" ? <span className="badge">{Math.round(a.score ?? 0)}/100</span> : <span className="badge badge-warn">Not graded</span>}
                {a.assisted && <span className="badge badge-warn">Assisted</span>}
                {a.mode === "demonstration" && <span className="badge badge-warn">Demonstration</span>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
