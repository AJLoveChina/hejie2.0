/**
 * Created by ajax on 2015/10/18.
 */
define(function(require, exports, module){
    var Mess = new Parse.Object.extend("liuyan"),
        container = $('#aj-mid .mess-wrap'),
        pagination = $('#aj-mid .aj-pagination-wrap'),
        canAjax = true,
        view_html = '';
    var params = {
        page : 1,
        size : 10
    };
    view_html = ["<div class=\"mess-one\" data-aj-id=\"<%=item.id%>\">",
        "    <div class=\"mess-one-inside\">",
        "        <div class=\"mess-one-top\">",
        "            <div class=\"img\"><img src=\"<%=item.img%>\"></div>",
        "            <div class=\"one-top-right\">",
        "                <div class=\"name line\"><%=item.name%></div>",
        "                <div class=\"time line\"><%=item.time%></div>",
        "            </div>",
        "            <div class=\"c-clear\"></div>",
        "        </div>",
        "        <div class=\"mess-one-mid\">",
        "            <div class=\"one-mid-wrap\">",
        "                <%=item.content%>",
        "            </div>",
        "        </div>",
        "        <div class=\"mess-one-fot\">",
        "            <ul>",
        "                <li class=\"one-fot-li mess-reply c-hover\">Reply</li>",
        "                <li class=\"one-fot-li mess-nice c-hover\">Nice</li>",
        "                <div class=\"c-clear\"></div>",
        "            </ul>",
        "        </div>",
        "    </div>",
        "</div>"].join("");

    Load(params);
    Pagination(params);

    $('.aj-pagination-wrap').on('click', 'a[data-params]', function () {
        var params = $.parseJSON($(this).attr('data-params'));
        if (canAjax) {
            Load(params);
            Pagination(params);
        }
    });
    function Load(params) {
        var query = new Parse.Query(Mess);
        _.ajWait(container);
        canAjax = false;
        var config = {
            page : 1,
            size : 10
        };
        $.extend(config, params);
        query.skip((config.page - 1) * config.size);
        query.limit(config.size);
        query.equalTo('is_delete', false);
        query.equalTo('parent_id', undefined);
        query.descending('date_entered');
        query.find({
            success : function(results) {
                var content = [],
                    item = {},
                    template = _.template(view_html),
                    i;
                for (i = 0; i < results.length; i ++) {
                    item.id = results[i].id;
                    item.img = results[i].get('img');
                    item.user_id = results[i].get('user_id');
                    item.name = results[i].get('name');
                    item.content = results[i].get('content');
                    item.time = _.dateShow(results[i].get('date_entered'));
                    content.push(template({
                        item : item
                    }));
                }
                container.html(content.join(''));
                canAjax = true;
                _.ajNoWait(container);
            },
            error : function () {
                container.html("<p style='padding: 20px;text-align: center'>加载失败...</p>");
                canAjax = true;
                _.ajNoWait(container);
            }
        });
    }
    function Pagination(params) {
        var query = new Parse.Query(Mess);
        _.ajWait(pagination);
        query.containedIn("is_delete", [false, undefined, '']);
        query.count({
            success: function (total) {
                _.ajNoWait(pagination);
                pagination.html(_.ajPagination({
                    total: total,
                    size: params.size,
                    cur: params.page,
                    query: params
                }));
            },
            error: function () {
                _.ajNoWait(pagination);
                pagination.html("<p class='text-align:center;padding:10px;'>页面导航加载失败...刷新可能解决问题</p>");
            }
        });
    }
});