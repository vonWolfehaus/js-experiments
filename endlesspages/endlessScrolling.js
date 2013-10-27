/* Copyright (c) 2008 Corey von Birnbaum (coldconstructs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * v1.7
 * Tested with jQuery 1.2.6
 */
var triggered = false;
var preloadDistance = 400;
var mouseUp = true;
var checker = 0;
var page = 1;
var loading = "<div id='info'>";
loading += "<img src='loading.gif' align='left'>&nbsp; <strong>More posts are being loaded...</strong> <br />";
loading += "If you are using the scroll bar, release the mouse to see the next page.";
loading += "</div>";

function checkStatus() {
	if (mouseUp) fetchData();
}

function fetchData() { 
	clearInterval(checker);
	page++;
	var pageBreak = "<hr />";
	pageBreak += "<div id='pageBreak'>";
	pageBreak += "<em>page <strong>" + page + "</strong></em>";
	pageBreak += "</div><br /><br />";
	
	$("#info").remove();
	$("#container").append(pageBreak);
	$.get("dummyText.html", function(data) {
		$("#container").append(data);
		$("#container").append(loading);
		triggered = false;
	});
}

// INIT //
$(document).ready(function() {
	$("#container").append(loading);
	
	// ADD LISTENERS //
	$(window).mouseup(function(){
		mouseUp = true;
	});
	
	$(window).mousedown(function(){
		mouseUp = false;
	});	

	$(window).scroll(function () {
	if (!triggered) {
		if ($(window).scrollTop() >= $(document).height() - $(window).height() - preloadDistance) {
			checker = setInterval("checkStatus()", 300);
			checkStatus(); // We want to check immediately
			triggered = true;
		}
	}
	});
});