// index.js — entrypoint: build the app and start listening.
const { createApp } = require("./app");

const app = createApp();
const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
