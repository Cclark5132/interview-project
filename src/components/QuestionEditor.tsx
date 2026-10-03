"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DIFFICULTIES, EVIDENCE_CATEGORIES } from "@/content/taxonomy";

type Opt = { id: string; name: string };
type CompanyRef = { companyId: string; evidence: "role_relevant" | "company_reported"; sourceUrl: string };
type Criterion = {
  id: string;
  name: string;
  weight: number;
  description: string;
  anchors: { low: string; mid: string; high: string };
  expectedConcepts: string;
  alternatives: string;
  misconceptions: string;
};
export type EditorValue = {
  title: string;
  prompt: string;
  disciplineId: string;
  difficulty: number;
  topicIds: string[];
  roleIds: string[];
  companies: CompanyRef[];
  evidenceCategory: string;
  sourceNote: string;
  sourceUrl: string;
  idealAnswer: string;
  rubric: Criterion[];
};

export const emptyCriterion = (): Criterion => ({
  id: "",
  name: "",
  weight: 0,
  description: "",
  anchors: { low: "", mid: "", high: "" },
  expectedConcepts: "",
  alternatives: "",
  misconceptions: "",
});

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

export function QuestionEditor({
  id,
  initial,
  disciplines,
  topics,
  roles,
  companies,
  status,
}: {
  id?: string;
  initial: EditorValue;
  disciplines: Opt[];
  topics: (Opt & { disciplineId: string })[];
  roles: Opt[];
  companies: Opt[];
  status?: string;
}) {
  const router = useRouter();
  const [v, setV] = useState<EditorValue>(initial);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const total = v.rubric.reduce((s, c) => s + (Number(c.weight) || 0), 0);
  const visibleTopics = topics.filter((t) => t.disciplineId === v.disciplineId || v.topicIds.includes(t.id));
  const set = <K extends keyof EditorValue>(k: K, val: EditorValue[K]) => setV((s) => ({ ...s, [k]: val }));
  const toggle = (k: "topicIds" | "roleIds", x: string) => set(k, v[k].includes(x) ? v[k].filter((y) => y !== x) : [...v[k], x]);
  const setCrit = (i: number, patch: Partial<Criterion>) => set("rubric", v.rubric.map((c, j) => (j === i ? { ...c, ...patch } : c)));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSaved(null);
    const body = {
      title: v.title,
      prompt: v.prompt,
      disciplineId: v.disciplineId,
      difficulty: Number(v.difficulty),
      topicIds: v.topicIds,
      roleIds: v.roleIds,
      companies: v.companies.filter((c) => c.companyId).map((c) => ({ ...c, sourceUrl: c.sourceUrl || null })),
      evidenceCategory: v.evidenceCategory,
      sourceNote: v.sourceNote,
      sourceUrl: v.sourceUrl || null,
      idealAnswer: v.idealAnswer,
      rubric: v.rubric.length
        ? v.rubric.map((c) => ({
            id: c.id,
            name: c.name,
            weight: Number(c.weight),
            description: c.description,
            anchors: c.anchors,
            expectedConcepts: lines(c.expectedConcepts),
            alternatives: lines(c.alternatives),
            misconceptions: lines(c.misconceptions),
          }))
        : undefined,
    };
    const res = await fetch(id ? `/api/admin/questions/${id}` : "/api/admin/questions", {
      method: id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError([j.error, ...(Array.isArray(j.details) ? j.details.map((d: unknown) => (typeof d === "string" ? d : (d as { message?: string }).message)) : [])].filter(Boolean).join(" — "));
    if (!id) return router.push(`/admin/${j.id}`);
    setSaved(j.rubricVersion > 1 ? `Saved. Published rubric is now version ${j.rubricVersion}; earlier attempts keep the version they were graded with.` : "Saved.");
    router.refresh();
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <section className="card space-y-4 p-5">
        <h2 className="text-xl">Question</h2>
        <div>
          <label className="label" htmlFor="title">Title</label>
          <input id="title" className="input" required minLength={5} value={v.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="prompt">Prompt shown to users</label>
          <textarea id="prompt" className="input" rows={4} required minLength={20} value={v.prompt} onChange={(e) => set("prompt", e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label" htmlFor="disc">Discipline</label>
            <select id="disc" className="input" required value={v.disciplineId} onChange={(e) => setV({ ...v, disciplineId: e.target.value })}>
              <option value="" disabled>Choose…</option>
              {disciplines.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="diff">Difficulty</label>
            <select id="diff" className="input" value={v.difficulty} onChange={(e) => set("difficulty", Number(e.target.value))}>
              {DIFFICULTIES.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="ev">Evidence category</label>
            <select id="ev" className="input" value={v.evidenceCategory} onChange={(e) => set("evidenceCategory", e.target.value)}>
              {EVIDENCE_CATEGORIES.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <fieldset>
          <legend className="label">Topics (at least one)</legend>
          <div className="flex flex-wrap gap-2">
            {visibleTopics.length === 0 && <span className="text-sm text-muted">Choose a discipline first.</span>}
            {visibleTopics.map((t) => (
              <label key={t.id} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${v.topicIds.includes(t.id) ? "border-accent bg-accent-soft text-accent" : "border-line bg-white text-muted"}`}>
                <input type="checkbox" className="sr-only" checked={v.topicIds.includes(t.id)} onChange={() => toggle("topicIds", t.id)} />
                {t.name}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="label">Roles</legend>
          <div className="flex flex-wrap gap-2">
            {roles.map((t) => (
              <label key={t.id} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${v.roleIds.includes(t.id) ? "border-accent bg-accent-soft text-accent" : "border-line bg-white text-muted"}`}>
                <input type="checkbox" className="sr-only" checked={v.roleIds.includes(t.id)} onChange={() => toggle("roleIds", t.id)} />
                {t.name}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="card space-y-3 p-5">
        <h2 className="text-xl">Company associations</h2>
        <p className="text-sm text-muted">Relevance is not proof that a company asked this question. “Company-reported” requires a source URL. Associations become reviewed when you approve the question.</p>
        {v.companies.map((c, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_2fr_auto]">
            <select aria-label="Company" className="input" value={c.companyId} onChange={(e) => set("companies", v.companies.map((x, j) => (j === i ? { ...x, companyId: e.target.value } : x)))}>
              <option value="">Company…</option>
              {companies.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <select aria-label="Evidence" className="input" value={c.evidence} onChange={(e) => set("companies", v.companies.map((x, j) => (j === i ? { ...x, evidence: e.target.value as CompanyRef["evidence"] } : x)))}>
              <option value="role_relevant">Role-relevant</option>
              <option value="company_reported">Company-reported</option>
            </select>
            <input aria-label="Source URL" className="input" placeholder="Source URL (required if reported)" value={c.sourceUrl} onChange={(e) => set("companies", v.companies.map((x, j) => (j === i ? { ...x, sourceUrl: e.target.value } : x)))} />
            <button type="button" className="btn" onClick={() => set("companies", v.companies.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        <button type="button" className="btn" onClick={() => set("companies", [...v.companies, { companyId: "", evidence: "role_relevant", sourceUrl: "" }])}>Add company</button>
      </section>

      <section className="card space-y-4 p-5">
        <h2 className="text-xl">Provenance</h2>
        <div>
          <label className="label" htmlFor="sn">Source note (required to publish)</label>
          <textarea id="sn" className="input" rows={2} value={v.sourceNote} onChange={(e) => set("sourceNote", e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="su">Source URL</label>
          <input id="su" className="input" type="url" value={v.sourceUrl} onChange={(e) => set("sourceUrl", e.target.value)} />
        </div>
      </section>

      <section className="card space-y-4 p-5">
        <h2 className="text-xl">Ideal answer</h2>
        <p className="text-sm text-muted">Stays on the server until a user with at least one attempt explicitly reveals it.</p>
        <textarea aria-label="Ideal answer" className="input" rows={8} value={v.idealAnswer} onChange={(e) => set("idealAnswer", e.target.value)} />
      </section>

      <section className="card space-y-4 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl">Rubric</h2>
          <span className={`text-sm font-medium ${total === 100 ? "text-accent" : "text-danger"}`} role="status">Weights total {total} / 100</span>
        </div>
        {status === "approved" && <p className="rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">This question is published. Changing the rubric creates a new version; past evaluations keep the version they used.</p>}
        {v.rubric.map((c, i) => (
          <fieldset key={i} className="space-y-3 rounded-md border border-line p-4">
            <legend className="px-1 text-sm font-semibold">Criterion {i + 1}</legend>
            <div className="grid gap-3 sm:grid-cols-[1fr_2fr_6rem]">
              <div><label className="label">Id (slug)</label><input className="input" value={c.id} onChange={(e) => setCrit(i, { id: e.target.value })} placeholder="technical-accuracy" /></div>
              <div><label className="label">Name</label><input className="input" value={c.name} onChange={(e) => setCrit(i, { name: e.target.value })} /></div>
              <div><label className="label">Weight</label><input className="input" type="number" min={1} max={100} value={c.weight} onChange={(e) => setCrit(i, { weight: Number(e.target.value) })} /></div>
            </div>
            <div><label className="label">Description</label><textarea className="input" rows={2} value={c.description} onChange={(e) => setCrit(i, { description: e.target.value })} /></div>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["low", "mid", "high"] as const).map((k) => (
                <div key={k}><label className="label">Anchor: {k}</label><textarea className="input" rows={2} value={c.anchors[k]} onChange={(e) => setCrit(i, { anchors: { ...c.anchors, [k]: e.target.value } })} /></div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div><label className="label">Expected concepts (one per line)</label><textarea className="input" rows={4} value={c.expectedConcepts} onChange={(e) => setCrit(i, { expectedConcepts: e.target.value })} /></div>
              <div><label className="label">Acceptable alternatives</label><textarea className="input" rows={4} value={c.alternatives} onChange={(e) => setCrit(i, { alternatives: e.target.value })} /></div>
              <div><label className="label">Common misconceptions</label><textarea className="input" rows={4} value={c.misconceptions} onChange={(e) => setCrit(i, { misconceptions: e.target.value })} /></div>
            </div>
            <button type="button" className="btn btn-danger" onClick={() => set("rubric", v.rubric.filter((_, j) => j !== i))}>Remove criterion</button>
          </fieldset>
        ))}
        <button type="button" className="btn" onClick={() => set("rubric", [...v.rubric, emptyCriterion()])}>Add criterion</button>
      </section>

      {error && <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      {saved && <p role="status" className="rounded-md bg-accent-soft px-3 py-2 text-sm text-accent">{saved}</p>}
      <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : id ? "Save changes" : "Create draft"}</button>
    </form>
  );
}
