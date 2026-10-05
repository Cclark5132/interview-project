import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { Header } from "@/components/Header";
import { brand } from "@/lib/brand";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const cond = IBM_Plex_Sans_Condensed({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-plex-cond", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: brand.name, template: `%s · ${brand.name}` },
  description: brand.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${cond.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
        <footer className="mx-auto max-w-6xl border-t border-line px-4 py-6 font-mono text-[11px] leading-relaxed text-muted sm:px-6">
          <span>Questions are reviewed by the owner before publishing. Answers are scored automatically against the question&rsquo;s published rubric.</span>
          <a href="/login" className="ml-4 whitespace-nowrap underline-offset-2 hover:text-ink hover:underline">Owner sign in</a>
        </footer>
      </body>
    </html>
  );
}
