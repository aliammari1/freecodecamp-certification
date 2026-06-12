const { describe, it, expect } = require("bun:test");
const request = require("supertest");
const { createApp } = require("../app");

describe("URL Shortener API", () => {
  it("GET /api/hello returns greeting", async () => {
    const res = await request(createApp()).get("/api/hello");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ greeting: "hello API" });
  });

  it("POST /api/shorturl shortens a valid https URL", async () => {
    const res = await request(createApp())
      .post("/api/shorturl")
      .type("form")
      .send({ url: "https://www.freecodecamp.org" });
    expect(res.status).toBe(200);
    expect(res.body.original_url).toBe("https://www.freecodecamp.org");
    expect(res.body.short_url).toBe(1);
  });

  it("POST /api/shorturl rejects an invalid URL", async () => {
    const res = await request(createApp())
      .post("/api/shorturl")
      .type("form")
      .send({ url: "ftp://nope" });
    expect(res.body).toEqual({ error: "invalid url" });
  });

  it("POST /api/shorturl rejects a javascript: scheme (open-redirect guard)", async () => {
    const res = await request(createApp())
      .post("/api/shorturl")
      .type("form")
      .send({ url: "javascript:alert(1)" });
    expect(res.body).toEqual({ error: "invalid url" });
  });

  it("GET /api/shorturl/:short_url redirects after shortening", async () => {
    const app = createApp();
    await request(app)
      .post("/api/shorturl")
      .type("form")
      .send({ url: "https://example.com" });
    const res = await request(app).get("/api/shorturl/1");
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("https://example.com");
  });

  it("GET /api/shorturl returns error before any URL is stored", async () => {
    const res = await request(createApp()).get("/api/shorturl");
    expect(res.body).toEqual({ error: "invalid url" });
  });

  it("GET /api-docs.json exposes the OpenAPI spec", async () => {
    const res = await request(createApp()).get("/api-docs.json");
    expect(res.status).toBe(200);
    expect(res.body.info.title).toBe("URL Shortener API");
  });
});
