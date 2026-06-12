// app.js — builds the Express app (no listen, no DB connect).
// Imported by index.js (which connects to Mongo) and by tests
// (which use mongodb-memory-server).
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { apiReference } = require("@scalar/express-api-reference");
const { specs } = require("./swagger");

const LogSchema = new mongoose.Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

// Reuse the model if already compiled (avoids OverwriteModelError in tests).
const Log = mongoose.models.Log || mongoose.model("Log", LogSchema);

function formatDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? new Date().toDateString()
    : d.toDateString();
}

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));

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
   * /api/users:
   *   post:
   *     summary: Create a new user
   *     description: Creates a new user account for tracking exercises
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 description: The username for the new account
   *     responses:
   *       200:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 username:
   *                   type: string
   *                 _id:
   *                   type: string
   */
  app.post("/api/users", async (req, res, next) => {
    try {
      const log = await Log.create({
        username: req.body.username,
        count: 0,
        log: [],
      });
      res.json({ username: log.username, _id: log._id });
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get all users
   *     description: Retrieves a list of all registered users
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   username:
   *                     type: string
   *                   _id:
   *                     type: string
   */
  app.get("/api/users", async (_req, res, next) => {
    try {
      const users = await Log.find().select("username _id").exec();
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/users/{_id}/exercises:
   *   post:
   *     summary: Add an exercise
   *     description: Adds a new exercise to a user's log
   *     parameters:
   *       - in: path
   *         name: _id
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/x-www-form-urlencoded:
   *           schema:
   *             type: object
   *             properties:
   *               description:
   *                 type: string
   *               duration:
   *                 type: integer
   *               date:
   *                 type: string
   *                 format: date
   *     responses:
   *       200:
   *         description: Exercise added successfully
   *       404:
   *         description: User not found
   */
  app.post("/api/users/:_id/exercises", async (req, res, next) => {
    try {
      const user = await Log.findById(req.params._id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const date = req.body.date
        ? formatDate(req.body.date)
        : new Date().toDateString();
      const duration = Number.parseInt(req.body.duration, 10);

      user.log.push({ description: req.body.description, duration, date });
      user.count = (user.count || 0) + 1;
      await user.save();

      res.json({
        username: user.username,
        description: req.body.description,
        duration,
        date,
        _id: user._id,
      });
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/users/{_id}/logs:
   *   get:
   *     summary: Get exercise logs
   *     description: Retrieves a user's exercise log with optional filtering
   *     parameters:
   *       - in: path
   *         name: _id
   *         required: true
   *         schema:
   *           type: string
   *         description: The user ID
   *       - in: query
   *         name: from
   *         schema:
   *           type: string
   *           format: date
   *         description: Start date filter (YYYY-MM-DD)
   *       - in: query
   *         name: to
   *         schema:
   *           type: string
   *           format: date
   *         description: End date filter (YYYY-MM-DD)
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Maximum number of logs to return
   *     responses:
   *       200:
   *         description: Exercise logs retrieved successfully
   *       404:
   *         description: User not found
   */
  app.get("/api/users/:_id/logs", async (req, res, next) => {
    try {
      const user = await Log.findById(req.params._id);
      if (!user) return res.status(404).json({ error: "User not found" });

      let logs = user.log;

      if (req.query.from || req.query.to || req.query.limit) {
        const from = new Date(req.query.from ? req.query.from : 0);
        const to = req.query.to ? new Date(req.query.to) : new Date();
        const limit = req.query.limit
          ? Number.parseInt(req.query.limit, 10)
          : 50;
        logs = logs
          .filter((l) => {
            const d = new Date(l.date);
            return d >= from && d <= to;
          })
          .slice(0, limit);
      }

      res.json({
        username: user.username,
        count: logs.length,
        _id: user._id,
        log: logs.map((l) => ({
          description: l.description,
          duration: l.duration,
          date: l.date,
        })),
      });
    } catch (err) {
      next(err);
    }
  });

  return app;
}

module.exports = { createApp, Log };
