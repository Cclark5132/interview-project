import { db } from "@/lib/db";
import { HttpError } from "./access";

/** Client address as set by the platform proxy (Vercel overwrites these headers). "unknown" when absent, e.g. local dev. */
export function clientIp(req: Request): string {
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/**
 * Fixed-window counter shared by every serverless instance (one atomic upsert). Returns the hit count in the
 * current window; the window starts at the first hit and resets once it has elapsed.
 */
export async function hit(key: string, windowMs: number): Promise<number> {
  const rows = await db.$queryRaw<{ count: number }[]>`
    INSERT INTO "RateLimit" ("key", "count", "resetAt")
    VALUES (${key}, 1, timezone('UTC', now()) + (${windowMs}::double precision * interval '1 millisecond'))
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "RateLimit"."resetAt" <= timezone('UTC', now()) THEN 1 ELSE "RateLimit"."count" + 1 END,
      "resetAt" = CASE WHEN "RateLimit"."resetAt" <= timezone('UTC', now()) THEN EXCLUDED."resetAt" ELSE "RateLimit"."resetAt" END
    RETURNING "count"`;
  // Opportunistic cleanup keeps the table small without a scheduled job.
  if (Math.random() < 0.01) await db.$executeRaw`DELETE FROM "RateLimit" WHERE "resetAt" < timezone('UTC', now()) - interval '1 hour'`;
  return rows[0].count;
}

/** Throws 429 once `limit` hits have been made in the window. */
export async function rateLimit(key: string, limit: number, windowMs: number, message = "Too many requests. Try again in a few minutes.") {
  if ((await hit(key, windowMs)) > limit) throw new HttpError(429, message);
}

/** Per-address limit. Skipped in development when the address is unknown, so a local machine never throttles itself. */
export async function ipLimit(req: Request, name: string, limit: number, windowMs: number, message?: string) {
  const ip = clientIp(req);
  if (ip === "unknown" && process.env.NODE_ENV !== "production") return;
  await rateLimit(`ip:${name}:${ip}`, limit, windowMs, message);
}

export const resetLimit = (key: string) => db.rateLimit.deleteMany({ where: { key } });

/** Cross-instance mutex with an expiry, so a crashed request cannot hold it forever. */
export async function acquireLock(key: string, ttlMs: number): Promise<boolean> {
  const rows = await db.$queryRaw<{ key: string }[]>`
    INSERT INTO "RateLimit" ("key", "count", "resetAt")
    VALUES (${key}, 1, timezone('UTC', now()) + (${ttlMs}::double precision * interval '1 millisecond'))
    ON CONFLICT ("key") DO UPDATE SET "count" = 1, "resetAt" = EXCLUDED."resetAt"
    WHERE "RateLimit"."resetAt" <= timezone('UTC', now())
    RETURNING "key"`;
  return rows.length > 0;
}

export const releaseLock = (key: string) => db.rateLimit.deleteMany({ where: { key } });
