<!-- SPDX-License-Identifier: MIT -->

# Contributing

Thanks for your interest! This is a **Bun-workspaces monorepo** of five small
Express 5 microservices (the freeCodeCamp Back End Development and APIs
certification projects). It's deliberately approachable — a good place for a
first open-source PR.

## Project layout

Five services live at the repo root (`exercise-tracker/`, `file-metadata/`,
`header-parser/`, `timestamp/`, `url-shortener/`), wired together by a single
root `package.json` (Bun [workspaces](https://bun.sh/docs/install/workspaces))
and one root `bun.lock`. Mintlify docs live in `docs/`.

Each service splits into:

- `app.js` — an exported `createApp()` factory (testable, Worker-reusable)
- `index.js` — the listen-only entrypoint
- `swagger.js` + `gen-openapi.js` — the **single** OpenAPI generator
  (`swagger-jsdoc`) and the writer that emits `openapi.json`
- `test/` — `bun:test` + `supertest` HTTP tests

## Prerequisites

- [Bun](https://bun.sh) `1.3+` (the only required toolchain)
- For `exercise-tracker` tests: nothing extra — they use
  `mongodb-memory-server` (the first run downloads a MongoDB binary)

## Local workflow

```bash
bun install                 # one lockfile installs all five services
cd timestamp && bun run dev # run one service (watch mode)

bun test                    # run every service's tests
cd file-metadata && bun test  # run one service's tests

bun run ci                  # Biome lint/format check (matches CI)
bun run sync-docs           # regenerate OpenAPI specs + copy into docs/specs/
bun run spectral            # lint the generated specs
```

`lefthook` runs Biome on staged files before each commit.

## Pull requests

- Branch from `main`; keep PRs focused on one service or concern.
- Use **Conventional Commits** for PR titles (`feat:`, `fix:`, `docs:`,
  `test:`, `chore:`) — release-please builds the changelog from them.
- Make sure `bun run ci` and `bun test` are green. If you touch a route, update
  its `swagger.js` annotations and run `bun run sync-docs`.
- New behaviour needs a test. Adding the **missing tests** for under-covered
  routes is an explicitly welcome
  [good first issue](https://github.com/aliammari1/freecodecamp-portfolio/labels/good%20first%20issue).

## Reporting bugs / security

Open an issue for bugs and feature ideas. For anything security-sensitive,
follow [`SECURITY.md`](SECURITY.md) instead of filing a public issue.

By contributing you agree your work is licensed under the project's
[MIT License](LICENSE).
