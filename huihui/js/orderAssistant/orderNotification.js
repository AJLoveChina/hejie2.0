;(function (global) {
    var util = global.util;

    //需要弹框的订单（非CANCEL的订单）情况如下
    //（1）订单状态为FINISH，但是弹框的类型为newStatus
    //（2）订单状态为NEW或者是RUNNING，弹框类型为newStatus或者是newOrder
    global.OrderNotification = function (pageType) {
        if (window.webkitNotifications.createHTMLNotification) {
            this.isHTMLNotify = true;
        }
        var isFeeded = util.getStorage("order.isFeeded");
        this.isFeeded = true;
        if (isFeeded === "false") {
            this.isFeeded = false;
        }
    }

    global.OrderNotification.prototype = {
        //同一时间一个商城有多个新订单时，弹新订单汇总页面。
        //同一时间一个商城多个订单有新状态，弹新状态汇总页面。
        //  淘宝网3个待收货订单，暂无新物流状态
        //  淘宝网3个待收货订单，有2条新物流状态
        //  淘宝网3个新订单，已自动为您跟踪物流状态
        triggerNotify: function (targetSite) {
            //ordesGroupBySite 为非CANCEL的订单
            var ordersGroupBySite = util.getOrderGroupBySite();
            var that = this;
            var notifyNum = 1;
            if (!this.isFeeded) {
                return;
            }

            for (var siteName in ordersGroupBySite) {
                var ordersInSite = ordersGroupBySite[siteName];
                var notifyOrders = [];
                if (targetSite) {
                    if (targetSite === siteName) {
                        notifyOrders = _.filter(ordersInSite, function (item) {
                            var isNotify = true;
                            if (!!!item.trackUrl && item.orderFlowNum > 1) {
                                isNotify = false;
                            }
                            return isNotify
                        });
                    }
                } else {
                    notifyOrders = _.filter(ordersInSite, function (item) {
                        var isNotify = true;
                        if (item.notifyType === "noNotify") {
                            isNotify = false;
                        }
                        if (!!!item.trackUrl && item.orderFlowNum > 1) {
                            isNotify = false;
                        }
                        return isNotify
                    });
                }

                if (notifyOrders.length > 1) {
                    var newStatusOrderList = _.where(notifyOrders, {
                        notifyType: "newStatus"
                    });
                    var newOrderList = _.where(notifyOrders, {
                        notifyType: "newOrder"
                    });
                    var hasLogisticsOrderList = _.filter(notifyOrders, function (item) {
                        return item.notifyType === "newOrder" && !!item.logisticsContent;
                    });
                    if (newOrderList.length > 1) {
                        this.orderListNotify({
                            notifyType: "newOrder",
                            siteName: siteName,
                            newOrderListLen: newOrderList.length,
                            runningOrderLen: notifyOrders.length,
                            cnName: notifyOrders[0].cnName,
                            newStatusOrderLen: hasLogisticsOrderList.length
                        });
                    } else {
                        this.orderListNotify({
                            notifyType: "newStatus",
                            siteName: siteName,
                            runningOrderLen: notifyOrders.length,
                            cnName: notifyOrders[0].cnName,
                            newStatusOrderLen: newStatusOrderList.length
                        });
                    }
                }
                if (notifyOrders.length === 1 ) {
                    if (notifyOrders.notifyType !== "noNotify") {
                        (function (num) {
                            var orderItem = notifyOrders[0];
                            that[orderItem.notifyType](orderItem.orderKey, num);
                        }(notifyNum));
                        notifyNum += 1;
                    }
                }
                notifyOrders.forEach(function (item) {
                    if (item.logisticsStatus === "FINISH") {
                        item.notifyType = "noNotify"
                    }
                    if (item.notifyType === "newOrder") {
                        item.notifyType = "noNotify"
                    }
                    util.saveOrderInfo(item.orderKey, item);
                });

            }
        },
        noNotify: function () {

        },
        orderListNotify: function (conf) {
            //同一时间一个商城有多个新订单时，弹新订单汇总页面。
            //同一时间一个商城多个订单有新状态，弹新状态汇总页面。
            //  淘宝网3个待收货订单，暂无新物流状态
            //  淘宝网3个待收货订单，有2条新物流状态
            //  淘宝网3个新订单，已自动为您跟踪物流状态
            var that = this;
            if (this.isHTMLNotify) {
                this.htmlVersionNotify({
                    type: "orderListNotify",
                    siteName: conf.siteName,
                    isNew: false,
                    config: conf,
                });
                return;
            }

            var buttons = [{
                title: "查看详情",
                iconUrl: chrome.runtime.getURL("/images/6.png")
            }];

            var message;
            if (conf.notifyType === "newOrder") {
                message = conf.newOrderListLen + "个新订单，已自动为您跟踪物流状态";
            } else {
                message = conf.runningOrderLen + "个待收货订单, ";
                if (conf.newStatusOrderLen > 0) {
                    message += "有" + conf.newStatusOrderLen + "条新物流状态";
                } else {
                    message += "暂无新物流状态";
                }
            }
            var options = null;
            var iconUrl = chrome.runtime.getURL("/images/80-80.jpg");
            options = {
                iconUrl: iconUrl,
                type: "basic",
                title: conf.cnName,
                message: message,
                buttons: buttons
            }

            chrome.notifications.create("order.ListNotify." + conf.siteName,
                                        options, function () {
                var params = ['action=CHROME_ORDER_POPUP_LIST_' + conf.notifyType + '', "site=" + conf.siteName,
                    "type=ARMANI_EXTENSION_POPUP"];
                sendLog(params);
            });

            if (conf.notifyType === "newOrder") {
                setTimeout(function () {
                    var statusConf = conf;
                    statusConf.notifyType = "newStatus";
                    that.orderListNotify(statusConf);
                }, 30 * 1000);
            }

        },
        askForLogin: function (siteName) {
            if (!this.isFeeded) {
                return;
            }
            var allValidOrder = util.getOrderBySite(siteName);
            if (!!!allValidOrder) {
                return;
            }
            
            var hasShownDatesStr = util.getStorage("order.hasShownDates." + siteName);
            var hasShownDates;
            if (!!!hasShownDatesStr) {
                hasShownDates = [];
            } else {
                hasShownDates = util.unserialize(hasShownDatesStr);
            }

            var nowTime = new Date();
            var timeStamp = nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) +
                "-" + nowTime.getDate();

            if (hasShownDates.length > 2 || hasShownDates.indexOf(timeStamp) !== -1) {
                return;
            }
            hasShownDates.push(timeStamp);
            util.saveStorageObj("order.hasShownDates." + siteName, hasShownDates);
            //console.log("%c login notify", "color: blue");
            if (this.isHTMLNotify) {
                this.htmlVersionNotify({
                    isNew: false,
                    siteName: siteName
                });
                return;
            }

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
                        message: allValidOrder[0].cnName
                    },{
                        title: "订单状态：",
                        message:  allValidOrder.length + "个待收货状态未更新"
                }],
                buttons: buttons
            }
            chrome.notifications.create("order.Login." + siteName, options, function () {
                var params = ['action=CHROME_ORDER_POPUP_LOGIN', "site="+siteName,
                    "type=ARMANI_EXTENSION_POPUP"];
                sendLog(params);
            });
        },
        newOrder: function (orderKey, notifyNum) {
            var that = this;
            var orderValue = util.getOrderValue(orderKey);
            if (that.isHTMLNotify) {
                setTimeout(function () {
                    that.htmlVersionNotify({
                        isNew: true,
                        orderValue: orderValue,
                        notifyNum: notifyNum
                    });
                    setTimeout(function () {
                        if (orderValue.trackUrl) {
                            that.newStatus(orderValue.orderKey);
                        }
                    }, 15 * 1000);
                }, notifyNum * 15 * 1000);
                return;
            }
            var buttons = [{
                title: "确定跟踪",
                iconUrl: chrome.runtime.getURL("/images/3.png")
            }, {
                title: "取消该订单物流提醒",
                iconUrl: chrome.runtime.getURL("/images/5.png")
            }];
            var options = {
                iconUrl:"images/80-80.jpg",
                type: "list",
                title: "检测到您有新订单",
                message: "检测到您有新订单",
                items: [ {
                    title: "购物商城：",
                    message: orderValue.cnName
                },{
                    title: "商品摘要：",
                    message: orderValue.baobeiInfo[0].title
                }],
                buttons: buttons
            };
            //console.log("notfyNum: newOrder", notifyNum);
            setTimeout(function () {
                setTimeout(function () {
                    if (orderValue.trackUrl) {
                        that.newStatus(orderValue.orderKey);
                    }
                }, 15 * 1000);
               chrome.notifications.create("order.NewOrder." +
                                            orderValue.orderKey, options, function () {
                    var logParams = ['isNew=false', "siteName=" + orderValue.siteName,
                        "type=ARMANI_EXTENSION_POPUP", "action=CHROME_ORDER_POPUP_NEWORDER"];
                    sendLog(logParams);
                });
            }, notifyNum * 15 * 1000);

        },
        newStatus: function (orderKey, notifyNum) {
            var that = this;
            var notifyNum = notifyNum || 1;
            var orderValue = util.getOrderValue(orderKey);
            var logisticsContent = orderValue.logisticsContent;
            if (!!!logisticsContent) {
                return;
            }
            var newestInfo = logisticsContent[logisticsContent.length - 1];

            //console.log(orderValue.logisticsStatus);
            if (orderValue.logisticsStatus === "CANCEL") {
                return;
            }
            if (orderValue.logisticsStatus === "FINISH") {
                orderValue.notifyType = "noNotify";
                util.saveOrderInfo(orderKey, orderValue);
            }
            if (that.isHTMLNotify) {
                setTimeout(function () {
                    that.htmlVersionNotify({
                        isNew: false,
                        orderValue: orderValue,
                        notifyNum: notifyNum
                    });
                }, notifyNum * 15 * 1000);
                return;
            }

            var buttons = [{
                title: "查看物流详情",
                iconUrl: chrome.runtime.getURL("/images/6.png")
            }, {
                title: "取消该订单物流提醒",
                iconUrl: chrome.runtime.getURL("/images/5.png")
            }];

            var options = {
                iconUrl:"images/80-80.jpg",
                type: "list",
                title: "您有新的物流消息",
                message: "您有新的物流消息",
                items: [ {
                        title: orderValue.cnName + "（",
                        message: orderValue.baobeiInfo[0].title + "）"
                        },{
                        title: "",
                        message: newestInfo.time
                        },{
                        title: newestInfo.context,
                        message: ""
                }],
                buttons: buttons
            };

            //console.log("notifyNum: newStatus", notifyNum);
            setTimeout(function () {
               chrome.notifications.create("order.Status." +
                                            orderValue.orderKey, options, function () {
                    var logParams = ['isNew=false', "siteName=" + orderValue.siteName,
                        "type=ARMANI_EXTENSION_POPUP", "action=CHROME_ORDER_POPUP_NEWSTATUS"];
                    sendLog(logParams);
                });
            }, notifyNum * 15 * 1000);

        },
        htmlVersionNotify: function (conf) {
            var htmlUrl;
            var siteName = conf.siteName;
            var isNew = conf.isNew;
            var type = conf.type;
            if (!!!siteName) {
                var orderValue = conf.orderValue;
                var orderKey = orderValue.orderKey;
                var msgIndex = 0;
                if (orderValue.logisticsContent) {
                    msgIndex = orderValue.logisticsContent.length - 1;
                }
                htmlUrl = "order-notification.html?key=" +
                                       encodeURIComponent(orderKey) +
                                       "&isNew=" + isNew +
                                       "&msgIndex=" + msgIndex;
            } else {
                if (type === "orderListNotify") {
                    var config = conf.config;
                    htmlUrl = "order-notification.html?type=" + type +
                        "&site=" + siteName +
                        "&notifyType=" + config.notifyType+
                        "&cnName=" + config.cnName +
                        "&newOrderListLen=" + config.newOrderListLen +
                        "&runningOrderLen=" + config.runningOrderLen +
                        "&newStatusOrderLen=" + config.newStatusOrderLen;
                } else {
                    htmlUrl = "order-notification.html?site=" + siteName;
                }
            }
           //console.log("htmlUrl: ", htmlUrl);
            var htmlNotify = window.webkitNotifications.
                createHTMLNotification(htmlUrl);
            htmlNotify.show();
            
            if (isNew) {
                localStorage["order.todayFeeded"] = "";
                setTimeout(function () {
                    htmlNotify.close();
                }, 10 * 1000);
            }

        }
    };
}(window.orderAssistant))

