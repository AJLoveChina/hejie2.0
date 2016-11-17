define('tools/customEvent',[],function () {	// 自定义事件模块
	
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
define('model/user',[],function () {
	
	function User() {
		this.conatinerSelector = ".user-login";
		this.statusAttr = "data-islogin";
		this.configSelector = "#aj-user-sign-config";
		this.loginSuccessEventName= "aj.userLoginSuccess";
		this.logoutSuccessEventName = "aj.userLogoutSuccess";
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
		},
		/**
		 * 因为有些第三方登陆成功后是不刷新网页的, 所以触发登陆成功事件, 以让程序以外的
		 * 部分响应用户登录的情况
		 */
		triggerLoginEvent : function () {
			$(window).trigger(this.loginSuccessEventName);
		},
		triggerLogoutEvent : function () {
			$(window).trigger(this.logoutSuccessEventName);
		},
		onLogin : function (fn) {
			$(window).on(this.loginSuccessEventName, fn);
		},
		onLogout : function (fn) {
			$(window).on(this.logoutSuccessEventName, fn);
		}
	}
	
	
	return new User();
});
define('tools/tools',[],function () {
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

define('model/comment',[],function () {
	function Comment() {
		this.id = null;
		this.parentid = null;
		this.commentsGroupId = null;
		this.userid = null;
		this.content = null;
	}
	Comment.prototype = {
			
	};
	return Comment;
});
define('ui/comment',["model/user", "tools/tools", "model/comment"], function (user, tools, CModel) {
	function Comment() {
		this.className = "aj-comment-ui-area";
		this.groupIdAttr = "data-grounp-id";
		this.commentAreaTitleAttr = "data-title-value";
		this.hasRenderClassName = "aj-comment-ui-area-has-rendered";
		this.commentsLoadUrl = "/comment/get";
		this.submitUrl = "/comment/submit";
		this.textareaClassName = "user-comment-area";
		this.placeHolderWhenLogin = "亲, 说点什么吧~";
		this.placeHolderWhenLogout = "登陆才可以评论哦~";
		this.submitBtnClassName = "aj-submit-btn";
		this.submitErrorInfo = "服务器君出现异常,请待会再试试吧~~";
		this.oneCommentClassName = "one-comment";
		this.commentsWrapClassName = "comments-wrap-className";
		this.lastCommentTimestampAttribute = "data-last-comment-timestamp";
		this.pageSize = 20;
		this.classNameOfBtnForNextPageComments = "btn-get-next-page-comments";
		this.btnForNextPageCommentsPageAttribute = "data-next-page";
	}
	Comment.prototype = {
			getGroupId : function (jDom) {
				return jDom.attr(this.groupIdAttr);
			},
			getContentFromDom : function (jDom) {
				return jDom.find("." + this.textareaClassName).val();
			},
			render : function () {
				var divs = $("." + this.className);
				var that = this;
				divs.each(function () {
					that.renderDom(this);
				});
			},
			renderDom : function (dom) {
				if (this.hasRendered(dom)) return;
				
				$(dom).addClass(this.hasRenderClassName);
				
				this.renderHeader(dom);
				this.renderComments(dom);
				this.bindEvents(dom);
			},
			bindEvents : function (dom) {
				var that = this;
				user.onLogin(function () {
					that.enableComment(dom);
				});
				user.onLogout(function () {
					that.disableComment(dom);
				})
				$(dom).on("click", "." + this.submitBtnClassName, function () {
					var validate = that.validate(dom);
					if (validate !== true) {
						tools.tishi(validate);
						return;
					}
					var comment = that.getCommentFromDom(dom);
					that.submit(comment, dom);
				});
				$(dom).on("click", "." + this.classNameOfBtnForNextPageComments, function () {
					var page = parseInt($(this).attr(that.btnForNextPageCommentsPageAttribute));
					$(this).hide();
					that.renderComments(dom, page);
				})
			},
			/**
			 * 如果通过返回true, 否则返回错误消息
			 */
			validate : function (dom) {
				var bool = true;
				var msg = "";
				if (!user.isLogin()) {
					msg = "登陆后才可以评论哦~";
				} else if ($.trim($(dom).find("." + this.textareaClassName).val()) === "") {
					bool = false;
					msg = "内容不能为空的~~";
				}
				
				return bool === true ? bool : msg;
			},
			submit : function (comment, dom) {
				var that = this;
				var cls = "aj-is-ajax-now";
				var jDom = $(dom);
				if (jDom.hasClass(cls)) {
					return;
				}
				jDom.addClass(cls);
				$.ajax({
					url : this.submitUrl,
					type : "POST",
					data : {
						data : JSON.stringify(comment)
					},
					dataType : "JSON",
					success : function (ar) {
						if (ar.isok) {
							that.renderCommentPrependDom(comment, dom);
							that.clearAfterComment(dom);
						} else {
							tools.tishi(ar.data);
						}
					},
					error : function () {
						tools.tishi(that.submitErrorInfo);
					},
					complete : function () {
						jDom.removeClass(cls);
					}
				});
			},
			clearAfterComment : function (dom) {
				$(dom).find("." + this.textareaClassName).val("");
			},
			/**
			 * 把用户刚刚的评论显示在页面上
			 */
			renderCommentPrependDom : function (comment, dom) {
				comment["dateEnteredOfSave"] = new Date();
				comment["userimg"] = user.getUserimg();
				comment["nickname"] = user.getNickname();
				
				var div = this.renderCommentJsonToDom(comment);
				$(dom).find("." + this.commentsWrapClassName).prepend(div);
			},
			getCommentFromDom : function (dom) {
				var comment = new CModel();
				comment.commentsGroupId = this.getGroupId($(dom));
				comment.content = this.getContentFromDom($(dom));;
				
				return comment;
			},
			disableComment : function (dom) {
				$(dom).find("." + this.textareaClassName).attr({
					"disabled" : "true",
					placeholder : this.placeHolderWhenLogout
				});
			},
			enableComment : function (dom) {
				$(dom).find("." + this.textareaClassName).removeAttr("disabled").attr("placeholder", this.placeHolderWhenLogin);
			},
			renderHeader : function (dom) {
				var div = $("<div>"),
					h3 = $("<h3>")
					textarea = $("<textarea>"),
					btn = $("<button>"),
					titleValue = $(dom).attr(this.commentAreaTitleAttr);
				if (titleValue) {
					h3.html(titleValue);
				} else {
					h3.html("用户评论:");
				}
				
				div.append(h3);
				
				if (user.isLogin()) {
					textarea.attr("placeholder", "说点什么呗~");
				} else {
					textarea.attr("placeholder", "您未登录, 无法评论");
					textarea.attr("disabled", "true");
				}
				textarea.addClass("form-control");
				textarea.addClass(this.textareaClassName);
				div.append(textarea);

				btn.html("提交");
				btn.addClass("form-control " + this.submitBtnClassName);
				btn.css({
					"width" : "80px"
				})
				div.append(btn);
				
				$(dom).append(div);
			},
			
			renderComments : function (dom, page) {
				if (page === undefined) page = 1;
				jDom = $(dom);
				var div = $("<div>"),
					that = this;
				var len = 0;
				div.addClass(this.commentsWrapClassName);
				$.ajax({
					url : this.commentsLoadUrl + "?commentsGroupId=" + this.getGroupId(jDom) + "&page=" + page,
					type : "GET",
					dataType : "json",
					success : function(ar) {
						var i;
						if (ar.isok) {
							len = ar.data.length;
							ar.data.sort(function (a, b) {
								if ( + new Date(a["dateEnteredOfSave"]) > (+ new Date(b["dateEnteredOfSave"]))) {
									return -1;
								} else {
									return 1;
								}
							});
							for (i = 0; i < ar.data.length; i++) {
								div.append(that.renderCommentJsonToDom(ar.data[i]));
							}
						}
					},
					error : function () {
						div.html("加载失败");
						div.css({
							padding : "20px",
							textAlign : "center"
						});
					},
					complete : function () {
						//jDom.find("." + this.commentsWrapClassName).remove();
						var awrap = $("<div>");
						awrap.css({
							textAlign:"center",
							padding:"10px"
						});
						var more = $("<a>");
						more.attr("href", "javascript:;");
						if (len === that.pageSize) {
							more.html("下一页");
							more.addClass(that.classNameOfBtnForNextPageComments);
							more.attr(that.btnForNextPageCommentsPageAttribute, page + 1);
						} else if (len > that.pageSize) {
							more.html("下一页");
							more.addClass(that.classNameOfBtnForNextPageComments);
							more.attr(that.btnForNextPageCommentsPageAttribute, page + 2);
						} else {
							more.html("木有更多了");
						}
						awrap.append(more);
						
						jDom.append(div);
						jDom.append(awrap);
					}
				});
			},
			renderCommentJsonToDom : function (map) {
				var div = $("<div>");
				div.addClass(this.oneCommentClassName);
				div.css({
					marginTop : "10px"
				})
				div.html('<div class="c-header">' +
						'<img class="header-img" src="' +
						map["userimg"] +
						'"/><span class="name">' +
						map["nickname"] +
						'</span><span class="c-time">' +
						tools.timeago(map["dateEnteredOfSave"]) +
						'</span></div>' +
						'<div class="c-content">' +
						map["content"] +
						'</div>');
				return div;
			},
			hasRendered : function (dom) {
				return $(dom).hasClass(this.hasRenderClassName);
			}
	}
	
	return new Comment();
});
define('tools/seo',[],function () {
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
    
    
});
define('tools/googleCustomSearch',[],function () {
	
	$(function () {
		setTimeout(function () {
			var cx = '004921646225264859102:l38ugphmwgg';
		    var gcse = document.createElement('script');
		    gcse.type = 'text/javascript';
		    gcse.async = true;
		    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(gcse, s);
		}, 2000);
 	})

});
define('model/Goods',["tools/tools"], function(tools) {
	var Goods = {
		
		getGoodsTypeList : function (fn, errFn) {
			$.ajax({
				url : "/t/goodsTypeList",
				type : "GET",
				dataType : "json",
				success : function (res) {
					fn(res);
				},
				error : function (err) {
					errFn && errFn(err);
				}
			});
		},
		
		/**
		*	1.PC 2.Wap
		*/
		getPlatForm : function () {
			if (tools.isWap()) {
				return 2;
			} else {
				return 1;
			}
		},
		
		getGoodsTypeHref : function (params) {
			params = $.extend({
				plateForm : Goods.getPlatForm(),
				page : 1,
				goodsTypeId : 140
			}, params);
			var url = "/t/tbkQuery/view?data=" + encodeURIComponent(JSON.stringify(params));
			return encodeURI(url);
		}


	};
	
	return Goods;
});
require(["tools/customEvent", "ui/comment", "model/user", "tools/tools", "tools/seo", "tools/googleCustomSearch", "model/Goods"], function () {
	
});
define("requirejs-main", function(){});

