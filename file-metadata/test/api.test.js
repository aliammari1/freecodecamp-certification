const { describe, it, expect } = require("bun:test");
const request = require("supertest");
const { createApp } = require("../app");

const app = createApp();

describe("File Metadata API", () => {
  it("POST /api/fileanalyse returns metadata for an uploaded file", async () => {
    const content = Buffer.from("hello freecodecamp");
    const res = await request(app)
      .post("/api/fileanalyse")
      .attach("upfile", content, {
        filename: "notes.txt",
        contentType: "text/plain",
      });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("notes.txt");
    expect(res.body.type).toBe("text/plain");
    expect(res.body.size).toBe(content.length);
  });

  it("POST /api/fileanalyse rejects requests with no file", async () => {
    const res = await request(app).post("/api/fileanalyse");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("No file uploaded");
  });

  it("GET /api/fileanalyse returns the last uploaded file metadata", async () => {
    const content = Buffer.from("second upload");
    await request(app)
      .post("/api/fileanalyse")
      .attach("upfile", content, { filename: "second.bin" });
    const res = await request(app).get("/api/fileanalyse");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("second.bin");
  });

  it("does not derive the stored path from a traversal filename", async () => {
    // multer stores under a random name in uploads/, never under the supplied
    // filename, so a traversal payload cannot escape the upload directory. The
    // reported `name` is only metadata (here reduced to its basename in transit).
    const res = await request(app)
      .post("/api/fileanalyse")
      .attach("upfile", Buffer.from("x"), {
        filename: "../../etc/passwd",
      });
    expect(res.status).toBe(200);
    expect(res.body.name).not.toContain("..");
    expect(res.body.name).not.toContain("/");
  });

  it("GET /api-docs.json exposes the OpenAPI spec", async () => {
    const res = await request(app).get("/api-docs.json");
    expect(res.status).toBe(200);
    expect(res.body.info.title).toBe("File Metadata API");
  });
});
