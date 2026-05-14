require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

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
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

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

app.get("/api/shorturl", function (req, res) {
  if (isUrl)
    res.json({ original_url: url.original_url, short_url: url.short_url });
  else res.json({ error: "invalid url" });
});

app.get("/api/shorturl/:short_url", function (req, res) {
  if (isUrl)
    res.redirect(url.original_url);
  else res.json({ error: "invalid url" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
