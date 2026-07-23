# CareOS — Client

The Next.js frontend for [CareOS](../README.md). Currently in early-access phase: a landing page and waitlist capture, ahead of the core product build.

[![Live Preview](https://img.shields.io/badge/Live_Preview-careos--sys.vercel.app-4F46E5?style=for-the-badge)](https://careos-sys.vercel.app/)

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui on **Base UI** (not Radix — see note below) |
| Animation | Framer Motion |
| Validation | Zod |
| Theming | next-themes |
| Package manager | pnpm |
| Deployment | Vercel |

**Typography**
- Display — Bricolage Grotesque
- Body — Manrope
- System / mono — Space Mono

> **Note on UI primitives:** this project is on shadcn's **Base UI** variant, not the more common Radix variant. That means composition uses a `render` prop (`<Trigger render={<Button />} />`) rather than `asChild`. If you're pulling in shadcn docs/examples, check which variant they assume — Radix examples using `asChild` will not compile as-is here.

## Getting Started

```bash
git clone [https://github.com/ishtiakalhumaidi/care-OS.git](https://github.com/ishtiakalhumaidi/care-OS.git)
cd careos/careos-client
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                # routes (App Router)
├── components/
│   ├── common/           # Nav, Logo, shared layout
│   ├── forms/             # form components (WaitlistForm, etc.)
│   └── ui/                # shadcn primitives + custom (ActivityFeed, FloatingBadges)
├── lib/
│   ├── validations/       # Zod schemas
│   └── utils.ts            # cn() helper
```

## Design Philosophy

The interface balances **engineered trust** with **childcare warmth** — Trust Indigo (`#4F46E5`) and Warm Coral for the two ends of that tension, a quiet systems grid as the "engineered" backdrop, and a live-feeling activity feed as the signature element rather than static feature lists. Built to avoid generic SaaS-template defaults; every structural choice (badges, feed, pillars) is meant to encode something true about running a childcare center, not decorate the page.

## Roadmap (Client)

- [x] Landing page — hero, live activity feed, waitlist capture, theme toggle
- [ ] Auth screens (once `careos-backend` exposes endpoints)
- [ ] Admin dashboard (RBAC-gated)
- [ ] Teacher / classroom views
- [ ] Parent portal

## Environment Variables

None required yet — this phase has no backend calls. Will be documented here once the waitlist form and auth connect to `careos-backend`.

## License

TBD
