/* Copyright (c) 2008 Corey Birnbaum (coldconstructs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Version: 1.0
 *
 * Requires: jQuery 1.2.6+, jQuery Dimensions plugin
 */
var intervalRef = 0;
var mouseLoc = 0;	
var scrollVal = 0;
var intensity = 1;
var newX = 0;

function hideInfoBars() {
	$("#topScrollerShow").fadeOut("slow");
	$("#bottomScrollerShow").fadeOut("slow");	
}

function killScroll(element) {
	clearInterval(intervalRef);
	$(element).fadeOut("fast");
}

function scrollUp() {
	if (mouseLoc <= 25) intensity = 12;
	else if (mouseLoc > 25 && mouseLoc < 40) intensity = 8;
	else if (mouseLoc > 40 && mouseLoc < 50) intensity = 5;
	else if (mouseLoc > 50 && mouseLoc <= 60) intensity = 2;
	scrollVal -= intensity;
	
	if (scrollVal <= 0) {
		killScroll("#indTopScroller");
	}
	
	$(document).scrollTop(scrollVal);	
}

function scrollDown() {
	if (mouseLoc <= 25) intensity = 12;
	else if (mouseLoc > 25 && mouseLoc < 40) intensity = 8;
	else if (mouseLoc > 40 && mouseLoc < 50) intensity = 5;
	else if (mouseLoc > 50 && mouseLoc <= 60) intensity = 2;	
	scrollVal += intensity;
	
	if (scrollVal >= $(document).height() - $(window).height()) {
		killScroll("#bottomIndicator");
	}
	
	$(document).scrollTop(scrollVal);	
}

$(document).ready(function() {
	if (scrollVal <= 0) $("#topScrollerContainer").hide();
	if (scrollVal >= $(document).height() - $(window).height())
		$("#bottomScrollerContainer").hide();
	var timeoutRef = setTimeout("hideInfoBars()", 2000);
	$("#topIndicator").hide();
	$("#bottomIndicator").hide();
	
	$(window).scroll(function () {
		scrollVal = $(document).scrollTop();
		if (scrollVal <= 0) {
			killScroll("#topIndicator");
			$("#topScrollerContainer").hide();
		} else if (scrollVal > 0) {
			$("#topScrollerContainer").show();			
		}
		if (scrollVal >= $(document).height() - $(window).height()) {
			killScroll("#bottomIndicator");
			$("#bottomScrollerContainer").hide();			
		} else if (scrollVal < $(document).height() - $(window).height()) {
			$("#bottomScrollerContainer").show();			
		}
	});
	
	// Top bar events
	$("#topScrollerContainer").hover(
		function() {
			$("#topIndicator").show();
			scrollVal = $(document).scrollTop();
			intervalRef = setInterval("scrollUp()", 15);
			scrollUp();
		},
		function() {
			killScroll("#topIndicator");
		}
	);	
	
	$("#topScrollerContainer").mousemove(function(evt) {
		newX = evt.clientX - 50;
		$("#topIndicator").animate({marginLeft:newX}, 5);
		mouseLoc = evt.clientY;		
	});
	
	
	// Bottom bar events	
	$("#bottomScrollerContainer").hover(
		function() {
			$("#bottomIndicator").show();
			scrollVal = $(document).scrollTop();
			intervalRef = setInterval("scrollDown()", 15);
			scrollDown();
		},
		function() {
			killScroll("#bottomIndicator");
		}
	);	
	
	$("#bottomScrollerContainer").mousemove(function(evt) {
		newX = evt.clientX - 50;
		$("#bottomIndicator").animate({marginLeft:newX}, 5);
		mouseLoc = Math.abs(evt.clientY - $(window).height());		
	});
}); // end onLoad