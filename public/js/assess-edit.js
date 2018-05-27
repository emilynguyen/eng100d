/*
 * edit-form.js
 */

function toggleType(newType, $question) {
  if ($question.hasClass('yn')) {
    $question.removeClass('yn');
  }
  else if ($question.hasClass('range')) {
    $question.removeClass('range');
  }
  else if ($question.hasClass('quality')) {
    $question.removeClass('quality');
  }
  else if ($question.hasClass('open')) {
    $question.removeClass('open');
  }

  $question.addClass(newType);

  if (newType === 'open') {
    toggleChoices(false, $question);
  }
  else {
    toggleChoices(true, $question);
  }
}


function toggleChoices(show, $question) {
  const $choices = $question.find('.mc-choices-container');
  const $choicesHidden = $question.find('.mc-choices-hidden');

  if (show) {
    //$choices.find('textarea').prop('disabled', false);
    $choices.show();
    $choicesHidden.hide();
    $choicesHidden.prop('disabled', true);

    if ($question.hasClass('yn')) {
      //console.log("Load yn choices");
      $choices.load('/question-components/yn-choices.html');
    }
    else if ($question.hasClass('range')) {
      //console.log("Load range choices");
      $choices.load('/question-components/range-choices.html');
    }
    else if ($question.hasClass('quality')) {
      //console.log("Load quality choices");
      $choices.load('/question-components/quality-choices.html');
    }
  }
  else {
    //$choices.find('textarea').prop('disabled', true);
    $choices.hide();
    // Reset levels
    $choices.find('.mc-choices-containers').html('');
    $choicesHidden.show();
    $choicesHidden.prop('disabled', false);
  }
}

function addQuestion() {
  const $questionList = $('#question-list-edit');
  $questionList.append('<div class="question-wrapper"></div>');
  // Load question template
  var $newQuestion = $questionList.children().last();
  $newQuestion.load('question-template.html', function() {
    toggleChoices(false, $newQuestion);
  });

  console.log("Added question");
}

function removeQuestion($question) {
  $question.slideUp('normal', function() {
    $(this).remove();
  });

  console.log("Removed question");
}

function addSection() {
  const $questionList = $('#question-list-edit');
  $questionList.append('<div class="question-wrapper"></div>');
  // Load section break template
  var $newQuestion = $questionList.children().last();
  $newQuestion.load('/question-components/section-break.html');
}

function save() {
  const finalResults = [];

  // Iterate through all questions
  $('.question').each(function() {
    // Serialize fields from this question
    const results = $(this).find(':input').serializeArray();

    const newQuestion = {};
    const choices = []; // Store choices + their levels
    const choiceLevels = [];

    // Loop through each field
    for (let i = 0; i < results.length; i++) {
      const name = results[i].name;
      const val = results[i].value.trim();

      // Continue if null
      if (val === 'null')
        continue;

      // Check if section break
      if (name === 'sectionBreak') {
        newQuestion[name] = true;
        newQuestion['title'] = val;
        break;
      }

      // Otherwise, format new question
      switch(name) {
        case 'choices': 
          choices.push(val);
          break;
        case 'choiceLevels': 
          choiceLevels.push(val);
          break;
        default: 
          newQuestion[name] = val;
      }
    }

    // Check that # choices = # choice levels
    if (choices.length != choiceLevels.length) {
      alert('ERROR: # Choices does not match # choice levels');
      return;
    }
    // Pair choices and their levels 
    else if (choices.length > 0) {
      const choicePairs = [];

      for (let j = 0; j < choices.length; j++) {
        choicePairs.push({
          "choice": choices[j],
          "level": choiceLevels[j]
        });
      }

      // Add choice pairs to question obj
      newQuestion['choices'] = choicePairs;
    }

  finalResults.push(newQuestion);
  });

  //console.log(finalResults);

 // let finalResultsObj = JSON.stringify(finalResults);
//  finalResultsObj = JSON.parse(finalResultsObj);

//console.log(finalResults);
/*
  // Save final results
  $.post('/assess-save', finalResults, function(data) {
    return false;
  }); */

  $.ajax({
    type: 'POST',
    url: '/assess-save',
    contentType: 'application/json',
    data: JSON.stringify(finalResults)
  });

 window.location.replace("/assess"); 
}

var main = function () {
  console.log("questions.js");

  $('.sortable').sortable({
    handle: ".card-header"
  });
  //$('.sortable').disableSelection();

/*
  $('.question').each(function() {
    if ($(this).hasClass('open')) {
      toggleChoices(false, $(this));
    }
    else {
      toggleChoices(true, $(this));
    }
  }); */
};

$(document).ready(main);

$(document).on("click", '.remove-question-btn', function(event) {
  $questionWrapper = $(this).closest('.question-wrapper');
  removeQuestion($questionWrapper);
});

$(document).on('change', '.question-type-field', function() {
  const $question = $(this).closest('.question');
  const $choices = $question.find('.mc-choices-container');
  const $choicesHidden = $question.find('.mc-choices-hidden');

  toggleType($(this).val(), $question);
});
