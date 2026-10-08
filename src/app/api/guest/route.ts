import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decode, encode } from "next-auth/jwt";
import { db } from "@/lib/db";
import { createGuestUser } from "@/server/guest";
import { errorResponse } from "@/server/http";
import { ipLimit } from "@/server/ratelimit";

const MAX_AGE = 60 * 60 * 24 * 30;

function safeNext(v: string | null) {
  return v && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/api") ? v : "/";
}

/** True only for a cookie that decodes with the current secret AND points at a user that still exists. */
async function hasValidSession(token: string | undefined, secret: string) {
  if (!token) return false;
  try {
    const t = await decode({ token, secret });
    const uid = typeof t?.uid === "string" ? t.uid : null;
    return uid ? Boolean(await db.user.findUnique({ where: { id: uid }, select: { id: true } })) : false;
  } catch {
    return false;
  }
}

/** Starts an anonymous guest session (a next-auth compatible JWT cookie), then redirects. */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) throw new Error("NEXTAUTH_SECRET is not set");
    const jar = await cookies();
    const dest = new URL(safeNext(url.searchParams.get("next")), url.origin);
    const secure = (process.env.NEXTAUTH_URL ?? "").startsWith("https://");
    const name = secure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
    // A stale cookie (rotated secret, deleted user) must be replaced, otherwise every page bounces back here forever.
    if (await hasValidSession((jar.get("__Secure-next-auth.session-token") ?? jar.get("next-auth.session-token"))?.value, secret)) {
      return NextResponse.redirect(dest);
    }
    await ipLimit(req, "guest", 8, 60 * 60_000, "Too many new sessions from this network. Try again later.");
    const guest = await createGuestUser();
    const token = await encode({ token: { uid: guest.id, sub: guest.id, name: guest.name, email: guest.email }, secret, maxAge: MAX_AGE });
    const res = NextResponse.redirect(dest);
    res.cookies.set(name, token, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: MAX_AGE });
    return res;
  } catch (e) {
    return errorResponse(e);
  }
}
