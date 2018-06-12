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


//console.log("access: " + access);

/*
	if (code != process.env.ASSESS_CODE) {

	} */

	// If new market, push new market to database
	/*
	if (marketName === 'NEW MARKET') {
		marketName = info[4].value;

		const newMarket = {
			"name": marketName,
			"address": {
				"address": info[6].value,
				"city": info[7].value,
				"state": info[8].value,
				"zip": info[9].value
			},
			"storeType": info[5].value,
			"level": "0",
			"assessments": []
		};
	} */
/*
	$.ajax({
		type: "POST",
		url: '/assess-save-market',
		dataType: 'text',
		data: {firstName: firstName, lastName:lastName, email:email, marketName:marketName},
		success: (result) => {
			console.log(result);
		},
	});
*/
	//$('#market-name').text(": " + marketName).fadeIn(500);
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

	return 0;
}

function submitAssessment() {

	let level = calcLevel();

  console.log('Submitted');
  alert("Your assessment has been submitted.");

	const answers = $assessment.serializeArray();
	console.log(answers);

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
		assessment['answers'].push({
			"q": answers[i].name,
			"a": answers[i].value
		});
	}

	const submission = {
		"marketName": marketName,
		"level": level,
		"assessment": assessment
	};
/*
	const testing = {
		"name": marketName,
		"address": addressInfo,
		"storeType": storeType,
		"level": level,
		"assessment": assessment
	}; */

	$.ajax({
			type: 'POST',
			url: '/assess-submit',
			contentType: 'application/json',
			data: JSON.stringify(submission),
		});


/*
	$.ajax({
		type: 'POST',
		url: '/assess-submit',
		data: {
			everything: JSON.stringify(testing)
		},
		success: (results) => {
			console.log("Results: " + results);
		},
	}); */

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
