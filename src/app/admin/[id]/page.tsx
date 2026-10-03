import Link from "next/link";
import { notFound } from "next/navigation";
import { GradingPreview, TransitionBar } from "@/components/AdminActions";
import { QuestionEditor, type EditorValue } from "@/components/QuestionEditor";
import { requireAdminPage } from "@/server/session";
import { getAdminQuestion } from "@/server/admin";
import { getTaxonomy } from "@/server/taxonomy";
import { HttpError } from "@/server/access";

export const metadata = { title: "Edit question" };

export default async function AdminQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const actor = await requireAdminPage();
  const { id } = await params;
  const [data, tax] = await Promise.all([
    getAdminQuestion(actor, id).catch((e) => {
      if (e instanceof HttpError && e.status === 404) return null;
      throw e;
    }),
    getTaxonomy(),
  ]);
  if (!data) notFound();
  const { question: q, rubric, versions, problems } = data;

  const initial: EditorValue = {
    title: q.title,
    prompt: q.prompt,
    disciplineId: q.disciplineId,
    difficulty: q.difficulty,
    topicIds: q.topics.map((t) => t.topicId),
    roleIds: q.roles.map((t) => t.roleId),
    companies: q.companies.map((c) => ({ companyId: c.companyId, evidence: c.evidence as "role_relevant" | "company_reported", sourceUrl: c.sourceUrl ?? "" })),
    evidenceCategory: q.evidenceCategory,
    sourceNote: q.sourceNote,
    sourceUrl: q.sourceUrl ?? "",
    idealAnswer: q.idealAnswer,
    rubric: rubric.map((c) => ({
      ...c,
      expectedConcepts: c.expectedConcepts.join("\n"),
      alternatives: c.alternatives.join("\n"),
      misconceptions: c.misconceptions.join("\n"),
    })),
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-muted hover:text-ink">← Owner review</Link>
        <h1 className="mt-2 text-3xl">{q.title}</h1>
        <p className="text-sm text-muted">
          Rubric version {q.rubricVersion} of {versions.length}
          {q.approvedAt ? ` · approved ${q.approvedAt.toLocaleDateString()}` : ""} · updated {q.updatedAt.toLocaleDateString()}
        </p>
      </div>
      <TransitionBar id={q.id} status={q.status} problems={problems} />
      {q.status === "archived" ? (
        <p className="card p-5 text-sm text-muted">Archived questions are read-only. Restore to draft to edit.</p>
      ) : (
        <QuestionEditor id={q.id} status={q.status} initial={initial} disciplines={tax.disciplines} topics={tax.topics} roles={tax.roles} companies={tax.companies} />
      )}
      <GradingPreview id={q.id} />
    </div>
  );
}
