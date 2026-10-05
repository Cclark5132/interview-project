import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerWorkspace } from "@/components/AnswerWorkspace";
import { difficultyName } from "@/components/QuestionCard";
import { EVIDENCE_CATEGORIES } from "@/content/taxonomy";
import { requireUser } from "@/server/session";
import { getPublicQuestion } from "@/server/questions";
import { getRevealedIdeal, listAttempts } from "@/server/attempts";

export const metadata = { title: "Question" };

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(`/questions/${id}`);
  const q = await getPublicQuestion(user.id, id);
  if (!q) notFound();
  const [attempts, ideal] = await Promise.all([listAttempts(user.id, id), getRevealedIdeal(user.id, id)]);
  const evidence = EVIDENCE_CATEGORIES.find((e) => e.id === q.evidenceCategory)?.name ?? q.evidenceCategory;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <Link href="/library" className="font-mono text-[11px] uppercase tracking-[0.09em] text-muted hover:text-ink">← Library</Link>
          <Link href="/practice" className="font-mono text-[11px] uppercase tracking-[0.09em] text-accent hover:underline">Skip to next →</Link>
        </div>
        <h1 className="mt-3 text-[40px] leading-[1.05]">{q.title}</h1>
      </div>

      <dl className="card grid grid-cols-2 divide-x divide-y divide-line overflow-hidden sm:grid-cols-4 sm:divide-y-0">
        {[
          ["Discipline", q.disciplineName],
          ["Level", difficultyName(q.difficulty)],
          ["Rubric", `REV ${q.rubricVersion}`],
          ["Source", evidence],
        ].map(([k, v]) => (
          <div key={k} className="px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-muted">{k}</dt>
            <dd className="mt-0.5 text-[14px] font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Question" className="border-y border-line py-7">
        <p className="whitespace-pre-wrap text-[21px] leading-[1.45] tracking-[-0.005em]">{q.prompt}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {q.topics.map((t) => <span key={t.id} className="badge">{t.name}</span>)}
          {q.labels.map((l) => <span key={l.text} className={`badge ${l.tone === "match" ? "badge-accent" : ""}`}>{l.text}</span>)}
        </div>
      </section>

      <details className="card group text-sm">
        <summary className="cursor-pointer list-none px-4 py-3 font-medium after:float-right after:font-mono after:text-muted after:content-['+'] group-open:after:content-['–']">How this is scored</summary>
        <div className="border-t border-line px-4 py-4">
          <ul className="divide-y divide-line">
            {q.rubric.map((c) => (
              <li key={c.id} className="grid gap-x-4 py-2.5 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-[13px] tabular-nums">{c.weight}</span>
                <div>
                  <span className="font-medium">{c.name}</span>
                  <div className="text-muted">{c.description}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
            Scores cover the content of your answer, not accent, confidence or pace. Provenance: {q.sourceNote || "not stated"}
          </p>
        </div>
      </details>

      <AnswerWorkspace questionId={q.id} initialAttempts={attempts} initialIdeal={ideal} initialBookmarked={q.bookmarked} />
    </div>
  );
}
