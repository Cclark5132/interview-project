import { z } from "zod";
import { db } from "@/lib/db";
import { parseJobDescription, MAX_JD_CHARS, type JdCache } from "@/lib/jd-parser";
import { HttpError } from "./access";

export const targetInputSchema = z.object({
  disciplineId: z.string().min(2),
  companyId: z.string().nullish(),
  roleId: z.string().nullish(),
  level: z.enum(["intern", "entry", "mid", "senior"]),
  topicIds: z.array(z.string()).max(12).default([]),
});

export async function saveTarget(userId: string, raw: unknown) {
  const input = targetInputSchema.parse(raw);
  const [d, topics, company, role] = await Promise.all([
    db.discipline.findUnique({ where: { id: input.disciplineId } }),
    db.topic.findMany({ where: { id: { in: input.topicIds } }, select: { id: true } }),
    input.companyId ? db.company.findUnique({ where: { id: input.companyId } }) : null,
    input.roleId ? db.role.findUnique({ where: { id: input.roleId } }) : null,
  ]);
  if (!d) throw new HttpError(400, "Unknown discipline");
  if (input.companyId && !company) throw new HttpError(400, "Unknown company");
  if (input.roleId && !role) throw new HttpError(400, "Unknown role");
  const ids = topics.map((t) => t.id);
  const data = {
    disciplineId: input.disciplineId,
    companyId: input.companyId || null,
    roleId: input.roleId || null,
    level: input.level,
    skills: JSON.stringify(ids),
    focusTopics: JSON.stringify(ids),
  };
  await db.userTarget.upsert({ where: { userId }, create: { userId, ...data }, update: data });
  return { ok: true };
}

const dbCache: JdCache = {
  async get(hash) {
    return (await db.jobParseCache.findUnique({ where: { hash } }))?.result ?? null;
  },
  async set(hash, result, source) {
    await db.jobParseCache.upsert({ where: { hash }, create: { hash, result, source }, update: { result, source } });
  },
};

export async function parseJd(text: string) {
  const t = text.trim();
  if (t.length < 40) throw new HttpError(400, "Paste a longer job description (at least 40 characters).");
  if (t.length > MAX_JD_CHARS) throw new HttpError(400, `Job description is too long (max ${MAX_JD_CHARS} characters).`);
  return parseJobDescription(t, dbCache);
}
