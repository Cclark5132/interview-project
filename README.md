# Interview Project

*Working name — change it in `src/lib/brand.ts`.* Targeted practice for engineering and computing interviews: a curated, owner-reviewed question bank, ranked for your discipline, role, company and level, with rubric-based evaluation of typed or spoken answers.

Out of scope: billing, resumes, mock interviews, code execution, finance/business content.

## Quick start

Requires Node ≥ 22.12 (developed on Node 26) and npm ≥ 11.

```bash
npm install
cp .env.example .env        # then set NEXTAUTH_SECRET (see the file)
npm run db:dev              # terminal 1: local Postgres (leave running)
npm run setup               # terminal 2: generate client, migrate, seed; prints local demo logins once
npm run dev                 # http://localhost:3000
```

`npm run setup` creates the schema in local Postgres, taxonomy, **34 original sample questions as drafts**, and two local-only accounts (`demo@interview-project.local` as a user and `admin@interview-project.local` as the owner/admin). Passwords come from `DEMO_USER_PASSWORD` / `DEMO_ADMIN_PASSWORD` or are generated and printed once; `npm run demo:reset-passwords` issues new ones. The demo seed refuses to run when `NODE_ENV=production`.

**Sample questions are drafts and invisible to users.** Sign in as the admin → *Owner review*, open a question, send it to review, tick the approval confirmation, and publish. Seeds never approve themselves. The public **Demo preview** (`/demo`) is a separate static illustration that never touches the bank or progress.

## Live grading and transcription (optional)

| Feature | Variables | Without it |
|---|---|---|
| Grading (Anthropic API) | `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (default `claude-sonnet-5-5`) | A clearly labeled *demonstration* mode (keyword overlap). Not a real evaluation; excluded from progress. |
| Job-description extraction | same key | Keyword-based extraction you can edit before saving |
| Speech transcription (OpenAI) | `OPENAI_API_KEY`, `TRANSCRIPTION_MODEL` (default `whisper-1`) | Recording is disabled with a message; typing works |

Claude Code subscription access does not provide these API credentials. Keys are read server-side only.

## Deploying
See [docs/DEPLOY.md](docs/DEPLOY.md) (Vercel + Neon, custom domain, owner bootstrap).

## Scripts
`dev`, `build`, `start`, `lint`, `typecheck`, `test`, `setup`, `db:dev`, `db:migrate`, `db:seed`, `db:bootstrap`, `demo:reset-passwords`.

## What's in Mark 1
- Target setup with editable job-description extraction (cached, untrusted-text safe)
- Library-first home: ranked recommendations with reasons, search, filters (discipline, company, role, topic, difficulty, answered, bookmarked)
- Question workspace: typed answers or mic recording → editable transcript; structured evaluation card; retries with preserved history; explicit "Reveal ideal answer" (server-enforced, later attempts marked *assisted*); first-vs-latest comparison that keeps assisted work separate
- Progress: topic stats with sample counts (live, independent attempts only), recent practice, bookmarks
- Owner panel: create/edit/filter, JSON/CSV import (drafts only), draft → in review → approved → archived, publish checks, rubric versioning, grading preview

More: [architecture](docs/ARCHITECTURE.md), [import format](docs/IMPORT_SCHEMA.md) (+ [example](examples/import-example.json)), [build status](docs/BUILD_STATUS.md).

## Checks
```bash
npm run lint && npm run typecheck && npm test && npm run build
```
CI (`.github/workflows/ci.yml`) runs the same.

## Limitations
Login throttling is per server instance (weak on serverless); no email verification or password reset. Coverage is deliberately small: 34 drafts across 11 disciplines, not every role or company. Voice transcription needs a provider key and a browser with `MediaRecorder`. For CS this practices explanations and algorithm reasoning only; it does not replace coding-interview practice.
