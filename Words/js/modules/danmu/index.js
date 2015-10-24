define(function (require, exports, module) {
    var div = document.createElement('div'),
        id = "aj-danmu-" + ( +new Date()),
        style = document.createElement('style'),
        tishi,
        Text = require("./Text.js"),
        config = {};


    config.stop = false;    //control draw and refresh in function Text.scrollHorizon
    require.async("./index.css");
    require.async("tishi", function (a) {
        tishi = a;
    });
    $(div).attr('id', 'aj-danmu');
    $(div).html("<div class='aj-danmu-from'><div class='line'></div><div class='ball'>弹幕</div></div>" +
        "<div class='aj-danmu-content'><div class='submit-danmu'><input type='text' placeholder='吐槽一下~'><a href='javascript:;'>Submit</a></div></div>");
    $(div).appendTo(document.body);
    $(div).find('.ball').on('click', function () {
        var top = parseInt($(this).css('top'));
        $(this).animate({'top': top + 20 + 'px'}).animate({'top': top + 'px'});
        if ($(this).attr('aj-danmu-on') === undefined || $(this).attr('aj-danmu-on') === '0') {
            $(this).attr('aj-danmu-on', '1');
            config.stop = false;
            $(this).parents('#aj-danmu').find('.aj-danmu-content').slideDown(function () {
                if (!$(this).attr('aj-danmu-initial')) {
                    $(this).attr('aj-danmu-initial', '1');
                    initial();
                }
            });
        } else {
            $(this).attr('aj-danmu-on', '0');
            $(this).parents('#aj-danmu').find('.aj-danmu-content').slideUp();
            config.stop = true;
        }
    });
    function initial() {
        var prop = {};
        prop.div = $(div).find('.aj-danmu-content')[0];
        prop.source = ['你好, 弹幕正在初次加载中...', 'Seajs', 'YUi',
            'Kpois', 'Opera', 'IE', 'Firefox', 'chrome', 'Safari',
            'Lincoln', 'Akon', 'Javascript', 'PHP', 'CSS'];
        Text(prop).scrollHorizon(config);
        load(prop.source);
    }
    function load(arr) {
        var Danmu = new Parse.Object.extend("Danmu"),
            query = new Parse.Query(Danmu);
        var page = 1,
            num = 10,
            more = true,
            interval = 10 * 1000,
            timer2,
            timer;
        timer = setInterval(Parsing, interval);
        // get
        function Parsing(){
            if (arr.length === 0) {
                query.limit(num);
                query.skip((page - 1) * num);
                query.descending("createdAt");
                page += 1;
                query.find({
                    success : function (results) {
                        var i,
                            content = '';
                        for (i = results.length - 1; i >= 0; i--) {
                            content = results[i].get('content');
                            if ((typeof content).toLowerCase() == 'string') {
                                // 这地方注意, content 有可能是undefined 那么 后面可能会有错误
                                arr.unshift(content);
                            }
                        }
                        if (results.length < num) {
                            console.log("No more danmu on server");
                            clearInterval(timer);
                            timer = 0;
                        }
                    },
                    error : function (err) {
                        console.log(err);
                    }
                });
            }
        }
        timer2 = setInterval(function () {
            // 每 60 秒激活一次Get(如果Get已经关闭的话)
            if (!timer) {
                timer = setInterval(Parsing, interval);
            }
        }, 60 * 1000);
        // submit
        $(div).on('click', '.submit-danmu a', function () {
            var input = $(this).parent().find('input'),
                dd = new Danmu(),
                val = $.trim(input.val());
            if (val == '') {
                console.log('val is empty');
                return false;
            }
            dd.save({
                'content' : val
            },{
                success : function () {
                    if (!tishi) {
                        tishi = require('tishi');
                    }
                    tishi().show("提交成功, 谢谢你的弹幕O(∩_∩)O哈哈~");
                    input.val("");
                },
                error : function () {
                    tishi().show("网络好像出了点问题");
                }
            });
            arr.push({
                'word' : val,
                'color' : 'red'
            });
        });
    }
});