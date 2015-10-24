define(function (require, exports, module) {
    // FUNCTION defined below....
    var Comments = new Parse.Object.extend('comments'),
        view_template,
        view_no_content;

    function BlogsWrap(prop) {
        if (this instanceof BlogsWrap) {
            this.prop = prop;
            this.div = prop.div;
            this.canComment = true;
            this.aj_can_ajax_comment = true;
        } else {
            return new BlogsWrap(prop);
        }
        //this.blogSelected
        this.event();
    }
    BlogsWrap.prototype = {
        event: function () {
            var that = this;
            /*custom event
             aj-show-bottom : show bottom zujian
             */
            c.addEvent(this.div, 'click', function (ev) {
                var e = ev || window.event,
                    target = e.target || e.srcElement,
                    blog;
//                if ($(target).hasClass('show-more-btn')) {
//                    //show more btn  is clicked!
//                    blog = that.getParentBlog(target);
//                    // that.danmu(blog);
//                    that.toggleContentDetailDiv(blog);
//                    that.getBlogDetail(blog);
//                }
//                if ($(target).hasClass('danmu')) {
//                    that.toggleDanmu(target);
//                }
                if ($(target).hasClass('comment')) {
                    $(target).parents('.one-blog').find('.bottom-zujian').slideToggle();
                }
                if ($(target).hasClass('submit-comment-btn')) {
                    that.submitComment(target);
                }
                if ($(target).hasClass('blog-nav')) {
                    that.toggleBlogCommentArea(target);
                }
                if ($(target).hasClass('blog-nav-comment')) {
                    that.getComments(target);
                }
            });
        },
        getParentBlog: function (target) {
            var parent = target;
            while (!$(parent).hasClass('one-blog') && parent !== this.div) {
                parent = parent.parentNode;
            }
            // return $(target).parents('.one-blog')[0];
            return parent;
        },
        danmu: function (blog) {
            var prop = {};
            prop.div = c.ajax({obj: blog, className: 'content-wrap'})[0];
            prop.source = ['HTML', '前端', '后台', '算法', '数据结构', '游戏',
                'HTML5', 'Canvas', 'Jquery', 'IE', 'Firefox', 'chrome', 'Safari',
                'Lincoln', 'Akon', 'Javascript', 'PHP', 'CSS', 'Photoshop'];
            if (prop.div.getAttribute('has-danmu-canvas') !== '1') {
                Text(prop).scrollHorizon();
                prop.div.setAttribute('has-danmu-canvas', '1');
            } else {
                console.log('has-danmu-canvas');
            }
        },
        submitComment: function (target) {
            var parent = this.getParentBlog(target),
                form = c.ajax({obj: parent, className: 'comment-form'})[0],
                prop = {},
                that = this,
                info = c.ajax({obj: parent, className: 'query-info'})[0];
            info.innerHTML = '';

            if (!checkForm(form)) return false;
            if (!this.canComment) {
                info.innerHTML = '亲，待会儿在评论吧~';
                return false;
            }
            this.canComment = false;
            var com = new Comments();
            var acl = new Parse.ACL();
            acl.setPublicReadAccess(true);
            com.setACL(acl);
            com.save({
                name : form.nickname.value,
                content : form.comment.value,
                blog_id : form.id.value,
                is_delete : false
            },{
                success : function() {
                    info.innerHTML = '谢谢你的评论!^_^';
                    form.reset();
                    that.canComment = true;
                    that.aj_can_ajax_comment = true;
                    that.canComment = true;
                },
                error : function () {
                    info.innerHTML = 'Error Try Again!';
                    that.canComment = true;
                    that.canComment = true;
                }
            });
            function checkForm(form) {
                if (c.is.empty(form['nickname'].value) || c.is.empty(form['comment'].value)) {
                    info.innerHTML = 'Both input area are required!';
                    return false;
                } else {
                    return true;
                }
            }
        },
        toggleBlogCommentArea: function (target) {
            var index = target.getAttribute('index'),
                parent = this.getParentBlog(target),
                nav = c.ajax({obj: parent, className: 'blog-nav'}),
                blocks = c.ajax({obj: parent, className: 'content-block-one'});
            if (parent.getAttribute('area-select-index') == index) {
                console.log('You click the same area');
                return false;
            }
            parent.setAttribute('area-select-index', index);
            for (var i = 0; i < nav.length; i++) {
                $(nav[i]).removeClass('select');
                $(blocks[i]).hide();
            }
            $(nav[index]).addClass('select');
            blocks[index].style.display = 'block';
        },
        getComments: function (target) {
            var index = target.getAttribute('index'),
                parent = this.getParentBlog(target),
                area = c.ajax({obj: parent, className: 'content-block-one'})[1],
                prop = {},
                form = c.ajax({obj: parent, className: 'form'})[0],
                that = this,
                template = _.template(view_template);

            if (!this.aj_can_ajax_comment) {
                return false;
            }
            _.ajWait(area);
            this.aj_can_ajax_comment = false;
            var query = new Parse.Query(Comments);
            query.skip(0);
            query.limit(20);
            query.equalTo('blog_id', form['blog-id'].value);
            query.containedIn('is_delete', [false, undefined, '']);
            query.descending('createdAt');
            query.find({
                success : function (results) {
                    var item = {},
                        content = [];
                    if (results.length <= 0) {
                        area.innerHTML = view_no_content;
                    } else {
                        _.each(results, function (one) {
                            item.name = one.get('name');
                            item.content = one.get('content');
                            item.date = one.createdAt;
                            item.time = _.dateShow(item.date);
                            content.push(template({
                                item : item
                            }));
                        });
                        area.innerHTML = content.join('');
                    }
                    _.ajNoWait(area);
                },
                error : function () {
                    area.innerHTML = view_no_content;
                    _.ajNoWait(area);
                }
            });
        }
    };

    var prop = {},
        yy;

    $(window).on('aj.blogsLoad', function () {
        yy = require("config");
        prop.div = c.querySelector('#aj-mid .blogs-wrap');
        if (prop.div) {
            console.log(1);
            BlogsWrap(prop);
        }
    });
    view_no_content = ["<div>",
        "                    <p>哎呀,木有评论啦~\/\/(≧▽≦)/~啦啦啦</p>",
        "                    <img src=\"http://img.baidu.com/hi/jx2/j_0005.gif\">",
        "                    <p>Would you like leaving a comment?</p>",
        "                    <a href=\"javascript:;\" onclick=\"$(this).parents(\'.one-blog\').find(\'.bottom-zujian\').slideDown()\">OK,Comment now</a>",
        "                </div>"].join("");
    view_template = ["<div class=\"comment-one\">",
        "                <div class=\"comment-one-wrap\">",
        "                    <div class=\"one-top\">",
        "                        <span class=\"name\"><%=item.name%></span>",
        "                        <span class=\"fabiaoyu\">发表于</span>",
        "                        <span class=\"time\"><%=item.time%></span>",
        "                    </div>",
        "                    <div class=\"one-content\"><%=item.content%></div>",
        "                </div>",
        "            </div>"].join("");
});
//        toggleDanmu: function (target) {
//var parent = this.getParentBlog(target),
//    danmu = c.ajax({obj: parent, className: 'danmu-canvas'})[0];
//if (danmu === undefined) {
//    this.danmu(parent);
//} else {
//    $(danmu).fadeToggle();
//}
//},
//getBlogDetail: function (blog) {
//    if (!this.isThisBlogCanGetDetail(blog)) return false;
//    this.isThisBlogCanGetDetail(blog, false);
//    var detailWrap = c.ajax({obj: blog, className: 'content-detail'})[0],
//        blogForm = c.ajax({obj: blog, className: 'form'})[0],
//        that = this;
//    c.dom.wait(detailWrap);
//    $.get(yy.prop.root + 'blogs/' + blogForm['file'].value + '.txt', function (back) {
//        var div = document.createElement('div'),
//            className = 'blog' + (+new Date());
//        div.innerHTML = back;
//        div.setAttribute('class', className);
//        detailWrap.appendChild(div);
//        uParse('.' + className, {
//            rootPath: yy.prop.ueHref
//        });
//        c.dom.nowait(detailWrap);
//    });
//},
//toggleContentDetailDiv: function (blog) {
//    var detailWrap = c.ajax({obj: blog, className: 'content-detail'})[0];
//    $(detailWrap).slideToggle();
//},
//isThisBlogCanGetDetail: function (blog, bool) {
//    var form = c.ajax({obj: blog, className: 'form'})[0];
//
//    if (bool === undefined) {
//        return (form['is-detail-show'].value == '0') ? true : false;
//    } else {
//        form['is-detail-show'].value = bool ? '0' : '1';
//    }
//},
