<!-- SPDX-License-Identifier: MIT -->

# Growth & Discoverability Kit

Everything needed to position this repo as a **template/starter** and make it
discoverable. The code work is done — this file is the distribution checklist
(items marked 👤 need the GitHub account owner).

## GitHub repo settings 👤

- **Flip the "Template repository" flag** (Settings → General → Template
  repository). Starters over-index on stars because people star to
  bookmark-for-reuse — and the README already frames it as "Use this template".
- **About / description** (keyword-rich, searchable):

  > Production-ready Express 5 + Bun API starter — the 5 official freeCodeCamp
  > Backend cert projects, with OpenAPI docs, bun:test tests, Docker & security
  > middleware (helmet, rate-limit, Zod). Use as a template.

- **Topics** (8–12, exact-match search terms):

  ```
  freecodecamp  freecodecamp-projects  express  bun  openapi
  mongodb  api  starter-template  monorepo  cloudflare-workers
  rest-api  nodejs
  ```

- **Social preview:** export `assets/social-preview.png` (prompt in
  [`BANNER.md`](BANNER.md)) and upload under Settings → Social preview.

## Content / launch posts 👤

A personal-story angle ("I built all 5 fCC Backend cert APIs as one Bun
monorepo") consistently out-performs feature lists.

- **dev.to / Hashnode article** — *"I rebuilt all 5 freeCodeCamp Backend cert
  projects as a single Bun + Express 5 monorepo (with OpenAPI, tests & Docker)"*.
  Cover: why a monorepo + one lockfile, the `createApp()` factory pattern
  (testable + Worker-reusable), the single `swagger-jsdoc` OpenAPI source, and
  the per-service security middleware. End with the "Use this template" CTA and
  the live Cloudflare Workers timestamp demo. Set `canonical_url` if cross-posting.
- **freeCodeCamp forum — Backend Development** category: a "Show & tell" thread
  pointing learners at the repo as a worked reference for the certification, with
  the interactive Scalar/Mintlify playground link.
- **Optional:** Show HN / r/node with the same story title; reply to comments
  within the hour.

## Suggested scaffolder (optional, future) 👤

Publish an `npx create-fcc-backend` CLI that scaffolds a single chosen service
(or all five) from this repo as the canonical starter — turns the template into
an installable artifact that funnels stars back here. Pair with the
Template-repo flag above.

## Cross-linking

The README footer links to sibling repos (github-traffic-analytics, JobPrep,
readrealm). Add this repo to the author's profile-README hub and any
"Related projects" footers on those repos for reciprocal discovery.

## Status checklist

- [x] README repositioned as an Express 5 + Bun **API starter** + "Use this template" framing
- [x] "▶ Try the API" buttons (live CF Workers timestamp + Scalar/Mintlify playground)
- [x] Per-service "What you'll learn" (README table)
- [x] ⭐ star CTA + Related-projects cross-link footer
- [x] Security middleware shipped (helmet / rate-limit / Zod / pino-http / env validation)
- [ ] 👤 Template-repo flag flipped
- [ ] 👤 About + topics set
- [ ] 👤 Social preview uploaded
- [ ] 👤 dev.to + freeCodeCamp-forum posts published
- [ ] 👤 (optional) `npx create-fcc-backend` scaffolder published
