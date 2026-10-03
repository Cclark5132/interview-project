import Link from "next/link";
import { brand } from "@/lib/brand";
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
  const select = "input";

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl">Practice library</h1>
        <p className="mt-1 text-muted">
          {totalApproved === 0
            ? "No questions are published yet."
            : `${totalApproved} reviewed question${totalApproved > 1 ? "s" : ""} across ${totals.length} discipline${totals.length > 1 ? "s" : ""}. Coverage is still limited and does not yet include every role or company.`}
        </p>
        {user.role === "ADMIN" && totalApproved === 0 && (
          <p className="mt-3 rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
            Sample questions are loaded as drafts. <Link href="/admin" className="underline">Review and approve them</Link> to publish.
          </p>
        )}
      </section>

      {!filtered && (
        <section aria-labelledby="rec">
          <h2 id="rec" className="mb-3 text-xl">Recommended for you</h2>
          {!target ? (
            <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="text-sm text-muted">Set your discipline, target company, role and level, or paste a job description, to get questions ranked for you.</p>
              <Link href="/onboarding" className="btn btn-primary">Set your target</Link>
            </div>
          ) : recs.length === 0 ? (
            <div className="card p-5 text-sm text-muted">
              No published questions match your target yet. Browse the full library below, or adjust your target. Coverage is limited and grows as new questions are reviewed.
            </div>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {recs.map((q) => (
                <QuestionCard key={q.id} q={q} highlight />
              ))}
            </ul>
          )}
        </section>
      )}

      <section aria-labelledby="bank">
        <h2 id="bank" className="mb-3 text-xl">Question bank</h2>
        <form className="card mb-4 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4" action="/" method="get">
          <div className="sm:col-span-2 lg:col-span-4">
            <label className="label" htmlFor="q">Search</label>
            <input id="q" name="q" defaultValue={filters.q} placeholder="Title, prompt, or topic" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="discipline">Discipline</label>
            <select id="discipline" name="discipline" defaultValue={filters.disciplineId ?? ""} className={select}>
              <option value="">All</option>
              {tax.disciplines.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="company">Company relevance</label>
            <select id="company" name="company" defaultValue={filters.companyId ?? ""} className={select}>
              <option value="">Any</option>
              {tax.companies.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="role">Role</label>
            <select id="role" name="role" defaultValue={filters.roleId ?? ""} className={select}>
              <option value="">Any</option>
              {tax.roles.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="topic">Topic</label>
            <select id="topic" name="topic" defaultValue={filters.topicId ?? ""} className={select}>
              <option value="">Any</option>
              {tax.topics.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty" defaultValue={filters.difficulty ? String(filters.difficulty) : ""} className={select}>
              <option value="">Any</option>
              {DIFFICULTIES.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="progress">Status</label>
            <select id="progress" name="progress" defaultValue={filters.progress ?? ""} className={select}>
              <option value="">All</option>
              <option value="unanswered">Unanswered</option>
              <option value="answered">Answered</option>
            </select>
          </div>
          <label className="flex items-end gap-2 pb-2 text-sm">
            <input type="checkbox" name="bookmarked" value="1" defaultChecked={filters.bookmarked} className="size-4 accent-[var(--accent)]" />
            Bookmarked only
          </label>
          <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
            <button className="btn btn-primary">Apply filters</button>
            {filtered && <Link href="/" className="btn">Clear</Link>}
          </div>
        </form>

        {results.length === 0 ? (
          <div className="card p-6 text-sm text-muted">
            {totalApproved === 0
              ? "The question bank is empty. Questions appear here only after the owner approves them."
              : "No published questions match these filters. Try removing a filter. Coverage is limited, so some role and company combinations have no questions yet."}
          </div>
        ) : (
          <>
            <p className="mb-2 text-sm text-muted" aria-live="polite">{results.length} question{results.length > 1 ? "s" : ""}</p>
            <ul className="grid gap-3">
              {results.map((q) => <QuestionCard key={q.id} q={q} />)}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

function Landing() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="text-4xl leading-tight">{brand.tagline}.</h1>
      <p className="mt-4 text-lg text-muted">
        A curated library of reviewed technical questions. Choose your discipline, target company, role and level, answer in writing or by voice, and get structured feedback against a reviewed rubric.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/register" className="btn btn-primary">Create account</Link>
        <Link href="/login" className="btn">Sign in</Link>
        <Link href="/demo" className="btn">See a demo preview</Link>
      </div>
    </div>
  );
}
