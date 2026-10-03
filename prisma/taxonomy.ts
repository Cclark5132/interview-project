import type { PrismaClient } from "../src/generated/prisma/client";
import { COMPANIES, DISCIPLINES, ROLES, TOPICS } from "../src/content/taxonomy";

/** Idempotent: safe to run on every setup. */
export async function syncTaxonomy(db: PrismaClient) {
  for (const d of DISCIPLINES) await db.discipline.upsert({ where: { id: d.id }, create: d, update: { name: d.name, family: d.family } });
  for (const t of TOPICS) {
    const data = { name: t.name, disciplineId: t.disciplineId };
    await db.topic.upsert({ where: { id: t.id }, create: { id: t.id, ...data }, update: data });
  }
  for (const r of ROLES) await db.role.upsert({ where: { id: r.id }, create: { id: r.id, name: r.name }, update: { name: r.name } });
  for (const c of COMPANIES) await db.company.upsert({ where: { id: c.id }, create: c, update: { name: c.name } });
}
