<%@ page language="java" pageEncoding="UTF-8"%>

<div id="aj-right-side-back-top-fixed-on-bottom" class="aj-transition-all">
	<span class="glyphicon glyphicon-chevron-up aicon"></span>
</div>
<style>
	#aj-right-side-back-top-fixed-on-bottom{
		position:fixed;
		z-index:999;
		bottom:180px;right:50px;
		width:50px;height:50px;
		border-radius:50%;
		background-color: #f5f5f5;
		text-align: center;
		line-height: 55px;
		display: none;
	}
	#aj-right-side-back-top-fixed-on-bottom .aicon{
		color:#666;
		font-size: 20px;
	}
	#aj-right-side-back-top-fixed-on-bottom:hover{
		box-shadow:#444 0 0 2px;
		cursor:pointer;
	}
</style>
<script>
	$(function () {
		var container = $("#aj-right-side-back-top-fixed-on-bottom");
		if(aj.isMobile()) {
			container.css({
				width : "40px",
				height : "40px",
				lineHeight : "45px",
				bottom : "50px",
				right : "50px"
			});
		}		
		$(window).on("aj.scroll", function () {
			if ($(window).scrollTop() > 300) {
				container.show();
			} else {
				container.hide();
			}
		});
		container.on("click", function () {
			if ($(window).scrollTop() > 1500) {
				$("html, body").scrollTop(0);
			} else {
				$("html, body").animate({
					scrollTop : 0
				});
			}
		});
	});
</script>