<!-- SPDX-License-Identifier: MIT -->

# freeCodeCamp Backend API Portfolio

> Five freeCodeCamp **Back End Development and APIs** certification microservices,
> rebuilt as one **Bun workspace** monorepo on **Express 5** — with real tests,
> a single OpenAPI generator, a Scalar playground per service, and Mintlify docs.

![freecodecamp-portfolio](assets/banner.svg)

<!-- TODO: replace the placeholder banner.svg with a generated raster hero +
     1280×640 social preview (brandkit / imagegen). Art direction in BANNER.md. -->

[![CI](https://github.com/aliammari1/freecodecamp-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/aliammari1/freecodecamp-portfolio/actions/workflows/ci.yml)
[![Bun](https://img.shields.io/badge/Bun-1.3-f9f1e1?style=flat-square&logo=bun)](https://bun.sh)
[![Express](https://img.shields.io/badge/Express-5-404040?style=flat-square&logo=express)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## What's inside

| Service | What it does | Stateful? | What you'll learn |
|---|---|---|---|
| [`exercise-tracker`](exercise-tracker/) | Users + exercise logs with date/limit filters | **MongoDB** | Mongoose modelling, async route handlers, query filtering |
| [`file-metadata`](file-metadata/) | Upload a file, get name/type/size back | no | `multer` uploads done safely (no path traversal) |
| [`header-parser`](header-parser/) | Echo the caller's IP / language / user-agent | no | Reading request headers, proxy `X-Forwarded-For` |
| [`timestamp`](timestamp/) | Convert dates ⇄ Unix timestamps | no | Date parsing/formatting, route ordering |
| [`url-shortener`](url-shortener/) | Validate a URL and 302-redirect to it | no | URL validation, open-redirect defence |

This really is a **monorepo**: a root `package.json` declares Bun
[workspaces](https://bun.sh/docs/install/workspaces) over the five services with a
single root `bun.lock`. Each service splits into `app.js` (an exported
`createApp()` factory — testable + Worker-reusable) and `index.js` (the
listen-only entrypoint).

## Quick start

```bash
# install everything (one lockfile, all services)
bun install

# run a service (each defaults to PORT 3000)
cd timestamp && bun run dev      # or: bun run start

# exercise-tracker needs a Mongo connection string
cd exercise-tracker && MONGO_URI=mongodb://localhost:27017/exercises bun run start
```

## Live demo

The stateless **timestamp** service runs on the **Cloudflare Workers** free tier
(Hono on `workerd`), so there's a zero-cost, always-on endpoint to try:

```bash
# once deployed (bunx wrangler deploy from timestamp/):
curl https://fcc-timestamp.<your-subdomain>.workers.dev/api/2020-01-01
# {"unix":1577836800000,"utc":"Wed, 01 Jan 2020 00:00:00 GMT"}
```

Steps: `cd timestamp && bunx wrangler deploy` (needs a free Cloudflare account;
config in [`timestamp/wrangler.toml`](timestamp/wrangler.toml)). The same can be
driven from CI by setting `ENABLE_CF_DEPLOY=true` + `CLOUDFLARE_API_TOKEN`
(see [`deploy-timestamp.yml`](.github/workflows/deploy-timestamp.yml)). The
**Mintlify** docs site doubles as a hosted, interactive API playground.

> The two **stateful** services (`exercise-tracker`, `url-shortener`) ship
> **Cloudflare D1** (edge SQLite) migrations under `migrations/` for an edge
> demo path, but MongoDB / in-memory remain the primary runtimes — see
> *Engineering decisions* below.

## API documentation

- **Interactive playground** — every service serves a
  [Scalar](https://scalar.com) API reference at **`/api-docs`** and the raw
  OpenAPI 3.0 spec at **`/api-docs.json`**.
- **Hosted docs** — [Mintlify](https://mintlify.com) site under [`docs/`](docs/)
  (`docs/docs.json`), with each service's API reference backed by its committed
  OpenAPI spec (`docs/specs/*.json`). Preview locally with
  `bunx mint dev` inside `docs/`.

OpenAPI is generated from **one** source — `swagger-jsdoc` annotations on the
routes (the old `swagger-autogen` second generator and the hand-rolled
`docs/index.html` were removed). Regenerate + sync the docs specs with:

```bash
bun run sync-docs    # runs `bun run openapi` then copies specs into docs/specs/
bun run spectral     # lint the generated specs
```

## Testing

```bash
bun test                          # everything
cd file-metadata && bun test      # one service
```

- HTTP tests use **`bun:test` + `supertest`** against `createApp()`.
- `exercise-tracker` runs against **`mongodb-memory-server`** (the first run
  downloads a MongoDB binary).
- CI also runs **Schemathesis** contract fuzzing against each `/api-docs.json`.

## Tooling

- **Lint/format:** [Biome](https://biomejs.dev) — `bun run ci`.
- **CI:** matrix over the 5 services on `oven-sh/setup-bun` →
  `bun install --frozen-lockfile` → Biome → `bun test --coverage` (Codecov
  per-service flags). A `mongo:7` service container is attached **only** to the
  exercise-tracker leg; the other four are stateless.
- **Security/supply-chain:** CodeQL, Trivy (the five Bun images), Renovate,
  release-please (manifest mode), `lefthook` git hooks. Actions are SHA-pinned.
- **AI:** `claude-code-action` PR review tuned to the file-metadata path-traversal
  and url-shortener open-redirect surfaces (gated on `ANTHROPIC_API_KEY`).

## Engineering decisions

- **MIT.** These are learning APIs meant to be read and forked, so the previous
  per-service "Commercial Use License" was replaced with a single MIT license
  (SPDX headers throughout).
- **One OpenAPI generator.** `swagger-jsdoc` keeps the spec next to the routes;
  shipping a second generator (`swagger-autogen`) just produced drift.
- **Scalar over swagger-ui-express** for a lighter, modern local playground.
- **Cloudflare (proof, not full migration).** The stateless `timestamp` service
  ships a working **Hono Worker** (`timestamp/worker.js` + `wrangler.toml`,
  validated with `wrangler deploy --dry-run`). D1 (edge SQLite) migrations are
  scaffolded for the `exercise-tracker`/`url-shortener` demo paths, but **MongoDB
  remains the primary runtime** — the full Express→Workers port for the stateful
  services is intentionally deferred. The deploy workflow is gated on
  `ENABLE_CF_DEPLOY` + `CLOUDFLARE_API_TOKEN`, so it never runs without an account.

## Contributing & community

PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md). The friendliest way in is the
**[good first issues](https://github.com/aliammari1/freecodecamp-portfolio/labels/good%20first%20issue)**:
several routes are still under-tested, and adding those tests is a perfect first
open-source PR. Questions about the underlying curriculum belong on the
[freeCodeCamp forum — Backend Development](https://forum.freecodecamp.org/c/backend-development/15).

**Repo topics:** `freecodecamp` · `bun` · `express` · `openapi` · `mongodb`
(plus `microservices`, `monorepo`, `cloudflare-workers`).

## License

[MIT](LICENSE) © Ali Ammari

## Author

**Ali Ammari** — [@aliammari1](https://github.com/aliammari1) ·
ammari.ali.0001@gmail.com

---

*Built for the freeCodeCamp Back End Development and APIs certification.*
