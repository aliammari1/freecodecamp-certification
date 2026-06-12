// app.js — builds the Express app (no listen). Imported by index.js and tests.
const express = require("express");
const cors = require("cors");
const { apiReference } = require("@scalar/express-api-reference");
const { specs } = require("./swagger");

function createApp() {
  const app = express();

  // enable CORS so the API is remotely testable by freeCodeCamp
  app.use(cors({ optionsSuccessStatus: 200 }));

  // OpenAPI spec + Scalar interactive playground
  app.get("/api-docs.json", (_req, res) => res.json(specs));
  app.use(
    "/api-docs",
    apiReference({ url: "/api-docs.json", theme: "purple" }),
  );

  app.use(express.static("public"));

  app.get("/", (_req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
  });

  /**
   * @swagger
   * /api/hello:
   *   get:
   *     summary: Hello API
   *     description: A simple greeting endpoint for testing
   *     responses:
   *       200:
   *         description: Greeting returned successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 greeting:
   *                   type: string
   */
  app.get("/api/hello", (_req, res) => {
    res.json({ greeting: "hello API" });
  });

  /**
   * @swagger
   * /api/{date}:
   *   get:
   *     summary: Convert date to timestamp
   *     description: Converts a date string or Unix timestamp to both formats
   *     parameters:
   *       - in: path
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *         description: Date string (YYYY-MM-DD) or Unix timestamp
   *     responses:
   *       200:
   *         description: Date converted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 unix:
   *                   type: integer
   *                   description: Unix timestamp in milliseconds
   *                 utc:
   *                   type: string
   *                   description: UTC date string
   *       400:
   *         description: Invalid date format
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
  app.get("/api/:date", (req, res) => {
    let date = new Date(req.params.date);
    if (Number.isNaN(date.getTime())) date = new Date(+req.params.date);
    if (Number.isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  });

  /**
   * @swagger
   * /api:
   *   get:
   *     summary: Get current timestamp
   *     description: Returns the current date in both Unix and UTC formats
   *     responses:
   *       200:
   *         description: Current timestamp retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 unix:
   *                   type: integer
   *                 utc:
   *                   type: string
   */
  app.get("/api/", (_req, res) => {
    const date = new Date();
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  });

  return app;
}

module.exports = { createApp };
