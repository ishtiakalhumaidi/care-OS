# CareOS

**The Operating System for Modern Childcare.**

[![Live Preview](https://img.shields.io/badge/Live_Preview-careos--sys.vercel.app-4F46E5?style=for-the-badge)](https://careos-sys.vercel.app/)

CareOS is a B2B2C SaaS platform built for early childhood centers, kindergartens, and daycares — handling the operational, compliance, and communication work these centers are legally required to do. Built around strict Role-Based Access Control and complex many-to-many relational data (guardians, pickup authorizations, multi-branch enrollment).

## Repository Structure

This is a monorepo with two independently deployed apps:

```
careos/
├── careos-client/     # Next.js frontend — see careos-client/README.md
└── careos-backend/     # Node/Express API (not yet built)
```

Each app has its own README, `package.json`, and dependency tree. There is no shared workspace tooling (Turborepo/Nx) yet — that may be introduced once the backend exists and the two need shared types.

## Current Phase

Early access / landing page. Core product (auth, dashboards, RBAC) is not yet implemented — see the roadmap below.

## Roadmap

- [x] Phase 1 — High-fidelity landing page and waitlist capture (`careos-client`)
- [ ] Phase 2 — Relational schema (Prisma ERD): center, classroom, teacher, child, guardian
- [ ] Phase 3 — Modular backend (Node/Express, route → controller → service) with Zod validation
- [ ] Phase 4 — RBAC + auth (access/refresh tokens)
- [ ] Phase 5 — Core features: kiosk check-in, live ratio balancer, moments timeline, billing

## Getting Started

Each app is run independently — see its own README for setup:

- [`careos-client/README.md`](./careos-client/README.md)
- `careos-backend/README.md` (coming once the backend is scaffolded)

## License

TBD
