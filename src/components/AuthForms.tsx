"use client";

import Link from "next/link";
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
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl">Sign in</h1>
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
      <p className="text-sm text-muted">
        New here? <Link href="/register" className="text-accent underline">Create an account</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    const body = { email: f.get("email"), name: f.get("name") || undefined, password: f.get("password") };
    const res = await fetch("/api/register", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setBusy(false);
      return setError(j.details?.[0] ?? j.error ?? "Could not create account.");
    }
    await signIn("credentials", { email: body.email, password: body.password, redirect: false });
    router.push("/onboarding");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl">Create your account</h1>
      <div>
        <label className="label" htmlFor="name">Name (optional)</label>
        <input id="name" name="name" autoComplete="name" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password (10+ characters)</label>
        <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className="input" />
      </div>
      {error && <p role="alert" className="rounded-[4px] bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}
      <button className="btn btn-primary w-full" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      <p className="text-sm text-muted">
        Already registered? <Link href="/login" className="text-accent underline">Sign in</Link>
      </p>
    </form>
  );
}
