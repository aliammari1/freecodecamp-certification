require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Swagger Documentation
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const BodyParser = require("body-parser");
// Basic Configuration
const port = process.env.PORT || 3000;

let url = { original_url: "", short_url: 1 };
let isUrl = false;

app.use(cors());

app.use(BodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
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
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

/**
 * @swagger
 * /api/shorturl:
 *   post:
 *     summary: Create short URL
 *     description: Creates a shortened URL from a valid URL
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
app.post("/api/shorturl", function (req, res) {
const urlRegex = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (urlRegex.test(req.body.url)) {
    isUrl = true;
    url.original_url = req.body.url;
    res.json({ original_url: url.original_url, short_url: url.short_url });
  } else {
    isUrl = false;
    res.json({ error: "invalid url" });
  }
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
app.get("/api/shorturl", function (req, res) {
  if (isUrl)
    res.json({ original_url: url.original_url, short_url: url.short_url });
  else res.json({ error: "invalid url" });
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
app.get("/api/shorturl/:short_url", function (req, res) {
  if (isUrl)
    res.redirect(url.original_url);
  else res.json({ error: "invalid url" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
