(function () {
	// User 类
	try {
		
		function User() {
			this.conatinerSelector = ".user-login";
			this.statusAttr = "data-islogin";
			this.configSelector = "#aj-user-sign-config";
		}
		User.prototype = {
			isLogin : function () {
				var form = $(this.configSelector)[0];
				
				if (form["isLogin"]) {
					try {
						return JSON.parse(form["isLogin"].value);
					}catch(ex) {
						return false;
					}
				} else {
					return false;
				}
			},
			getUserid : function () {
				var form = $(this.configSelector)[0];
				
				if (form["userid"]) {
					return form.userid.value;
				} else {
					return 0;
				}
			},
			getUserimg : function () {
				var form = $(this.configSelector)[0];
				
				if (form["img"]) {
					return form["img"].value;
				} else {
					return "";
				}
			},
			getNickname : function () {
				var form = $(this.configSelector)[0];
				
				if (form["nickname"]) {
					return form["nickname"].value;
				} else {
					return "";
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
			var imgs = $("img");
			imgs.each(function () {
				var src = $(this).attr("src");
				if (/web\/pic\/dot.jpg$/.test(src)) {
					$(this).attr("src", "http://images.nigeerhuo.com/images/web/pic/dot.jpg");
				}
			});
			
			var div = $("img.aj-lazy");
			var urlPrefix;
			
			var urlPredixEnum = {
				ali : "http://nigeerhuo-public.img-cn-shanghai.aliyuncs.com/",
				me : "http://images.nigeerhuo.com/",
				local : "http://localhost:8888/"
			};
			
			var isLocal = aj.tools.isLocal();

			div.each(function(index, item) {
				var src = $(this).attr("data-lazy");
				if (/^http:/.test(src)) {
					return;
				}
				
				var picStyle = $(this).attr("data-pic-style");
				
				if (src.indexOf("images/") == -1) {
					src = "images/" + src;
				}
				
				if (isLocal) {
					src = urlPredixEnum.local + src;
				} else {
					if (picStyle) {
						src = urlPredixEnum.ali + src +  "@!" + picStyle;
					} else if($(this).parents(".aj-joke-list-one").length > 0) {	
						//item content中的图片
						src = urlPredixEnum.ali + src + "@!w500_low";
					}else{
						src = urlPredixEnum.ali + src + "@!w500_low";
					}
				}
				
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
			
			aj.Tishi = aj.tishi = Tishi;
			
		});
		
	}catch(ex) {
		console.log(ex);
	}

	try {
		var tools = {
			isLocal : function () {
				if (location.hostname.toLowerCase() == "localhost") {
					return true;
				} else {
					return false;
				}
			}
		};
		aj.tools = tools;
	}catch(ex) {
		console.log(ex);
	}
	
	
	try {
		// 处理图片加载错误的问题
		$(function () {
//			$("img").on("error", function () {
//				$(this).attr("src", "http://images.nigeerhuo.com/images/web/pic/dot.jpg");
//			})
			
			$("#aj-body > div.aj-body-left > div.aj-joke-list-one > div.panel-body > div.backinfo img").hide();
		})
	}catch(ex) {
		console.log(ex);
	}
	
	try {
		// 百度自动提交
	    (function () {
	    	var bp = document.createElement('script');
		    var curProtocol = window.location.protocol.split(':')[0];
		    if (curProtocol === 'https') {
		        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
		    }
		    else {
		        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
		    }
		    var s = document.getElementsByTagName("script")[0];
		    s.parentNode.insertBefore(bp, s);
	    })();
	}catch(ex) {
		console.log(ex);
	}
})();