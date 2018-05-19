
var main = function() {
	/* Highlight active nav item */
	var url = window.location.href;
  	$("#home-nav .nav-link").filter(function() {
      return this.href == url;
    }).addClass("active");
};

$(document).ready(main);

