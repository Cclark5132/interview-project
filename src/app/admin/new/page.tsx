import Link from "next/link";
import { QuestionEditor, emptyCriterion } from "@/components/QuestionEditor";
import { requireAdminPage } from "@/server/session";
import { getTaxonomy } from "@/server/taxonomy";

export const metadata = { title: "New question" };

export default async function NewQuestionPage() {
  await requireAdminPage();
  const tax = await getTaxonomy();
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-muted hover:text-ink">← Owner review</Link>
        <h1 className="mt-2 text-3xl">New question</h1>
      </div>
      <QuestionEditor
        disciplines={tax.disciplines}
        topics={tax.topics}
        roles={tax.roles}
        companies={tax.companies}
        initial={{
          title: "",
          prompt: "",
          disciplineId: "",
          difficulty: 2,
          topicIds: [],
          roleIds: [],
          companies: [],
          evidenceCategory: "original",
          sourceNote: "",
          sourceUrl: "",
          idealAnswer: "",
          rubric: [emptyCriterion(), emptyCriterion()],
        }}
      />
    </div>
  );
}
