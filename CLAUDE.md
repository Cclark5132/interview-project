@AGENTS.md

# Interview Project (working name — see `src/lib/brand.ts`)

Curated, owner-reviewed interview question bank with rubric-based automated grading. Scope: no billing, no mock interviews, no code sandbox, no finance/business content yet.

## Commands
- `npm run db:dev` — local Postgres (keep running)
- `npm run setup` — prisma generate, migrate, seed (taxonomy, 34 DRAFT sample questions, local demo accounts)
- `npm run dev` / `npm run build`
- `npm run lint` · `npm run typecheck` · `npm test` (vitest; integration tests start a throwaway embedded Postgres built from real migrations)
- `npm run db:bootstrap` — production bootstrap (ADMIN_EMAIL/ADMIN_PASSWORD; no demo accounts)
- Deploy: `docs/DEPLOY.md` (Vercel `vercel-build` runs migrations)
- `npm run demo:reset-passwords` — regenerate local demo passwords (prints once)

## Decisions
- Next.js App Router + TS + Tailwind 4, Prisma 7 + Postgres via `@prisma/adapter-pg` (Neon in production; embedded Postgres locally via `npm run db:dev` and in tests), next-auth v4 credentials (JWT), zod.
- Prisma client is generated to `src/generated/prisma` (gitignored; `npm run build`/`setup` regenerate it).
- Taxonomy (disciplines, topics, roles, companies) is table-driven; source of truth for seeding is `src/content/taxonomy.ts`.
- Business logic lives in `src/server/*` (pure functions taking a user id / `Actor`); route handlers in `src/app/api` are thin wrappers (`withActor`). Test the services, not the routes.
- Admin authorization: `loadActor` re-reads the role from the DB; every admin service calls `assertAdmin`. Admin pages 404 for non-admins.
- Anything user-facing must read approved questions only (`status = "approved"`). Never include `idealAnswer` in public payloads; it leaves the server only through `revealIdeal`.
- Grading: `src/lib/grading`. Provider returns raw structured output; `validateGrade` checks schema, criterion ids, verbatim evidence quotes, topic ids; overall is computed from rubric weights server-side; one repair retry. No `ANTHROPIC_API_KEY` ⇒ labeled demonstration provider (excluded from progress, best score and comparisons).
- Rubric edits on an approved question create a new `Rubric` version; attempts store `rubricVersion` and the full breakdown (weights as used).
- Seeds are never auto-approved. Company associations from seeds are `role_relevant`, `reviewed=false`; approval by the admin marks them reviewed.

## Conventions
- Brand/colors/typography: tokens in `src/app/globals.css` and `src/lib/brand.ts` only.
- No chat bubbles, avatars, sparkles, "AI" marketing copy; never call it a "phone interview".
- Treat answers, job descriptions and imports as untrusted: length limits, zod validation, constrained prompts.
- Don't commit `.env`, `*.db`, recordings, build output. Audio is never persisted.
- See `docs/BUILD_STATUS.md` for progress and blockers.
