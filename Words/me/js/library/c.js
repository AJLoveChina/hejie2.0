(function(){
/*
* 	2014.AJ.All.Rights.Reserved
*/	
// Pulugin for underscore
    _.mixin({
        dateShow : function (time) {
            var date = new Date(time),
                fHour = date.getUTCHours(),
                fMinute = date.getMinutes(),
                fDay = date.getDate(),
                fMonth = date.getMonth(),
                timeDiff = + new Date() - date.getTime(),
                minutes = timeDiff / (1000 * 60),
                hours = minutes / 60,
                days = hours / 24,
                months = days / 30,
                years = months / 12,
                back = '';
            minutes = minutes.toFixed(1);
            hours = hours.toFixed(1);
            days = Math.floor(days);
            months = Math.floor(months);
            years = years.toFixed(1);
            if (minutes < 1) {
                back = "刚刚";
            } else if (minutes < 60){
                back = minutes + "分钟前";
            } else if (hours < 24) {
                back = hours + "小时前";
            } else if (days < 30) {
                if (fHour <= 12) {
                    back += "上午" + fHour + ':' + fMinute;
                } else if (fHour <= 18){
                    back += "下午" + (fHour - 12) + ':' + fMinute;
                } else {
                    back += "晚上" + (fHour - 12) + ':' + fMinute;
                }
                back += "&nbsp;(" + days + "天前)";

            } else if (months < 12) {
                if (fHour <= 12) {
                    back += "上午" + fHour + ':' + fMinute;
                } else if (fHour <= 18){
                    back += "下午" + fHour + ':' + fMinute;
                } else {
                    back += "晚上" + fHour + ':' + fMinute;
                }
                back += "(&nbsp;" + fMonth + '-' + fDay + '&nbsp;)';
            } else{
                back = years + '年前' + "(&nbsp;" + date.toDateString()+ "&nbsp;)";
            }
            return back;
        },
        ajPagination : function (params) {
            var config = {
                total : 0,
                size : 10,
                cur : 1,
                query : {}
            };
            _.extend(config, params);
            config.total = parseInt(config.total, 10);
            config.size = parseInt(config.size, 10);
            config.cur = parseInt(config.cur, 10);
            var pages = Math.ceil(config.total / config.size),
                i,
                back = [];
            back.push('<div class="aj-page">');
            back.push('<ul class="pagination">');
            config.query.page = (config.cur - 1) || 1;
            if (config.cur === 1) {
                back.push('<li class="prev disabled"><span>«</span></li>');
            } else {
                back.push('<li class="prev"><a href="javascript:;" data-params="' + _.escape(JSON.stringify(config.query)) + '" data-page="1">«</a></li>');
            }
            for (i = 1; i <= pages; i++) {
                config.query.page = i;
                if (i == config.cur) {
                    back.push('<li class="active"><a href="javascript:;" data-page="0">' + i + '</a></li>');
                } else {
                    back.push('<li><a href="javascript:;" data-params="' +  _.escape(JSON.stringify(config.query)) + '" data-page="' + i + '">' +  i + '</a></li>');
                }
            }
            config.query.page = config.cur + 1;
            if (config.cur === pages) {
                back.push('<li class="next disabled"><span>»</span></li>');
            } else {
                back.push('<li class="next"><a href="javascript:;" data-params="' +  _.escape(JSON.stringify(config.query)) + '" data-page="' + pages + '">»</a></li>');
            }
            back.push('</ul>');
            back.push('</div>');
            return back.join('');
        },
        ajWait : function(obj){//append wait div to obj!
            obj = $(obj);
            var xx = $(obj).find('.waiting_div');
            if(xx.length > 0){
                xx.show();
                return false;
            }
            if( obj.css('position') === 'static' ){
                obj.css({
                    position : 'relative'
                });
            }
            var box = obj.offset(),
                W = obj.width(),
                H = obj.height(),
                top,
                cut,
                height = (H / 4 > 70) ? 70 : (H / 4);
            height = (height < 30) ? 30 : height;
            cut = $(window).height() - (box.top - $(window).scrollTop());
            if (cut < H) {
                top = cut / 2 - height / 2;
            } else {
                top = H / 2 - height / 2;
            }
            var div = document.createElement('div');
            div.setAttribute('onclick','(function(e){var e=c.getEvent(e);c.stopPropagation(e);})()');
            div.setAttribute('class','waiting_div');
            div.setAttribute('style','position:absolute;background-color:rgba(255,255,255,0.5);top:0;left:0;width:100%;height:100%;');
            div.innerHTML = "<img src='./img/c/wait.gif' style='position:absolute;top:" + top + "px;left:50%;"+
                "margin-left:"+(-height/2)+"px;width:"+height+"px;height:"+height+"px;'>";
            obj.append(div);
        },
        ajNoWait : function(obj){
            $(obj).find('.waiting_div').hide();
        }
    });
}());
