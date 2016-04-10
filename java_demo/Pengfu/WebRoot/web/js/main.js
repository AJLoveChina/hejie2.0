(function () {
	// lazy load
	$(function () {
		$("img.aj-lazy").lazyload({
		    effect : "fadeIn",
		    data_attribute  : "lazy"
		});
	})
	
	// jquery plugin animate css
	$.fn.extend({
	    animateCss: function (animationName) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
	            $(this).removeClass('animated ' + animationName);
	        });
	    }
	});
	
	
	
})();