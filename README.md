# Akshara Finalytics — Website Redesign

A premium, fully responsive Next.js redesign of the Akshara Finalytics
website, with a focus on the **Services** page.

Built after `aksharafinalytics.com` turned out to be unreachable from this
environment's network; the service catalogue below was researched and
verified via web search, so copy/wording should be reviewed and swapped for
exact official copy before shipping.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme, see `src/app/globals.css`)
- **Framer Motion** for scroll reveals and the mobile menu
- **lucide-react** for icons

## Structure

- `src/app/page.tsx` — Home page
- `src/app/services/page.tsx` — Services page (filterable category tabs +
  10 service cards, process steps, stats, CTA)
- `src/components/` — Navbar (sticky, glass, mobile drawer), Footer,
  ServiceCard, ServicesExplorer (client-side category filter), ProcessSteps,
  StatsStrip, CTABanner, Reveal (scroll-in animation wrapper)
- `src/lib/services-data.ts` — All service copy, categories, stats, process
  steps and contact details in one place — edit here to update content
  without touching components

## Content

Service names and details are based on what Akshara Finalytics is publicly
known for (income tax, GST, company/partnership compliance, bookkeeping,
licenses, and IT/digital services) — update `src/lib/services-data.ts` with
the exact copy from the live site/CMS.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
```
