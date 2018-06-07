let markets = $('#table_id').DataTable();


$(document).ready( function () {
  $('#table_id').DataTable();


});




function addListeners(){
	tabsListener();
	filterListener();
	viewByListener();
	modalListener();
}

function filterListener(){

	var filterCallerFn = function(){
		filteredData = filterClassifierData();
		currentDataDisplayed = filteredData;
		clearPage();
		redrawTable(filteredData);
		populatePage(filteredData);
		//initializeElements();
		addListeners();
	};
	$('#searchBtn').click(filterCallerFn);
	$('#clearFilterButton').click(clearFilters());
	$('#store-type-filter, #zipcode-filter, #levels-filter').change(filterCallerFn);
	$('#searchText').keypress(function(e) {
		if(e.which == 13) {
			filterCallerFn();
		}
	});
}

function clearFilters() {

    $('#levels-filter option:selected').each(function() {
        $(this).prop('selected', false);
    });

    //$('#levels-filter').multiselect('refresh');

	//$('#store-type-filter').val(null).trigger("change");
	//$('#levels-filter').val(null).trigger("change");

	//$('#zipcode-filter').val(null).trigger("change");
	console.log("hi");
}



// Base
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}

// From old app


function getLevelFilterVal(){
	
	var d = []; 
	$('#levels-filter :selected').each(function(i, selected){ 
	  d[i] = $(selected).val(); 
	});
	return d;
}

function getStoreTypeFilterVal(){
	
	var d = []; 
	$('#store-type-filter :selected').each(function(i, selected){ 
	  d[i] = $(selected).val(); 
	});
	return d;
}

function getZipcodeFilterVal(){
	return $('#zipcode-filter option:selected').text();
}

function addListeners(){
	tabsListener();
	filterListener();
	viewByListener();
	modalListener();
}

function filterListener(){

	var filterCallerFn = function(){
		filteredData = filterClassifierData();
		currentDataDisplayed = filteredData;
		clearPage();
		redrawTable(filteredData);
		populatePage(filteredData);
		//initializeElements();
		addListeners();
	};
	$('#searchBtn').click(filterCallerFn);
	$('#clearFilterButton').click(clearFilters());
	$('#store-type-filter, #zipcode-filter, #levels-filter').change(filterCallerFn);
	$('#searchText').keypress(function(e) {
		if(e.which == 13) {
			filterCallerFn();
		}
	});
}

function clearFilters() {

    $('#levels-filter option:selected').each(function() {
        $(this).prop('selected', false);
    });

    //$('#levels-filter').multiselect('refresh');

	//$('#store-type-filter').val(null).trigger("change");
	//$('#levels-filter').val(null).trigger("change");

	//$('#zipcode-filter').val(null).trigger("change");
	console.log("hi");
}

function viewByListener() {
	$('#view-by').change(function(){
		////console.log('register click');
		removePie();
		populatePie(currentDataDisplayed);
		
		if(viewByLevel == true)
			viewByLevel = false;
		else
			viewByLevel = true;

		populateMarkers(currentDataDisplayed);
	});
}