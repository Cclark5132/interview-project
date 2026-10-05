import Link from "next/link";
import { DEMO_RESULT } from "@/content/demo";

/** Static illustration of a scored answer. Clearly labeled as a specimen, not a real attempt. */
function Specimen() {
  const r = DEMO_RESULT;
  return (
    <figure className="card overflow-hidden" aria-label="Example of a scored answer">
      <div className="grid grid-cols-3 border-b border-line text-[11px]">
        {[
          ["Discipline", "Aerospace"],
          ["Level", "Introductory"],
          ["Rubric", "REV 1"],
        ].map(([k, v], i) => (
          <div key={k} className={`px-3.5 py-2.5 ${i > 0 ? "border-l border-line" : ""}`}>
            <div className="font-mono uppercase tracking-[0.09em] text-muted">{k}</div>
            <div className="mt-0.5 font-medium text-ink">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-4 border-b border-line px-4 py-5">
        <div className="font-display text-[64px] font-semibold leading-none tracking-tight">{Math.round(r.overall)}</div>
        <div className="pb-1.5 font-mono text-xs text-muted">/ 100 overall</div>
      </div>
      <ul className="divide-y divide-line">
        {r.criteria.map((c) => (
          <li key={c.id} className="px-4 py-3">
            <div className="flex items-baseline justify-between gap-3 text-[13px]">
              <span className="font-medium">{c.name}</span>
              <span className="font-mono text-[11px] text-muted">
                w{c.weight} · <span className="text-ink">{c.score}</span>
              </span>
            </div>
            <div className="mt-1.5 h-[3px] bg-line">
              <div className="h-full bg-accent" style={{ width: `${c.score}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="border-t border-line bg-bg px-4 py-2.5 font-mono text-[11px] text-muted">
        Specimen layout. Not a real attempt.
      </figcaption>
    </figure>
  );
}

export function Landing() {
  return (
    <div className="-mt-10">
      <section className="sheet-grid -mx-4 border-b border-line px-4 py-16 sm:-mx-6 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Engineering and computing interview practice</p>
            <h1 className="mt-4 text-[44px] leading-[1.02] sm:text-[64px]">Practice the questions that fit the job.</h1>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted">
              A reviewed bank of technical questions, ranked for your discipline, company, role and level. Answer by typing or speaking and get scored against a rubric you can read.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/api/guest?next=/onboarding" className="btn btn-primary !min-h-11 !px-5 !text-sm">Start practicing</Link>
              <Link href="/api/guest?next=/" className="btn !min-h-11 !px-5 !text-sm">Browse the library</Link>
            </div>
            <p className="mt-4 font-mono text-[11px] text-muted">No account needed. Your attempts are saved in this browser.</p>
          </div>
          <Specimen />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px border-x border-b border-line bg-line sm:grid-cols-3">
        {[
          ["Reviewed bank", "Every question, rubric and ideal answer is approved by the owner before it appears. Nothing is generated while you practice."],
          ["Matched to the target", "Set discipline, company, role and level, or paste a job posting and correct what it extracts. Each recommendation says why it was picked."],
          ["Scoring you can check", "Weighted rubric criteria, quotes taken from your own answer, and a total computed from the published weights. Retries keep every attempt."],
        ].map(([t, d]) => (
          <div key={t} className="bg-surface p-6">
            <h2 className="text-xl">{t}</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </section>

      <p className="mx-auto mt-6 max-w-6xl font-mono text-[11px] leading-relaxed text-muted">
        Coverage is limited and grows as questions are reviewed. A company appearing on a question means it is relevant to that company&rsquo;s work, not that the company asked it.
      </p>
    </div>
  );
}
