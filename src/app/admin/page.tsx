import Link from "next/link";
import { requireAdminPage } from "@/server/session";
import { listAdminQuestions } from "@/server/admin";
import { getTaxonomy } from "@/server/taxonomy";
import { STATUSES } from "@/content/taxonomy";

export const metadata = { title: "Owner review" };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function AdminPage({ searchParams }: { searchParams: Promise<SP> }) {
  const actor = await requireAdminPage();
  const sp = await searchParams;
  const f = { status: one(sp.status), disciplineId: one(sp.discipline), q: one(sp.q) };
  const [rows, tax] = await Promise.all([listAdminQuestions(actor, f), getTaxonomy()]);
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<string, number>;
  for (const r of rows) counts[r.status]++;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl">Owner review</h1>
          <p className="mt-1 text-muted">Create, import, edit and approve questions. Nothing is visible to users until you approve it.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/import" className="btn">Import JSON/CSV</Link>
          <Link href="/admin/new" className="btn btn-primary">New question</Link>
        </div>
      </div>

      <form className="card grid gap-3 p-4 sm:grid-cols-4" action="/admin" method="get">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="q">Search</label>
          <input id="q" name="q" defaultValue={f.q} className="input" />
        </div>
        <div>
          <label className="label" htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={f.status ?? ""} className="input">
            <option value="">All</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="discipline">Discipline</label>
          <select id="discipline" name="discipline" defaultValue={f.disciplineId ?? ""} className="input">
            <option value="">All</option>
            {tax.disciplines.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2 sm:col-span-4">
          <button className="btn btn-primary">Filter</button>
          <Link href="/admin" className="btn">Clear</Link>
        </div>
      </form>

      <p className="text-sm text-muted">
        {rows.length} shown · {counts.draft} draft · {counts.in_review} in review · {counts.approved} approved · {counts.archived} archived
      </p>

      {rows.length === 0 ? (
        <div className="card p-6 text-sm text-muted">No questions match. Run <code>npm run setup</code> to load the sample drafts, or create one.</div>
      ) : (
        <ul className="card divide-y divide-line">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 p-4">
              <Link href={`/admin/${r.id}`} className="min-w-56 flex-1 font-medium hover:text-accent">{r.title}</Link>
              <span className="text-sm text-muted">{r.discipline.name}</span>
              <span className={`badge ${r.status === "approved" ? "badge-accent" : r.status === "in_review" ? "badge-warn" : ""}`}>{r.status.replace("_", " ")}</span>
              <span className="text-xs text-muted">rubric v{r.rubricVersion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
