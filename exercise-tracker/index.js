const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

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

const Log = mongoose.model("Log", LogSchema);

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users/", function (req, res) {
  const log = new Log({
    username: req.body.username,
    count: 0,
    log: [],
  });
  log.save();
  res.json({ username: log.username, _id: log._id });
});

app.get("/api/users/", function (req, res) {
  Log.find()
    .select("username _id")
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

app.post("/api/users/:_id/exercises", function (req, res) {
  Log.findById(req.params._id).then((user) => {
    const date = new Date(req.body.date).toDateString();
    const duration = parseInt(req.body.duration);

    user.log.push({
      description: req.body.description,
      duration: duration,
      date: date,
    });
    user.count = user.count + 1;
    user.save();
    res.json({
      username: user.username,
      description: req.body.description,
      duration: duration,
      date: date,
      _id: user._id,
    });
  });
});

app.get("/api/users/:_id/logs", function (req, res) {
  if (req.query.from || req.query.to || req.query.limit) {
    let from = new Date(req.query.from ? req.query.from : 0);
    let to = req.query.to ? new Date(req.query.to) : new Date();
    let limit = req.query.limit ? parseInt(req.query.limit) : 50;
    Log.findById(req.params._id)
      .exec()
      .then((user) => {
        let logs = user.log
          .filter((log) => {
            let logDate = new Date(log.date);
            return logDate >= from && logDate <= to;
          })
          .slice(0, limit)
          .map((log) => {
            let date = new Date(log.date).toUTCString().slice(0, 16);
            if ((date = "Invalid Date")) date = new Date().toDateString();

            return {
              description: log.description,
              duration: log.duration,
              date: date,
            };
          });
        res.json({
          username: user.username,
          count: logs.length,
          _id: user._id,
          log: logs,
        });
      });
  } else {
    Log.findById(req.params._id)
      .select("username _id log.description log.duration log.date")
      .then((user) => {
        let logs = user.log.map((log) => {
          let date = new Date(log.date).toUTCString().slice(0, 16);
          if ((date = "Invalid Date")) date = new Date().toDateString();
          return {
            description: log.description,
            duration: log.duration,
            date: date,
          };
        });
        res.json({
          username: user.username,
          count: logs.length,
          _id: user._id,
          log: logs,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json(err);
      });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
