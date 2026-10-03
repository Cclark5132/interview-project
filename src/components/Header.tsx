import Link from "next/link";
import { brand } from "@/lib/brand";
import { currentUser } from "@/server/session";
import { SignOutButton } from "./SignOutButton";

export async function Header() {
  const user = await currentUser();
  const link = "rounded px-2 py-1 text-sm text-muted hover:text-ink";
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          {brand.name}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          {user ? (
            <>
              <Link href="/" className={link}>Library</Link>
              <Link href="/progress" className={link}>Progress</Link>
              <Link href="/onboarding" className={link}>Target</Link>
              {user.role === "ADMIN" && <Link href="/admin" className={link}>Owner review</Link>}
            </>
          ) : null}
          <Link href="/demo" className={link}>Demo preview</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-muted sm:inline">{user.name ?? user.email}</span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-muted hover:text-ink">Sign in</Link>
              <Link href="/register" className="btn btn-primary !min-h-9">Create account</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
