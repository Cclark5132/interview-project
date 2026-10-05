import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";
import { createGuestUser } from "@/server/guest";
import { errorResponse } from "@/server/http";

const MAX_AGE = 60 * 60 * 24 * 30;

function safeNext(v: string | null) {
  return v && v.startsWith("/") && !v.startsWith("//") && !v.startsWith("/api") ? v : "/";
}

/** Starts an anonymous guest session (a next-auth compatible JWT cookie), then redirects. */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) throw new Error("NEXTAUTH_SECRET is not set");
    const jar = await cookies();
    const dest = new URL(safeNext(url.searchParams.get("next")), url.origin);
    if (jar.get("next-auth.session-token") ?? jar.get("__Secure-next-auth.session-token")) return NextResponse.redirect(dest);
    const guest = await createGuestUser();
    const token = await encode({ token: { uid: guest.id, sub: guest.id, name: guest.name, email: guest.email }, secret, maxAge: MAX_AGE });
    const secure = (process.env.NEXTAUTH_URL ?? "").startsWith("https://");
    const res = NextResponse.redirect(dest);
    res.cookies.set(secure ? "__Secure-next-auth.session-token" : "next-auth.session-token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: MAX_AGE,
    });
    return res;
  } catch (e) {
    return errorResponse(e);
  }
}
