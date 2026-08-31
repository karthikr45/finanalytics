# Akshara Finalytics — Website + CRM Portal

A premium, production-grade Next.js redesign of the Akshara Finalytics
website (a Hyderabad-based GST/Income-Tax/company-compliance consultancy),
with an embedded CRM / client portal (`/portal/*`) replacing the old
external "Akshara Connect" and "Invoice Login" links.

## What's here

- **Marketing site** — Home, About, Services hub + 12 individual service
  pages, a GST Consultants pillar page, Business Registrations, Contact,
  Pay Now, and legal pages, all built to a premium "financial advisory"
  design system (deep navy + emerald + warm gold, Fraunces/Plus Jakarta
  Sans typography, Framer Motion scroll reveals).
- **CRM portal** (`/portal/*`) — authenticated (NextAuth v5, Credentials +
  JWT sessions), role-gated (`CLIENT` / `STAFF` / `ADMIN`) via
  `src/middleware.ts`. Dashboard, Filings, Documents (upload/download),
  Invoices + Pay Now (Razorpay, demo-mode fallback), Payments history,
  Tickets, Clients (staff/admin) with internal notes, Leads inbox
  (staff/admin), Settings.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
  (the original brief specced Next 14; this repo already started on 16
  from an earlier iteration — strictly newer and fully compatible)
- **Tailwind CSS v4** (CSS-first theme — see `src/app/globals.css`)
- **A shadcn/ui-style component kit** in `src/components/ui/`, built
  directly on Radix UI primitives + `class-variance-authority` (the
  `shadcn` CLI itself needs network access this environment didn't have
  during the build; the components follow the same conventions)
- **Framer Motion**, **lucide-react**
- **React Hook Form + Zod** for all forms
- **NextAuth v5 (beta)** — Credentials provider, JWT sessions
- **Prisma 7 + PostgreSQL**, via `@prisma/adapter-pg` (Prisma 7 requires a
  driver adapter — see "Database" below)
- **TanStack Query** (client-side portal interactivity)
- **Razorpay** SDK (server) — runs in **demo mode** with no keys configured
- **Resend** (email) — runs in **mock mode** (logs to console) with no key
- Local filesystem storage for documents (`./uploads`, gitignored) — swap
  for S3 via the `S3_*` env vars in a real deployment

## Getting started

```bash
npm install

# Point DATABASE_URL (see .env.example) at a real Postgres instance, then:
npx prisma db push        # create the schema
npx prisma db seed        # demo services, users, filings, invoices, leads…

npm run dev                # http://localhost:3000
# or
npm run build && npm run start
```

Copy `.env.example` to `.env` and fill in what you have — every external
integration (email, payments, file storage) degrades gracefully to a mock
mode when its keys are blank, so the whole app runs end-to-end without any
of them configured.

### Demo logins (from the seed script)

| Role   | Email                          | Password    |
|--------|---------------------------------|-------------|
| Admin  | admin@aksharafinalytics.com    | `Admin@123` |
| Staff  | staff@aksharafinalytics.com    | `Staff@123` |
| Client | client@aksharafinalytics.com   | `Client@123`|

A second demo client (`anita@example.com` / `Client@123`) is seeded too, so
the staff/admin "Clients" list has more than one row to look at.

## Content — please review before shipping

`aksharafinalytics.com` was unreachable from the environment this was
built in (direct fetches and even generic internet access were blocked by
network policy). Content in `src/lib/site-content.ts` and
`src/lib/services-content.ts` was reconstructed from:

1. The scraped content block supplied in the build brief (home page copy,
   about page copy, the 13-item financial services list, contact/branch
   details, core values, vision/mission/motto) — used verbatim where
   given, rewritten for a more premium tone where noted as "generic".
2. Reasonable inference where the brief didn't specify (FAQ copy per
   service, the pricing/package tiers, testimonial avatars).

**No client counts, credentials, or claims were invented beyond what the
brief stated** ("5,000+ clients", "10+ years" are both from the brief).
Swap in exact copy from the live CMS/site before this replaces it in
production.

## Architecture notes & decisions

- **Prisma 7's driver-adapter requirement.** Prisma 7 removed the classic
  `datasource { url = env("DATABASE_URL") }` pattern in favor of driver
  adapters passed to `PrismaClient`. See `prisma.config.ts` (CLI) and
  `src/lib/prisma.ts` (runtime client) — both construct a `@prisma/adapter-pg`
  `Pool` from `DATABASE_URL`.
- **NextAuth v5 needs `trustHost: true` off Vercel.** Self-hosted deployments
  don't get Vercel's automatic trusted-host detection; without this,
  every auth request throws `UntrustedHost`. Set `AUTH_URL`/`NEXTAUTH_URL`
  to your real deployed origin in production.
- **Edge-safe vs. full auth config.** `src/lib/auth.config.ts` (no Prisma,
  no bcrypt — Edge-runtime safe) is used by `src/middleware.ts` for route
  gating; `src/lib/auth.ts` (Credentials provider, Prisma lookups) only
  runs in the Node runtime (API routes, Server Components).
- **Public "Pay Now" vs. portal invoice payments** are two separate flows.
  The public `/payments` page (`/api/payments/create-order`) doesn't
  require login and doesn't persist to the database — it's a quick-pay
  utility. Portal invoice payments (`/api/portal/invoices/[id]/pay`) are
  authenticated, create a `Payment` row, and mark the `Invoice` paid; a
  Razorpay webhook (`/api/payments/webhook`) is wired up with HMAC
  signature verification for when live keys are configured.
- **Services content lives in two places on purpose.** The rich per-service
  copy (`src/lib/services-content.ts`) drives the actual marketing pages
  via `generateStaticParams` — fast, works with no DB dependency, good for
  SEO. The Prisma `Service` model is also seeded (matching titles/slugs)
  so a future admin CMS has something to build on, per the original data
  model — the two aren't currently kept in sync automatically.
- **A known `npm audit` finding** (`deepmerge-ts`, via `@prisma/config`) is
  a build-time-only CLI dependency, not bundled into the running app. The
  only available fix is a major `prisma` downgrade that reintroduces the
  pre-driver-adapter API this project already migrated off of — left
  as-is rather than trading a tested setup for an untested older one.
- **shadcn/ui components were hand-built on Radix primitives**, not
  generated via the `shadcn` CLI (which needs to fetch from its registry
  over the network) — same conventions (`cn()`, CVA variants,
  `forwardRef`), just written directly.

## Environment variables

See `.env.example` for the full list with comments. Nothing beyond
`DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` is required for the
app to run in demo mode.
