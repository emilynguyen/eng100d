/*
 * GET data page.
 */

const sqlite3 = require('sqlite3');
let questionsdb = new sqlite3.Database('./questions.db');

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