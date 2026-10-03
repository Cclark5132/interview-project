import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// Light in-process throttle against password guessing (per email). Production would use a shared store.
const failures = new Map<string, { n: number; until: number }>();
const MAX_FAILS = 6;
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = String(creds?.email ?? "").trim().toLowerCase();
        const password = String(creds?.password ?? "");
        if (!email || !password) return null;
        const f = failures.get(email);
        if (f && f.n >= MAX_FAILS && f.until > Date.now()) return null;
        const user = await db.user.findUnique({ where: { email } });
        // Compare against a dummy hash when the user is unknown to keep timing similar.
        const hash = user?.passwordHash ?? DUMMY_HASH;
        const ok = await bcrypt.compare(password, hash);
        if (!user || !ok) {
          failures.set(email, { n: (f?.n ?? 0) + 1, until: Date.now() + 5 * 60_000 });
          return null;
        }
        failures.delete(email);
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
