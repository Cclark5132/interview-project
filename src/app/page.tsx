import { OnboardingForm } from "@/components/OnboardingForm";
import { currentUser } from "@/server/session";
import { getTarget } from "@/server/questions";
import { getTaxonomy } from "@/server/taxonomy";

export const metadata = { title: "Set your target" };

/** First page for everyone: pick a target. Visitors get an anonymous session when they save. */
export default async function HomePage() {
  const user = await currentUser();
  const [tax, target] = await Promise.all([getTaxonomy(), user ? getTarget(user.id) : null]);
  return (
    <div className="mx-auto max-w-5xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Engineering and computing interview practice</p>
      <h1 className="mt-3 text-[40px] leading-[1.05] sm:text-[52px]">Set your target.</h1>
      <p className="mb-8 mt-3 max-w-xl text-[16px] leading-relaxed text-muted">
        Choose a discipline and the role, company and topic options narrow to match. Questions are ranked for that target and each one says why it was picked.
      </p>
      <OnboardingForm
        hasTarget={Boolean(target)}
        disciplines={tax.disciplines.map((d) => ({ id: d.id, name: d.name }))}
        topics={tax.topics.map((t) => ({ id: t.id, name: t.name, disciplineId: t.disciplineId }))}
        roles={tax.roles.map((r) => ({ id: r.id, name: r.name, disciplineIds: r.disciplineIds }))}
        companies={tax.companies.map((c) => ({ id: c.id, name: c.name, disciplineIds: c.disciplineIds }))}
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
