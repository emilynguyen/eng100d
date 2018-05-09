function removeQuestion($question) {
  $question.remove();
  if ($('#question-list li').length == 1) {
    $('.remove-question-btn').hide();
  }
  console.log("Removed question");
}

function save() {
  const answers = $('#assessment-form').serializeArray();
  console.log("Saved");
  console.log(answers);
}

const main = function () {
  console.log("questions.js");

  $('.sortable').sortable();
  $('.sortable').disableSelection();

  $('.question-type').change(function() {
    const $question = $(this).closest('.question');
    // Reset question classes
    $question.removeClass('yn');
    $question.removeClass('mc');
    $question.removeClass('open');

    if ($(this).val() === 'yn') {
        console.log("Changed to Yes/No");
        $question.addClass('yn');
    }
    else if ($(this).val() === 'mc') {
        console.log("Changed to Multiple Choice");
        $question.addClass('mc');
    }
    else {
      console.log("Changed to Open Response");
        $question.addClass('open');
    }

  });

  $('.remove-question-btn').click(function() {
    removeQuestion($(this).closest('.question-wrapper'));
  });

};

$(document).ready(main);
