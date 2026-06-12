// app.js — builds the Express app (no listen). Imported by index.js and tests.
const express = require("express");
const cors = require("cors");
const { apiReference } = require("@scalar/express-api-reference");
const { specs } = require("./swagger");

// Only http/https URLs are accepted. This prevents the redirect endpoint from
// being abused for open-redirect to javascript:/data:/file: schemes.
const URL_REGEX =
  /^(https?):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;

function createApp() {
  const app = express();

  const store = { original_url: "", short_url: 1 };
  let hasUrl = false;

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));

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
   * /api/shorturl:
   *   post:
   *     summary: Create short URL
   *     description: Creates a shortened URL from a valid http(s) URL
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               url:
   *                 type: string
   *                 format: uri
   *                 description: The URL to shorten
   *     responses:
   *       200:
   *         description: URL shortened successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 original_url:
   *                   type: string
   *                 short_url:
   *                   type: integer
   *       400:
   *         description: Invalid URL
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
  app.post("/api/shorturl", (req, res) => {
    if (URL_REGEX.test(req.body.url)) {
      hasUrl = true;
      store.original_url = req.body.url;
      return res.json({
        original_url: store.original_url,
        short_url: store.short_url,
      });
    }
    hasUrl = false;
    res.json({ error: "invalid url" });
  });

  /**
   * @swagger
   * /api/shorturl:
   *   get:
   *     summary: Get last shortened URL
   *     description: Returns the most recently shortened URL
   *     responses:
   *       200:
   *         description: URL retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 original_url:
   *                   type: string
   *                 short_url:
   *                   type: integer
   *       400:
   *         description: Invalid URL
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
  app.get("/api/shorturl", (_req, res) => {
    if (hasUrl) {
      return res.json({
        original_url: store.original_url,
        short_url: store.short_url,
      });
    }
    res.json({ error: "invalid url" });
  });

  /**
   * @swagger
   * /api/shorturl/{short_url}:
   *   get:
   *     summary: Redirect to original URL
   *     description: Redirects to the original URL using the short URL code
   *     parameters:
   *       - in: path
   *         name: short_url
   *         required: true
   *         schema:
   *           type: integer
   *         description: The short URL code
   *     responses:
   *       302:
   *         description: Redirects to original URL
   *       400:
   *         description: Invalid URL
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   */
  app.get("/api/shorturl/:short_url", (_req, res) => {
    // Re-validate before redirecting to defend against open-redirect.
    if (hasUrl && URL_REGEX.test(store.original_url)) {
      return res.redirect(store.original_url);
    }
    res.json({ error: "invalid url" });
  });

  return app;
}

module.exports = { createApp };
