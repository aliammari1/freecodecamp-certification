<!-- SPDX-License-Identifier: MIT -->

# Exercise Tracker API

Part of the [freeCodeCamp Backend API Portfolio](../README.md). An Express 5 +
MongoDB service for tracking users and their exercise logs. This is the only
**stateful** service in the monorepo.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/users` | Create a user (`username`) |
| `GET` | `/api/users` | List users |
| `POST` | `/api/users/:_id/exercises` | Add an exercise (`description`, `duration`, `date?`) |
| `GET` | `/api/users/:_id/logs` | Get a user's log (`?from`, `?to`, `?limit`) |
| `GET` | `/api-docs` | Scalar interactive reference |
| `GET` | `/api-docs.json` | Raw OpenAPI 3.0 spec |

## Run

```bash
MONGO_URI=mongodb://localhost:27017/exercises bun run start
```

## Test

```bash
bun test
```

Tests run against **`mongodb-memory-server`** — no external Mongo needed. The
first run downloads a MongoDB binary (cached afterwards). CI attaches a `mongo:7`
service container to this service's job only.

## Cloudflare D1 (demo path)

A [D1](https://developers.cloudflare.com/d1/) (edge SQLite) schema mirroring the
Mongo model lives in [`migrations/`](migrations/) for the Cloudflare demo. The
primary runtime remains MongoDB.

## What you'll learn

- Modelling nested documents with **Mongoose** (a user with an embedded `log[]`).
- Splitting **DB connection** (`index.js`) from the **app factory** (`app.js`)
  so handlers are testable against an in-memory Mongo.
- Async route handlers with proper `404`s and `try/catch → next(err)`.
- Query-param filtering (`from`/`to`/`limit`) over an embedded array.
