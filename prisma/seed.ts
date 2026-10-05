import "dotenv/config";
import { randomBytes } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { SEED_QUESTIONS, buildRubric } from "../src/content/seed-questions";
import { BANK } from "../src/content/bank";
import { syncTaxonomy } from "./taxonomy";

const DEMO_USER_EMAIL = "demo@interview-project.local";
const DEMO_ADMIN_EMAIL = "admin@interview-project.local";

async function main() {
  // `--production` bootstraps a real deployment: taxonomy, draft questions, and ONE owner/admin account from
  // ADMIN_EMAIL + ADMIN_PASSWORD. Demo accounts are local development only and are never created in production.
  const production = process.argv.includes("--production");
  if (process.env.NODE_ENV === "production" && !production) {
    throw new Error("Refusing to create demo accounts in production. Use `npm run db:bootstrap`.");
  }
  const connectionString = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5433/interview";
  const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    await syncTaxonomy(db);

    // Demo accounts: local development only. Passwords come from env or are generated and printed once.
    const printed: string[] = [];
    if (production) {
      const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      const password = process.env.ADMIN_PASSWORD;
      const owner = email ? await db.user.findUnique({ where: { email } }) : null;
      if (owner?.role === "ADMIN" && !password) console.log(`Owner already exists: ${email} (password unchanged)`);
      else {
      if (!email || !password || password.length < 12) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (12+ characters) to bootstrap the owner account.");
      const passwordHash = await bcrypt.hash(password, 12);
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) await db.user.update({ where: { email }, data: { passwordHash, role: "ADMIN" } });
      else await db.user.create({ data: { email, name: "Owner", role: "ADMIN", passwordHash } });
      console.log(`Owner account ready: ${email}`);
      }
    }
    for (const [email, name, role, envKey] of production
      ? []
      : ([
          [DEMO_USER_EMAIL, "Demo User", "USER", "DEMO_USER_PASSWORD"],
          [DEMO_ADMIN_EMAIL, "Demo Admin (owner)", "ADMIN", "DEMO_ADMIN_PASSWORD"],
        ] as const)) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing && !process.argv.includes("--reset-demo-passwords")) continue;
      const password = process.env[envKey] || randomBytes(9).toString("base64url");
      const passwordHash = await bcrypt.hash(password, 12);
      if (existing) await db.user.update({ where: { email }, data: { passwordHash } });
      else await db.user.create({ data: { email, name, role, passwordHash } });
      printed.push(process.env[envKey] ? `${email}  (password from ${envKey})` : `${email}  password: ${password}`);
    }

    // Sample questions are ORIGINAL drafts. They are never auto-approved; the owner approves them in /admin.
    let created = 0;
    const ALL = [...SEED_QUESTIONS, ...BANK];
    for (const q of ALL) {
      const exists = await db.question.findFirst({ where: { title: q.title, evidenceCategory: "original" } });
      if (exists) continue;
      const rubric = buildRubric(q);
      const total = rubric.reduce((s, c) => s + c.weight, 0);
      if (total !== 100) throw new Error(`Seed rubric for "${q.title}" totals ${total}`);
      const row = await db.question.create({
        data: {
          title: q.title,
          prompt: q.prompt,
          disciplineId: q.discipline,
          difficulty: q.difficulty,
          evidenceCategory: "original",
          sourceNote: "Original practice question drafted for this project with AI assistance. Not owner-reviewed. Not company-reported material.",
          idealAnswer: q.ideal,
          status: "draft",
          topics: { create: q.topics.map((topicId) => ({ topicId })) },
          roles: { create: q.roles.map((roleId) => ({ roleId })) },
          // Role-relevance only. Never a claim that the company asked this question.
          companies: { create: (q.companies ?? []).map((companyId) => ({ companyId, evidence: "role_relevant", reviewed: false })) },
        },
      });
      await db.rubric.create({ data: { questionId: row.id, version: 1, criteria: JSON.stringify(rubric) } });
      created++;
    }

    console.log(`Taxonomy synced. ${created} draft question(s) created (${ALL.length} total in the bank).`);
    if (printed.length) {
      console.log("\nLocal demo accounts (development only; shown once):");
      for (const p of printed) console.log("  " + p);
    } else if (!production) {
      console.log("Demo accounts already exist; passwords unchanged.");
    }
    console.log("\nAll sample questions are drafts. Sign in as the admin and approve them in /admin to publish.");
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
