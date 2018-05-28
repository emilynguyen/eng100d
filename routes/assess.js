const questions = require("../questions.json");
const markets = require("../markets.json");

exports.view = function(req, res) {
  res.render("assess", {
    questions, markets
  });
};

exports.edit = function(req, res) {
  res.render("assess-edit", {
    questions
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
