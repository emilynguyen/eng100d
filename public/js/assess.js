
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

function submitAssessment() {
  console.log('Submitted');
  alert("Your assessment has been submitted.");
  window.location.href = "/assess";
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
