'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'); // "express-handlebars"
var http = require("http");
var path = require("path");
var bodyParser = require('body-parser')

// Routes
var home = require("./routes/home");
var assess = require("./routes/assess");
var login = require("./routes/login");
var signup = require("./routes/signup");

var app = express();

app.set("port", process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));

app.get("/", home.view);
app.get("/assess", assess.view);
app.get("/assess-edit", assess.edit);
app.post("/assess-save", assess.save);
app.get("/login", login.view);
app.get("/signup", signup.view);

app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port " + app.get("port"));
});
