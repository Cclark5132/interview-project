"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LEVELS } from "@/lib/ranking";

type Opt = { id: string; name: string };
type Topic = Opt & { disciplineId: string };
export type TargetValue = { disciplineId: string; companyId: string; roleId: string; level: string; topicIds: string[] };

export function OnboardingForm({
  disciplines,
  topics,
  roles,
  companies,
  initial,
}: {
  disciplines: Opt[];
  topics: Topic[];
  roles: Opt[];
  companies: Opt[];
  initial: TargetValue;
}) {
  const router = useRouter();
  const [v, setV] = useState<TargetValue>(initial);
  const [jd, setJd] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parsedNote, setParsedNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const visibleTopics = topics.filter((t) => t.disciplineId === v.disciplineId || v.topicIds.includes(t.id));

  async function extract() {
    setParsing(true);
    setError(null);
    setParsedNote(null);
    const res = await fetch("/api/target/parse", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: jd }) });
    const j = await res.json().catch(() => ({}));
    setParsing(false);
    if (!res.ok) return setError(j.error ?? "Could not read that description.");
    setV({ disciplineId: j.disciplineId, companyId: j.companyId ?? "", roleId: j.roleId ?? "", level: j.level, topicIds: j.topicIds ?? [] });
    setParsedNote(
      j.source === "ai"
        ? "Extracted from the description. Review every field below; you can change anything before saving."
        : "Extracted with simple keyword matching (no AI key configured). It may be wrong, so review and correct each field before saving.",
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch("/api/target", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...v, companyId: v.companyId || null, roleId: v.roleId || null }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setSaving(false);
      return setError(j.error ?? "Could not save.");
    }
    router.push("/");
    router.refresh();
  }

  const toggle = (id: string) => setV((s) => ({ ...s, topicIds: s.topicIds.includes(id) ? s.topicIds.filter((x) => x !== id) : [...s.topicIds, id] }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <section className="card h-fit p-5" aria-labelledby="jd-h">
        <h2 id="jd-h" className="text-xl">Paste a job description</h2>
        <p className="mt-1 text-sm text-muted">Optional. We pull out a likely discipline, role, company, level and topics. The text is treated as data only and is never followed as instructions.</p>
        <label className="label mt-4" htmlFor="jd">Job description</label>
        <textarea id="jd" value={jd} onChange={(e) => setJd(e.target.value)} rows={9} maxLength={20000} className="input" placeholder="Paste the posting text here" />
        <button type="button" className="btn mt-3" disabled={parsing || jd.trim().length < 40} onClick={extract}>
          {parsing ? "Reading…" : "Extract target"}
        </button>
        {parsedNote && <p className="mt-3 rounded-[4px] bg-accent-soft px-3 py-2 text-sm text-accent" role="status">{parsedNote}</p>}
      </section>

      <form onSubmit={save} className="card space-y-4 p-5" aria-labelledby="t-h">
        <h2 id="t-h" className="text-xl">Your target</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="d">Discipline</label>
            <select id="d" required className="input" value={v.disciplineId} onChange={(e) => setV({ ...v, disciplineId: e.target.value, topicIds: [] })}>
              <option value="" disabled>Choose…</option>
              {disciplines.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="l">Experience level</label>
            <select id="l" className="input" value={v.level} onChange={(e) => setV({ ...v, level: e.target.value })}>
              {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="c">Target company (optional)</label>
            <select id="c" className="input" value={v.companyId} onChange={(e) => setV({ ...v, companyId: e.target.value })}>
              <option value="">No specific company</option>
              {companies.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="r">Role (optional)</label>
            <select id="r" className="input" value={v.roleId} onChange={(e) => setV({ ...v, roleId: e.target.value })}>
              <option value="">Any role</option>
              {roles.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <fieldset>
          <legend className="label">Focus topics</legend>
          {visibleTopics.length === 0 ? (
            <p className="text-sm text-muted">Choose a discipline to see its topics.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {visibleTopics.map((t) => (
                <label key={t.id} className={`cursor-pointer rounded-[3px] border px-2.5 py-1 text-[13px] ${v.topicIds.includes(t.id) ? "border-accent bg-accent-soft text-accent" : "border-line bg-white text-muted"}`}>
                  <input type="checkbox" className="sr-only" checked={v.topicIds.includes(t.id)} onChange={() => toggle(t.id)} />
                  {t.name}
                </label>
              ))}
            </div>
          )}
        </fieldset>
        {error && <p role="alert" className="rounded-[4px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
        <button className="btn btn-primary" disabled={saving || !v.disciplineId}>{saving ? "Saving…" : "Save target"}</button>
        <p className="text-xs text-muted">No resume is needed. Company selection only boosts questions the owner has reviewed for that company, and is not a claim that the company asks them.</p>
      </form>
    </div>
  );
}
