const $assessment = $('#assessment-form');

function submitPreAssess() {
	$('#pre-assess-container').animate({top: -200, opacity: 0}, 500, function() {
		$('#pre-assess-container').hide();
		$('#assessment-form').removeClass('d-none');
		$('#assessment-form').animate({opacity: 1}, 500);
	});

	const info = $('#pre-assess-form').serializeArray();
	console.log(info);

	let marketName;

	// If not a new market
	if (info.length === 4) {
		marketName = info[3].value;
	}
	else {
		marketName = info[4].value;
	}
	$('#market-name').text(": " + marketName).fadeIn(500);
}

function calcLevel() {
	let level1 = 0;
	let level2 = 0;
	let level3 = 0;
	let maxLevel = 3;

	// Find level of each selected answer
	$assessment.find(':checked').each(function() {
		let pointLevel = $(this).parent().find('.points-input').val();

		// Check if pointLevel is a level lock (of format lock_)
		if (pointLevel.length == 5) {
			// Extract level from string, set level max as previous level
			maxLevel = parseInt(pointLevel.substring(4)) - 1;
		}
		// Otherwise, check what level the point goes to
		else {
			switch(parseInt(pointLevel)) {
				case 1:
					level1++;
					break;
				case 2:
					level2++;
					break;
				case 3:
					level3++;
					break;
			}
		}
	});

	console.log("Level 1: " + level1);
	console.log("Level 2: " + level2);
	console.log("Level 3: " + level3);
	console.log(maxLevel);
}

function submitAssessment() {

	calcLevel();

  console.log('Submitted');
  alert("Your assessment has been submitted.");
	console.log($assessment.serializeArray());
  //window.location.href = "/assess";
}

function toggleNewMarket(show) {
	if (show) {
		$('#new-market-input').removeClass('d-none');
		$('#new-market-input').find(':input').prop('disabled', false);
	}
	else {
		$('#new-market-input').find(':input').prop('disabled', true);
		$('#new-market-input').addClass('d-none');
	}
}

$(document).ready(function() {
	// DEV ONLY
	//$('body').find(':input').prop('required', false);
	$('#market-name').hide();
	$('#assessment-form').css('opacity', 0);

	// Disable new market fields by default
	$('#new-market-input').find(':input').prop('disabled', true);
});



/*
 * Listener for market dropdown
 */
$(document).on('change', '#market-name-dropdown', function() {

  if ($(this).val() === "New Market")
  	toggleNewMarket(true);
  else
  	toggleNewMarket(false);
});
