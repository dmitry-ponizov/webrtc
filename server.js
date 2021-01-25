var express = require("express.io");

var app = express();
app.http().io();
var PORT = 3000;

app.use(express.static(__dirname + "/public"));
console.log("server started on port " + PORT);

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.io.route("ready", function (req) {
  req.io.join(req.data);
  app.io.room(req.data).broadcast("announce", {
    message: "New client in the " + req.data + " room.",
  });
});

app.io.route("send", function (req) {
  app.io.room(req.data.room).broadcast("message", {
    message: req.data.message,
    author: req.data.author,
  });
});

app.io.route("signal", function (req) {
  req.io.join(req.data);
  app.io.room(req.data).broadcast("signal", {
    user_type: req.data.user_type,
    user_name: req.data.user_name,
    user_data: req.data.user_data,
    command: req.data.command,
  });
});

app.listen(PORT);
