'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'); // "express-handlebars"
var http = require("http");
var path = require("path");
var bodyParser = require('body-parser')

// Routes
var home = require("./routes/home");
var assess = require("./routes/assess");
var admin = require("./routes/admin");
var signup = require("./routes/signup");
var markets = require("./routes/markets");
var data = require("./routes/data");

// Database
const sqlite3 = require('sqlite3');
const assessments = new sqlite3.Database('assessment.db');

var app = express();

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    defaultLayout: 'main',
    helpers: {
        ifEquals: function(arg1, arg2, options) { return (arg1 == arg2) ? options.fn(this) : options.inverse(this); },
        ifNotEquals: function(arg1, arg2, options) { return (arg1 != arg2) ? options.fn(this) : options.inverse(this); },
        concat: function(arg1, arg2) { return arg1 + "|" + arg2; }
    }
});

app.set("port", process.env.PORT || 3000);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", home.view);
app.get("/assess", assess.view);
app.get("/assess-edit", assess.edit);
app.post("/assess-save", assess.save);
app.post("/assess-save-market", assess.saveMarket);
app.post("/assess-submit", assess.submit);
app.get("/admin-login", admin.loginView);
app.get("/admin-login-verify", admin.loginVerify);
app.get("/admin", admin.view);
app.get("/signup", signup.view);
app.get("/markets", markets.view);
app.get("/data", data.view);

//CREATING GET/POST REQUESTS FOR MARKET DATA

app.get('/markets/:name', (req, res) =>{
  const marketSearch = req.params.name;
  assessments.all('SELECT * FROM assessmentTable WHERE name = $name',
    {$name: marketSearch},
    (err, rows) => {
      if(rows.length > 0){
        res.send(rows[0]);
      }else{
        res.send({});
      }
  });
});

app.post('/data/:name', (req, res)=>{
  const marketSearch = req.params.name;
  console.log(req.body.testing);
  assessments.all('SELECT * FROM assessmentTable WHERE name = $name',
  {$name: marketSearch},
  (err, rows) => {
    if(rows.length > 0){
      res.send("This market already has a database.");
    }else{
      res.send("Assessment was successfully saved");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port " + app.get("port"));
});
