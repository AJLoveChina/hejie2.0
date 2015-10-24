define(function (require, exports, module) {
	function Effect(img) {
		this.id = "#aj-imgs-whole-page";
		this.img = img;
		// this.container 
	}
	Effect.prototype = {
		click : function (){
			if (!this.isImgInsideContainer()) {
				this.mkCss();
				this.mkContainer();
				this.showImg();
			} else {
				
			}
		},
		mouseenter : function () {
			console.log(1);
			$(this.img).animate({'opacity' : '0.5'});
		},
		mouseleave : function () {
			$(this.img).animate({'opacity' : '1'});
		},
		isImgInsideContainer : function () {
			return $(this.img).parents(this.id).length === 0 ? false : true;
		},
		mkCss : function () {
			var id = 'aj-is-imgs-click-css-load';
			if ($('#' + id).length === 0) {
				var style = document.createElement('style');
				$(style).html(this.id + "{position:fixed;display:none;z-index:999;text-align:center;top:0;left:0;width:100%;height:100%;font-size:0;background-color:rgba(0, 0, 0, 0.4)}" +
							this.id + ":before{content:'';display:inline-block;height:100%;width:0;vertical-align:middle;}" + 
							this.id +" img{max-width:100%;max-height:100%;position:relative;vertical-align:middle;opacity:1!important;filter:alpha(opacity=100)!important;}");
				$(style).appendTo(document.head);
				$("<div id='" + id + "'></div>").appendTo(document.body);
			}
		},
		mkContainer : function () {
			if ($(this.id).length === 0) {
				var div = document.createElement('div');
				$(div).attr('id', this.id.replace(/^#*/, ''));
				$(div).html("<div class='c-close' style='font-size:25px;width:25px;height:25px;border-radius:50%;background-color:white;color:#555;box-shadow:white 0 0 4px;line-height:25px;text-align;center;' title='close' onclick=\"$(this).parent().fadeOut();\">X</div>");
				$(document.body).append(div);
				this.container = div;
			} else {
				this.container = $(this.id)[0];
			}
		},
		showImg : function () {
			$(this.container).find('img').remove();
			$(this.container).append($(this.img).clone());
			$(this.container).fadeIn();
		}
	};
	module.exports = Effect;
});