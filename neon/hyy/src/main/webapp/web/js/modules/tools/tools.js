define(function () {
	var timeagoInstance = new timeago();
	timeagoInstance.render($(".time_need_to_be_rendered"), 'zh_CN'); 
	
	
	var tools = {
		joinParams : function (url, params) {
			
			var paramsArr = [];
			for (var i = 0; i < params.length; i++) {
				paramsArr.push(params[i].key + "=" + encodeURIComponent(params[i].val));
			}
			url += "?" + paramsArr.join("&");
			
			return url;
		},
		openUrl : function (url) {
			window.open(url, 'oauth2Login_10914' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
		},
		logException : function (e) {
			console.log("An error happen..");
			console.log(e);
		},
		isLocal : function () {
			if (location.hostname.toLowerCase() == "localhost") {
				return true;
			} else {
				return false;
			}
		},
		tishi : function (info) {
			var container = $("#aj-gobal-tishi-modal");
			
			container.find(".modal-body").html(info);
			
			container.modal("show");
		},
		timeago : function (timeString) {
			// This method depends on a third js library
		    return (new timeago()).format(timeString, 'zh_CN');
		},
		/**
		 * render time to good format such as 
		 * one day ago
		 */
		renderTime : function (jDom) {
			timeagoInstance.render(dom, 'zh_CN'); 
		},
		isWap : function () {
			return isMobile.phone;
		}
		
		
	};
	
	
	
	

	
	var div = $("#aj-header");
	$(window).on("aj.scroll", function () {
		
		if ($(window).scrollTop() > 100) {
			div.addClass("mini");
		} else {
			div.removeClass("mini");
		}
	});
	
	
	// lazy load
	$(function () {
		var imgs = $("img");
		imgs.each(function () {
			var src = $(this).attr("src");
			if (/web\/pic\/dot.jpg$/.test(src)) {
				$(this).attr("src", "http://images.nigeerhuo.com/images/web/pic/dot.jpg");
			}
		});
		
		var lazyImages = $("img.aj-lazy");
		var urlPrefix;
		
		var urlPredixEnum = {
			ali : "http://nigeerhuo-public.img-cn-shanghai.aliyuncs.com/",
			me : "http://images.nigeerhuo.com/",
			local : "http://localhost:8888/"
		};
		
		var isLocal = tools.isLocal();

		lazyImages.each(function(index, item) {
			var src = $(this).attr("data-lazy");
			if (src === undefined) return;
			if (/^http:/.test(src)) {
				return;
			}
			
			var picStyle = $(this).attr("data-pic-style");
			
			if (src.indexOf("images/") == -1) {
				src = "images/" + src;
			}
			
			if (picStyle) {
				src = urlPredixEnum.ali + src +  "@!" + picStyle;
			} else if($(this).parents(".aj-joke-list-one").length > 0) {	
				//item content中的图片
				src = urlPredixEnum.ali + src + "@!w500_low";
			}else{
				src = urlPredixEnum.ali + src + "@!w500_low";
			}
			
			$(this).attr("data-lazy", src);
			
		});
		
		lazyImages.lazyload({
		    effect : "fadeIn",
		    data_attribute  : "lazy"
		});
	})
	
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
	
	//// 处理图片加载错误的问题
	$(function () {
		$("#aj-body > div.aj-body-left > div.aj-joke-list-one > div.panel-body > div.backinfo img").hide();
	})
			

	$(function () {
		$(".ajs-page-choices-v4-ul").each(function () {
			var cur = parseInt($(this).attr("data-curPage")),
				maxPage = parseInt($(this).attr("data-maxPage")),
				liCls = $(this).attr("data-li-cls"),
				urlTemplate = $(this).attr("data-urlTemplate"),
				aCurCls = $(this).attr("data-a-cur-cls"),
				aCls = $(this).attr("data-a-cls")
				uniCls = "aj-parsed";
				
				if ($(this).hasClass(uniCls)) {
					return false;
				}
				$(this).addClass(uniCls);
			
			var arr = [],
				urls = [],
				curCopy = cur,
				i;
			i = 2;
			
			var isMaxLimit = false;
			if (maxPage != -1) isMaxLimit = true;
			
			while(i-- > 0 && curCopy > 1) {
				curCopy --;	
			}	
			for (i = curCopy; i < curCopy + 6; i++) {
				arr.push(i);
			}
			
			for (i = 0; i < arr.length; i++) {
				if(isMaxLimit && arr[i] > maxPage) continue;
				urls.push({
					page : arr[i],
					url : changeTemplateToUrl(arr[i])
				});
			}
			
			var span = $(document.createElement("span")),
				domLi,
				domA;
			for (i = 0; i < urls.length; i++) {
				
				domA = $(document.createElement("a"));
				domA.attr("class", "atag");
				if (cur === urls[i].page) {
					domA.addClass("cur");
				}
				domA.attr("href", urls[i].url);
				domA.text(urls[i].page);
				
				domLi = $(document.createElement("li"));
				domLi.addClass("ali");
				domLi.append(domA);
				span.append(domLi);
			}
			$(this).prepend(span);	
			
			function changeTemplateToUrl(page) {
				var copy = urlTemplate;
				copy = copy.replace(/\{page}/, page);
				var encode = encodeURIComponent("{page}");
				var regExp = new RegExp(encode, "ig");
				copy = copy.replace(regExp, page);
				return encodeURI(copy);
			}
		});
	})
			
	return tools;
});
