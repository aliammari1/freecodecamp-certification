// app.js — builds the Express app (no listen). Imported by index.js and tests.
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { pinoHttp } = require("pino-http");
const { apiReference } = require("@scalar/express-api-reference");
const { specs } = require("./swagger");

const isTest = process.env.NODE_ENV === "test";

function createApp() {
  const app = express();

  // header-parser reads X-Forwarded-For, so trust the first proxy hop.
  app.set("trust proxy", 1);

  // Security headers (CSP disabled — the Scalar playground loads inline assets).
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ optionsSuccessStatus: 200 }));

  // Structured request logging (silent under test to keep output clean).
  app.use(pinoHttp({ enabled: !isTest }));

  // Basic abuse protection; relaxed/disabled while testing.
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

  app.use(express.static("public"));

  app.get("/", (_req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
  });

  app.get("/api/hello", (_req, res) => {
    res.json({ greeting: "hello API" });
  });

  /**
   * @swagger
   * /api/whoami:
   *   get:
   *     summary: Get requester information
   *     description: Returns IP address, language, and software info from request headers
   *     responses:
   *       200:
   *         description: Requester information retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ipaddress:
   *                   type: string
   *                   description: Client IP address
   *                 language:
   *                   type: string
   *                   description: Accepted languages
   *                 software:
   *                   type: string
   *                   description: User agent string
   */
  app.get("/api/whoami", (req, res) => {
    res.json({
      ipaddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      language: req.headers["accept-language"],
      software: req.headers["user-agent"],
    });
  });

  return app;
}

module.exports = { createApp };
