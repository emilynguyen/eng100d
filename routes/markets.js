/*
 * GET markets page.
 */

//var markets = require("../markets.json");
//var assessmentArray = require('../assessment.db');
/*var assessmentArray = new Array();
const sqlite3 = require('sqlite3').verbose();
let assessments = new sqlite3.Database('../assessment.db', err => {
  if (err){
    console.err("error connecting to database");
  }
  console.log('connected to database');
});*/

//const questions = require("../questions.json");
const sqlite3 = require('sqlite3');
let marketdb = new sqlite3.Database('./markets.db');

exports.view = function(req, res) {
    
  /*assessments.all('SELECT * FROM assessmentTable', (err,rows) =>{
    if(rows.length > 0){
      console.log(rows);
      var currentObj;
      var assessmentArray = new Array();
  
      for (var i = 0; i < rows.length; i++){
          currentObj = JSON.parse(rows[i].name);
          assessmentArray[i] = currentObj;
      }
  
      res.render("markets", {
        assessmentArray,
        title: "Our Markets | LWCMP Tool"
      });
    
    }else{
      res.send("There are no markets currently in the database");
    }
  });*/

  marketdb.all('SELECT * FROM markets', (err,rows) => {
    if (rows.length > 0) {
      const markets = JSON.parse(rows[0].data);
      console.log(markets);

      res.render("markets", {
        /*questions, */markets,
        title: "Market Assessment | LWCMP Tool"
      });

    }
    else {
      console.log("Database is empty");
    }
  });
};
