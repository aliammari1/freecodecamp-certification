<!-- SPDX-License-Identifier: MIT -->

# Timestamp Microservice

Part of the [freeCodeCamp Backend API Portfolio](../README.md). An Express 5
service that converts between date strings and Unix timestamps.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/:date` | Convert an ISO date (`YYYY-MM-DD`) **or** a Unix-ms string |
| `GET` | `/api/` | Current timestamp |
| `GET` | `/api/hello` | Health check (`{ "greeting": "hello API" }`) |
| `GET` | `/api-docs` | Scalar interactive reference |
| `GET` | `/api-docs.json` | Raw OpenAPI 3.0 spec |

```bash
curl localhost:3000/api/2020-01-01
# {"unix":1577836800000,"utc":"Wed, 01 Jan 2020 00:00:00 GMT"}
```

## Run & test

```bash
bun run dev          # node --watch
bun test             # supertest HTTP tests
bun run openapi      # regenerate openapi.json
```

## Cloudflare Workers (proof of concept)

This stateless service also ships a [Hono](https://hono.dev) Worker:

```bash
bunx wrangler dev            # local workerd
bunx wrangler deploy         # needs a Cloudflare account
```

See [`worker.js`](worker.js) and [`wrangler.toml`](wrangler.toml).

## What you'll learn

- Why **route order matters** (`/api/hello` must be registered before the
  `/api/:date` param route, or it gets parsed as a date).
- Robust date parsing: try `new Date(str)`, fall back to `new Date(+str)`,
  and detect `Invalid Date` via `Number.isNaN(date.getTime())`.
- Running the **same logic on two runtimes** — Node/Express and a Hono Worker.
