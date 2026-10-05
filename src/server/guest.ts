import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { HttpError } from "./access";

export const GUEST_DOMAIN = "guest.local";
export const isGuestEmail = (email: string) => email.endsWith(`@${GUEST_DOMAIN}`);

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 300;

/**
 * Anonymous practice identity (proof-of-concept access without sign-up). Always role USER, with a random
 * password nobody knows, so a guest can never sign in through the credentials form or become an admin.
 */
export async function createGuestUser() {
  const recent = await db.user.count({
    where: { email: { endsWith: `@${GUEST_DOMAIN}` }, createdAt: { gte: new Date(Date.now() - WINDOW_MS) } },
  });
  if (recent >= MAX_PER_WINDOW) throw new HttpError(429, "Too many new visitors right now. Try again in a few minutes.");
  const id = randomBytes(9).toString("base64url").toLowerCase().replace(/[^a-z0-9]/g, "x");
  return db.user.create({
    data: {
      email: `guest-${id}@${GUEST_DOMAIN}`,
      name: "Guest",
      role: "USER",
      passwordHash: await bcrypt.hash(randomBytes(24).toString("hex"), 4),
    },
    select: { id: true, name: true, email: true },
  });
}
