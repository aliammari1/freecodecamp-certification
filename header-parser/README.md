<!-- SPDX-License-Identifier: MIT -->

# Request Header Parser Microservice

Part of the [freeCodeCamp Backend API Portfolio](../README.md). An Express 5
service that echoes the caller's IP address, preferred language, and user-agent.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/whoami` | `{ ipaddress, language, software }` |
| `GET` | `/api/hello` | Health check |
| `GET` | `/api-docs` | Scalar interactive reference |
| `GET` | `/api-docs.json` | Raw OpenAPI 3.0 spec |

```bash
curl localhost:3000/api/whoami
# {"ipaddress":"::1","language":"en-US","software":"curl/8.x"}
```

## Run & test

```bash
bun run dev
bun test
```

## What you'll learn

- Reading request headers (`accept-language`, `user-agent`).
- Resolving the client IP behind a proxy via `x-forwarded-for`, with a fallback
  to `req.socket.remoteAddress`.
- How tiny a useful HTTP service can be — and still deserves tests + an OpenAPI spec.
