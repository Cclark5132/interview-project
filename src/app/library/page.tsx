import Link from "next/link";
import { LibraryFilters as FilterPanel } from "@/components/LibraryFilters";
import { QuestionCard } from "@/components/QuestionCard";
import { requireUser } from "@/server/session";
import { getTarget, recommend, searchLibrary, type LibraryFilters } from "@/server/questions";
import { getTaxonomy } from "@/server/taxonomy";
import { db } from "@/lib/db";
import { DIFFICULTIES } from "@/content/taxonomy";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function LibraryPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireUser("/library");
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
        <FilterPanel
          filtered={filtered}
          values={{ q: filters.q, discipline: filters.disciplineId, company: filters.companyId, role: filters.roleId, topic: filters.topicId, difficulty: filters.difficulty ? String(filters.difficulty) : undefined, progress: filters.progress, bookmarked: filters.bookmarked }}
          disciplines={tax.disciplines.map((d) => ({ id: d.id, name: d.name }))}
          topics={tax.topics.map((t) => ({ id: t.id, name: t.name, disciplineId: t.disciplineId }))}
          roles={tax.roles.map((r) => ({ id: r.id, name: r.name, disciplineIds: r.disciplineIds }))}
          companies={tax.companies.map((c) => ({ id: c.id, name: c.name, disciplineIds: c.disciplineIds }))}
          difficulties={DIFFICULTIES.map((d) => ({ id: String(d.id), name: d.name }))}
        />
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
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.09em] text-accent hover:underline">Edit target</Link>
            </div>
            {!target ? (
              <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
                <p className="max-w-md text-sm text-muted">Set your discipline, company, role and level, or paste a job posting, to rank questions for you.</p>
                <Link href="/" className="btn btn-primary">Set your target</Link>
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
