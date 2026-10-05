import { notFound, redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { loadActor, type Actor } from "./access";

export async function currentUser() {
  const id = await getSessionUserId();
  if (!id) return null;
  return db.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, role: true } });
}

/** Visitors without a session get an anonymous guest session, then return to `next`. */
export async function requireUser(next = "/") {
  const u = await currentUser();
  if (!u) redirect(`/api/guest?next=${encodeURIComponent(next)}`);
  return u;
}

/** Pages for non-admins respond as if the route does not exist. APIs separately enforce 403. */
export async function requireAdminPage(): Promise<Actor> {
  const u = await currentUser();
  if (!u) redirect("/login");
  const actor = await loadActor(u.id);
  if (actor.role !== "ADMIN") notFound();
  return actor;
}
