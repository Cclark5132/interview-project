import Link from "next/link";
import { brand } from "@/lib/brand";
import { currentUser } from "@/server/session";
import { NavLinks } from "./NavLinks";
import { isGuestEmail } from "@/server/guest";
import { SignOutButton } from "./SignOutButton";

export async function Header() {
  const user = await currentUser();
  const guest = user ? isGuestEmail(user.email) : false;
  const items = user
    ? [
        { href: "/", label: "Library" },
        { href: "/progress", label: "Progress" },
        { href: "/onboarding", label: "Target" },
        ...(user.role === "ADMIN" ? [{ href: "/admin", label: "Owner review" }] : []),
      ]
    : [{ href: "/demo", label: "Demo" }];
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 py-3.5 font-display text-[17px] font-semibold tracking-tight">
          <span aria-hidden className="grid size-5 place-items-center rounded-[3px] bg-ink">
            <span className="size-2 bg-accent" />
          </span>
          {brand.name}
        </Link>
        <NavLinks items={items} />
        <div className="ml-auto flex items-center gap-4 py-2 text-[13px]">
          {user ? (
            guest ? (
              <span className="font-mono text-[11px] text-muted" title="Your attempts are saved in this browser">Guest · saved in this browser</span>
            ) : (
              <>
                <span className="hidden font-mono text-[11px] text-muted sm:inline">{user.email}</span>
                <SignOutButton />
              </>
            )
          ) : (
            <Link href="/api/guest?next=/onboarding" className="btn btn-primary !min-h-8">Start practicing</Link>
          )}
        </div>
      </div>
    </header>
  );
}
