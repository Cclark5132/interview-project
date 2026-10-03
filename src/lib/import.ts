import { z } from "zod";
import { criterionSchema } from "@/lib/rubric";

const difficultyMap: Record<string, number> = { introductory: 1, intermediate: 2, advanced: 3, "1": 1, "2": 2, "3": 3 };

const companyRef = z.object({
  company: z.string(),
  evidence: z.enum(["role_relevant", "company_reported"]).default("role_relevant"),
  sourceUrl: z.string().url().optional(),
});

/** Documented in docs/IMPORT_SCHEMA.md. Imports always land as `draft`; `status` in the file is ignored. */
export const importRowSchema = z.object({
  title: z.string().min(5).max(200),
  prompt: z.string().min(20).max(4000),
  discipline: z.string().min(2),
  difficulty: z.union([z.string(), z.number()]).transform((v, ctx) => {
    const d = difficultyMap[String(v).toLowerCase()];
    if (!d) ctx.addIssue({ code: "custom", message: "difficulty must be 1-3 or introductory|intermediate|advanced" });
    return d ?? 2;
  }),
  topics: z.array(z.string()).default([]),
  roles: z.array(z.string()).default([]),
  companies: z.array(companyRef).default([]),
  evidenceCategory: z.enum(["original", "role_relevant", "company_reported"]).default("original"),
  sourceNote: z.string().max(1000).default(""),
  sourceUrl: z.string().url().optional().or(z.literal("")).transform((v) => v || undefined),
  idealAnswer: z.string().max(8000).default(""),
  rubric: z.array(criterionSchema).max(8).optional(),
});
export type ImportRow = z.infer<typeof importRowSchema>;

export type ParsedImport = { rows: { index: number; row: ImportRow }[]; errors: { index: number; message: string }[] };

export function parseImportJson(text: string): ParsedImport {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { rows: [], errors: [{ index: 0, message: "File is not valid JSON" }] };
  }
  const items = Array.isArray(data) ? data : (data as { questions?: unknown })?.questions;
  if (!Array.isArray(items)) return { rows: [], errors: [{ index: 0, message: 'Expected a JSON array or {"questions": [...]}' }] };
  return validateRows(items);
}

function validateRows(items: unknown[]): ParsedImport {
  const out: ParsedImport = { rows: [], errors: [] };
  if (items.length > 500) return { rows: [], errors: [{ index: 0, message: "Too many rows (500 max per import)" }] };
  items.forEach((item, i) => {
    const r = importRowSchema.safeParse(item);
    if (r.success) out.rows.push({ index: i + 1, row: r.data });
    else out.errors.push({ index: i + 1, message: r.error.issues.slice(0, 3).map((x) => `${x.path.join(".") || "row"}: ${x.message}`).join("; ") });
  });
  return out;
}

/** Minimal RFC 4180 parser (quoted fields, escaped quotes, embedded newlines). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((c) => c.trim() !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((c) => c.trim() !== "")) rows.push(row);
  return rows;
}

const split = (s: string | undefined) => (s ?? "").split(";").map((x) => x.trim()).filter(Boolean);

/** CSV columns: title,prompt,discipline,difficulty,topics,roles,companies,evidenceCategory,sourceNote,sourceUrl,idealAnswer,rubric
 *  topics/roles are `;`-separated slugs; companies are `;`-separated `slug` or `slug:company_reported`; rubric is a JSON array. */
export function parseImportCsv(text: string): ParsedImport {
  const table = parseCsv(text);
  if (table.length < 2) return { rows: [], errors: [{ index: 0, message: "CSV needs a header row and at least one data row" }] };
  const header = table[0].map((h) => h.trim());
  const items: unknown[] = table.slice(1).map((cells) => {
    const get = (k: string) => cells[header.indexOf(k)]?.trim();
    let rubric: unknown;
    const rj = get("rubric");
    if (rj) {
      try {
        rubric = JSON.parse(rj);
      } catch {
        rubric = "invalid";
      }
    }
    return {
      title: get("title"),
      prompt: get("prompt"),
      discipline: get("discipline"),
      difficulty: get("difficulty") ?? "2",
      topics: split(get("topics")),
      roles: split(get("roles")),
      companies: split(get("companies")).map((c) => {
        const [company, evidence] = c.split(":");
        return { company, ...(evidence ? { evidence } : {}) };
      }),
      evidenceCategory: get("evidenceCategory") || undefined,
      sourceNote: get("sourceNote") || undefined,
      sourceUrl: get("sourceUrl") || undefined,
      idealAnswer: get("idealAnswer") || undefined,
      rubric,
    };
  });
  return validateRows(items);
}
