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

});