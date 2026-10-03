# Architecture note

```
browser ──► Next.js (App Router)
             ├─ pages (server components) ── src/server/* ──► Prisma ──► SQLite
             ├─ /api/* route handlers (thin) ─┘
             └─ client components: answer workspace, recorder, onboarding, admin editor
src/lib/*    pure logic: ranking, rubric/grading validation, JD parsing, import, transcription adapter
```

**Why this shape:** one deployable, no queues or microservices. Services in `src/server` take a user id or `Actor`, so authorization and business rules are tested directly (see `tests/integration.test.ts`) and shared by pages and APIs.

## Data model (Prisma)
`Discipline → Topic`, `Role`, `Company` (table-driven taxonomy; finance/business later = new `Discipline.family`). `Question` (status `draft → in_review → approved → archived`) with join tables for topics, roles, and `QuestionCompany` (evidence + `reviewed`). `Rubric` rows are versioned per question. `Attempt` stores the answer text, `assisted`, rubric version, full score breakdown JSON, grading mode/model. `IdealReveal` records when a user revealed the answer. `UserTarget`, `Bookmark`, `JobParseCache`.

## Trust boundaries
- **Auth:** next-auth credentials + JWT. Role is never trusted from the token: `loadActor` re-reads it from the DB; admin services call `assertAdmin`.
- **Visibility:** user-facing queries filter `status = approved`. Ideal answers never appear in public payloads; `revealIdeal` enforces ≥1 attempt + confirmation server-side.
- **Untrusted text:** answers (≤6000 chars), job descriptions (≤20000), imports (≤500 rows) are zod-validated. Model prompts put them in delimited blocks with instructions to treat them as data. Model output must pass schema + evidence checks before use, and can never publish or authorize anything.
- **Abuse:** per-user rate limit (12 attempts / 10 min, DB-counted), per-user+question in-flight lock, idempotent `requestKey`, request timeouts (45 s grading, 60 s transcription), login throttle.

## Grading contract
1. Load the question's *current* rubric version. 2. Provider returns structured JSON (Anthropic tool call, model from `ANTHROPIC_MODEL`). 3. `validateGrade`: exact criterion ids, scores 0–100, every evidence/`correct` quote must literally appear in the user's answer, topic ids must belong to the question. 4. Overall = Σ weight·score / Σ weight, computed in `weightedOverall`. 5. One repair retry carrying the validation errors, then a recoverable error (the attempt is saved with `status=error`).
Without `ANTHROPIC_API_KEY` the `DemonstrationProvider` (keyword overlap) is used, labeled in the UI and excluded from progress, best scores and comparisons.

## Ranking
`src/lib/ranking.ts` — deterministic weights (discipline 30, role 15, reviewed company 10/15, topic overlap up to 20, difficulty fit 10/5, weak topic up to ~12, unanswered +5, repeat penalty, topic-diversity penalty). Each recommendation carries up to three plain-language reasons.

## Speech
`/api/transcribe` accepts a ≤10 MB audio blob, calls the OpenAI transcription API (configurable model), returns text, and discards the audio. The browser lets users edit the transcript before submitting. Not configured ⇒ the UI says so and typed answers work normally.

## Deployment prerequisites (not done in Mark 1)
Swap SQLite for a hosted database (change the Prisma datasource/adapter), set `NEXTAUTH_SECRET`/`NEXTAUTH_URL`, provide API keys as server env vars, move rate limiting/login throttle to a shared store, add email verification/password reset, and do not run the demo seed.
