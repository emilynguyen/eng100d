const sqlite3 = require('sqlite3');
let marketdb = new sqlite3.Database('./markets.db');

exports.loginView = function(req, res) {
  res.render("admin-login", {
    title: "Admin Login | LWCMP Tool"
  });
};

exports.view = function(req, res) {
  marketdb.all('SELECT * FROM markets', (err,rows) => {
    if (rows.length > 0) {
      const markets = JSON.parse(rows[0].data);

      res.render("admin", {
        markets,
        title: "Admin Dashboard | LWCMP Tool"
      });

    }
    else {
      console.log("Database is empty");
    }
  });
};
