const {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} = require("bun:test");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { createApp, Log } = require("../app");

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  app = createApp();
}, 120000); // first run may download the MongoDB binary

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
}, 30000);

beforeEach(async () => {
  await Log.deleteMany({});
});

describe("Exercise Tracker API", () => {
  async function createUser(username = "alice") {
    const res = await request(app)
      .post("/api/users")
      .type("form")
      .send({ username });
    return res.body;
  }

  it("POST /api/users creates a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .type("form")
      .send({ username: "bob" });
    expect(res.status).toBe(200);
    expect(res.body.username).toBe("bob");
    expect(res.body._id).toBeDefined();
  });

  it("GET /api/users lists users", async () => {
    await createUser("carol");
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((u) => u.username === "carol")).toBe(true);
  });

  it("POST /api/users/:_id/exercises adds an exercise", async () => {
    const user = await createUser("dave");
    const res = await request(app)
      .post(`/api/users/${user._id}/exercises`)
      .type("form")
      .send({ description: "run", duration: "30", date: "2020-01-01" });
    expect(res.status).toBe(200);
    expect(res.body.username).toBe("dave");
    expect(res.body.description).toBe("run");
    expect(res.body.duration).toBe(30);
    expect(res.body.date).toBe("Wed Jan 01 2020");
    expect(res.body._id).toBe(user._id);
  });

  it("POST exercises returns 404 for unknown user", async () => {
    const res = await request(app)
      .post(`/api/users/${new mongoose.Types.ObjectId()}/exercises`)
      .type("form")
      .send({ description: "run", duration: "30" });
    expect(res.status).toBe(404);
  });

  it("GET /api/users/:_id/logs returns the exercise log", async () => {
    const user = await createUser("erin");
    await request(app)
      .post(`/api/users/${user._id}/exercises`)
      .type("form")
      .send({ description: "swim", duration: "45", date: "2021-06-01" });
    const res = await request(app).get(`/api/users/${user._id}/logs`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe("erin");
    expect(res.body.count).toBe(1);
    expect(res.body.log[0].description).toBe("swim");
  });

  it("GET logs honours the limit query parameter", async () => {
    const user = await createUser("frank");
    for (const d of ["2021-01-01", "2021-02-01", "2021-03-01"]) {
      await request(app)
        .post(`/api/users/${user._id}/exercises`)
        .type("form")
        .send({ description: "x", duration: "10", date: d });
    }
    const res = await request(app).get(`/api/users/${user._id}/logs?limit=2`);
    expect(res.body.count).toBe(2);
  });

  it("GET /api-docs.json exposes the OpenAPI spec", async () => {
    const res = await request(app).get("/api-docs.json");
    expect(res.status).toBe(200);
    expect(res.body.info.title).toBe("Exercise Tracker API");
  });
});
