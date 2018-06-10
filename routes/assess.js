const questions = require("../questions.json");
const markets = require("../markets.json");

exports.view = function(req, res) {
  res.render("assess", {
    questions, markets,
    title: "Market Assessment | LWCMP Tool"
  });
};

exports.edit = function(req, res) {
  res.render("assess-edit", {
    questions,
    title: "Edit Assessment | LWCMP Tool"
  });
};

exports.save = function(req, res) {
  const newQuestions = req.body;

  // Clear current questions
  questions.splice(0, questions.length);

  // Push new questions
  for (let i = 0; i < newQuestions.length; i++) {
    questions.push(newQuestions[i]);
  }
};

exports.verifyCode = function(req, res) {
  const code = req.body.code;

  if (code !== process.env.ASSESS_CODE) {
    console.log('Incorrect passcode');
    res.send(false);
  }
  console.log('Correct passcode');
  res.send(true);
};

exports.saveMarket = function(req, res) {
  markets.push(req.body);
  return;
};

exports.submit = function(req, res) {
  const assessment = req.body.assessment;
  const level = req.body.level;
  const name = req.body.marketName;

  for (let i = 0; i < markets.length; i++) {
    // Find market
    if (markets[i].name === name) {
      markets[i].assessments.push(assessment);
      markets[i].level = level;
    }
  }

  console.log(assessment);
};
