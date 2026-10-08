import { DISCIPLINES } from "../taxonomy";
import { conA } from "./con-a";
import { conB } from "./con-b";
import { csA } from "./cs-a";
import { csB } from "./cs-b";
import { csC } from "./cs-c";
import { engA } from "./eng-a";
import { engB } from "./eng-b";
import { engC } from "./eng-c";
import { engD } from "./eng-d";
import { groupGuides } from "./groups";
import { ibA } from "./ib-a";
import { ibB } from "./ib-b";
import { ibC } from "./ib-c";
import type { CompanyGuide, GroupGuide, GuideGroup } from "./types";

const FAMILY_TO_GROUP: Record<string, GuideGroup> = {
  engineering: "engineering",
  computing: "computer-science",
  finance: "investment-banking",
  business: "consulting",
};

/** The briefing group a discipline belongs to. */
export function groupOf(disciplineId: string): GuideGroup {
  const family = DISCIPLINES.find((d) => d.id === disciplineId)?.family ?? "engineering";
  return FAMILY_TO_GROUP[family] ?? "engineering";
}

const ALL: CompanyGuide[] = [...engA, ...engB, ...engC, ...engD, ...csA, ...csB, ...csC, ...ibA, ...ibB, ...ibC, ...conA, ...conB];

/** Some employers have guides from more than one field (e.g. Apple software and hardware); merge them into one guide with several tracks. */
export const COMPANY_GUIDES: CompanyGuide[] = (() => {
  const byId = new Map<string, CompanyGuide>();
  for (const g of ALL) {
    const cur = byId.get(g.companyId);
    if (!cur) {
      byId.set(g.companyId, { ...g, tracks: [...g.tracks], sources: [...g.sources] });
      continue;
    }
    cur.tracks.push(...g.tracks);
    for (const s of g.sources) if (!cur.sources.some((x) => x.url === s.url)) cur.sources.push(s);
    const rank = { high: 3, medium: 2, low: 1 } as const;
    if (rank[g.confidence] < rank[cur.confidence]) cur.confidence = g.confidence;
  }
  return [...byId.values()];
})();

export function getCompanyGuide(companyId: string): CompanyGuide | undefined {
  return COMPANY_GUIDES.find((g) => g.companyId === companyId);
}

export function getGroupGuide(group: GuideGroup): GroupGuide | undefined {
  return groupGuides.find((g) => g.group === group);
}
