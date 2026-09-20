// index.js — entrypoint: connect to Mongo, then build the app and listen.
require("dotenv").config();
const { parseEnv } = require("znv");
const { z } = require("zod");
const mongoose = require("mongoose");
const { createApp } = require("./app");

// Fail fast with a clear message if MONGO_URI is missing/malformed.
const env = parseEnv(process.env, {
  MONGO_URI: z.string().url(),
  PORT: z.coerce.number().int().positive().default(3000),
});

const port = env.PORT;

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    const app = createApp();
    const listener = app.listen(port, () => {
      console.log(`Your app is listening on port ${listener.address().port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
