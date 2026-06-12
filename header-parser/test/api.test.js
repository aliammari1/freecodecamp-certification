const { describe, it, expect } = require("bun:test");
const request = require("supertest");
const { createApp } = require("../app");

const app = createApp();

describe("Header Parser API", () => {
  it("GET /api/hello returns greeting", async () => {
    const res = await request(app).get("/api/hello");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ greeting: "hello API" });
  });

  it("GET /api/whoami echoes request headers", async () => {
    const res = await request(app)
      .get("/api/whoami")
      .set("Accept-Language", "en-US,en;q=0.9")
      .set("User-Agent", "test-agent/1.0")
      .set("X-Forwarded-For", "203.0.113.5");
    expect(res.status).toBe(200);
    expect(res.body.language).toBe("en-US,en;q=0.9");
    expect(res.body.software).toBe("test-agent/1.0");
    expect(res.body.ipaddress).toBe("203.0.113.5");
  });

  it("GET /api/whoami falls back to socket address without XFF", async () => {
    const res = await request(app)
      .get("/api/whoami")
      .set("User-Agent", "test-agent/1.0");
    expect(res.status).toBe(200);
    expect(typeof res.body.ipaddress).toBe("string");
    expect(res.body.ipaddress.length).toBeGreaterThan(0);
  });

  it("GET /api-docs.json exposes the OpenAPI spec", async () => {
    const res = await request(app).get("/api-docs.json");
    expect(res.status).toBe(200);
    expect(res.body.info.title).toBe("Header Parser API");
  });
});
