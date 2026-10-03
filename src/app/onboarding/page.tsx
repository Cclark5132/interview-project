import { OnboardingForm } from "@/components/OnboardingForm";
import { requireUser } from "@/server/session";
import { getTaxonomy } from "@/server/taxonomy";
import { getTarget } from "@/server/questions";

export const metadata = { title: "Your target" };

export default async function OnboardingPage() {
  const user = await requireUser();
  const [tax, target] = await Promise.all([getTaxonomy(), getTarget(user.id)]);
  return (
    <div>
      <h1 className="text-3xl">Set your practice target</h1>
      <p className="mb-6 mt-1 text-muted">Questions are ranked by how well they match this. You can change it any time.</p>
      <OnboardingForm
        disciplines={tax.disciplines.map((d) => ({ id: d.id, name: d.name }))}
        topics={tax.topics.map((t) => ({ id: t.id, name: t.name, disciplineId: t.disciplineId }))}
        roles={tax.roles.map((d) => ({ id: d.id, name: d.name }))}
        companies={tax.companies.map((d) => ({ id: d.id, name: d.name }))}
        initial={{
          disciplineId: target?.disciplineId ?? "",
          companyId: target?.companyId ?? "",
          roleId: target?.roleId ?? "",
          level: target?.level ?? "entry",
          topicIds: target?.focusTopics ?? [],
        }}
      />
    </div>
  );
}
