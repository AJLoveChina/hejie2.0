// 淘宝推荐物流订单的状态及其含义：http://service.taobao.com/support/knowledge-892240.htm
var orderConfig = {
    "jd.com": {
        "name": "JD",
        "listFlag": "JD",
        "indexURL": "http://jd.com",
        "listUrl": "http://order.jd.com/center/list.action",
        "urlPattern": "^(http://cart\\.jd\\.com/.*|http://cart\\.360buy\\.com/.*|http://order\\.jd\\.com/.*)",
        "notLoginReg": "<input .*id=\"loginname\".*",
        "tradeStartStatus": "等待自提|等待收货|正在出库",
        "tradeEndStatus": "已完成|已取消",
        "parseListTaskNum": 0,
        "listPageFilterReg": "<table.*</table>",
        "listPageProductRowSel": "tr",
        "listPageProductNameSel": "td:nth-child(2) > div > a:nth-child(1) > img:nth-child(1)",
        "listPageOrderIdSel": "td:nth-child(1) > a",
        "listPageOrderStatusSel": "td:nth-child(6)",
        "listPageDetailLinkSel": "a[name='orderIdLinks']",
        "detailPageFilterReg": "",
        "trackUrlSel": "http://order.jd.com/lazy/getOrderShowJson.action",
        "trackUrlData":{},
        "trackBaseUrl": "",
        "osTimeSel": "",
        "osContentSel": "",
		"finishReg":"完成配送|签收"
    },

    "taobao.com": {
        "name": "TAOBAO",
        "indexURL": "http://www.taobao.com",
        "listFlag": "TAOBAO",
        "listUrl": "http://trade.taobao.com/trade/itemlist/list_bought_items.htm",
        "urlPattern": "^(http://buy\\.tmall.com/.*|http://buy\\.taobao.com/.*|http://trade\\.taobao.com/.*)",
        "notLoginReg": "登录名.*登录密码.*忘记登录密码|login.taobao.com/member/login.jhtml|TPL_password",
        "tradeStartStatus": "买家已付款|卖家已发货",
        "tradeEndStatus": "交易成功|交易关闭|退款中的订单|",
        "parseListTaskNum": 0,
        "listPageFilterReg": "<table.*</table>",
        "listPageProductRowSel": "tbody",
        "listPageProductNameSel": "tr:nth-child(3) > td.baobei > div > a",
        "listPageOrderIdSel": "tr:nth-child(2) > td > span > label > span.order-num",
        "listPageOrderStatusSel": "tr:nth-child(3) > td.trade-status > a:nth-child(1)",
        "listPageDetailLinkSel": "tr:nth-child(3) > td.trade-status > span > a.detail-link",
        "detailPageFilterReg": "",
        "trackUrlSel": "#J_ExList",
        "trackBaseUrl": "http://trade.tmall.com/detail/query_package_trace.do?_input_charset=utf-8&",
        "trackUrlData":{
            "companyName": "data-company-name",
            "mailNo": "data-mail-no"
        },
        "trackInfo" : "div.trade-detail-logistic",
        "expressCompanySel": ".logistics-list > dl > dd:nth-child(4)",
        "expressIdSel": ".logistics-list > dl > dd:nth-child(6)",
        "osTimeSel": "",
        "osContentSel": "",
		"finishReg":"签收|成功"
    },

    "tmall.com": {
        "name": "TMALL",
        "indexURL": "http:www.taobao.com",
        "listFlag": "TAOBAO",
        "listUrl": "http://trade.taobao.com/trade/itemlist/list_bought_items.htm",
        "urlPattern": "^(http://buy\\.tmall.com/.*|http://buy\\.taobao.com/.*|http://trade\\.taobao.com/.*)",
        "notLoginReg": "登录名.*登录密码.*忘记登录密码|login.taobao.com/member/login.jhtml|TPL_password",
        "tradeStartStatus": "买家已付款|卖家已发货",
        "tradeEndStatus": "交易成功|交易关闭|退款中的订单",
        "parseListTaskNum": 0,
        "listPageFilterReg": "<table.*</table>",
        "listPageProductRowSel": "tbody",
        "listPageProductNameSel": "tr:nth-child(3) > td.baobei > div > a",
        "listPageOrderIdSel": "tr:nth-child(2) > td > span > label > span.order-num",
        "listPageOrderStatusSel": "tr:nth-child(3) > td.trade-status > a:nth-child(1)",
        "listPageDetailLinkSel": "tr:nth-child(3) > td.trade-status > span > a.detail-link",
        "detailPageFilterReg": "",
        "trackUrlSel": "#J_ExList",
        "trackBaseUrl": "http://trade.tmall.com/detail/query_package_trace.do?_input_charset=utf-8&",
        "trackUrlData":{
            "companyName": "data-company-name",
            "mailNo": "data-mail-no"
        },
        "trackInfo" : "div.trade-detail-logistic",
        "expressCompanySel": "div.trade-detail-logistic[data-company-name]",
        "expressIdSel": "div.trade-detail-logistic[data-mail-no]",
        "osTimeSel": "",
        "osContentSel": "",
		"finishReg":"签收|成功"
    },

    "z.cn": {
        "name": "AMAZON",
        "listFlag": "AMAZON",
        "indexURL": "http://www.amazon.com",
        "listUrl": "https://www.amazon.cn/gp/css/order-history",
        "urlPattern": "^(http://www.amazon.cn/gp/product/handle-buy-box/.*)",
        "notLoginReg": "我是一个新客户.*记住登录状态。",
        "tradeStartStatus": "尚未发货|即将发货|已从库房发出",
        "tradeEndStatus": "配送成功",
        "parseListTaskNum": 0,
        "listPageFilterReg": "<body.*</body>",
        "listPageProductRowSel": "div.action-box",
        "listPageProductNameSel": ".item-title",
        "listPageOrderIdSel": "ul.order-details > li > span:nth-child(2) > a",
        "listPageOrderStatusSel": "div.status > h2",
        "listPageDetailLinkSel": "div.order-links > a:nth-child(1)",
        "detailPageFilterReg": "",
        "trackUrlSel": "",
        "trackBaseUrl": "",
        "trackUrlData":{},
        "osTimeSel": "",
        "osContentSel": "",
		"finishReg":"配送成功",
        "host": "https://www.amazon.cn"
    },

    "global": {
        "parseOrderInterval": "1800000",
        "switch": "ON",
        "helpUrl":"http://baidu.com/"
    }
};

function ConfigKeys(){
    this.getNameKey = function(){
		return "name";
	}
	this.getListFlag = function(){
		return "listFlag";
	}
    this.getIndexURL = function () {
        return "indexURL";
    }
	this.getListUrlKey = function(){
		return "listUrl";
	}
	this.getUrlPatternKey = function(){
		return "urlPattern";
	}
	this.getNotLoginRegKey= function(){
		return "notLoginReg";
	}
	this.getStartStatusKey = function(){
		return "tradeStartStatus";
	}
	this.getEndStatusKey = function(){
		return "tradeEndStatus";
	}
	this.getParseListTaskNumKey = function(){
		return "parseListTaskNum";
	}
	this.getListPageFilterRegKey = function(){
		return "listPageFilterReg";
	}
	this.getListPageProductRowSelKey = function(){
		return "listPageProductRowSel"
	}
	this.getListPageProductNameSelKey = function(){
		return "listPageProductNameSel";
	}
	this.getListPageOrderIdSelKey = function(){
		return "listPageOrderIdSel";
	}
	this.getListPageOrderStatusSelKey = function(){
		return "listPageOrderStatusSel";
	}
	this.getListPageDetailLinkSelKey = function(){
		return "listPageDetailLinkSel";
	}
	this.getDetailPageFilterRegKey = function(){
		return "detailPageFilterReg";
	}
	this.getTrackUrlSelKey = function(){
		return "trackUrlSel";
	}
	this.getTrackUrlData = function(){
		return "trackUrlData";
	}
	this.getTrackBaseUrl= function(){
		return "trackBaseUrl";
	}
	this.getTrackInfo = function(){
		return "trackInfo";
	}
	this.getExpressCompanySelKey = function(){
		return "expressCompanySel";
	}
	this.getExpressIdSelKey = function(){
		return "expressIdSel";
	}
	this.getOrderStatusTimeSelectorKey = function(){
		return "osTimeSel";
	}
	this.getOrderStatusContentSelectorKey = function(){
		return "osContentSel";
	}
	this.getParseListIntervalKey = function(){
		return "parseListInterval";
	}
	this.getParseOrderIntervalKey = function(){
		return 'parseOrderInterval';
	}
	this.getSwitchKey = function(){
		return 'switch';
	}
}

var configKeys = new ConfigKeys();

/*	
 	local storage 存储的订单key value
		key : 	'order:' + siteName + ":订单号";
		value:	
		{
				'expressId':2830100269, 
				'expresscompany':'京东快递'|'亚马逊快递'|'申通'|... , 
				'detailLink':'',
				'status':'NEW'|'RUNNING'|'FINISH'|'CANCEL' ,
				'productName':商品名称 , 
				'trackUrl': '' , 
				'content':[{'time':年-月-日 H:M:S,'context':内容}...] ,
		}	
*/



function OrderTool(){

	function isSwitchOn(){
		if(orderConfig.global[configKeys.getSwitchKey()]=='ON')
			return true;
		else
			return false;
	}

	// 对local storage中未完成订单的调度
	function schedule(){
		if(!isSwitchOn())
			return;
		var globalConfig = orderConfig['global']; 
		var interval = parseInt(globalConfig[configKeys.getParseOrderIntervalKey()]);
		setInterval(function(){
			parseOrder();
		}, interval);
	}

	// 判断用户的浏览页面是否触发List页面解析
	function triggerListParse(url, configs, enforce){
		if(!isSwitchOn())
			return;
		for(var site in configs){
			if(site=='global')
				continue;
			var config = configs[site];
			var urlReg = new RegExp(config[configKeys.getUrlPatternKey()]);
			if(enforce || urlReg.test(url)){
				//触发List页面解析：在接下来一段时间内，解析List页面
				//List解析队列至多保存3个解析任务，少于3个添加新任务
				var taskNum = getListPageTaskNum(config);
				var timeLine = [5, 30, 90, 5*60, 10*60, 20*60];
				if(taskNum < timeLine.length){
					var n = timeLine.length - taskNum;
					for(var i=0; i<n; i++){
						(function(config){
							setTimeout(function(){
								parseListPage(config);
							}, timeLine[i]*1000);	
						})(config);

					}
				}
				setListPageTaskNum(config, timeLine.length);
			}
		}
	}

	function getListPageTaskNum(config){
		return parseInt(config[configKeys.getParseListTaskNumKey()]);		 
	}

	function getParseListInterval(config){
		return parseInt(config[configKeys.getParseListIntervalKey()]);
	}

	function setListPageTaskNum(config, num){
		config[configKeys.getParseListTaskNumKey()] = num;
	}

	function replaceHtml(html){
		if(!!!html)
			return html;
		// xxx.com/> -> xxx.com>
		node = html.replace(/[\n\r]/g, "").replace(/.com\/>/gim, ".com>").replace(/.cn\/>/gim,".cn>");
		node = node.replace(/<script.*?<\/script>/gim,"");
		node = node.replace(/on[a-z|A-Z]+=\"/gm,"XXXX=\"");
		return node;
	}
	
	// 解析local storage中保存的RUNNING状态的订单
	function parseOrder(){
        //先访问一次，获得session
        $.get("http://www.taobao.com", function () {});
        setTimeout(function () {
            for(var orderKey in localStorage) {
                if(orderKey.indexOf("order:") == 0) {
                    var orderValue = getOrderValue(orderKey);
                    var status = orderValue['status'];
                    if(status == 'RUNNING'|| status == 'NEW') {
                        parseEachOrder(orderKey, orderValue, parseOrderCallBack);
                    }
                }
            }  
        }, 1000 * 10);
	}

	function parseListPage(config){
		var taskNum = getListPageTaskNum(config);
		if(taskNum<=0)
			return;
		setListPageTaskNum(config, taskNum-1);

		// 下载List页面, 解析
		var listUrl = config[configKeys.getListUrlKey()];
		var notLoginReg = new RegExp(config[configKeys.getNotLoginRegKey()]);
		$.post(listUrl, function(data){
				data = replaceHtml(data);
				
				// 异常
				if(!!!data || notLoginReg.test(data)){
					console.log(config['name'], "parse List:未登录");
					return;
				}

				// 用正则匹配最小的一块html,
				var filterReg = config['listPageFilterReg'];
				var reg = new RegExp(filterReg);
				var node = reg.exec(data);
				if(!!!node || node.length != 1){
					console.log(config['name'],"list page parse error");
                    var params = ['msg=LIST_PAGE_PARSE_ERROR',  'type=ARMANI_EXTENSION_ORDER'];
					sendLog(params);
					return;
				}
				
				// 解析
				parseGeneralListNode(node[0], config);
			}
		);
	}

	function parseGeneralListNode(node, config){

		var siteName = config[configKeys.getNameKey()];
		var productNameSel = config[configKeys.getListPageProductNameSelKey()];
		var orderIdSel = config[configKeys.getListPageOrderIdSelKey()];
		var orderStatusSel = config[configKeys.getListPageOrderStatusSelKey()];
		var orderDetailLinkSel = config[configKeys.getListPageDetailLinkSelKey()];
		var rowSel = config[configKeys.getListPageProductRowSelKey()];
		var orderStartStatusReg = new RegExp(config[configKeys.getStartStatusKey()]);
		var orderEndStatusReg = new RegExp(config[configKeys.getEndStatusKey()]);
		var hasNewOrder = false;
		$(rowSel,node).each(function(i, data) {
			var orderId = $(orderIdSel, $(data)).text().trim();
			var detailLink =  $(orderDetailLinkSel, $(data)).attr('href');
			if(!!!orderId || orderId.length<=0)
				return;
			
			// 取出每个订单的名称, 订单号，订单状态，包含物流信息的link
			var orderStatus = $(orderStatusSel, $(data)).text().trim();
			if(siteName == 'JD')
				var productName = $(productNameSel, $(data)).attr('title');
			else if(siteName == 'TAOBAO' || siteName == 'TMALL')
				var productName = $(productNameSel, $(data)).text().trim();
			else if(siteName == 'AMAZON'){
				var productName = $(productNameSel, $(data)).text().trim();
				detailLink =  config.host + detailLink;
			}
				

			//在途
			if(orderStartStatusReg.test(orderStatus)){
                var orderListFlag = config[configKeys.getListFlag()];
                console.log("orderListFlag: ", orderListFlag);
				var orderKey = getOrderKey(orderId, orderListFlag);
				var orderValue = getOrderValue(orderKey);
				if(orderValue==null){//新订单
					var orderValue = newOrderValue('', '', detailLink,
									'NEW', productName);
					setStorage(orderKey, JSON.stringify(orderValue));
					hasNewOrder = true;					
                    //发现新的订单并不马上弹出提示，而是如果该订单有一个状态的时候再弹出提示有新订单
					//openWindow(orderKey, true);
				}
			} else {
				var orderKey = getOrderKey(orderId, siteName);
				var orderValue = getOrderValue(orderKey);
				if(orderValue!=null)
					setOrderFinish(orderKey, orderValue);
			}
        });	

		// 发现新的未完成订单，立刻解析一次订单详情
		if(hasNewOrder){
			setTimeout(
				function(){
					parseOrder();
				},
			10000);
		}

	}

	function newOrderValue(expressId, expressCompany, detailLink, 
						_status, productName){
		var orderValue = {};
		orderValue['productName'] = productName;
		orderValue['expressId'] = expressId;
		orderValue['expressCompany'] = expressCompany;
		orderValue['detailLink'] = detailLink;
		orderValue['status'] = _status;
		orderValue['content'] = [];
		return orderValue;
	}

	function setOrderFinish(orderKey, orderValue){
		orderValue['status'] = 'FINISH';
		storeOrder(orderKey, orderValue);
	}

	// 将订单状态改为CANCEL(场景：用户选择了弹框中的取消提醒)
	function setOrderCancel(orderKey, orderValue){
		orderValue['status'] = 'CANCEL';
		storeOrder(orderKey, orderValue);
	}
	function storeOrder(key,val){
		try{
			val = JSON.stringify(val);
			setStorage(key, val);
		}catch(e){
			console.log(e);
		}
	}

	function getOrderKey(orderNum, listFlag){
		return "order:"+listFlag+":"+orderNum;
	}

	function getOrderValue(orderKey){
		var tmpStr = getStorage(orderKey);
		if(tmpStr==null)
			return null;
		try{
			return JSON.parse(tmpStr);
		}catch(e){
			console.log(e);
			return null;
		}
	}


	function getConfig(orderKey){
		if(orderKey.indexOf('TAOBAO')>0){
			return orderConfig['taobao.com'];
		}else if(orderKey.indexOf('JD')>0){
			return orderConfig['jd.com'];
		}else if(orderKey.indexOf('AMAZON')>0){
			return orderConfig['z.cn'];
		}else if(orderKey.indexOf('TMALL'))
			return orderConfig['tmall.com'];
	}

	// 解析一个订单的快递状态
	function parseEachOrder(orderKey, orderValue, callback){
		// 根据不同的站点去解析
		// 京东的订单接口通过url拼接得到
		// 淘宝的订单接口通过parsedetail页面获取
		// 亚马逊订单接口通过parsedetail页面获取
		var config = getConfig(orderKey);
		var site = config[configKeys.getNameKey()];
		if(site == 'JD'){
			parseJDOrder(config,orderKey, orderValue, callback);
			return;
		}

        var indexURL = config[configKeys.getIndexURL()];
        var detailLink = orderValue['detailLink'];
        var notLoginReg = new RegExp(config[configKeys.getNotLoginRegKey()]);

        $.get(detailLink, function (data) {
                var node = replaceHtml(data);
                if(notLoginReg.test(node)){
                    console.log("not log in " + config['name']);
                    var params = ['msg=NOT_LOGIN_IN_' + config['name'],  'type=ARMANI_EXTENSION_ORDER'];
                    sendLog(params);
                    if(!!!config['hadOpenLoginWindow']){
                        openLoginWindow(site);
                        config['hadOpenLoginWindow'] = true;
                    }
                    return;
                }
                if(site == 'TAOBAO' || site == 'TMALL'){		
                    parseTaobaoOrder(node, config, orderKey, orderValue, callback);
                }else if(site == 'AMAZON'){
                    parseAmazonOrder(node, config, orderKey, orderValue, callback);
                }
        });
	}

	function parseJDOrder(config, orderKey, orderValue, callback){
		var arr = orderKey.split(':');
		if(arr.length != 3)
			return ;
		orderValue['expressCompany'] = '京东快递';
		var id = arr[2];
		var url = config[configKeys.getTrackUrlSelKey()];
		$.post(url, {orderId:id}, 
        	function(data){
				var notLoginReg = new RegExp(config[configKeys.getNotLoginRegKey()]);
				if(notLoginReg.test(data)){
					if(!!!config['hadOpenLoginWindow']){
						openLoginWindow(config[configKeys.getNameKey()]);
						config['hadOpenLoginWindow'] = true;
					}
					return;
				}				
				try{
					var json = JSON.parse(data);
					if(!!!json){
						var params = ['err=JD_JSON_FORMAT_CHANGED1.',
                            "type=ARMANI_EXTENSION_ORDER"];
						sendLog(params);
						console.log('JD json format changed1.');
						return;
					}
				}catch(e){
                    var params = ['err=JD_JSON_FORMAT_CHANGED1.',
                        "type=ARMANI_EXTENSION_ORDER"];
					sendLog(params);
					console.log(e);
					return;
				}
				orderValue['content'] = transJdContentArr(config,json,orderValue);
				callback(orderKey, orderValue);
			}
    	);
	}

	function transJdContentArr(config, json, orderValue){
		var arr = json['orderTrackInfos'];
		arr.reverse();
		var r = [];
		var finishReg = new RegExp(config['finishReg']);
		for(var i=0; i<arr.length; i++){
			var a = arr[i];
			var trans = {};
			trans['context'] = a['title'] || a['content'];
			if(finishReg.test(trans['context']))
				orderValue['status'] = 'FINISH';
			var mill = a['creationTime'];
			if(mill == null || mill<=0){
				console.log("JD json format changed2.");
                var params = ['JD_JSON_FORMAT_CHANGED2.',
                    "type=ARMANI_EXTENSION_ORDER"];
				sendLog(params);
				trans['time'] = '';
				r.push(trans);
			}else{
				var t = new Date(mill);
				trans['time'] = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ' ' +
							t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
				r.push(trans);
			}
		}
		return r;
	}
	
	function parseAmazonOrder(node, config, orderKey, orderValue, callback){
        var $trackUrlFlag = $('img[alt="跟踪包裹"]', node);
        if ($trackUrlFlag.length > 0) {
            orderValue['trackUrl'] = config.host + $trackUrlFlag.parent().attr("href");
            if(/^http/.test(orderValue['trackUrl'])){
                $.get(orderValue['trackUrl'], function(data){
                    data = replaceHtml(data);
                    $("tr > td:nth-child(1)", data).each(function(i,data){
                        if($(data).text().trim()=='配送公司：') {
                            var tmp = $(data).parent().children();
                            if(tmp.length==2)
                                orderValue['expressCompany'] = $(tmp[1]).text().trim();
                        }
                        if($(data).text().trim()=='包裹号：') {
                            tmp = $(data).parent().children();
                            if(tmp.length==2)
                                orderValue['expressId'] = $(tmp[1]).text().trim();
                        }

                    });
                    contents = [];
                    var finishReg = new RegExp(config['finishReg']);
                    $("tr > td[nowrap='nowrap']", data).each(function(i,td){
                        var tdTxt = $(td).text().trim();
                        var dates = /(\d\d)\s+(\d)月\s+(\d+)/.exec(tdTxt);
                        if(!!dates && dates.length==4){
                            var row = $(td).parent();
                            var tds = $('td', row);
                            var time = /(\d\d):(\d\d):(\d\d)\s+([p,P,a,A,m,M]{2})/.exec($(tds[1]).text().trim());
                            if(time.length!=5){
                                var params = ['err=AMAZON_ORDER_STATUS_TIME_FORMAT_CHANGED.',
                                    "type=ARMANI_EXTENSION_ORDER"];
                                sendLog(params);
                                console.log("AMAZON_ORDER_STATUS_TIME_FORMAT_CHANGED.");
                                return;
                            }
                            var year = '20' + dates[1];
                            var month = dates[2];
                            var day = dates[3];
                            var hour = parseInt(time[1]);
                            var min = time[2];
                            var sec = time[3];
                            if(time[4]=='PM'||time[4]=='pm')
                                hour += 12;
                            var content = $(tds[3]).text().trim() + ' ' + $(tds[4]).text().trim();
                            if(finishReg.test(content))
                                orderValue['status'] = 'FINISH';
                            var info = {};
                            info['time'] =  year + '-' + month + '-' + day + ' ' +
                                hour + ':' + min + ':' + sec;
                            info['context'] = content;
                            contents.push(info);
                        }else{
                            var params = ['err=AMAZON_ORDER_STATUS_TABLE_FORMAT_CHANGED.',
                                "type=ARMANI_EXTENSION_ORDER"];
                            sendLog(params);
                        }
                    });
                    orderValue['content'] = contents;
                    callback(orderKey, orderValue);
                });
            }else{
                var params = ['err=AMAZON_TRACK_URL_PARSE_ERROR.',
                    "type=ARMANI_EXTENSION_ORDER"];
                sendLog(params);
                console.log("amazon track url parse error.");
            }		
        }
	}	

	// 解析淘宝订单
	function parseTaobaoOrder(node, config, orderKey, orderValue, callback){
		var expressComSel = config[configKeys.getExpressCompanySelKey()];
		var expressIdSel = config[configKeys.getExpressIdSelKey()];
		var urlSel = config[configKeys.getTrackUrlSelKey()];
		var site = config[configKeys.getNameKey()];
        var trackUrl;
        var $trackInfo = $(config[configKeys.getTrackInfo()], node);
        var isJSON;
        //http://a.tbcdn.cn/apps/tmallbuy/pub/detail/0.0.3/??util/countdown.js,util/trimString.js,util/updateTextNode.js,biz/loadAdd.js,biz/createCountdown.js,biz/addMessage.js,biz/extendTime.js,biz/createHover.js,app.js,core.js?20130530
        if ($trackInfo.length > 0) {
            var trackUrlData = config[configKeys.getTrackUrlData()];
            var trackUrl = config[configKeys.getTrackBaseUrl()]
            var queryList = [];
            for ( var dataFlag in trackUrlData) {
                if (trackUrlData.hasOwnProperty(dataFlag)) {
                    var query = dataFlag + "=" + $trackInfo.attr(trackUrlData[dataFlag]);
                    queryList.push(query);
                }
            }
            if ($(expressComSel, node).length > 0) {
                orderValue['expressCompany'] = $(expressComSel, node).text().trim();
            }
            if ($(expressIdSel, node).length > 0) {
                orderValue['expressId'] = $(expressIdSel, node).text().trim();
            }
            trackUrl += queryList.join("&");
            trackUrl = encodeURI(trackUrl);
            isJSON = true;
        } else {

            var expressCom = $(expressComSel,node).text().trim();
            var expressId = $(expressIdSel,node).text().trim();
            orderValue['expressCompany'] = expressCom;
            expressId = /\d+/.exec(expressId);
            if(!!!expressId)
                return;
            expressId = expressId[0];
            orderValue['expressId'] = expressId;
            trackUrl = $(urlSel, node).attr('data-url');
        }
		if(!!trackUrl && trackUrl.length>0 && trackUrl.indexOf('http')==0)
			orderValue['trackUrl'] = trackUrl;
		else{
			console.log("taobao parse track url error.");
			return;
		}

        var traces;
        var finishReg = new RegExp(config['finishReg']);
        if (isJSON) {
            $.ajax({
                    dataType: "json",
                    url: trackUrl,
                    success: function (data) {
                        traces = data.traces;
                        var tracesStr = JSON.stringify(traces);
                        //淘宝商城返回的订单信息是"&#24555;&#20214;&#24050;&#21040;&#36798;&#12304;&#31119;&#24314;&#27849;
                        //通过创建一个div,将其转换为中文
                        var $tmptDiv = $("<div/>");
                        $tmptDiv.html(tracesStr);
                        $("body").append($tmptDiv);
                        setTimeout(function () {
                            tracesStr = $tmptDiv.html();
                            traces = JSON.parse(tracesStr);
                            if(traces && finishReg.test(tracesStr)) {
                                orderValue['status'] = 'FINISH';
                            }
                            orderValue['content'] = transTaobaoContentArr(traces);
                            callback(orderKey, orderValue);
     
                        }, 0);
                   }
                });
        } else {
            $.get(trackUrl, function(data){
                    var tmp = data.match(/\{.*/g);
                    var err = false;
                    if(tmp && tmp.length==1) {
                        data = tmp[0].match(/.*\}/);
                    } else {
                        console.log('taobao 解析物流 unmatch. ', orderKey, orderValue);
                        err = true;
                    }
                    try{
                        var json = JSON.parse(data[0]);
                        if(json == undefined || json['traces'] == null){
                            console.log('taobao 解析物流 error. ', orderKey, orderValue);
                            err = true;
                        }
                    }catch(e){
                        console.log(e);
                        err = true;
                    }
                    if(err){
                        var params = ['err=TAOBAO_ORDER_JSON_FORMAT_CHANGED.',
                            "type=ARMANI_EXTENSION_ORDER"];
                        sendLog(params);
                        return;
                    }
                    if(finishReg.test(data[0])) {
                        orderValue['status'] = 'FINISH';
                    }
                    traces = json['traces'];
                    orderValue['content'] = transTaobaoContentArr(traces);
                    callback(orderKey, orderValue);
                }
            );
        }
	}

	// 将淘宝快递的状态内容转成我们存储的标准格式
	function transTaobaoContentArr(arr){
		arr.reverse();
		var r = [];
		for(var i=0; i<arr.length; i++){
			var a = arr[i];
			var trans = {};
			var time = a['acceptTime'];
			if(time==null){
				trans['time'] = '';
			}else{
				trans['time'] = time;
			}
			var context1 = a['acceptAddress'] || ' ';
			var context2 = a['remark'] || ' '; 		
			trans['context'] = context1 + context2;
			r.push(trans);
		} 
		return r;
	}

	// 订单状态解析后的回调
	function parseOrderCallBack(orderKey, newOrderValue){		
	 	var oldValue = JSON.parse(getStorage(orderKey));
        console.log("status: " + newOrderValue['status']);
		if(newOrderValue['status'] == 'NEW'){
			// 新发现的订单，状态未签收
			// 首先弹窗，用户可选择取消订单
			newOrderValue['status'] = 'RUNNING';
            console.log("orderKey: ", orderKey);
            console.log("newOrderValue: ", newOrderValue);
			storeOrder(orderKey, newOrderValue);
            openWindow(orderKey, true, 0);
			setTimeout(function(){
				orderValue = getOrderValue(orderKey);
				if(orderValue['status'] != 'CANCEL' && newOrderValue['content'].length > 0) {
                    console.log("orderKey: ", orderKey);
                    console.log("newOrderValue: ", newOrderValue);
                    openWindow(orderKey, false, newOrderValue['content'].length);
                }
			}, 15*1000);
			return;
		}

		var contentArray = oldValue['content'];
		var newContentArray = newOrderValue['content'];
		var oldFirstStatusTime;
		if((contentArray.length != newContentArray.length) &&
           newOrderValue['status'] == 'RUNNING') {
        	console.info("new status", newContentArray);
			storeOrder(orderKey, newOrderValue);
		    openWindow(orderKey, false, newContentArray.length);			
    	}
		storeOrder(orderKey, newOrderValue);
	}

	/**
		订单状态弹窗
	*/
	function openWindow(key, isNew, msgIndex){
		var site = key.split(":")[1];
        var isFeeded = localStorage["order.isFeeded"];
        if (isFeeded == "true") {
             if (webkitNotifications.createHTMLNotification) {
                var notification = window.webkitNotifications
                    .createHTMLNotification("order-notification.html?key=" + 
                            encodeURIComponent(key) + "&isNew=" + isNew + "&msgIndex=" + msgIndex);
                notification.show();	
                if (isNew) {
                    localStorage["order.todayFeeded"] = "";
                    setTimeout(function () {
                        notification.close();
                    }, 10 * 1000);
                }
            } else {
                try{
                    var val = JSON.parse(localStorage[key]);
                }catch(e){
                    console.log(e);
                    return;
                }

                var siteName =  orderNotifyUtil.getSiteDisName(key.split(":")[1]);
                var logParams = ['isNew='+isNew, "siteName=" + siteName,
                    "type=ARMANI_EXTENSION_POPUP"];
                if(!isNew) {
                    // 订单新状态的弹窗
                    localStorage["order.todayFeeded"] = "";
                    logParams.push('action=CHROME_ORDER_NEWSTATUS_POPUP');
                    orderNewStatus(key, val, msgIndex);	
                } else {
                    // 新订单
                    logParams.push('action=CHROME_ORDER_NEWORDER_POPUP');
                    newOrder(key, val);
                }
                sendLog(logParams);
            }
        }
 
	}

var notID = 0;
var orderNotify = window.orderNotifyUtil;
function askUserLogin(site){
	var orderNum = 0;
    var loginInfo = orderNotify.askUserLogin(site);
    var options = null;
    var iconUrl = chrome.runtime.getURL("/images/80-80.jpg");
    var buttons = [{
        title: "去登录，更新物流状态",
        iconUrl: chrome.runtime.getURL("/images/6.png")
    }, {
        title: "暂不登录",
        iconUrl: chrome.runtime.getURL("/images/5.png")
    }];

    options = {
        iconUrl: iconUrl,
        type: "list",
        title: "您的订单状态未更新",
        message: "您的订单状态未更新",
        items: [ {
                title: "购物商城：",
                message: loginInfo.name
            },{
                title: "订单状态：",
                message: loginInfo.orderNum + "个待收货状态未更新"
        }],
        buttons: buttons
    }
    chrome.notifications.create("order.Login." + site, options, function () {
        var params = ['action=CHROME_ORDER_LOGIN_POPUP', "site="+site,
            "type=ARMANI_EXTENSION_POPUP"];
        sendLog(params);
    });
}

// 订单新状态弹窗
function orderNewStatus(key, val, index){
    var statusInfo = orderNotify.orderNewStatus(key, val, index);
    var record = statusInfo.record;
    var itemSiteTitle = statusInfo.siteName ? statusInfo.siteName + "（" : "";
    var itemSiteMesage;
    if (statusInfo.siteName) {
        itemSiteTitle = statusInfo.siteName + "（";
        itemSiteMesage = statusInfo.productName;
    } else {
        itemSiteTitle = statusInfo.productName;
        itemSiteMesage = "";
    }
    var buttons = [{
        title: "查看物流详情",
        iconUrl: chrome.runtime.getURL("/images/6.png")
    }, {
        title: "取消该订单物流提醒",
        iconUrl: chrome.runtime.getURL("/images/5.png")
    }];
    options = {
        iconUrl:"images/80-80.jpg",
        type: "list",
        title: "您有新的物流消息",
        message: "您有新的物流消息",
        items: [ {
                title: itemSiteTitle,
                message: itemSiteMesage
                },{
                title: "",
                message: statusInfo.record.time
                },{
                title: statusInfo.record.context,
                message: ""
        }],
        buttons: buttons
    };
    chrome.notifications.create("order.Status." + key, options, function () {
        var logParams = ['isNew=false', "siteName=" + statusInfo.siteName,
            "type=ARMANI_EXTENSION_POPUP", "action=CHROME_ORDER_NEWSTATUS_POPUP"];
        sendLog(logParams);
    });
}

function newOrder(key, val){
    var newOrderInfo = orderNotify.newOrder(key, val);
    var id = val.expressId;
    //if(id.length!=0) {
        var buttons = [{
            title: "确定跟踪",
            iconUrl: chrome.runtime.getURL("/images/3.png")
        }, {
            title: "取消该订单物流提醒",
            iconUrl: chrome.runtime.getURL("/images/5.png")
        }];
        var options = {
            iconUrl:"images/80-80.jpg",
            type: "basic",
            title: "检测到您有新订单",
            message: "检测到您有新订单",
            items: [ {
                title: "购物商城：",
                message: newOrderInfo.siteName ? newOrderInfo.siteName : ""
            },{
                title: "商品摘要：",
                message: newOrderInfo.productName
            }],
            buttons: buttons
        };
        chrome.notifications.create("order.NewOrder." + key, options, function () {
            var logParams = ['isNew=true', "siteName=" + newOrderInfo.siteName,
                "type=ARMANI_EXTENSION_POPUP", "action=CHROME_ORDER_NEWORDER_POPUP"];
            sendLog(logParams);
        });
    //}
}

function creationCallback () {
}
	function openLoginWindow(site){
		console.log('弹窗：登录' + site);
        var isFeeded = localStorage["order.isFeeded"];
        var todayFeededStr = localStorage["order.todayFeeded"];
        if (!!!todayFeededStr) {
            todayFeeded = [];
        } else {
            todayFeeded = JSON.parse(todayFeededStr);
        }

        var todayTimeStamp = new Date();
        var notifyTimeStamp = site + ":" + todayTimeStamp.getFullYear() + "-"
                                + todayTimeStamp.getMonth() + "-"
                                + todayTimeStamp.getDate();

        if (isFeeded == "true" &&
            todayFeeded.indexOf(notifyTimeStamp) === -1 &&
            todayFeeded.length < 3
           ) {
            todayFeeded.push(notifyTimeStamp);
            localStorage["order.todayFeeded"] = JSON.stringify(todayFeeded);
            if (webkitNotifications.createHTMLNotification) {
                var notification = window.webkitNotifications
                    .createHTMLNotification("order-notification.html?site=" + 
                            encodeURIComponent(site));
                notification.show();
            } else {
                askUserLogin(site);
                return;
            }
       }
	}

	function getStorage(key) {
    	return localStorage[key];
	}

	function setStorage(key, val) {
    	localStorage[key] = val;
	}

	// 第一次安装启动时，用源代码中定义的配置，后面用localstorage中的配置
	// 每次启动浏览器，从服务器端下载配置，写入到local storage
	function updateConfig(){
		//var testUrl = "http://nb171x.corp.youdao.com:4133/order.json";
		var configUrl = "http://zhushou.huihui.cn/conf/orderparser.json"//testUrl;
		$.getJSON(configUrl)
			.done(function(data){
				console.log(data);
				if(typeof data == 'object'){
					try{
						localStorage['orderConfig'] = JSON.stringify(data);
					}catch(e){
						console.log(e);
					}
				}
			})
			.fail(function(jqxhr, textStatus, error ) {
  				var err = textStatus + ', ' + error;
  				console.log( "update config failed: " + err);
			});

		var configStr = localStorage['orderConfig']; 			
		if(!!configStr){
			try{
				orderConfig = JSON.parse(configStr);
			}catch(e){
				console.log(e);
			}
		}
	}

	return {
		parseOrder:parseOrder,
		schedule:schedule,
		triggerListParse:triggerListParse,
		updateConfig:updateConfig
	};
}

var orderIsSwitchOn = localStorage["order.isSwitchON"];
if (orderIsSwitchOn === "true") {
    OrderTool().updateConfig();
    OrderTool().schedule();
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        switch (request.type) {
            case 'visitUrl':
                OrderTool().triggerListParse(request.url, orderConfig, false);
                break;
            default: break;
        }
    });
}
