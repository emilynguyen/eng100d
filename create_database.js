const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('assessment.db');
const questions = require('./testQuestions.json');

db.serialize(() => {
  db.run("CREATE TABLE assessmentTable (testing TEXT)");
  /*
  db.run("ALTER TABLE assessmentTable ADD Does the retailer sell tobacco products TEXT");
  db.run("ALTER TABLE assessmentTable ADD Tobacco license clearly displayed TEXT");
  */

  for(const q of questions){
    const myTitle = q.title;
    console.log(myTitle);
    db.run(`ALTER TABLE assessmentTable ADD ${myTitle}`);
  }
  /*
  db.each("SELECT * FROM assessmentTable", (err,row) => {
    console.log(row);
  });*/
});
db.close();
