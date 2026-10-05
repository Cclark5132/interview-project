import { describe, expect, it } from "vitest";
import { BANK } from "@/content/bank";
import { SEED_QUESTIONS, buildRubric } from "@/content/seed-questions";
import { DISCIPLINES, ROLES, TOPICS } from "@/content/taxonomy";
import { rubricSchema } from "@/lib/rubric";

const ALL = [...SEED_QUESTIONS, ...BANK];

describe("question bank", () => {
  it("has at least 150 questions for every discipline", () => {
    for (const d of DISCIPLINES) {
      const n = ALL.filter((q) => q.discipline === d.id).length;
      expect(n, `${d.id} has ${n}`).toBeGreaterThanOrEqual(150);
    }
  });

  it("has unique titles and prompts", () => {
    const titles = new Set<string>();
    const prompts = new Set<string>();
    for (const q of ALL) {
      expect(titles.has(q.title.toLowerCase()), `duplicate title: ${q.title}`).toBe(false);
      expect(prompts.has(q.prompt.toLowerCase()), `duplicate prompt: ${q.title}`).toBe(false);
      titles.add(q.title.toLowerCase());
      prompts.add(q.prompt.toLowerCase());
    }
  });

  it("uses valid taxonomy ids, and topics that belong to the question's discipline family", () => {
    for (const q of ALL) {
      expect(DISCIPLINES.some((d) => d.id === q.discipline), q.title).toBe(true);
      expect(q.topics.length, q.title).toBeGreaterThan(0);
      for (const t of q.topics) expect(TOPICS.some((x) => x.id === t), `${q.title}: topic ${t}`).toBe(true);
      for (const r of q.roles) expect(ROLES.some((x) => x.id === r), `${q.title}: role ${r}`).toBe(true);
      // The primary topic should belong to the question's own discipline.
      expect(TOPICS.find((x) => x.id === q.topics[0])?.disciplineId, `${q.title}: primary topic discipline`).toBe(q.discipline);
    }
  });

  it("every question has a valid rubric, a real prompt and a substantive ideal answer", () => {
    for (const q of ALL) {
      expect(q.title.length, q.title).toBeGreaterThanOrEqual(8);
      expect(q.prompt.length, q.title).toBeGreaterThanOrEqual(40);
      expect(q.ideal.length, q.title).toBeGreaterThanOrEqual(120);
      expect(q.core.length + q.complete.length, q.title).toBeGreaterThanOrEqual(4);
      expect(q.reasoning.length, q.title).toBeGreaterThanOrEqual(2);
      const parsed = rubricSchema.safeParse(buildRubric(q));
      expect(parsed.success, `${q.title}: ${parsed.success ? "" : parsed.error.issues[0]?.message}`).toBe(true);
    }
  });

  it("mixes difficulty levels in every discipline", () => {
    for (const d of DISCIPLINES) {
      const levels = new Set(ALL.filter((q) => q.discipline === d.id).map((q) => q.difficulty));
      expect(levels.size, d.id).toBeGreaterThanOrEqual(3);
    }
  });
});
