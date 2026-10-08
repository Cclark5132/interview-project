import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefingView, type BriefingData } from "@/components/BriefingView";
import { DISCIPLINES, COMPANIES, ROLES } from "@/content/taxonomy";
import { groupOf, getCompanyGuide, getGroupGuide } from "@/content/guides";
import { getTarget } from "@/server/questions";
import { requireUser } from "@/server/session";

export const metadata = { title: "Interview briefing" };

const GROUP_NAME: Record<string, string> = {
  engineering: "Engineering",
  "computer-science": "Computer science",
  "investment-banking": "Investment banking",
  consulting: "Consulting",
};

export default async function BriefingPage({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  const user = await requireUser("/briefing");
  const target = await getTarget(user.id);
  if (!target) redirect("/");

  const sp = await searchParams;
  const discipline = DISCIPLINES.find((d) => d.id === target.disciplineId);
  const group = groupOf(target.disciplineId);
  const company = target.companyId ? COMPANIES.find((c) => c.id === target.companyId) : undefined;
  const role = target.roleId ? ROLES.find((r) => r.id === target.roleId) : undefined;
  const guide = company ? getCompanyGuide(company.id) : undefined;

  // A company guide can have several tracks (e.g. software and hardware at the same employer); pick the one for this group.
  const tracks = guide?.tracks.filter((t) => t.group === group) ?? [];
  const wanted = Number.isFinite(Number(sp.track)) ? Number(sp.track) : -1;
  const roleHint = role?.name.toLowerCase() ?? "";
  const guessed = tracks.findIndex((t) => roleHint && t.label.toLowerCase().split(/[^a-z]+/).some((w) => w.length > 3 && roleHint.includes(w)));
  const trackIndex = wanted >= 0 && wanted < tracks.length ? wanted : Math.max(guessed, 0);
  const track = tracks[trackIndex];
  const generic = getGroupGuide(group);

  let data: BriefingData | null = null;
  let note: string | null = null;
  if (guide && track) {
    data = {
      eyebrow: `${company!.name} · ${track.label}`,
      title: `How ${company!.name} interviews`,
      summary: guide.summary,
      asOf: guide.asOf,
      confidence: guide.confidence,
      stages: track.stages,
      behavioral: track.behavioral,
      technical: track.technical,
      projects: track.projects,
      roleNote: role ? (() => { const n = track.roleNotes?.find((x) => x.roleId === role.id); return n ? { roleName: role.name, notes: n.notes } : undefined; })() : undefined,
      prep: track.prep,
      sources: guide.sources,
    };
  } else if (generic) {
    note = company ? `We do not have a ${company.name} briefing for ${GROUP_NAME[group] ?? "this field"} yet, so here is how ${GROUP_NAME[group]?.toLowerCase()} interviews usually work.` : null;
    data = {
      eyebrow: `${GROUP_NAME[group] ?? discipline?.name} · typical process`,
      title: `How ${GROUP_NAME[group]?.toLowerCase()} interviews work`,
      summary: generic.summary,
      asOf: generic.asOf,
      stages: generic.stages,
      behavioral: generic.behavioral,
      technical: generic.technical,
      projects: generic.projects,
      prep: generic.prep,
      sources: generic.sources,
    };
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.09em] text-muted hover:text-ink">← Change target</Link>
        <Link href="/practice" className="btn btn-primary">Start technical prep →</Link>
      </div>

      {!company && (
        <p className="rounded-[10px] border border-line bg-surface-2 px-4 py-3 text-sm text-muted">
          You have not picked a company, so this is the typical process for the field. <Link href="/" className="text-accent underline underline-offset-2">Choose a company</Link> to see its specific rounds, behavioral style and what it asks.
        </p>
      )}
      {note && <p className="rounded-[10px] border border-warn/30 bg-warn-soft px-4 py-3 text-sm text-warn">{note}</p>}

      {tracks.length > 1 && (
        <nav aria-label="Interview track" className="flex flex-wrap gap-2">
          {tracks.map((t, i) => (
            <Link key={t.label} href={`/briefing?track=${i}`} className={`rounded-[6px] border px-3 py-1.5 text-[13px] ${i === trackIndex ? "border-accent bg-accent-soft text-accent" : "border-strong text-muted hover:text-ink"}`}>{t.label}</Link>
          ))}
        </nav>
      )}

      {data ? <BriefingView d={data} /> : <p className="text-muted">No briefing is available for this target yet.</p>}

      <div className="sticky bottom-4 flex justify-end">
        <Link href="/practice" className="btn btn-primary !min-h-11 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">Start technical prep →</Link>
      </div>
    </div>
  );
}
