$(document).ready(function() {

	//on screen size smalled that 767px remove parallax images.
	$(window).resize(function () {
	    // Check window size
	    if($(window).width() < 767) {
	        // Unset data-image-src property
	        $(".parallax-window").attr("data-image-src", "");
	    }
	});

	//scrolling effect for all anhors except the ones with target _blank.
	$(document).on('click', 'a:not([target="_blank"])', function(event){
	    event.preventDefault();

		$('html, body').animate({
	    	scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 700);
	});

	//redirect button to map.
	$("#redirect").click(function () {
	    window.location.href ="https://panospant.github.io/partials/map.html";
	 });
});






