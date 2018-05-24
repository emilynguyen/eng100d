const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('assessment.db');
const questions = require('./questions.json');

db.serialize(() => {
  db.run("CREATE TABLE assessmentTable (date TEXT)");
  //db.run("ALTER TABLE assessmentTable ADD Does the retailer sell tobacco products TEXT");

  for(const q of questions){
    const myTitle = '"' + q.title + '"';
    //console.log(myTitle);
    db.run(`ALTER TABLE assessmentTable ADD ${myTitle}`);
  }
});
db.close();
