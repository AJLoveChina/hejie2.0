(function () {
	

	
	try {
		//aj.jokeType = {WEISHEZHI:0,ONLY_WORD:1,STATIC_IMAGE:2,GIF:3,ZHIHU:4,FILM:31,TOUR:32,FOOD:33,SPORTS:34,INTERNET:35,FASHION:36,SYB:37,DESIGN:38,SCIENCE:39,ECONOMICS:40,CAREER:41,HOME:42,EDUCATION:43,CAR:44,LAW:45,MEDICINE:46,MUSIC:47,READ:48,HEALTH:49,LIFESTYLE:50,HISTORY:51,CAPTURE:52,LITERATURE:53,INVEST:54,PHYSICS:55,GAME:56,BUSINESS:57,TECH:58,MIAOPAI:59,STORY:101,ALL:9,UNKNOWN:99};
		
		aj.getPageType =  function () {
			var href = location.href;
			if (href.matches(/nigeerhuo.com$/)) {
				return "HOME";
			} else if (href.matched(/type=31/)){
				return "FILM";
			} else if (href.matched(/type=33/)) {
				return "FOOD";
			} else {
				return null;
			}
		}
		
	}catch(ex) {
		
	}
	
	
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
	
	
	// comments
	
})();