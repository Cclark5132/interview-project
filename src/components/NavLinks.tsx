"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-1">
      {items.map((i) => {
        const active = i.href === "/" ? path === "/" || path.startsWith("/questions") : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 py-3.5 text-[13px] font-medium transition-colors ${active ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
