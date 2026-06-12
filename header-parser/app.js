// app.js — builds the Express app (no listen). Imported by index.js and tests.
const express = require("express");
const cors = require("cors");
const { apiReference } = require("@scalar/express-api-reference");
const { specs } = require("./swagger");

function createApp() {
  const app = express();

  app.use(cors({ optionsSuccessStatus: 200 }));

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
