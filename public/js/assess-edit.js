/*
 * edit-form.js
 */

function toggleWeight(show, $question) {
  const $weight = $question.find('.weight-container');
  const $weightHidden = $question.find('.weight-hidden');

  if (show) {
    $weight.find('input').prop('disabled', false);
    $weight.show();
    $weightHidden.hide();
    $weightHidden.prop('disabled', true);
    $weight.parent().find("label[for='weight']").show();
  }
  else {
    $weight.find('input').prop('disabled', true);
    $weight.hide();
    $weightHidden.show();
    $weightHidden.prop('disabled', false);
    $weight.parent().find("label[for='weight']").hide();
  }
}

function toggleChoices(show, $question) {
  const $choices = $question.find('.mc-choices-container');
  const $choicesHidden = $question.find('.mc-choices-hidden');

  if (show) {
    $choices.find('textarea').prop('disabled', false);
    $choices.show();
    $choicesHidden.hide();
    $choicesHidden.prop('disabled', true);
  }
  else {
    $choices.find('textarea').prop('disabled', true);
    $choices.hide();
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
    toggleWeight(false, $newQuestion);
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

function save() {
  // Set empty weight fields to 1
  $weight = $('.weight-container').find('input');
  $weight.each(function() {
    if (!$(this).val()) {
      $(this).val('1');
    }
  });

  // Disable not-required fields if required
  $('.required-container').each(function() {
    if ($(this).find('.required').is(':checked')) {
      $(this).find('.not-required').prop('disabled', true);
    }
  });

  const answers = $('#assessment-form').serializeArray();
  console.log(answers);
  $.post('/assess-save', answers, function(data) {
    return false;
  });

  window.location.replace("/assess");
}

var main = function () {
  console.log("questions.js");

  $('.sortable').sortable({
    handle: ".card-header"
  });
  //$('.sortable').disableSelection();

  $('.question').each(function() {
    if ($(this).hasClass('open')) {
      toggleWeight(false, $(this));
      toggleChoices(false, $(this));
    }
    else if ($(this).hasClass('yn')) {
      toggleWeight(true, $(this));
      toggleChoices(false, $(this));
    }
    else if ($(this).hasClass('mc')) {
      toggleWeight(true, $(this));
      toggleChoices(true, $(this));
    }
  });
};

$(document).ready(main);

$(document).on("click", '.remove-question-btn', function(event) {
  $questionWrapper = $(this).closest('.question-wrapper');
  removeQuestion($questionWrapper);
});

$(document).on('change', '.question-type-field', function() {
  const $question = $(this).closest('.question');
  const $weight = $question.find('.weight-container');
  const $weightHidden = $question.find('.weight-hidden');
  const $choices = $question.find('.mc-choices-container');
  const $choicesHidden = $question.find('.mc-choices-hidden');

  if ($(this).val() === 'yn') {
      console.log("Changed to Yes/No");
      if ($weight.is(':hidden')) {
        toggleWeight(true, $question);
      }
      if ($choices.is(':visible')) {
        toggleChoices(false, $question);
      }
  }
  else if ($(this).val() === 'mc') {
      console.log("Changed to Multiple Choice");
      if ($weight.is(':hidden')) {
        toggleWeight(true, $question);
      }
      if ($choices.is(':hidden')) {
        toggleChoices(true, $question);
      }
  }
  else {
    console.log("Changed to Open Response");
    toggleWeight(false, $question);

    if ($choices.is(':visible')) {
      toggleChoices(false, $question);
    }
  }
});
