import type { Stage, Track } from "@/content/guides/types";

export type BriefingData = {
  eyebrow: string;
  title: string;
  summary: string;
  asOf: string;
  confidence?: "high" | "medium" | "low";
  stages: Stage[];
  behavioral: Track["behavioral"];
  technical: Track["technical"];
  projects: string;
  roleNote?: { roleName: string; notes: string };
  prep: string[];
  sources: { label: string; url: string }[];
};

const STAR: Record<Track["behavioral"]["star"], { label: string; tone: string }> = {
  expected: { label: "STAR-style stories expected", tone: "badge-accent" },
  helpful: { label: "STAR structure helps", tone: "badge-accent" },
  "not-emphasised": { label: "Less formal than STAR", tone: "" },
  unclear: { label: "Format varies by interviewer", tone: "" },
};

const CONF: Record<NonNullable<BriefingData["confidence"]>, string> = {
  high: "Well documented",
  medium: "Partly documented",
  low: "Limited public information",
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function BriefingView({ d }: { d: BriefingData }) {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{d.eyebrow}</div>
        <h1 className="text-[38px] leading-[1.05] sm:text-[46px]">{d.title}</h1>
        <p className="max-w-2xl text-[16.5px] leading-relaxed text-muted">{d.summary}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="badge">Researched {d.asOf}</span>
          {d.confidence && <span className={`badge ${d.confidence === "high" ? "badge-accent" : "badge-warn"}`}>{CONF[d.confidence]}</span>}
          <span className="badge">Based on public sources</span>
        </div>
      </header>

      <section aria-labelledby="flow-h">
        <h2 id="flow-h" className="label !mb-4">How the process runs</h2>
        <ol className="relative space-y-0 border-l border-strong pl-6">
          {d.stages.map((s, i) => (
            <li key={`${s.name}-${i}`} className="relative pb-6 last:pb-0">
              <span aria-hidden className="absolute -left-[33px] top-0.5 grid size-[18px] place-items-center rounded-full border border-accent bg-bg font-mono text-[10px] text-accent">{i + 1}</span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <h3 className="text-[17px] font-semibold">{s.name}</h3>
                <span className="font-mono text-[11.5px] text-muted">{s.format}</span>
              </div>
              <p className="mt-1 max-w-2xl text-[14.5px] leading-relaxed text-muted">{s.what}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="mix-h" className="grid gap-4 lg:grid-cols-2">
        <h2 id="mix-h" className="sr-only">Behavioral and technical rounds</h2>
        <article className="card space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl">Behavioral</h3>
            <span className={`badge ${STAR[d.behavioral.star].tone}`}>{STAR[d.behavioral.star].label}</span>
          </div>
          <p className="text-[14.5px] leading-relaxed">{d.behavioral.style}</p>
          <div>
            <div className="label">What they probe</div>
            <div className="flex flex-wrap gap-1.5">{d.behavioral.themes.map((t) => <span key={t} className="badge">{t}</span>)}</div>
          </div>
          <div>
            <div className="label">Typical questions</div>
            <ul className="space-y-1.5 text-[14px] leading-relaxed text-muted">
              {d.behavioral.examples.map((e) => <li key={e} className="flex gap-2"><span aria-hidden className="text-accent">›</span>{e}</li>)}
            </ul>
          </div>
        </article>

        <article className="card space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl">Technical</h3>
            <span className="badge">{d.technical.share}</span>
          </div>
          <p className="text-[14.5px] leading-relaxed">{d.technical.style}</p>
          <div>
            <div className="label">What gets covered</div>
            <div className="flex flex-wrap gap-1.5">{d.technical.topics.map((t) => <span key={t} className="badge">{t}</span>)}</div>
          </div>
        </article>
      </section>

      <section aria-labelledby="proj-h" className="rounded-[10px] border border-accent/30 bg-accent-soft p-5">
        <h2 id="proj-h" className="text-xl">Know your projects</h2>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed">{d.projects}</p>
      </section>

      {d.roleNote && (
        <section aria-labelledby="role-h" className="card p-5">
          <h2 id="role-h" className="text-xl">For the {d.roleNote.roleName} role</h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-muted">{d.roleNote.notes}</p>
        </section>
      )}

      <section aria-labelledby="prep-h">
        <h2 id="prep-h" className="label !mb-3">Prep checklist</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {d.prep.map((p) => (
            <li key={p} className="card flex gap-3 p-3.5 text-[14px] leading-relaxed">
              <span aria-hidden className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-[4px] border border-strong font-mono text-[10px] text-muted">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-line pt-5 text-[12.5px] leading-relaxed text-muted">
        <p>
          Compiled from public sources such as company career pages, university career guides and candidate reports, then paraphrased. Processes change by team, office and year, and this is not insider information. Always confirm details with your recruiter.
        </p>
        {d.sources.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {d.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-strong underline-offset-2 hover:text-ink">{s.label}</a>
                <span className="font-mono text-[11px] text-muted/70"> · {hostOf(s.url)}</span>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </div>
  );
}
