import { describe, expect, it } from "vitest";
import { COMPANY_GUIDES, getGroupGuide, groupOf } from "@/content/guides";
import { COMPANIES, DISCIPLINES, ROLES } from "@/content/taxonomy";

describe("interview guides", () => {
  it("covers every company exactly once", () => {
    const ids = COMPANY_GUIDES.map((g) => g.companyId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of COMPANIES) expect(ids.includes(c.id), `no guide for ${c.id}`).toBe(true);
    for (const id of ids) expect(COMPANIES.some((c) => c.id === id), `guide for unknown company ${id}`).toBe(true);
  });

  it("has a track for each field the company is offered in", () => {
    for (const g of COMPANY_GUIDES) {
      const company = COMPANIES.find((c) => c.id === g.companyId)!;
      const groups = new Set(company.disciplines.map(groupOf));
      const covered = new Set(g.tracks.map((t) => t.group));
      // At least one of the fields the company is listed under must have a briefing.
      expect([...groups].some((x) => covered.has(x)), `${g.companyId} has no track for ${[...groups].join(",")}`).toBe(true);
    }
  });

  it("is well formed", () => {
    for (const g of COMPANY_GUIDES) {
      expect(g.summary.length, g.companyId).toBeGreaterThan(60);
      expect(g.asOf).toMatch(/^\d{4}-\d{2}$/);
      expect(g.sources.length, `${g.companyId} sources`).toBeGreaterThanOrEqual(2);
      for (const s of g.sources) expect(s.url, `${g.companyId} ${s.url}`).toMatch(/^https?:\/\/\S+$/i);
      expect(g.tracks.length, g.companyId).toBeGreaterThan(0);
      for (const t of g.tracks) {
        expect(t.stages.length, `${g.companyId}/${t.label} stages`).toBeGreaterThanOrEqual(3);
        expect(t.behavioral.themes.length, `${g.companyId}/${t.label} themes`).toBeGreaterThanOrEqual(2);
        expect(t.behavioral.examples.length, `${g.companyId}/${t.label} examples`).toBeGreaterThanOrEqual(2);
        expect(t.technical.topics.length, `${g.companyId}/${t.label} topics`).toBeGreaterThanOrEqual(2);
        expect(t.projects.length, `${g.companyId}/${t.label} projects`).toBeGreaterThan(40);
        expect(t.prep.length, `${g.companyId}/${t.label} prep`).toBeGreaterThanOrEqual(3);
        for (const n of t.roleNotes ?? []) expect(ROLES.some((r) => r.id === n.roleId), `${g.companyId}: role ${n.roleId}`).toBe(true);
      }
    }
  });

  it("has a generic guide for each field", () => {
    for (const group of ["engineering", "computer-science", "investment-banking", "consulting"] as const) {
      const g = getGroupGuide(group);
      expect(g, group).toBeTruthy();
      expect(g!.stages.length).toBeGreaterThanOrEqual(4);
    }
    expect(DISCIPLINES.every((d) => ["engineering", "computer-science", "investment-banking", "consulting"].includes(groupOf(d.id)))).toBe(true);
  });
});
