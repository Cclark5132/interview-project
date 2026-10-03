import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerWorkspace } from "@/components/AnswerWorkspace";
import { difficultyName } from "@/components/QuestionCard";
import { requireUser } from "@/server/session";
import { getPublicQuestion } from "@/server/questions";
import { getRevealedIdeal, listAttempts } from "@/server/attempts";

export const metadata = { title: "Question" };

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const q = await getPublicQuestion(user.id, id);
  if (!q) notFound();
  const [attempts, ideal] = await Promise.all([listAttempts(user.id, id), getRevealedIdeal(user.id, id)]);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-sm text-muted hover:text-ink">← Library</Link>
        <h1 className="mt-2 text-3xl">{q.title}</h1>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="badge">{q.disciplineName}</span>
          <span className="badge">{difficultyName(q.difficulty)}</span>
          {q.topics.map((t) => <span key={t.id} className="badge">{t.name}</span>)}
          {q.labels.map((l) => <span key={l.text} className={`badge ${l.tone === "match" ? "badge-accent" : ""}`}>{l.text}</span>)}
        </div>
      </div>

      <section className="card p-5 sm:p-6" aria-label="Question">
        <p className="whitespace-pre-wrap text-lg leading-relaxed">{q.prompt}</p>
      </section>

      <details className="card p-4 text-sm">
        <summary className="cursor-pointer font-medium">How this will be graded</summary>
        <ul className="mt-3 space-y-2">
          {q.rubric.map((c) => (
            <li key={c.id}>
              <span className="font-medium">{c.name}</span> <span className="text-muted">· {c.weight}%</span>
              <div className="text-muted">{c.description}</div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          Rubric version {q.rubricVersion}. Answers are evaluated automatically; the content of your answer is graded, not accent, confidence, or pace. Provenance: {q.sourceNote || "not stated"}
        </p>
      </details>

      <AnswerWorkspace questionId={q.id} initialAttempts={attempts} initialIdeal={ideal} initialBookmarked={q.bookmarked} />
    </div>
  );
}
