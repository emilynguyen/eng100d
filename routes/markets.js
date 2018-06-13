/*
 * GET markets page.
 */

const sqlite3 = require('sqlite3');
let marketdb = new sqlite3.Database('./markets.db');

exports.view = function(req, res) {

  marketdb.all('SELECT * FROM markets', (err,rows) => {
    if (rows.length > 0) {
      const markets = JSON.parse(rows[0].data);
      console.log(markets);

      res.render("markets", {
        /*questions, */markets,
        title: "Market List | LWCMP Tool"
      });

    }
    else {
      console.log("Database is empty");
    }
  });
};
