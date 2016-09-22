define(["model/user"], function (user) {
	function Comment() {
		this.className = "aj-comment-ui-area";
		this.groupIdAttr = "data-grounp-id";
		this.hasRenderClassName = "aj-comment-ui-area-has-rendered";
		this.commentsLoadUrl = "/comment/get";
	}
	Comment.prototype = {
			getGroupId : function (jDom) {
				return jDom.attr(this.groupIdAttr);
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
			},
			renderHeader : function (dom) {
				var div = $("<div>"),
					h3 = $("<h3>")
					textarea = $("<textarea>"),
					btn = $("<button>")
				h3.html("用户评论:");
				div.append(h3);
				
				if (user.isLogin()) {
					textarea.attr("placeholder", "说点什么呗~");
				} else {
					textarea.attr("placeholder", "您未登录, 无法评论");
					textarea.attr("disabled", "true");
					
				}
				textarea.addClass("form-control");
				div.append(textarea);

				btn.html("提交");
				btn.addClass("form-control");
				btn.css({
					"width" : "80px"
				})
				div.append(btn);
				
				$(dom).append(div);
			},
			
			renderComments : function (dom) {
				jDom = $(dom);
				var div = $("<div>"),
					that = this;
				$.ajax({
					url : this.commentsLoadUrl + "?commentsGroupId=" + this.getGroupId(jDom),
					type : "GET",
					dataType : "json",
					success : function(ar) {
						var i;
						if (ar.isok) {
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
						jDom.append(div);
					}
				});
			},
			renderCommentJsonToDom : function (map) {
				var div = $("<div>");
				div.html(map["userid"] + ":" + map["content"]);
				return div;
			},
			hasRendered : function (dom) {
				return $(dom).hasClass(this.hasRenderClassName);
			}
	}
	
	return new Comment();
});