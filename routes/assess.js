const questions = require("../questions.json");

exports.view = function(req, res) {
  res.render("assess", {
    questions
  });
};

exports.edit = function(req, res) {
  res.render("assess-edit", {
    questions
  });
};

exports.save = function(req, res) {
  console.log(req.body);
  const titles = req.body.title;
  const types = req.body.type;
  const choices = req.body.choices;
  const weights = req.body.weight;
  const requireds = req.body.required;
  const length = titles.length;

  questions.splice(0, questions.length);

  for (let i = 0; i < length; i++) {
    const newQuestion = {};
    const title = titles[i].trim();
    const weight = weights[i].trim();
    const required = requireds[i];

    // Set title
    newQuestion['title'] = title;

    // Set required = true if necessary
    if (required == "true") {
      newQuestion['required'] = true;
    }

    // Add variables for open response questions
    if (types[i] == "open") {
      newQuestion['open'] = true;

    }
    // Add variables for yes/no questions
    else if (types[i] == "yn") {
      newQuestion['yn'] = true;
      newQuestion['weight'] = weight;
    }
    // Add variables for multiple choice questions
    else if (types[i] == "mc") {
      const choicesArray = choices[i].split('\r\n');
      let j = 0;
      while (j < choicesArray.length) {
        choicesArray[j] = choicesArray[j].trim();
        if (choicesArray[j] === "") {
          choicesArray.splice(j, 1);
        }
        else {
          j++;
        }
      }
      newQuestion['mc'] = true;
      newQuestion['choices'] = choicesArray;
      newQuestion['weight'] = weight;
    }

    // Push new question into database
    questions.push(newQuestion);
  }

  console.log(questions);
};
