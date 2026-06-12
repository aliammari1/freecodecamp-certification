const { describe, it, expect } = require("bun:test");
const request = require("supertest");
const { createApp } = require("../app");

const app = createApp();

describe("Timestamp API", () => {
  it("GET /api/hello returns greeting", async () => {
    const res = await request(app).get("/api/hello");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ greeting: "hello API" });
  });

  it("GET /api/ returns current unix + utc", async () => {
    const res = await request(app).get("/api/");
    expect(res.status).toBe(200);
    expect(typeof res.body.unix).toBe("number");
    expect(typeof res.body.utc).toBe("string");
  });

  it("GET /api/:date parses an ISO date", async () => {
    const res = await request(app).get("/api/2015-12-25");
    expect(res.status).toBe(200);
    expect(res.body.unix).toBe(Date.UTC(2015, 11, 25));
    expect(res.body.utc).toBe("Fri, 25 Dec 2015 00:00:00 GMT");
  });

  it("GET /api/:date parses a unix millisecond timestamp", async () => {
    const res = await request(app).get("/api/1450137600000");
    expect(res.status).toBe(200);
    expect(res.body.unix).toBe(1450137600000);
  });

  it("GET /api/:date returns error for invalid date", async () => {
    const res = await request(app).get("/api/not-a-date");
    expect(res.body).toEqual({ error: "Invalid Date" });
  });

  it("GET /api-docs.json exposes the OpenAPI spec", async () => {
    const res = await request(app).get("/api-docs.json");
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe("3.0.0");
    expect(res.body.info.title).toBe("Timestamp API");
  });
});
