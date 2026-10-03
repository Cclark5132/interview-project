"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/login" })} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
      Sign out
    </button>
  );
}
