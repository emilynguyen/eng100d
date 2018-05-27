/*
 * assess-edit.js
 */

/* Name: changeType
 * Description: Helper method called on changes to question type. Updates
 *  the type class and toggles choices.
 * Parameters: newType - new question type
 *  $question - the targeted .question
 * Return: None
 */
function changeType(newType, $question) {
  // Remove current type class
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
  // Add new type class
  $question.addClass(newType);

  // Hide/show choices depending on new type
  if (newType === 'open') {
    toggleChoices(false, $question);
  }
  else {
    toggleChoices(true, $question);
  }
}

/* Name: toggleChoices
 * Description: Hide or show answer choices depending on question type.
 * Parameters: show - if true, show choices; if false, hide choices
 *  $question - the targeted .question
 * Return: None
 */
function toggleChoices(show, $question) {
  const $choices = $question.find('.mc-choices-container');

  // Show answer choices for question type
  if (show) {
    $choices.show();

    // Load appropriate choices
    if ($question.hasClass('yn')) {
      $choices.load('/question-components/yn-choices.html');
    }
    else if ($question.hasClass('range')) {
      $choices.load('/question-components/range-choices.html');
    }
    else if ($question.hasClass('quality')) {
      $choices.load('/question-components/quality-choices.html');
    }
  }
  // Hide answer choices
  else {
    $choices.hide();
    // Clear levels
    $choices.find('.mc-choices-containers').html('');
  }
}

/* Name: addQuestion
 * Description: Add new question to market assessment.
 * Parameters: None
 * Return: None
 */
function addQuestion() {
  const $questionList = $('#question-list-edit');
  $questionList.append('<div class="question-wrapper"></div>');
  
  var $newQuestion = $questionList.children().last();
  // Load question template, hide choices by default
  $newQuestion.load('question-template.html', function() {
    toggleChoices(false, $newQuestion);
  });
}

/* Name: removeQuestion
 * Description: Remove question from market assessment.
 * Parameters: $question - the .question-wrapper of the question to remove
 * Return: None
 */
function removeQuestion($question) {
  $question.slideUp('normal', function() {
    $(this).remove();
  });
}

/* Name: addSection
 * Description: Add section break to market assessment.
 * Parameters: None
 * Return: None
 */
function addSection() {
  const $questionList = $('#question-list-edit');
  $questionList.append('<div class="question-wrapper"></div>');
  
  // Load section break template
  var $newQuestion = $questionList.children().last();
  $newQuestion.load('/question-components/section-break.html');
}

/* Name: save
 * Description: Saves changes to the market assessment. Formats the inputs
 *  as JSON, then sends post request to /assess-save.
 * Parameters: None
 * Return: None
 */
function save() {
  // Final JSON object containing updated questions
  const finalResults = [];

  // Iterate through all questions
  $('.question').each(function() {
    // Serialize fields from this question
    const results = $(this).find(':input').serializeArray();

    const newQuestion = {};
    const choices = [];
    const choiceLevels = [];

    // Loop through each form input
    for (let i = 0; i < results.length; i++) {
      const name = results[i].name;
      const val = results[i].value.trim();

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
      console.log('ERROR: # Choices does not match # choice levels');
      return;
    }
    // Create choices array if there are choices
    else if (choices.length > 0) {
      const choicePairs = [];

      // Pair choices and their levels 
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

  $.ajax({
    type: 'POST',
    url: '/assess-save',
    contentType: 'application/json',
    data: JSON.stringify(finalResults)
  });

  window.location.replace("/assess"); 
}

/* 
 * MAIN FUNCTION
 */
var main = function () {
  console.log("questions.js");

  $('.sortable').sortable({
    handle: ".card-header"
  });
  //$('.sortable').disableSelection();
};
$(document).ready(main);

/*
 * Listener for the remove question button
 */
$(document).on("click", '.remove-question-btn', function(event) {
  $questionWrapper = $(this).closest('.question-wrapper');
  removeQuestion($questionWrapper);
});

/*
 * Listener for the question type dropdown
 */
$(document).on('change', '.question-type-field', function() {
  const $question = $(this).closest('.question');
  const $choices = $question.find('.mc-choices-container');

  changeType($(this).val(), $question);
});
