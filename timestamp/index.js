// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// Swagger Documentation
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
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
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);
  if (isNaN(date)) date = new Date(+req.params.date);
  if (isNaN(date)) res.json({ error: "Invalid Date" });
  const unix = Math.floor(date.getTime());
  const utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
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
app.get("/api/", function (req, res) {
  let date = new Date();
  const unix = Math.floor(date.getTime());
  const utc = date.toUTCString();
  res.json({ unix: unix, utc: utc });
});

// your first API endpoint...
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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
