
## Deployment (added after Mark 1)
Switched SQLite → Postgres for serverless hosting (Vercel + Neon). Local dev and tests use embedded Postgres. See `docs/DEPLOY.md`. The site is live only after the owner creates the Vercel/Neon accounts and points DNS.

## Access change
Public sign-up removed; anonymous guest sessions for the proof of concept; owner-only login. All 34 sample questions approved on production by the owner request.
