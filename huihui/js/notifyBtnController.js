;(function () {
    var orderNotify = window.orderNotifyUtil;
    var util = window.orderAssistant.util;
    var notifyBtnController = {
        pushDisc: function (id, btnIndex) {
            if (!!!btnIndex) {
                var thisMsg = JSON.parse(localStorage["push.Disc." + id]);
                var msgLink = thisMsg.link;
                var channelName = thisMsg.channel || "NOCHANNEL";
                var msgType = thisMsg.type || "NOTYPE";
                msgLink = msgLink.indexOf("?") > 0 ? msgLink += "&keyfrom=popup" : msgLink += "?keyfrom=popup";
                sendLog(["action=CHROMEPUSH_DISC_BUTTON_CLICK",
                        "channel=" + channelName,
                        "msgtype=" + msgType,
                        "type=ARMANI_EXTENSION_POPUP"]);

                chrome.tabs.create({ selected: true, url: msgLink});
                chrome.notifications.clear("push.Disc." + id, function () {
                    localStorage.removeItem("push.Disc." + id);
                });
            }
        },
        pushDiscClose: function (id) {
            localStorage.removeItem("push.Disc." + id);
        },
        pushDeprice: function (id, btnIndex) {
            var msgs = JSON.parse(localStorage["deprice.msgs"]);
            var thisMsg = msgs[id];
            if (!!!btnIndex) {
                sendLog(["action=DEPRICE_BUTTON_CLICK", "type=ARMANI_EXTENSION_POPUP"]);
                chrome.tabs.create({ selected: true, url: thisMsg.url});
                chrome.notifications.clear("push.Deprice." + id, function () {});
            }
        },
        orderNewOrder: function (key, btnIndex) {
            if (btnIndex === 0 || btnIndex === undefined) {
                sendLog(["action=CHROME_ORDER_POPUP_NEW_CONFIRM_CLICK",
                        "type=ARMANI_EXTENSION_POPUP"]);
                chrome.notifications.clear("order.NewOrder." + key, function () {});
            }

            if (btnIndex === 1) {
                var val = orderNotify.getOrderValue(key);
                if(!!val){
                    val['logisticsStatus'] = 'CANCEL';
                    sendLog(["action=CHROME_ORDER_POPUP_NEW_CANCEL_CLICK",
                            "type=ARMANI_EXTENSION_POPUP"]);
                    localStorage[key] = JSON.stringify(val);
                }
                chrome.notifications.clear("order.NewOrder." + key, function () {});
            }
        },
        orderStatus: function (key, btnIndex) {
            var val = orderNotify.getOrderValue(key);
            if (btnIndex === 0 || btnIndex === undefined) {
                sendLog(["action=CHROME_ORDER_POPUP_SINGLE_DETAIL_CLICK",
                        "type=ARMANI_EXTENSION_POPUP"]);
                chrome.tabs.create({ selected: true, url: val.detailLink});
                chrome.notifications.clear("order.Status." + key, function () {});
            }

            if (btnIndex === 1) {
                 if(!!val){
                    val['logisticsStatus'] = 'CANCEL';
                    sendLog(["action=CHROME_ORDER_POPUP_STATUS_CANCEL_CLICK",
                        "type=ARMANI_EXTENSION_POPUP"]);
                    localStorage[key] = JSON.stringify(val);
                }
                chrome.notifications.clear("order.Status." + key, function () {});
            }
        },
        orderListNotify: function (site, btnIndex) {
            if (btnIndex == 0 || btnIndex === undefined) {
                sendLog(["action=CHROME_ORDER_POPUP_LIST_DETAIL_CLICK",
                    "type=ARMANI_EXTENSION_POPUP"]);
                chrome.tabs.create({ selected: true, url: "orderDetail.html?keyfrom=dialog"});
                chrome.notifications.clear("order.listNotify." + site, function () {});
            }
        },
        orderLogin: function (site, btnIndex) {
            if (btnIndex == 0 || btnIndex === undefined) {
                var configsStr = util.getStorage("order.configs");
                var conf = util.unserialize(configsStr);
                var siteConfList = conf.sitesConf;
                var siteConf = _.where(siteConfList, {siteName: site})[0];
                sendLog(["action=CHROME_ORDER_POPUP_LOGIN_CLICK",
                    "type=ARMANI_EXTENSION_POPUP"]);
                chrome.tabs.create({ selected: true, url: siteConf.loginUrl});
                chrome.notifications.clear("order.Login." + site, function () {});
            }

            if (btnIndex == 1) {
                chrome.notifications.clear("order.Login." + site, function () {});
            }
        }
    };
    window.notifyBtnController = notifyBtnController;
}())
