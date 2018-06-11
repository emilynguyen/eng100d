$(document).ready(function() {
  $('.time-col').each(function() {
    let d = new Date(parseInt($(this).html()));
    $(this).text(d.toLocaleString());
  });

  $('.delete-assessment-btn').click(function() {
    let path = window.location.pathname;

    // Remove first slash and prepend with delete
    path = path.slice(1);
    path = "/delete-" + path;

    if (confirm('Are you sure you want to delete this assessment?')) {
      window.location.replace(path);
      return false;
    }
    else {
      return false;
    }
  });
});
