<!-- SPDX-License-Identifier: MIT -->

# URL Shortener Microservice

Part of the [freeCodeCamp Backend API Portfolio](../README.md). An Express 5
service that validates a URL and 302-redirects to it via a short code.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/shorturl` | Body `url=...` → `{ original_url, short_url }` |
| `GET` | `/api/shorturl` | Last shortened URL |
| `GET` | `/api/shorturl/:short_url` | 302 redirect to the original URL |
| `GET` | `/api/hello` | Health check |
| `GET` | `/api-docs` | Scalar interactive reference |
| `GET` | `/api-docs.json` | Raw OpenAPI 3.0 spec |

```bash
curl -d "url=https://www.freecodecamp.org" localhost:3000/api/shorturl
# {"original_url":"https://www.freecodecamp.org","short_url":1}
```

## Run & test

```bash
bun run dev
bun test
```

## Security note

Only `http`/`https` URLs are accepted, and the redirect endpoint **re-validates**
the stored URL before issuing the `302` — so the service can't be turned into an
open redirect to `javascript:`/`data:`/`file:` schemes. Tests cover both guards.

> Following the FCC spec, the current build keeps the last URL in memory. A
> Cloudflare **D1** schema for persisting many short URLs is scaffolded in
> [`migrations/`](migrations/).

## What you'll learn

- Validating user-supplied URLs and the **open-redirect** risk class.
- Parsing form-encoded bodies with Express 5's built-in `express.urlencoded()`.
- Issuing redirects with the correct status (`302`) and `Location` header.
