import Link from "next/link";
import { Landing } from "@/components/Landing";
import { QuestionCard } from "@/components/QuestionCard";
import { currentUser } from "@/server/session";
import { getTarget, recommend, searchLibrary, type LibraryFilters } from "@/server/questions";
import { getTaxonomy } from "@/server/taxonomy";
import { db } from "@/lib/db";
import { DIFFICULTIES } from "@/content/taxonomy";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function LibraryPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await currentUser();
  if (!user) return <Landing />;
  const sp = await searchParams;
  const filters: LibraryFilters = {
    q: one(sp.q),
    disciplineId: one(sp.discipline),
    companyId: one(sp.company),
    roleId: one(sp.role),
    topicId: one(sp.topic),
    difficulty: one(sp.difficulty) ? Number(one(sp.difficulty)) : undefined,
    progress: (one(sp.progress) as LibraryFilters["progress"]) || undefined,
    bookmarked: one(sp.bookmarked) === "1",
  };
  const filtered = Object.values(filters).some(Boolean);
  const [tax, target, results, recs, totals] = await Promise.all([
    getTaxonomy(),
    getTarget(user.id),
    searchLibrary(user.id, filters),
    filtered ? Promise.resolve([]) : recommend(user.id, 4),
    db.question.groupBy({ by: ["disciplineId"], where: { status: "approved" }, _count: true }),
  ]);
  const totalApproved = totals.reduce((s, t) => s + t._count, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <form action="/" method="get" className="space-y-4">
          <div>
            <label className="label" htmlFor="q">Search</label>
            <input id="q" name="q" defaultValue={filters.q} placeholder="Title, prompt, topic" className="input" />
          </div>
          <Select id="discipline" label="Discipline" value={filters.disciplineId} options={tax.disciplines} all="All" />
          <Select id="company" label="Company relevance" value={filters.companyId} options={tax.companies} all="Any" />
          <Select id="role" label="Role" value={filters.roleId} options={tax.roles} all="Any" />
          <Select id="topic" label="Topic" value={filters.topicId} options={tax.topics} all="Any" />
          <Select id="difficulty" label="Difficulty" value={filters.difficulty ? String(filters.difficulty) : undefined} options={DIFFICULTIES.map((d) => ({ id: String(d.id), name: d.name }))} all="Any" />
          <Select id="progress" label="Status" value={filters.progress} options={[{ id: "unanswered", name: "Unanswered" }, { id: "answered", name: "Answered" }]} all="All" />
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" name="bookmarked" value="1" defaultChecked={filters.bookmarked} className="size-4 accent-[var(--accent)]" />
            Saved only
          </label>
          <div className="flex gap-2">
            <button className="btn btn-primary flex-1">Apply</button>
            {filtered && <Link href="/" className="btn">Clear</Link>}
          </div>
        </form>
      </aside>

      <div className="min-w-0 space-y-12">
        <header>
          <h1 className="text-4xl">Library</h1>
          <p className="mt-2 max-w-xl text-[14.5px] text-muted">
            {totalApproved === 0
              ? "No questions are published yet."
              : `${totalApproved} reviewed question${totalApproved > 1 ? "s" : ""} across ${totals.length} discipline${totals.length > 1 ? "s" : ""}. Coverage is limited and does not yet include every role or company.`}
          </p>
          {user.role === "ADMIN" && totalApproved === 0 && (
            <p className="mt-4 border-l-2 border-warn bg-warn-soft px-3 py-2 text-sm text-warn">
              Sample questions are loaded as drafts. <Link href="/admin" className="font-medium underline">Review and approve them</Link> to publish.
            </p>
          )}
        </header>

        {!filtered && (
          <section aria-labelledby="rec">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 id="rec" className="text-2xl">Recommended</h2>
              <Link href="/onboarding" className="font-mono text-[11px] uppercase tracking-[0.09em] text-accent hover:underline">Edit target</Link>
            </div>
            {!target ? (
              <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
                <p className="max-w-md text-sm text-muted">Set your discipline, company, role and level, or paste a job posting, to rank questions for you.</p>
                <Link href="/onboarding" className="btn btn-primary">Set your target</Link>
              </div>
            ) : recs.length === 0 ? (
              <div className="card p-5 text-sm text-muted">
                No published questions match your target yet. Browse the full list below or adjust your target.
              </div>
            ) : (
              <ul className="card divide-y divide-line overflow-hidden">
                {recs.map((q, i) => (
                  <QuestionCard key={q.id} q={q} highlight index={i + 1} />
                ))}
              </ul>
            )}
          </section>
        )}

        <section aria-labelledby="bank">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 id="bank" className="text-2xl">{filtered ? "Results" : "All questions"}</h2>
            <span className="font-mono text-[11px] text-muted" aria-live="polite">{results.length} shown</span>
          </div>
          {results.length === 0 ? (
            <div className="card p-6 text-sm text-muted">
              {totalApproved === 0
                ? "The bank is empty. Questions appear here only after the owner approves them."
                : "Nothing matches these filters. Remove one to widen the list. Some role and company combinations have no questions yet."}
            </div>
          ) : (
            <ul className="card divide-y divide-line overflow-hidden">
              {results.map((q) => <QuestionCard key={q.id} q={q} />)}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Select({ id, label, value, options, all }: { id: string; label: string; value?: string; options: { id: string; name: string }[]; all: string }) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <select id={id} name={id} defaultValue={value ?? ""} className="input">
        <option value="">{all}</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
    </div>
  );
}
