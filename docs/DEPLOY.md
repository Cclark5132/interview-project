# Deploying to betmetis.com (Vercel + Neon, free tiers)

Architecture: Vercel runs the Next.js app and redeploys on every push to `main`. Neon hosts Postgres. Spaceship holds the domain and DNS.

Note: Vercel's free **Hobby** plan is for non-commercial use. If betmetis.com starts charging or earning money, move to Vercel Pro (or another host).

## 1. Neon (database)
1. Sign up at https://neon.tech and create a project (region near your Vercel region, e.g. US East).
2. On the project dashboard open **Connect**. Copy two strings:
   - **Pooled connection** (host contains `-pooler`) → `DATABASE_URL`
   - **Direct connection** (toggle off "Connection pooling") → `DIRECT_URL`

## 2. Vercel (app)
1. Sign up at https://vercel.com with GitHub, **Add New → Project**, import `Cclark5132/interview-project`.
2. Framework: Next.js (auto-detected). **Build Command:** `npm run vercel-build` (applies migrations, then builds).
3. Environment variables (Production):

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon pooled string |
| `DIRECT_URL` | Neon direct string |
| `NEXTAUTH_URL` | `https://betmetis.com` |
| `NEXTAUTH_SECRET` | random 32+ bytes: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `ANTHROPIC_API_KEY` | optional; without it grading runs in labeled demonstration mode |
| `ANTHROPIC_MODEL` | optional, default `claude-sonnet-5-5` |
| `OPENAI_API_KEY` | optional; enables voice transcription |

Do **not** set `ADMIN_EMAIL`/`ADMIN_PASSWORD` or `DEMO_*` on Vercel.
4. Deploy. The first build creates the tables.

## 3. Create the owner account (one time, from your computer)
Taxonomy, 34 draft questions, and your admin login are created by `db:bootstrap`. Run it against Neon from the project folder (PowerShell):
```powershell
$env:DATABASE_URL = "<Neon direct string>"
$env:ADMIN_EMAIL = "you@example.com"
$env:ADMIN_PASSWORD = "<a strong password, 12+ chars>"
npm run db:bootstrap
```
Then sign in at the site → **Owner review** and approve questions. Nothing is visible to users until you do. Close the terminal afterwards so the secrets don't linger.

## 4. Domain (Spaceship → Vercel)
In Vercel: Project → **Settings → Domains** → add `betmetis.com` and `www.betmetis.com`. Vercel shows the exact records to use; the usual values are below.

In Spaceship: **Domains → betmetis.com → DNS** (keep Spaceship's default nameservers), delete any existing `A`/`AAAA`/`CNAME` for `@` and `www` (parking records), then add:

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | default (or 300) |
| CNAME | `www` | `cname.vercel-dns.com` | default (or 300) |

If Vercel displays different values for your project, use those instead. DNS usually propagates in minutes (up to a few hours); Vercel issues the HTTPS certificate automatically and shows a green check when ready. Set `betmetis.com` as primary and let `www` redirect to it.

## Operational notes
- Updates: push to `main` → Vercel redeploys and runs migrations.
- Rate limits, login throttling and grading locks live in the `RateLimit` table, so they hold across serverless instances. Limits: 24 gradings per 10 min and 120 per day per user, 60 per hour per IP, `GRADING_DAILY_CAP` site-wide per day (default 3000), 8 new guest sessions per hour per IP, plus caps on transcription and job-description parsing.
- Voice uploads are limited to 4 MB (Vercel request limit).
- Backups: Neon free tier keeps limited point-in-time history; export periodically (`pg_dump` with the direct string) before major changes.
