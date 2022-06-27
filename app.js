var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "join_us",
});

app.get("/", function (req, res) {
  var q = "select count(*) as count from users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    var count = results[0].count;
    res.render("home", { data: count });
  });
});

app.post("/register", function (req, res) {
  var person = {
    email: req.body.email,
  };

  connection.query("insert into users set ?", person, function (err, result) {
    if (err) throw err;
    console.log(err);
    console.log(result);
    res.redirect("/");
  });
});

app.get("/joke", function (req, res) {
  var joke = "What do you call a dog that does magic tricks? A labracadabrador";
  res.send(joke);
});

app.listen(3000, function () {
  console.log("Server running on 3000!");
});
