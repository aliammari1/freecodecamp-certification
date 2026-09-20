import { describe, expect, it } from "bun:test";
import app from "../worker.js";

describe("Timestamp Worker (Hono / Cloudflare)", () => {
  it("GET /api/hello returns greeting", async () => {
    const res = await app.request("/api/hello");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ greeting: "hello API" });
  });

  it("GET /api/:date parses an ISO date", async () => {
    const res = await app.request("/api/2020-01-01");
    const body = await res.json();
    expect(body.unix).toBe(Date.UTC(2020, 0, 1));
  });

  it("GET /api/:date returns error for invalid date", async () => {
    const res = await app.request("/api/not-a-date");
    expect(await res.json()).toEqual({ error: "Invalid Date" });
  });

  it("GET /api/ returns the current timestamp", async () => {
    const res = await app.request("/api/");
    const body = await res.json();
    expect(typeof body.unix).toBe("number");
    expect(typeof body.utc).toBe("string");
  });
});
