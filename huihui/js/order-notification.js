$(document).ready(function () {
	// 提示登录
    var util = window.orderAssistant.util;
    function getUrlVars()
    {
        var vars = [], hash;
        var href = decodeURIComponent(window.location.href);
        var hashes = href.slice(href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var querys = getUrlVars();
	var site = querys["site"];
    var orderNotify = window.orderNotifyUtil;

    //如果有site这个字段，分为两种情况
    //提示登录 & 当用户点击商家的登录页面时，弹出有多少个订单在送。
	if(site){
        var type = querys["type"];
        if (type === "orderListNotify") {
            var conf = {
                notifyType: querys['notifyType'],
                siteName: querys["siteName"],
                newOrderListLen: querys["newOrderListLen"],
                runningOrderLen: querys["runningOrderLen"],
                cnName: decodeURIComponent(querys["cnName"]),
                newStatusOrderLen: querys["newStatusOrderLen"]
            }
            orderListNotify(conf);
            return;
        }
        var params = ['action=CHROME_ORDER_POPUP_LOGIN', "site="+site,
            "type=ARMANI_EXTENSION_POPUP"];
        sendLog(params);
		askUserLogin(site);
		return ;
	}

    var key = decodeURIComponent(/key=(.*?)&/.exec(location.search)[1]);
    console.log("key", key);
    var isNew = /isNew=(.*)/.exec(location.search)[1];
	try{
    	var val = util.getOrderValue(key);
	}catch(e){
		console.log(e);
		return;
	}

	var siteName =  val.siteName;
    var logParams = ['isNew='+isNew, "siteName=" + siteName,
        "type=ARMANI_EXTENSION_POPUP"];
    $("a").attr("log-site", siteName);
	if(isNew.indexOf("true") != 0) {
		// 订单新状态的弹窗
		var index = /msgIndex=(.*)/.exec(location.search)[1];
        logParams.push('action=CHROME_ORDER_POPUP_NEWSTATUS');
		orderNewStatus(val, index);	
	} else {
		// 新订单
        logParams.push('action=CHROME_ORDER_POPUP_NEWORDER');
		newOrder(key, val);
	}
    sendLog(logParams);
});

var util = window.orderAssistant.util;
function orderListNotify(conf) {
    //同一时间一个商城有多个新订单时，弹新订单汇总页面。
    //同一时间一个商城多个订单有新状态，弹新状态汇总页面。
    //  淘宝网3个待收货订单，暂无新物流状态
    //  淘宝网3个待收货订单，有2条新物流状态
    //  淘宝网3个新订单，已自动为您跟踪物流状态
    var message;
    var statusMsg = "";
    var params = ['action=CHROME_ORDER_POPUP_LIST_' + conf.notifyType + '',
        "site=" + conf.siteName,
        "type=ARMANI_EXTENSION_POPUP"
    ];
    sendLog(params);
    if (conf.notifyType === "newOrder") {
        message = conf.newOrderListLen + "个新订单，已自动为您跟踪物流状态";
    } else {
        message = conf.runningOrderLen + "个待收货订单, ";
        if (conf.newStatusOrderLen > 0) {
            message += "有";
            statusMsg = conf.newStatusOrderLen + "条新物流状态";
        } else {
            statusMsg += "暂无新物流状态";
        }
    }
    $("div.list-notify").show();
    $(".list-notify .cnName").html(conf.cnName);
    $(".list-notify .runningMsg").html(message);
    $(".list-notify .statusMsg").html(statusMsg);
}
// 提示用户登录弹窗
// 多个
function askUserLogin(site){
    var util = window.orderAssistant.util;
    var groupedOrder = util.getAllValidOrder();
    var configsStr = util.getStorage("order.configs");
    var conf = util.unserialize(configsStr);
    var siteConfList = conf.sitesConf;
    var siteConf;
    siteConfList.forEach(function (item) {
        if (item.siteName === site) {
            siteConf = item;
        }
    });
    console.log("groupedOrder: ", groupedOrder);
    var siteOrderList = groupedOrder[site];
	$("div.login").show();
	$("ul > li > span.c-hl")[0].innerHTML = "有" + siteOrderList.length + "个待收货订单";
	$("ul > li > span.f-wb")[0].innerHTML = siteConf.cnName;
	$("ul > li > a").attr("href", siteConf.loginUrl);
	$("ul > li").attr("log-site", siteConf.siteName);
    $("a.faq-login").attr("log-site", siteConf.siteName);
	$("ul > li > a").click(function(){
		window.close();
	});
	$("div.ft > a.fr").click(function(){
		window.close();
	});
	var configStr = localStorage['orderConfig'];
	if(!!configStr){
		try{
			$("a.faq-login").attr("href", orderConfig["global"].helpUrl);
		}catch(e){
			console.log(e);
		}
	}
}

// 订单新状态弹窗
function orderNewStatus(val, index){
    var record = val.logisticsContent[index];
    var orderFlowNum = 1;
    if (val.orderFlowInfo) {
        orderFlowNum = val.orderFlowInfo.length;
    }
	$("div.new-status").show();
	$("dl.shipment-detail > dt")[0].innerHTML = val.siteName + "（" + val.baobeiInfo[0].title+ "）";
	$("dl.shipment-detail > dd.time")[0].innerHTML = record.time;
	$("dl.shipment-detail > dd.context")[0].innerHTML = record.context;
	$("a.btn-submit").attr("href", val.detailLink);
    $("dd.order-status > .point:lt(" + orderFlowNum + ")").addClass("full");
    $("dd.order-status > .line:lt(" + (orderFlowNum -1) + ")").addClass("full");

	$("a.btn-submit").click(function(){
		window.close();
	});
    $(".-close").click(function () {
		window.close();
    });
	$("a.c-gray").click(function(){
		if(!!val){
			val['logisticsStatus'] = 'CANCEL';
            util.saveOrderInfo(val.orderKey, val);
		}
	});
}

function newOrder(key, val){
	console.log("新订单，询问用户是否需要提醒");
    var trackCompany = val.trackCompany || "";
    var trackId = val.trackId || "";
    var trackInfo = (trackCompany + trackId) || "暂无";
    $("div.new-order").show();
    $("ul > li > span.site")[0].innerHTML = val.cnName;
    $("ul > li > span.title")[0].innerHTML = val.baobeiInfo[0].title;
    $("ul > li > span.id")[0].innerHTML = trackInfo;
    $("a.btn-submit").click(function(){
        window.close();
    });

    $("a.c-gray").click(function(){
        if(!!val){
            val['logisticsStatus'] = 'CANCEL';
            util.saveOrderInfo(val.orderKey, val);
        }
        window.close();
    });
}
