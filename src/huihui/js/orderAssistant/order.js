;(function (global) {
    var util = global.util;
    var $ = global.$;
    var _ = global._;

    function getLoginInfo(url, siteConfList) {
        var loginInfo = {};
        siteConfList.forEach(function (siteConf) {
            var loginUrlRegStr = siteConf.loginUrlReg;
            var loginUrlReg = new RegExp(loginUrlRegStr);
            if (loginUrlReg.test(url)) {
                loginInfo.loginBtnQ= siteConf.loginBtnQ;
                loginInfo.listUrl = siteConf.listUrl;
                loginInfo.siteName = siteConf.siteName;
                loginInfo.originUrl = url;
            }
        });
        return loginInfo;
    }

    function parseSingleSiteAfterLogin(url, isAfterLogin) {
        var orderTools = new global.OrderTool();
        orderTools.getOrderListInfo(false, url);
        if (orderTools.defferdList.length) {
            $.when.apply($, orderTools.defferdList).done(function () {
                var logisticsTool = new global.LogisticsTool();
                logisticsTool.parseAllOrders(orderTools.targetSite);
                $.when.apply($, logisticsTool.promiseArray).done(function () {
                    var notifications = new global.OrderNotification();
                    notifications.triggerNotify(orderTools.targetSite);
                    if (isAfterLogin) {
                        try {
                            chrome.runtime.sendMessage({
                                type: "reRenderDetailPage"
                            }, function (response) {});
                        } catch (e) {
                            //console.log(e);
                        }
                    }
                });
                $.when.apply($, logisticsTool.promiseArray).fail(function () {
                    if (isAfterLogin) {
                        try {
                            chrome.runtime.sendRequest({
                                type: "reRenderDetailPage"
                            }, function (response) {});
                        } catch (e) {

                        }
                    }
                });
            });
            $.when.apply($, orderTools.defferdList).fail(function () {
                if (isAfterLogin) {
                    try {
                        chrome.runtime.sendRequest({
                            type: "reRenderDetailPage"
                        }, function (response) {});
                    } catch (e) {

                    }
                }
            });
        }
    }

    function parseAllSiteWithNotify(hasNotify, sendResponse) {
        var orderTools = new global.OrderTool();
        if (hasNotify) {
            orderTools.parserController();
        } else {
            orderTools.getOrderListInfo(true);
        }
        if (orderTools.defferdList.length) {
            $.when.apply($, orderTools.defferdList).done(function () {
                var logisticsTool = new global.LogisticsTool();
                logisticsTool.parseAllOrders();
                $.when.apply($, logisticsTool.promiseArray).done(function () {
                    if (hasNotify) {
                        var notifications = new global.OrderNotification();
                        notifications.triggerNotify();
                    } else {
                        sendResponse({isOver: true});
                    }
                });
                $.when.apply($, logisticsTool.promiseArray).fail(function () {
                    if (!hasNotify) {
                        sendResponse({isOver: true});
                    } else {

                    }
                });
            });
            $.when.apply($, orderTools.defferdList).fail(function () {
                if (!hasNotify) {
                    sendResponse({isOver: true});
                }
            });
        }
    }

    //"http://zhushou.huihui.cn/conf/orderparser2.json?version=" +
    //chrome.extension.getURL("order_config.json")
    var orderParserUrl = "http://zhushou.huihui.cn/conf/orderparser2.json";
    var getConfigPromist = $.getJSON(orderParserUrl + "?timestamp="+ Date.now(), function (config) {
        var configStr = util.serialize(config);
        var conf = util.unserialize(configStr);
        conf.switchKey = "OFF"
        //util.setStorage("order.configs", configStr);
        util.saveStorageObj("order.configs", conf);
    });

    //当获取完配置文件后开始进行订单解析
    $.when(getConfigPromist).done(function () {
        var configsStr = util.getStorage("order.configs");
        var conf = util.unserialize(configsStr);
        //console.log("OFF");
        if (conf.switchKey === "OFF") {
            return;
        }
        parseAllSiteWithNotify(true);
        chrome.extension.
            onRequest.addListener(function(request, sender, sendResponse) {
            switch (request.type) {
                case 'loginPage':
                    setTimeout(function () {
                        parseSingleSiteAfterLogin(request.url, true, request.siteName);
                    }, 3 * 1000);
                break;
                case 'visitUrl':
                    var siteConfList = conf.sitesConf;
                    var loginInfo = getLoginInfo(request.url, siteConfList);
                    if (loginInfo.loginBtnQ) {
                        sendResponse({loginInfo: loginInfo});
                        return;
                    }
                    var referrer = request.referrer;
                    console.log("referrer: ", referrer);
                    var referrerLoginInfo = getLoginInfo(referrer, siteConfList);
                    if (referrerLoginInfo.loginBtnQ) {
                        return;
                    }
                    parseSingleSiteAfterLogin(request.url, false);
                   break;
                case 'detailPage':
                    parseAllSiteWithNotify.call(this, false, sendResponse);
                   break;
                default: break;
            }
        });

    });
}(orderAssistant));
