const sqlite3 = require('sqlite3');
const userdb = new sqlite3.Database('users_accounts.db');


// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
userdb.serialize(() => {
  // create a new database table:
  userdb.run("CREATE TABLE users_accounts (id INTEGER, user TEXT, password TEXT)");

  // insert 2 rows of data:
  userdb.run("INSERT INTO users_accounts VALUES ( 1, 'cch_admin', 'dance')");
  userdb.run("INSERT INTO users_accounts VALUES ( 2, 'data_login', '1234')");

  console.log('successfully created the users_accounts table in users_accounts.db');

  // print them out to confirm their contents:
  userdb.each("SELECT id, user, password FROM users_accounts", (err, row) => {
      console.log(row.id + ": " + row.user + ": " + row.password );
  });
});

userdb.close();