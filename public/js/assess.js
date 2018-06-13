const $assessment = $('#assessment-form');
let firstName;
let lastName;
let email;
let marketName;
let addressInfo;
let storeType;

function submitPreAssess() {
	const info = $('#pre-assess-form').serializeArray();

	firstName = info[0].value;
	lastName = info[1].value;
	email = info[2].value;
	const code = info[3].value;
	marketName = info[4].value;

	$.ajax({
		type: "POST",
		url: '/assess-verify-code',
		data: {code: code},
		success: function(data) {
			if (!data) {
				// Display incorrect passcode error
				$('.assess-code-input').val("");
				$('.assess-code-input').attr("placeholder", "Incorrect passcode");
				$('.assess-code-input').addClass('incorrect-passcode');
				return;
			}
			else {
				$('#pre-assess-container').animate({top: -200, opacity: 0}, 500, function() {
					$('#pre-assess-container').hide();
					$('#assessment-form').removeClass('d-none');
					$('#assessment-form').animate({opacity: 1}, 500);
				});
				if (marketName === 'NEW MARKET') {
					marketName = info[5].value;

					const newMarket = {
						"name": marketName,
						"address": {
							"address": info[7].value,
							"city": info[8].value,
							"state": info[9].value,
							"zip": info[10].value
						},
						"storeType": info[6].value,
						"level": "0",
						"assessments": []
					};

					$.ajax({
				    type: 'POST',
				    url: '/assess-save-market',
				    contentType: 'application/json',
			    	data: JSON.stringify(newMarket)
				  });

				}
				$('#market-name').text(": " + marketName).fadeIn(500);
			}
		},
	});
}

function calcLevel() {
	let level1 = 0;
	let level2 = 0;
	let level3 = 0;
	let threshold1 = 0;
	let threshold2 = 0;
	let threshold3 = 0;
	let maxLevel = 3;

	// Iterate through all answers for a single question
	$('.answers').each(function() {
		// Track level lock, use to skip
		//console.log($(this).parent().find('.question-title').text());

		const $answers = $(this);
		const $selectedAnswer = $answers.find(':checked');

		// Skip if not answered or open response
		if ($selectedAnswer.length < 1) {
			//console.log("Omitted");
			return true;
		}
		else {
			//console.log($selectedAnswer.val());
		}

		// Track if this question has a choice for level 1/2/3
		let has1 = false;
		let has2 = false;
		let has3 = false;

		/* CALC THRESHOLDS */

		// Iterate though all choice weights for this question
		$answers.find('.points-input').each(function() {
			let pointLevel = $(this).val();

			// Skip if pointLevel is a level lock (of format lock_)
			if (pointLevel.length == 5) return true;

			// Read choice weights to calc thresholds
			switch(parseInt(pointLevel)) {
				case 1:
					// Only inc threshold the first time a level appears
					if (!has1) {
						threshold1++;
						has1 = true;
					}
					break;
				case 2:
					if (!has2) {
						threshold2++;
						has2 = true;
					}
					break;
				case 3:
					if (!has3) {
						threshold3++;
						has3 = true;
					}
					break;
			}
		});

		/* CALC POINTS */

		// Get point value of the selected answer
		const selectedPoint = $selectedAnswer.parent().find('.points-input').val();

		// Check if selectedPoint is a level lock (of format lock_)
		if (selectedPoint.length == 5) {
			// Extract level from string, set level max as previous level
			maxLevel = parseInt(selectedPoint.substring(4)) - 1;
		}
		// Otherwise, add points to each level and levels below if necessary
		else {
			switch(parseInt(selectedPoint)) {
				case 1:
					level1++;
					break;
				case 2:
					level2++;
					if (has1) level1++;
					break;
				case 3:
					level3++;
					if (has1) level1++;
					if (has2) level2++;
					break;
			}
		}
	});

	let finalLevel = 0;

	// Calculate progress for each level
	let level1progress = level1 / threshold1 * 100;
	let level2progress = level2 / threshold2 * 100;
	let level3progress = level3 / threshold3 * 100;

	// Update final level if a threshold has been passed
	if (level1progress >= 100) {
		finalLevel = 1
		if (level2progress >= 100) {
			finalLevel = 2
			if (level3progress >= 100) {
				finalLevel = 3
			};
		};
	};

	// Check that final level doesn't except cap
	if (finalLevel > maxLevel) finalLevel = maxLevel;

	console.log("Level 1 points: " + level1);
	console.log("Level 2 points: " + level2);
	console.log("Level 3 points: " + level3);
	console.log("Level 1 threshold: " + threshold1);
	console.log("Level 2 threshold: " + threshold2);
	console.log("Level 3 threshold: " + threshold3);
	console.log("MAX: " + maxLevel);
	console.log("LEVEL 1: " + level1progress + "%");
	console.log("LEVEL 2: " + level2progress + "%");
	console.log("LEVEL 3: " + level3progress + "%");
	console.log("FINAL LEVEL: " + finalLevel);

	return [finalLevel, level1progress, level2progress, level3progress];
}

function submitAssessment() {
	// Holds final level and progress for levels 1/2/3
	const levelArray = calcLevel();
	const answers = $assessment.serializeArray();
	const timestamp = new Date().getTime();

	const assessment = {
		"evaluator": {
			"first": firstName,
			"last": lastName,
			"email": email,
			"time": timestamp
		},
		"answers": []
	};
	for (let i = 0; i < answers.length; i++) {
		// Skip blank questions
		if (answers[i].name === "points")
			continue;

		assessment['answers'].push({
			"q": answers[i].name,
			"a": answers[i].value
		});
	}

	const submission = {
		"marketName": marketName,
		"level": levelArray[0],
		"level1progress": levelArray[1],
		"level2progress": levelArray[2],
		"level3progress": levelArray[3],
		"assessment": assessment
	};

	$.ajax({
			type: 'POST',
			url: '/assess-submit',
			contentType: 'application/json',
			data: JSON.stringify(submission),
		});

	console.log('Submitted');
  alert("Your assessment has been submitted.");

  window.location.href = `/assessment/${marketName}/${timestamp}`;
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

  if ($(this).val() === "NEW MARKET")
  	toggleNewMarket(true);
  else
  	toggleNewMarket(false);
});

/*
 * Listener for assessment passcode
 */
$('.assess-code-input').on('input', function() {
 $('.assess-code-input').removeClass('incorrect-passcode');
});
