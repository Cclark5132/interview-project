"use client";

import Link from "next/link";
import { useState } from "react";

type Opt = { id: string; name: string };
type Fit = Opt & { disciplineIds: string[] };
type Topic = Opt & { disciplineId: string };
type Values = { q?: string; discipline?: string; company?: string; role?: string; topic?: string; difficulty?: string; progress?: string; bookmarked?: boolean };

/** Sidebar filters. Topic, role and company options narrow to the chosen discipline. */
export function LibraryFilters({
  values,
  filtered,
  disciplines,
  topics,
  roles,
  companies,
  difficulties,
}: {
  values: Values;
  filtered: boolean;
  disciplines: Opt[];
  topics: Topic[];
  roles: Fit[];
  companies: Fit[];
  difficulties: Opt[];
}) {
  const [v, setV] = useState({ discipline: values.discipline ?? "", company: values.company ?? "", role: values.role ?? "", topic: values.topic ?? "" });
  const d = v.discipline;
  const keep = (list: Fit[], current: string) => list.filter((o) => !d || o.disciplineIds.includes(d) || o.id === current);

  function chooseDiscipline(next: string) {
    setV({
      discipline: next,
      topic: !next || topics.find((t) => t.id === v.topic)?.disciplineId === next ? v.topic : "",
      role: !next || roles.find((r) => r.id === v.role)?.disciplineIds.includes(next) ? v.role : "",
      company: !next || companies.find((c) => c.id === v.company)?.disciplineIds.includes(next) ? v.company : "",
    });
  }

  return (
    <form action="/library" method="get" className="space-y-4">
      <div>
        <label className="label" htmlFor="q">Search</label>
        <input id="q" name="q" defaultValue={values.q} placeholder="Title, prompt, topic" className="input" />
      </div>
      <Field id="discipline" label="Discipline" value={v.discipline} onChange={chooseDiscipline} all="All" options={disciplines} />
      <Field id="topic" label="Topic" value={v.topic} onChange={(x) => setV({ ...v, topic: x })} all="Any" options={topics.filter((t) => !d || t.disciplineId === d || t.id === v.topic)} />
      <Field id="role" label="Role" value={v.role} onChange={(x) => setV({ ...v, role: x })} all="Any" options={keep(roles, v.role)} />
      <Field id="company" label="Company relevance" value={v.company} onChange={(x) => setV({ ...v, company: x })} all="Any" options={keep(companies, v.company)} />
      <div>
        <label className="label" htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty" defaultValue={values.difficulty ?? ""} className="input">
          <option value="">Any</option>
          {difficulties.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="progress">Status</label>
        <select id="progress" name="progress" defaultValue={values.progress ?? ""} className="input">
          <option value="">All</option>
          <option value="unanswered">Unanswered</option>
          <option value="answered">Answered</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-[13px]">
        <input type="checkbox" name="bookmarked" value="1" defaultChecked={values.bookmarked} className="size-4 accent-[var(--accent)]" />
        Saved only
      </label>
      <div className="flex gap-2">
        <button className="btn btn-primary flex-1">Apply</button>
        {filtered && <Link href="/library" className="btn">Clear</Link>}
      </div>
    </form>
  );
}

function Field({ id, label, value, onChange, all, options }: { id: string; label: string; value: string; onChange: (v: string) => void; all: string; options: Opt[] }) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value} onChange={(e) => onChange(e.target.value)} className="input">
        <option value="">{all}</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
    </div>
  );
}
