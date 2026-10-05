import { OnboardingForm } from "@/components/OnboardingForm";
import { db } from "@/lib/db";
import { currentUser } from "@/server/session";
import { getTarget } from "@/server/questions";
import { getTaxonomy } from "@/server/taxonomy";

export const metadata = { title: "Start practicing" };

/** First page for everyone: pick a target, see the live count, start. Visitors get a guest session on Start. */
export default async function HomePage() {
  const user = await currentUser();
  const [tax, target, grouped] = await Promise.all([
    getTaxonomy(),
    user ? getTarget(user.id) : null,
    db.question.groupBy({ by: ["disciplineId"], where: { status: "approved" }, _count: true }),
  ]);
  const counts = Object.fromEntries(grouped.map((g) => [g.disciplineId, g._count]));
  return (
    <div className="mx-auto max-w-6xl">
      <p className="rise font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Engineering, computing, finance and consulting interview practice</p>
      <h1 className="rise mt-3 text-[44px] leading-[1.02] sm:text-[60px]" style={{ "--i": 1 } as React.CSSProperties}>What are you interviewing for?</h1>
      <p className="rise mb-10 mt-4 max-w-xl text-[16px] leading-relaxed text-muted" style={{ "--i": 2 } as React.CSSProperties}>
        Pick your discipline, narrow it if you like, and start. Each question is scored against a rubric you can read, and retries keep every attempt.
      </p>
      <OnboardingForm
        hasTarget={Boolean(target)}
        counts={counts}
        disciplines={tax.disciplines.map((d) => ({ id: d.id, name: d.name, family: d.family }))}
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
