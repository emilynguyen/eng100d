'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'); // "express-handlebars"
var http = require("http");
var path = require("path");
var bodyParser = require('body-parser')

// Routes
var home = require("./routes/home");
var form = require("./routes/form");

var app = express();

app.set("port", process.env.PORT || 3000);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));

app.get("/", home.view);
app.get("/edit-form", form.edit);
app.post("/save-form", form.save);

app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port " + app.get("port"));
});
