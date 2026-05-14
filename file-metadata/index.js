var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

// Swagger Documentation
const { swaggerUi, specs } = require("./swagger");
var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

var upload = multer({ dest: "uploads/" });

let file = {};

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
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
 */
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  file = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.json(file);
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
app.get("/api/fileanalyse", function (req, res) {
  res.json(file);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
