import { db } from "@/lib/db";

export async function getTaxonomy() {
  const [disciplines, topics, roles, companies] = await Promise.all([
    db.discipline.findMany({ orderBy: [{ family: "asc" }, { name: "asc" }] }),
    db.topic.findMany({ orderBy: { name: "asc" } }),
    db.role.findMany({ orderBy: { name: "asc" } }),
    db.company.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { disciplines, topics, roles, companies };
}
export type Taxonomy = Awaited<ReturnType<typeof getTaxonomy>>;
