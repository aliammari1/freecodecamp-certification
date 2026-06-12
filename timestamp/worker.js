// worker.js — Cloudflare Workers entrypoint (proof-of-concept) for the
// stateless Timestamp service, using Hono. The Express app in app.js stays
// the primary runtime; this Worker re-implements the same three routes on
// workerd so the service can run on Cloudflare's free tier.
//
// Deploy with: bunx wrangler deploy   (config in wrangler.toml)
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());

app.get("/api/hello", (c) => c.json({ greeting: "hello API" }));

app.get("/api/", (c) => {
  const date = new Date();
  return c.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", (c) => {
  let date = new Date(c.req.param("date"));
  if (Number.isNaN(date.getTime())) date = new Date(+c.req.param("date"));
  if (Number.isNaN(date.getTime())) return c.json({ error: "Invalid Date" });
  return c.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/", (c) =>
  c.text("Timestamp microservice (Cloudflare Workers). See /api/."),
);

export default app;
