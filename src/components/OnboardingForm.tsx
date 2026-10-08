"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LEVELS } from "@/lib/ranking";

type Opt = { id: string; name: string };
type Disc = Opt & { family: string };
const FIELDS: { id: string; name: string; blurb: string; families: string[] }[] = [
  { id: "engineering", name: "Engineering", blurb: "Mechanical, aerospace, electrical, civil, chemical and more. Fundamentals, design and troubleshooting.", families: ["engineering"] },
  { id: "computer-science", name: "Computer science", blurb: "Algorithms, systems design, databases and the software interview loop.", families: ["computing"] },
  { id: "investment-banking", name: "Investment banking", blurb: "Accounting, valuation, M&A, LBOs and fit for analyst and markets roles.", families: ["finance"] },
  { id: "consulting", name: "Consulting", blurb: "Case interviews, market sizing, case math and fit.", families: ["business"] },
];
type Fit = Opt & { disciplineIds: string[] };
type Topic = Opt & { disciplineId: string };
export type TargetValue = { disciplineId: string; companyId: string; roleId: string; level: string; topicIds: string[] };

/** Visitors have no session yet: a 401 starts an anonymous guest session once, then the call is retried. */
async function api(url: string, init: RequestInit): Promise<Response> {
  let res = await fetch(url, init);
  if (res.status === 401) {
    await fetch("/api/guest?next=/demo");
    res = await fetch(url, init);
  }
  return res;
}

export function OnboardingForm({
  disciplines,
  counts,
  topics,
  roles,
  companies,
  initial,
  hasTarget,
}: {
  disciplines: Disc[];
  counts: Record<string, number>;
  topics: Topic[];
  roles: Fit[];
  companies: Fit[];
  initial: TargetValue;
  hasTarget: boolean;
}) {
  const router = useRouter();
  const [v, setV] = useState<TargetValue>(initial);
  const [jd, setJd] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parsedNote, setParsedNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState("");
  const [cq, setCq] = useState("");
  const fieldOf = (id: string) => FIELDS.find((f) => f.families.includes(disciplines.find((d) => d.id === id)?.family ?? ""))?.id ?? "";
  const [field, setField] = useState(fieldOf(initial.disciplineId));
  const [match, setMatch] = useState<{ inDiscipline: number; matching: number } | null>(null);

  // Options narrow to the chosen discipline. A value already selected (e.g. from a pasted posting) stays listed.
  const fits = (list: Fit[], current: string) => list.filter((o) => o.disciplineIds.includes(v.disciplineId) || o.id === current);
  const roleOptions = fits(roles, v.roleId);
  const companyOptions = fits(companies, v.companyId);
  const visibleTopics = topics.filter((t) => t.disciplineId === v.disciplineId || v.topicIds.includes(t.id));
  const companyShown = companyOptions.filter((c) => c.name.toLowerCase().includes(cq.trim().toLowerCase()) || c.id === v.companyId);
  const fieldDef = FIELDS.find((f) => f.id === field);
  const shown = disciplines.filter((d) => fieldDef?.families.includes(d.family) && d.name.toLowerCase().includes(q.trim().toLowerCase()));
  const multiMajor = shown.length > 1;
  const chosen = disciplines.find((d) => d.id === v.disciplineId);

  // Live count of published questions for the draft target.
  useEffect(() => {
    if (!v.disciplineId) return;
    const ctl = new AbortController();
    const t = setTimeout(async () => {
      const qs = new URLSearchParams({ discipline: v.disciplineId });
      if (v.roleId) qs.set("role", v.roleId);
      if (v.topicIds.length) qs.set("topics", v.topicIds.join(","));
      try {
        const r = await fetch(`/api/match?${qs}`, { signal: ctl.signal });
        if (r.ok) setMatch(await r.json());
      } catch {
        /* aborted or offline: keep the last count */
      }
    }, 150);
    return () => {
      clearTimeout(t);
      ctl.abort();
    };
  }, [v.disciplineId, v.roleId, v.topicIds]);

  function chooseField(id: string) {
    setField(id);
    setQ("");
    const inField = disciplines.filter((d) => FIELDS.find((f) => f.id === id)?.families.includes(d.family));
    if (!inField.some((d) => d.id === v.disciplineId)) {
      if (inField.length === 1) chooseDiscipline(inField[0].id);
      else setV((s) => ({ ...s, disciplineId: "", roleId: "", companyId: "", topicIds: [] }));
    }
  }

  function chooseDiscipline(disciplineId: string) {
    setV((s) => ({
      ...s,
      disciplineId,
      roleId: roles.find((r) => r.id === s.roleId)?.disciplineIds.includes(disciplineId) ? s.roleId : "",
      companyId: companies.find((c) => c.id === s.companyId)?.disciplineIds.includes(disciplineId) ? s.companyId : "",
      topicIds: s.topicIds.filter((id) => topics.find((t) => t.id === id)?.disciplineId === disciplineId),
    }));
  }

  async function extract() {
    setParsing(true);
    setError(null);
    setParsedNote(null);
    const res = await api("/api/target/parse", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: jd }) });
    const j = await res.json().catch(() => ({}));
    setParsing(false);
    if (!res.ok) return setError(j.error ?? "Could not read that description.");
    setV({ disciplineId: j.disciplineId, companyId: j.companyId ?? "", roleId: j.roleId ?? "", level: j.level, topicIds: j.topicIds ?? [] });
    setParsedNote(
      j.source === "ai"
        ? "Filled from the posting. Check each field and change anything."
        : "Filled with simple keyword matching. It may be off, so check each field.",
    );
  }

  async function start() {
    setSaving(true);
    setError(null);
    const res = await api("/api/target", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...v, companyId: v.companyId || null, roleId: v.roleId || null }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setSaving(false);
      return setError(j.error ?? "Could not save.");
    }
    router.push("/briefing");
  }

  const toggle = (id: string) => setV((s) => ({ ...s, topicIds: s.topicIds.includes(id) ? s.topicIds.filter((x) => x !== id) : [...s.topicIds, id] }));
  const chip = (on: boolean) =>
    `cursor-pointer rounded-[6px] border px-3 py-1.5 text-[13px] transition-colors ${on ? "border-accent bg-accent-soft text-accent" : "border-strong bg-surface-2 text-muted hover:border-muted hover:text-ink"}`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_21rem]">
      <div className="space-y-10">
        <section aria-labelledby="disc-h">
          <h2 id="field-h" className="label !mb-3">1 · What are you interviewing in?</h2>
          <div className="grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-labelledby="field-h">
            {FIELDS.map((f, i) => {
              const on = field === f.id;
              const total = disciplines.filter((d) => f.families.includes(d.family)).reduce((n, d) => n + (counts[d.id] ?? 0), 0);
              return (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => chooseField(f.id)}
                  style={{ "--i": i } as React.CSSProperties}
                  className={`rise relative rounded-[10px] border p-5 text-left transition-all duration-200 ${on ? "border-accent bg-accent-soft" : "border-line bg-surface hover:-translate-y-0.5 hover:border-strong hover:bg-surface-2"}`}
                >
                  <span className="block font-display text-[22px] font-semibold leading-tight">{f.name}</span>
                  <span className="mt-2 block text-[13px] leading-snug text-muted">{f.blurb}</span>
                  <span className="mt-3 block font-mono text-[11px] text-muted">{total} questions</span>
                  <span aria-hidden className={`absolute right-4 top-4 size-2 rounded-full transition-colors ${on ? "bg-accent" : "bg-strong"}`} />
                </button>
              );
            })}
          </div>
        </section>

        {field && shown.length > 1 && (
          <section key={field} aria-labelledby="disc-h" className="rise">
            <h2 id="disc-h" className="label !mb-3">2 · Your major</h2>
            <div className="overflow-hidden rounded-[10px] border border-line bg-surface">
              {shown.length > 6 && (
                <div className="border-b border-line p-2.5">
                  <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search majors..." aria-label="Search majors" className="input !h-9 w-full" />
                </div>
              )}
              <ul role="radiogroup" aria-labelledby="disc-h" className="grid sm:grid-cols-2">
                {shown.map((d) => {
                  const on = d.id === v.disciplineId;
                  return (
                    <li key={d.id} className="border-b border-line sm:odd:border-r">
                      <button type="button" role="radio" aria-checked={on} onClick={() => chooseDiscipline(d.id)} className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${on ? "bg-accent-soft" : "hover:bg-surface-2"}`}>
                        <span aria-hidden className={`grid size-4 shrink-0 place-items-center rounded-full border ${on ? "border-accent bg-accent" : "border-strong"}`}>{on && <span className="size-1.5 rounded-full bg-bg" />}</span>
                        <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{d.name}</span>
                        <span className="shrink-0 font-mono text-[11px] text-muted">{counts[d.id] ?? 0}</span>
                      </button>
                    </li>
                  );
                })}
                {shown.length === 0 && <li className="col-span-full px-4 py-6 text-sm text-muted">No match. Clear the search.</li>}
              </ul>
            </div>
          </section>
        )}

        {v.disciplineId && (
          <section key={v.disciplineId} aria-labelledby="pos-h" className="rise space-y-6">
            <h2 id="pos-h" className="label !mb-0">{multiMajor ? "3" : "2"} · Position and company</h2>

            <div>
              <div className="label" id="role-l">Position / role</div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="role-l">
                <button type="button" role="radio" aria-checked={v.roleId === ""} onClick={() => setV({ ...v, roleId: "" })} className={chip(v.roleId === "")}>Any role</button>
                {roleOptions.map((r) => (
                  <button key={r.id} type="button" role="radio" aria-checked={v.roleId === r.id} onClick={() => setV({ ...v, roleId: r.id })} className={chip(v.roleId === r.id)}>{r.name}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="label !mb-0" id="co-l">Company <span className="normal-case tracking-normal text-muted/70">({companyOptions.length} to choose from)</span></div>
                {companyOptions.length > 8 && (
                  <input type="search" value={cq} onChange={(e) => setCq(e.target.value)} placeholder="Search companies..." aria-label="Search companies" className="input !h-8 !w-52 !py-0 text-[13px]" />
                )}
              </div>
              <div className="mt-2 flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1" role="radiogroup" aria-labelledby="co-l">
                <button type="button" role="radio" aria-checked={v.companyId === ""} onClick={() => setV({ ...v, companyId: "" })} className={chip(v.companyId === "")}>No specific company</button>
                {companyShown.map((c) => (
                  <button key={c.id} type="button" role="radio" aria-checked={v.companyId === c.id} onClick={() => setV({ ...v, companyId: c.id })} className={chip(v.companyId === c.id)}>{c.name}</button>
                ))}
                {companyShown.length === 0 && <span className="py-1.5 text-sm text-muted">No company matches.</span>}
              </div>
              <p className="mt-2 text-[12.5px] text-muted">Pick a company and you will get its interview process briefing before the technical prep.</p>
            </div>

            <details className="card group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-sm font-medium">
                Fine-tune: level and focus topics <span className="text-muted/70">(optional)</span>
                <span aria-hidden className="font-mono text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="space-y-6 border-t border-line p-5">
                <fieldset>
                  <legend className="label">Level</legend>
                  <div className="inline-flex flex-wrap gap-2" role="radiogroup">
                    {LEVELS.map((l) => (
                      <label key={l.id} className={chip(v.level === l.id)}>
                        <input type="radio" name="level" className="sr-only" checked={v.level === l.id} onChange={() => setV({ ...v, level: l.id })} />
                        {l.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="label">Focus topics</legend>
                  <div className="flex flex-wrap gap-2">
                    {visibleTopics.map((t) => (
                      <label key={t.id} className={chip(v.topicIds.includes(t.id))}>
                        <input type="checkbox" className="sr-only" checked={v.topicIds.includes(t.id)} onChange={() => toggle(t.id)} />
                        {t.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </details>
          </section>
        )}

        <details className="card group">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium">
            Have a job posting? Paste it to fill this in
            <span aria-hidden className="font-mono text-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="border-t border-line p-5">
            <label className="label" htmlFor="jd">Job posting (treated as data only)</label>
            <textarea id="jd" value={jd} onChange={(e) => setJd(e.target.value)} rows={7} maxLength={20000} className="input" placeholder="Paste the posting text here" />
            <button type="button" className="btn mt-3" disabled={parsing || jd.trim().length < 40} onClick={extract}>
              {parsing ? "Reading…" : "Fill the form"}
            </button>
            {parsedNote && <p className="mt-3 border-l-2 border-accent bg-accent-soft px-3 py-2 text-sm text-accent" role="status">{parsedNote}</p>}
          </div>
        </details>
      </div>

      <aside className="card rise p-5 lg:sticky lg:top-24" aria-label="Your practice set">
        <div className="label">Your practice set</div>
        {!chosen ? (
          <p className="text-sm leading-relaxed text-muted">Pick a discipline to see how many questions are ready for you.</p>
        ) : (
          <>
            <div className="flex items-end gap-2">
              <span className="font-display text-[56px] font-semibold leading-none tabular-nums">{match ? match.matching : "–"}</span>
              <span className="pb-1.5 font-mono text-xs text-muted">{match && (v.roleId || v.topicIds.length) ? `of ${match.inDiscipline} ready` : "questions ready"}</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              {chosen.name}
              {v.roleId && `, ${roles.find((r) => r.id === v.roleId)?.name}`}
              {v.companyId && `, ${companies.find((c) => c.id === v.companyId)?.name}`}
              {` · ${LEVELS.find((l) => l.id === v.level)?.name}`}
            </p>
          </>
        )}
        {error && <p role="alert" className="mt-4 rounded-[6px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
        <button className="btn btn-primary mt-5 w-full !min-h-11 !text-sm" disabled={saving || !v.disciplineId} onClick={start}>
          {saving ? "Starting…" : v.companyId ? "See the interview guide →" : "Continue →"}
        </button>
        {hasTarget && <button type="button" className="btn mt-2 w-full" onClick={() => router.push("/library")}>Browse the library</button>}
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">No account needed. Company only boosts questions reviewed for it; that is not a claim the company asks them.</p>
      </aside>
    </div>
  );
}
