import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { rateLimit, resetLimit } from "@/server/ratelimit";

// Password-guess throttle in the shared database, keyed by network address (and address + email), never by email
// alone: otherwise anyone could lock the owner out by guessing their address. Cleared on a successful sign-in.
const LOGIN_WINDOW = 15 * 60_000;
const MAX_PER_EMAIL = 6;
const MAX_PER_IP = 30;
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: { email: {}, password: {} },
      async authorize(creds, req) {
        const email = String(creds?.email ?? "").trim().toLowerCase();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;
        const h = req?.headers as Record<string, string | string[] | undefined> | undefined;
        const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
        const ip = first(h?.["x-real-ip"])?.trim() || first(h?.["x-forwarded-for"])?.split(",")[0]?.trim() || "unknown";
        const emailKey = `login:${ip}:${email}`;
        try {
          await rateLimit(`login-ip:${ip}`, MAX_PER_IP, LOGIN_WINDOW);
          await rateLimit(emailKey, MAX_PER_EMAIL, LOGIN_WINDOW);
        } catch {
          return null;
        }
        const user = await db.user.findUnique({ where: { email } });
        // Compare against a dummy hash when the user is unknown to keep timing similar.
        const hash = user?.passwordHash ?? DUMMY_HASH;
        const ok = await bcrypt.compare(password, hash);
        if (!user || !ok) return null;
        await resetLimit(emailKey);
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) (session.user as { id?: string }).id = token.uid as string;
      return session;
    },
  },
};

export async function getSessionUserId(): Promise<string | null> {
  const s = await getServerSession(authOptions);
  return (s?.user as { id?: string } | undefined)?.id ?? null;
}
