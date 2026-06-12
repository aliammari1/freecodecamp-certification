// index.js — entrypoint: connect to Mongo, then build the app and listen.
require("dotenv").config();
const mongoose = require("mongoose");
const { createApp } = require("./app");

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
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
