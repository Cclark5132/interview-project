# Build status — Mark 1

Last updated 2026-10-03.

## Completed
- Scaffold: Next.js 16 / React 19 / TS / Tailwind 4 / Prisma 7 + SQLite / next-auth v4 / zod; CI workflow
- Schema + migration; table-driven taxonomy (11 disciplines, 29 topics, 10 roles, 11 companies)
- 34 original draft questions with weighted rubrics (≈4 criteria each) and ideal answers; none approved
- Auth (register/login, user isolation, throttle), server-enforced admin authorization
- Ranking with transparent weights and reasons; library filters; honest relevance labels
- Onboarding with job-description extraction (heuristic always; AI when keyed), cached, editable
- Question workspace, recorder + transcription adapter (OpenAI), evaluation cards, retries, reveal flow, assisted marking, comparison
- Grading contract: schema validation, verbatim evidence checks, server-side weighted overall, one repair retry, demonstration provider
- Progress page; bookmarks
- Owner panel: CRUD, filters, import (JSON/CSV), workflow + publish checks, rubric versioning, grading preview
- Isolated static demo preview
- Docs: README, CLAUDE.md, ARCHITECTURE, IMPORT_SCHEMA, example import

## Verification
- `npm run lint`, `typecheck`, `test` (39 tests: unit + DB integration), `build`: see final run in the session summary
- Real-browser check (built-in browser pane): login, onboarding + extraction, recommendations, answer + evaluation card (demonstration mode), reveal flow, admin approve flow, admin 404/403 for non-admins, draft direct URL 404, desktop and 375px mobile (no horizontal overflow). Fixed a hydration mismatch found in the recorder.

## Not verified / blockers
- **Live grading** and **live transcription** have not been run against the real APIs (no keys in this environment). Provider code is covered by controlled tests only. Verify the configured `ANTHROPIC_MODEL` id and the OpenAI transcription model against current provider docs when adding keys.
- **Microphone capture** was not exercised end-to-end (no microphone/permission in the test pane); the permission-denied, unsupported and not-configured paths are implemented but only partly exercised.
- No Playwright suite; browser checks were manual via the built-in browser pane.
- GitHub: private repo `Cclark5132/interview-project` created and pushed.
- Frontend Design plugin / Context7 were not available in this session; the visual direction was applied manually (warm neutrals, one muted teal accent, serif display type, tokens in `globals.css`).

## Next (not Mark 1)
Owner review of the 34 drafts; branding; hosted DB + deployment; email verification/password reset; shared rate limiting; resume personalization; finance/business taxonomy; mock interviews.
