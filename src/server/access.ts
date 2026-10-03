import { db } from "@/lib/db";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export type Actor = { id: string; role: string; email: string };

/** Role is always re-read from the database; a stale or forged token claim never grants admin. */
export async function loadActor(userId: string | undefined | null): Promise<Actor> {
  if (!userId) throw new HttpError(401, "Sign in required");
  const u = await db.user.findUnique({ where: { id: userId }, select: { id: true, role: true, email: true } });
  if (!u) throw new HttpError(401, "Sign in required");
  return u;
}

export function assertAdmin(actor: Actor) {
  if (actor.role !== "ADMIN") throw new HttpError(403, "Admin access required");
}
