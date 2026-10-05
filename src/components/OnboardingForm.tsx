"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LEVELS } from "@/lib/ranking";

type Opt = { id: string; name: string };
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
  topics,
  roles,
  companies,
  initial,
  hasTarget,
}: {
  disciplines: Opt[];
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

  // Dropdowns narrow to the chosen discipline. A value already selected (e.g. from a pasted posting) always stays listed.
  const fits = (list: Fit[], current: string) => list.filter((o) => o.disciplineIds.includes(v.disciplineId) || o.id === current);
  const roleOptions = v.disciplineId ? fits(roles, v.roleId) : [];
  const companyOptions = v.disciplineId ? fits(companies, v.companyId) : [];
  const visibleTopics = topics.filter((t) => t.disciplineId === v.disciplineId || v.topicIds.includes(t.id));

  function chooseDiscipline(disciplineId: string) {
    setV((s) => ({
      ...s,
      disciplineId,
      // Clear anything that no longer belongs to the new discipline.
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
        ? "Extracted from the description. Review every field; you can change anything before saving."
        : "Extracted with simple keyword matching. It may be wrong, so check each field before saving.",
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
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
    router.push("/library");
    router.refresh();
  }

  const toggle = (id: string) => setV((s) => ({ ...s, topicIds: s.topicIds.includes(id) ? s.topicIds.filter((x) => x !== id) : [...s.topicIds, id] }));
  const pick = "cursor-pointer rounded-[3px] border px-2.5 py-1 text-[13px] transition-colors";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <form onSubmit={save} className="card space-y-6 p-5 sm:p-6" aria-labelledby="t-h">
        <h2 id="t-h" className="text-2xl">Your target</h2>

        <div>
          <label className="label" htmlFor="d">1 · Discipline</label>
          <select id="d" required className="input" value={v.disciplineId} onChange={(e) => chooseDiscipline(e.target.value)}>
            <option value="" disabled>Choose a discipline…</option>
            {disciplines.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div className={`grid gap-4 sm:grid-cols-2 ${v.disciplineId ? "" : "opacity-45"}`}>
          <div>
            <label className="label" htmlFor="r">2 · Role</label>
            <select id="r" className="input" disabled={!v.disciplineId} value={v.roleId} onChange={(e) => setV({ ...v, roleId: e.target.value })}>
              <option value="">{v.disciplineId ? "Any role" : "Pick a discipline first"}</option>
              {roleOptions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="c">3 · Company</label>
            <select id="c" className="input" disabled={!v.disciplineId} value={v.companyId} onChange={(e) => setV({ ...v, companyId: e.target.value })}>
              <option value="">{v.disciplineId && companyOptions.length === 0 ? "None for this discipline yet" : "No specific company"}</option>
              {companyOptions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="l">4 · Level</label>
            <select id="l" className="input" disabled={!v.disciplineId} value={v.level} onChange={(e) => setV({ ...v, level: e.target.value })}>
              {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        </div>

        <fieldset disabled={!v.disciplineId} className={v.disciplineId ? "" : "opacity-45"}>
          <legend className="label">5 · Focus topics</legend>
          {visibleTopics.length === 0 ? (
            <p className="text-sm text-muted">Topics for your discipline appear here.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {visibleTopics.map((t) => (
                <label key={t.id} className={`${pick} ${v.topicIds.includes(t.id) ? "border-accent bg-accent-soft text-accent" : "border-strong bg-surface text-muted hover:text-ink"}`}>
                  <input type="checkbox" className="sr-only" checked={v.topicIds.includes(t.id)} onChange={() => toggle(t.id)} />
                  {t.name}
                </label>
              ))}
            </div>
          )}
        </fieldset>

        {error && <p role="alert" className="rounded-[4px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary !min-h-10 !px-5" disabled={saving || !v.disciplineId}>{saving ? "Saving…" : "Save and open library"}</button>
          {hasTarget && <button type="button" className="btn !min-h-10" onClick={() => router.push("/library")}>Skip to library</button>}
        </div>
        <p className="font-mono text-[11px] leading-relaxed text-muted">No account or resume needed. A company only boosts questions the owner has reviewed for it; that is not a claim the company asks them.</p>
      </form>

      <section className="card h-fit p-5 sm:p-6" aria-labelledby="jd-h">
        <h2 id="jd-h" className="text-xl">Or paste a job posting</h2>
        <p className="mt-1 text-sm text-muted">Optional. We read a likely discipline, role, company, level and topics into the form so you can correct them. The text is treated as data only.</p>
        <label className="label mt-4" htmlFor="jd">Job posting</label>
        <textarea id="jd" value={jd} onChange={(e) => setJd(e.target.value)} rows={9} maxLength={20000} className="input" placeholder="Paste the posting text here" />
        <button type="button" className="btn mt-3" disabled={parsing || jd.trim().length < 40} onClick={extract}>
          {parsing ? "Reading…" : "Fill the form from this posting"}
        </button>
        {parsedNote && <p className="mt-3 border-l-2 border-accent bg-accent-soft px-3 py-2 text-sm text-accent" role="status">{parsedNote}</p>}
      </section>
    </div>
  );
}
