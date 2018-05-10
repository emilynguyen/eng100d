const questions = require("../questions.json");

exports.edit = function(req, res) {
  res.render("form", {
    questions
  });
};

exports.save = function(req, res) {
  console.log(req.body);
  const titles = req.body.title;
  const types = req.body.type;
  const choices = req.body.choices;
  const weights = req.body.weight;
  const length = titles.length;

  questions.splice(0, questions.length);

  for (let i = 0; i < length; i++) {
    let newQuestion;
    const title = titles[i].trim();
    const weight = weights[i].trim();

    if (types[i] == "open") {
      newQuestion = {
        "title": title,
        "open": true
      };
    }
    else if (types[i] == "yn") {
      newQuestion = {
        "title": title,
        "yn": true,
        "weight": weight
      };
    }
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
      newQuestion = {
        "title": title,
        "mc": true,
        "choices": choicesArray,
        "weight": weight
      };
    }

    questions.push(newQuestion);
  }

  console.log(questions);
};
