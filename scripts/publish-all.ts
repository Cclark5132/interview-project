// Owner-run: approves every question that is complete, through the same service the admin panel uses.
// Usage: ADMIN_EMAIL=you@example.com npm run publish:all   (DATABASE_URL points at the target database)
import "dotenv/config";
import { db } from "../src/lib/db";
import { loadActor } from "../src/server/access";
import { publishProblems, transitionQuestion } from "../src/server/admin";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) throw new Error("Set ADMIN_EMAIL to the owner account that approves the questions.");
  const admin = await db.user.findUnique({ where: { email } });
  if (!admin) throw new Error(`No user ${email}`);
  const actor = await loadActor(admin.id);
  const rows = await db.question.findMany({ where: { status: { in: ["draft", "in_review"] } }, include: { topics: true, roles: true, companies: true }, orderBy: { createdAt: "asc" } });
  let ok = 0;
  for (const q of rows) {
    const problems = await publishProblems(q);
    if (problems.length) {
      console.log(`SKIP  ${q.title}: ${problems.join("; ")}`);
      continue;
    }
    if (q.status === "draft") await transitionQuestion(actor, q.id, "in_review");
    await transitionQuestion(actor, q.id, "approved", { confirmApproval: true });
    ok++;
  }
  console.log(`Approved ${ok} of ${rows.length} question(s) as ${email}.`);
  await db.$disconnect();
}
main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
