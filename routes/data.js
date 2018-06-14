/*
 * GET data page.
 */

const sqlite3 = require('sqlite3');
let questionsdb = new sqlite3.Database('./questions.db');
let value = false;

exports.loginView = function(req, res) {
  res.render("data-login", {
    title: "Data Code Required"
  });
};


exports.view = function(req, res) {

  questionsdb.all('SELECT * FROM questions', (err,rows) => {
    if (rows.length > 0) {
      const questions = JSON.parse(rows[0].data);

      res.render("data", {
        questions,
        title: "Market Data | LWCMP Tool"
      });

    }
    else {
      console.log("Database is empty");
    }
  });
};
