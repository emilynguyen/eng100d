
function sortTable(metric, direction) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("submission-table");
  switching = true;

  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;

      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      if (metric === "market") {
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
      }
      else if (metric === "evaluator") {
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
      }
      else if (metric === "date") {
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
      }

      // Check if the two rows should switch place:
      if (direction === "ascending") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      else if (direction === "descending") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


function toggleSort(metric) {
  let targetClass = `.${metric}-sort`;
  let $icon = $(targetClass).find('.sort-icon');
  // If not sorted yet, sort ascending by default
  if ($icon.hasClass('fa-sort')) {
    $icon.removeClass('fa-sort');
    $icon.addClass('fa-sort-up');
    sortTable(metric, 'ascending');
  }
  else if ($icon.hasClass('fa-sort-down')) {
    $icon.removeClass('fa-sort-down');
    $icon.addClass('fa-sort-up');
    sortTable(metric, 'ascending');
  }
  else if ($icon.hasClass('fa-sort-up')) {
    $icon.removeClass('fa-sort-up');
    $icon.addClass('fa-sort-down');
    sortTable(metric, 'descending');
  }

  // Reset other icons
  $('#submission-table th').not(targetClass).find('.sort-icon').removeClass('fa-sort-down fa-sort-up').addClass('fa-sort');

}

$(document).ready(function() {
  // Sort submissions by most recent by default
  sortTable("date", "descending");

	$('.time-cell').each(function() {
    //$(this).text(timestampToDate($(this).html()));
    let d = new Date(parseInt($(this).html()));
    $(this).text(d.toLocaleString());
  });

  $( "#submission-table th" ).click(function() {
    if ($(this).hasClass('market-sort')) {
      toggleSort('market');
    }
    else if ($(this).hasClass('evaluator-sort')) {
      toggleSort('evaluator');
    }
    else if ($(this).hasClass('date-sort')) {
      toggleSort('date');
    }
  });

  // View assessment

  $('.assessment-row').click(function() {
    const market = $(this).find('.market-cell').text();
    const timestamp = $(this).find('.timestamp-cell').text();
    const entry = encodeURI(market + "/"+ timestamp);

    window.location.href =`/assessment/${entry}`;

  });

  $('.delete-assessment-btn').click(function() {
    const $row = $(this).closest('tr');
    const market = $row.find('.market-cell').text();
    const timestamp = $row.find('.timestamp-cell').text();
    const time = $row.find('.time-cell').text();
    const entry = encodeURI(market + "/"+ timestamp);

    if (confirm(`Are you sure you want to delete the ${market} assessment from ${time}?`)) {
      window.location.replace(`/delete-assessment/${entry}`);
      return false;
    }
    else {
      return false;
    }
  });
});
