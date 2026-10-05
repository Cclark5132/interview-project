"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const res = await signIn("credentials", { email: f.get("email"), password: f.get("password"), redirect: false });
    setBusy(false);
    if (res?.error) return setError("Email or password is incorrect.");
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl">Owner sign in</h1>
      <p className="text-sm text-muted">For the site owner. Visitors do not need an account.</p>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
      </div>
      {error && <p role="alert" className="rounded-[4px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
