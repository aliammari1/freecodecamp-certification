// app.js — builds the Express app (no listen). Imported by index.js and tests.
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const { rateLimit } = require("express-rate-limit");
const { pinoHttp } = require("pino-http");
const { apiReference } = require("@scalar/express-api-reference");
const { specs } = require("./swagger");

const isTest = process.env.NODE_ENV === "test";

function createApp() {
  const app = express();

  // multer stores uploads with a random generated filename in `uploads/`,
  // never deriving the on-disk path from the (untrusted) original filename —
  // this avoids path-traversal via crafted `originalname` values.
  const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB cap
  });

  let lastFile = {};

  // Security headers (CSP disabled — the Scalar playground loads inline assets).
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors());

  // Structured request logging (silent under test to keep output clean).
  app.use(pinoHttp({ enabled: !isTest }));

  // Basic abuse protection; disabled while testing.
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 1000,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      skip: () => isTest,
    }),
  );

  app.get("/api-docs.json", (_req, res) => res.json(specs));
  app.use(
    "/api-docs",
    apiReference({ url: "/api-docs.json", theme: "purple" }),
  );

  app.use("/public", express.static(`${process.cwd()}/public`));

  app.get("/", (_req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`);
  });

  /**
   * @swagger
   * /api/fileanalyse:
   *   post:
   *     summary: Upload and analyze file
   *     description: Upload a file and retrieve its metadata (name, type, size)
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               upfile:
   *                 type: string
   *                 format: binary
   *                 description: The file to upload
   *     responses:
   *       200:
   *         description: File metadata retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                   description: Original file name
   *                 type:
   *                   type: string
   *                   description: MIME type
   *                 size:
   *                   type: integer
   *                   description: File size in bytes
   *       400:
   *         description: No file uploaded
   */
  app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    lastFile = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    };
    res.json(lastFile);
  });

  /**
   * @swagger
   * /api/fileanalyse:
   *   get:
   *     summary: Get last uploaded file info
   *     description: Returns metadata of the most recently uploaded file
   *     responses:
   *       200:
   *         description: File metadata retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                 type:
   *                   type: string
   *                 size:
   *                   type: integer
   */
  app.get("/api/fileanalyse", (_req, res) => {
    res.json(lastFile);
  });

  return app;
}

module.exports = { createApp };
