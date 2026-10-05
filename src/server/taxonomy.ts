import { db } from "@/lib/db";
import { COMPANIES, ROLES } from "@/content/taxonomy";

export async function getTaxonomy() {
  const [disciplines, topics, roles, companies] = await Promise.all([
    db.discipline.findMany({ orderBy: [{ family: "asc" }, { name: "asc" }] }),
    db.topic.findMany({ orderBy: { name: "asc" } }),
    db.role.findMany({ orderBy: { name: "asc" } }),
    db.company.findMany({ orderBy: { name: "asc" } }),
  ]);
  // Which roles/companies fit which discipline lives in code (src/content/taxonomy.ts); it drives dependent dropdowns.
  const fit = (list: { id: string; disciplines: string[] }[], id: string) => list.find((x) => x.id === id)?.disciplines ?? [];
  return {
    disciplines,
    topics,
    roles: roles.map((r) => ({ ...r, disciplineIds: fit(ROLES, r.id) })),
    companies: companies.map((c) => ({ ...c, disciplineIds: fit(COMPANIES, c.id) })),
  };
}
export type Taxonomy = Awaited<ReturnType<typeof getTaxonomy>>;
