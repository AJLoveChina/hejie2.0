/**
 * Created by ajax on 2015/10/7.
 */
define(function () {
    function Div(params) {
        params = params || {};
        this.params = {
            'wrap': '#aj-mid .blogs-wrap',
            'wrapOne': '.one-blog',
            'titleSel': '.title'
        };
        $.extend(this.params, params);
        this.init();
    }

    Div.prototype = {
        init: function () {
            var that = this;
            $(window).on("aj.blogsLoad", function() {
                that.addComponents();
            });
        },
        addComponents: function () {
            this.removeComponents();
            var wrap = $(this.params['wrap']),
                ones = wrap.find(this.params['wrapOne']),
                that = this;
            var ul = document.createElement('ul'),
                className = 'aj-components-' + this.random(),
                idPrefix = "aj-for-quick-jump-",
                title,
                id;
            ul = $(ul);
            ul.addClass(className);
            ones.each(function () {
                title = $(this).find(that.params['titleSel']);
                id = $(this).attr('id');
                if (id === undefined || id === '') {
                    id = idPrefix + that.random();
                }
                $(this).attr('id', id);
                ul.append("<li class='li' title='" + title.html() + "'><a href='#" + id + "'>" + title.html() + "</a></li>");
            });
            this.addStyle('.' + className);
            $(document.body).append(ul);
            this.move.call(ul, this.params);
            this.ul = ul;
        },
        removeComponents : function() {
            if (this.ul) {
                $(this.ul).remove();
            }
        },
        move : function (params) {
            $(this).on('click', '.li', function () {
                $(this).addClass('active').siblings().removeClass('active');
            });
            $(this).on('click', '.li a', function (e) {
                e.preventDefault();
                var hash = $(this).attr('href');
                $('html,body').animate({
                    'scrollTop' : $(hash).offset().top - 100 + 'px'
                });
            });
            var timer,
                scrollTop,
                offset,
                that = this,
                indexScroll,
                ones = $(params['wrapOne']);
            $(window).on('scroll', function () {
                if (!timer){
                    timer = setTimeout(function () {
                        scrollTop = $(window).scrollTop();
                        ones.each(function (index) {
                            offset = $(this).offset();
                            if ((scrollTop + $(window).height() / 2 > offset.top) && (offset.top >= scrollTop)){
                                indexScroll = index;
                                return false;
                            }
                        });
                        that.find('.li').removeClass('active').eq(indexScroll).addClass('active');
                        timer = 0;
                    }, 200);
                }
            });
        },
        addStyle: function (className) {
            var style = {};
            var left = '740px';
            style[className] = "position:fixed;bottom:20px;left:" + left + ";font-size:13px;width:100px;line-height:20px;padding-left:10px;overflow:hidden;";
            style[className + ' .li'] = "cursor:pointer;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;position:relative;padding-left:10px;";
            style[className + ' .li:before'] = "content:'';width:8px;height:8px;border-radius:50%;background-color:#aaa;position:absolute;top:6px;left:0;";
            style[className + ' .li:hover'] = "color:#333;";
            style[className + ' .li.active'] = "color:cadetblue;";
            style[className + ' .li.active a'] = "color:cadetblue;";
            style[className + ' .li.active:before'] = "background-color:lightblue;";
            style = this.obj2Css(style);
            var tag = document.createElement('style');
            tag = $(tag);
            tag.html(style);
            tag.appendTo(document.head);
        },
        obj2Css: function (prop) {
            var key,
                back = '';
            for (key in prop) {
                back += key + "{" + prop[key] + "}";
            }
            return back;
        },
        random: function () {
            return Math.round(Math.random() * 10000);
        }
    };
    (new Div());
});