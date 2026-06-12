// index.js — entrypoint: build the app and start listening.
require("dotenv").config();
const { createApp } = require("./app");

const app = createApp();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
