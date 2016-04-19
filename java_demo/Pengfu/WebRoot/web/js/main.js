(function () {
	// User 类
	try {
		
		function User() {
			this.conatinerSelector = ".user-login";
			this.statusAttr = "data-islogin";
		}
		User.prototype = {
			isLogin : function () {
				var container = $(this.conatinerSelector);
				
				var statusCode = container.attr(this.statusAttr);
				if (statusCode == 1) {
					return true;
				} else {
					return false;
				}
			}
		}
		aj.User = User;
	
		
	}catch(ex) {
		console.log(ex);
	}
	
	
	// lazy load 
	try {
		
		$(function () {
			var div = $("img.aj-lazy");
			div.each(function(index, item) {
				var src = $(this).attr("data-lazy");
				
				if (src.indexOf("images/") == -1) {
					src = "images/" + src;
				}
				src = "http://" + location.host + ":8888/" + src;
				
				//$(this).attr("src", src);
				$(this).attr("data-lazy", src);
				
			});
			
			div.lazyload({
			    effect : "fadeIn",
			    data_attribute  : "lazy"
			});
		})	
		
		
	}catch(ex) {
		console.log(ex);
	}

	
	try {
		
		// jquery plugin animate css
		$.fn.extend({
		    animateCss: function (animationName) {
		        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
		            $(this).removeClass('animated ' + animationName);
		        });
		    }
		});	
		
	}catch(ex) {
		console.log(ex);
	}
	


	try {
		
		$(function () {
			// label random
			$(".label.random").each(function () {
				var arr = ["label-default", "label-primary", "label-success", "label-info", "label-warning", "label-danger"];
				
				var that = this;
				var random = Math.floor(Math.random() * arr.length);
				$.each(arr, function () {
					$(that).removeClass(this);
				})
				
				
				$(this).addClass(arr[random]);
			});	
			
		})
		
	}catch(ex) {
		console.log(ex);
	}
	
	try {
		// 给用户的提示, 全局通用
		$(function () {
			
			var Tishi = function (info) {
				var container = $("#aj-gobal-tishi-modal");
				
				
				container.find(".modal-body").html(info);
				
				container.modal("show");
			}
			
			aj.Tishi = Tishi;
			
		});
		
	}catch(ex) {
		console.log(ex);
	}

	
})();