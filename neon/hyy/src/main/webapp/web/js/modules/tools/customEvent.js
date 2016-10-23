define(function () {	// 自定义事件模块
	
	//自定义滚动事件,提高浏览器性能
	var scrollTimer = 0;
	$(window).on("scroll", function () {
		if (!scrollTimer) {
			scrollTimer = setTimeout(function () {
				
				$(window).trigger("aj.scroll");
				scrollTimer = 0;
				
			}, 1000/24);
		}
	});
	
	(function () {
		var rtime;
		var timeout = false;
		var delta = 200;
		$(window).resize(function() {
		    rtime = new Date();
		    if (timeout === false) {
		        timeout = true;
		        setTimeout(resizeend, delta);
		    }
		});
		
		function resizeend() {
		    if (new Date() - rtime < delta) {
		        setTimeout(resizeend, delta);
		    } else {
		        timeout = false;
		        $(window).trigger("aj.resize");
		    }               
		}
	})();

});