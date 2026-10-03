# Question import format

Use **Owner review → Import JSON/CSV**. Import only content you wrote or are licensed to use. Do not scrape sites whose terms forbid it (including Glassdoor), and keep source links accurate: never invent citations.

Every imported row becomes a **draft**. A `status` field in the file is ignored. Nothing is visible to users until you approve it in the admin panel, which requires a complete question, rubric (weights total 100), ideal answer, topic, and provenance.

Unknown discipline/topic/role/company slugs reject that row (taxonomy is not created implicitly). Slugs are listed in `src/content/taxonomy.ts`.

## JSON

An array of objects, or `{ "questions": [ ... ] }`. Max 500 rows.

| field | required | notes |
|---|---|---|
| `title` | yes | 5–200 chars |
| `prompt` | yes | 20–4000 chars, shown to users |
| `discipline` | yes | slug, e.g. `mechanical`, `computer-science` |
| `difficulty` | yes | `1`–`3` or `introductory` / `intermediate` / `advanced` |
| `topics` | no* | topic slugs; at least one is required to publish |
| `roles` | no | role slugs |
| `companies` | no | `[{ "company": "spacex", "evidence": "role_relevant" \| "company_reported", "sourceUrl": "https://…" }]` |
| `evidenceCategory` | no | `original` (default), `role_relevant`, `company_reported` |
| `sourceNote` | no* | provenance; required to publish |
| `sourceUrl` | no | required to publish when `company_reported` |
| `idealAnswer` | no* | required to publish (min 40 chars) |
| `rubric` | no* | criteria array; required to publish |

Rubric criterion: `id` (slug), `name`, `weight` (integer; all weights total 100), `description`, `anchors` `{low, mid, high}`, `expectedConcepts[]`, optional `alternatives[]` and `misconceptions[]`. 2–8 criteria.

Company relevance is **not** evidence a company asked a question. Use `company_reported` only with a real `sourceUrl`.

A small original example is in [`examples/import-example.json`](../examples/import-example.json).

## CSV

Header row required. Columns:

`title,prompt,discipline,difficulty,topics,roles,companies,evidenceCategory,sourceNote,sourceUrl,idealAnswer,rubric`

- `topics`, `roles`: `;`-separated slugs
- `companies`: `;`-separated `slug` or `slug:company_reported`
- `rubric`: a JSON array (quote the cell and double any inner quotes)
- Standard quoting rules; fields may contain commas and newlines.
