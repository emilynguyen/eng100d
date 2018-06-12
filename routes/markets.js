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
});


exports.view = function(req, res) {
    
  assessments.all('SELECT * FROM assessmentTable', (err,rows) =>{
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
  });
};*/
