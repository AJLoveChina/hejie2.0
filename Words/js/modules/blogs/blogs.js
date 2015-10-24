define(function (require, exports, module) {
    // aj.blogsLoad 触发blogs  load 事件
    var Blogs = new Parse.Object.extend("blogs"),
        canAjax = true,
        view_html,
        yy = require('config');
    var map = {
        "b1e": "前端",
        "b2e": "后台",
        "b3e": "算法",
        "b4e": "乱扯",
        "b5e" : "闲聊",
        "b11e": "HTML",
        "b12e": "CSS",
        "b13e": "JS",
        "b21e": "PHP",
        "b22e": "MySQL"
    };

    var params = {
        page: 1,
        size: 10,
        type: ''
    };

    if ($('.aj-blogs-container').length > 0) {
        LoadBlogs(params);
        Pagination(params);
    }
    $('.aj-pagination-wrap').on('click', 'a[data-params]', function () {
        var params = $.parseJSON($(this).attr('data-params'));
        if (canAjax) {
            LoadBlogs(params);
            Pagination(params);
        }
    });
    $('.aj-blogs-container').on('click', '.one-blog .show-more-btn', function () {
        var id = $(this).attr('data-aj-id'),
            container = $(this).siblings('.content-detail');
        if (container.hasClass('aj-has-ajax')) {
            container.toggle();
            return false;
        }
        if (container.hasClass('aj-is-ajaxing')) return false;
        container.addClass('aj-is-ajaxing');
        container.show();
        _.ajWait(container);
        LoadContent(id, function (content) {
            var className = 'aj-blog-content-render' + _.random(1000, 9999);
            _.ajNoWait(container);
            container.addClass("aj-has-ajax");
            container.html(content);
            container.addClass(className);
            container.removeClass('aj-is-ajaxing');
            if (!container.hasClass('aj-has-render')) {
                container.addClass('aj-has-render');
                uParse('.' + className, {
                    rootPath : yy.prop.ueHref
                });
            }
        });
    });
    function LoadContent(id, fn) {
        var query = new Parse.Query(Blogs);
        query.select('content');
        query.get(id, {
            success: function (res) {
                var content = res.get('content');
                fn(content);
            },
            error: function (err) {
                fn("<p style='padding: 20px;text-align: center;'>抱歉, 网络被黑洞吞噬了....</p>");
            }
        });
    }
    function LoadBlogs(params) {
        var query = new Parse.Query(Blogs);
        canAjax = false;
        var config = {
            page: 1,
            size: 10,
            type: ''
        };
        $.extend(config, params);
        var container = $('#aj-mid .aj-blogs-container');
        _.ajWait(container);

        query.skip((config.page - 1) * config.size);
        query.limit(config.size);
        query.descending("date_entered");
        query.containedIn("is_delete", [false, undefined, '']);
        query.find({
            success: function (model) {
                var i,
                    item = {},
                    template,
                    content = [];

                template = _.template(view_html);
                content.push('<div class="blogs-wrap">');
                for (i = 0; i < model.length; i++) {
                    item.id = model[i].id;
                    item.title = model[i].get("title");
                    item.desc = model[i].get("desc");
                    item.stamps = model[i].get("stamps");
                    item.stampsArr = item.stamps.split(',');
                    item.types = $.trim(model[i].get("types"));
                    item.typesArr = [];
                    _.each(item.types.split(","), function (one) {
                        item.typesArr.push({
                            'key': one,
                            'val': map[one]
                        });
                    });
                    item.view = model[i].get("view") || 1;
                    item.date = model[i].get("date_entered");
                    item.time = _.dateShow(item.date);
                    content.push(template({
                        'item': item
                    }));
                }
                content.push('</div>');
                container.html(content.join(""));
                _.ajNoWait(container);
                canAjax = true;
                $(window).trigger("aj.blogsLoad"); // blogs 加载完成后要做的事情 开始!

            },
            error: function (err) {
                canAjax = true;
                container.html("<p class='text-align:center;padding:10px;'>页面导航加载失败...刷新可能解决问题</p>");
            }
        });
    }
    function Pagination(params) {
        var query = new Parse.Query(Blogs);
        var container = $('#aj-mid .aj-pagination-wrap');
        _.ajWait(container);
        query.containedIn("is_delete", [false, undefined, '']);
        query.count({
            success: function (total) {
                _.ajNoWait(container);
                container.html(_.ajPagination({
                    total: total,
                    size: params.size,
                    cur: params.page,
                    query: params
                }));
            },
            error: function () {
                _.ajNoWait(container);
                container.html("<p class='text-align:center;padding:10px;'>页面导航加载失败...刷新可能解决问题</p>");
            }
        });
    }
    view_html = ["<div class=\"one-blog\" blog_id=\"\">",
        "    <div class=\"one-blog-wrap\">",
        "        <div class=\"title\"><%=item.title%></div>",
        "        <div class=\"info\">",
        "            <span class=\"stamp time\" title=\"Pub Time\">",
        "                <span class=\"stamp-name\"></span>",
        "                <span class=\"stamp-one\"><span class=\"date_show_inside\"><%=item.time%></span></span>",
        "            </span>",
        "            <span class=\"stamp biaoqian\" title=\"Stamp\">",
        "                <span class=\"stamp-name\"></span>",
        "                    <%_.each(item.stampsArr, function(one){%>",
        "                        <span class=\"stamp-one biaoqian-one\"><%=one%></span>",
        "                    <%})%>",
        "            </span>",
        "            <span class=\"stamp view\" title=\"Views\">",
        "                <span class=\"stamp-name\"></span>",
        "                <span class=\"stamp-one\"><%=item.view%></span>",
        "            </span>",
        "            <span class=\"blog-nav select\" index=\"0\">",
        "                文章",
        "                <span class=\"huakuai\">",
        "                    <span class=\"huakuai-wrap\"></span>",
        "                </span>",
        "            </span>",
        "            <span class=\"blog-nav blog-nav-comment\" index=\"1\">",
        "                评论",
        "                <span class=\"huakuai\">",
        "                    <span class=\"huakuai-wrap\"></span>",
        "                </span>",
        "            </span>",
        "        </div>",
        "        <div class=\"content-wrap\">",
        "            <div class=\"content content-block-one\" style=\"display:block;\">",
        "                <div class=\"content-wrap\">",
        "                    <div class=\"content-desc\">",
        "                        <%=item.desc%>",
        "                    </div>",
        "                    <a href=\"javascript:void(0);\" data-aj-id=\"<%=item.id%>\" class=\"show-more-btn show-more c-tran\">Show Detail</a>",
        "                    <div class=\"content-detail c-wordwrap\"></div>",
        "                </div>",
        "            </div>",
        "            <div class=\"content content-block-one content-block-one-commentswrap\"></div>",
        "        </div>",
        "        <div class=\"bottom\">",
        "            <ul>",
        "                <li class=\"li nice c-hover\">Nice</li>",
        "                <li class=\"li comment c-hover\">Comment</li>",
        "                <!--",
        "                    <li class=\'li danmu c-hover\'>Danmu</li>",
        "                -->",
        "                <div class=\"c-clear\"></div>",
        "            </ul>",
        "            <div class=\"blog-types\">",
        "                <%_.each(item.typesArr, function (one) {%>",
        "                    <span class=\"type-one\">",
        "                        <a href=\"javascript:;\" data-type=\"<%=one[\'key\']%>\"><%=one[\'val\']%></a>",
        "                    </span>",
        "                <%})%>",
        "            </div>",
        "            <div class=\"c-clear\"></div>",
        "        </div>",
        "        <div class=\"bottom-zujian\">",
        "            <div class=\"zujian-one\">",
        "                <form class=\"comment-form\">",
        "                    <div class=\"div\">",
        "                        <input class=\"nickname c-textarea\" type=\"text\" name=\"nickname\" placeholder=\"Enter Your Nickname\">",
        "                        <span class=\"submit-comment-btn c-button\">Submit</span>",
        "                    </div>",
        "                    <div class=\"div\"><textarea class=\"comment-val c-textarea\" name=\"comment\" placeholder=\"Say something...\"></textarea></div>",
        "                    <div class=\"query-info\"></div>",
        "                    <input type=\"hidden\" name=\"id\" value=\"<%=item.id%>\">",
        "                </form>",
        "            </div>",
        "        </div>",
        "        <form class=\"form\">",
        "            <input type=\"hidden\" name=\"is-detail-show\" value=\"0\">",
        "            <input type=\"hidden\" name=\"blog-id\" value=\"<%=item.id%>\">",
        "            <input type=\"hidden\" name=\"file\" value=\"\">",
        "        </form>",
        "    </div>",
        "</div>"
    ].join("");
    module.exports = {
        map : map
    };
});