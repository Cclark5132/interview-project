import { redirect } from "next/navigation";
import { requireUser } from "@/server/session";
import { getTarget, recommend } from "@/server/questions";

/** The practice loop: jump straight to the best next question for the user's target. */
export default async function PracticePage() {
  const user = await requireUser("/practice");
  if (!(await getTarget(user.id))) redirect("/");
  const recs = await recommend(user.id, 25);
  const next = recs.find((q) => q.attemptCount === 0) ?? recs[0];
  redirect(next ? `/questions/${next.id}` : "/library");
}
