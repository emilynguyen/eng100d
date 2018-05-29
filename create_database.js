const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('assessment.db');
const questions = require('./assessment-matrix.json');

db.serialize(() => {
  db.run("CREATE TABLE assessmentTable (name, address, storeType, level)");

  for(const q of questions){
    const myTitle = '"' + q + '"';
    db.run(`ALTER TABLE assessmentTable ADD ${myTitle}`);
  }
});
db.close();
