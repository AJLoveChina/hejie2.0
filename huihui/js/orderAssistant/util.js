var orderAssistant = (function (global, $, _) {
    if (!!!global) {
        global = {}
        global.$ = $;
        global._ = _;
    }

    global.util = {
        serialize: function (obj) {
            if (typeof JSON === 'undefined') {
                throw new Error("serialize depends on JSON!");
            }
            return JSON.stringify(obj);
        },
        isLogin: function (htmlNode, siteConf) {
            var notLoginReg = new RegExp(siteConf.notLoginReg);
            var isLogin = true;
            if (!!!htmlNode || notLoginReg.test(htmlNode)) {
                global.util.errlog(siteConf.siteName, "PARSE_LIST_NOT_LOGIN");
                isLogin = false;
            }
            return isLogin;
        },
        getStorageObj: function (key) {
            var valueStr = global.util.getStorage(key);
            return global.util.unserialize(valueStr);
        },
        saveStorageObj: function (key, obj) {
            var valueStr = global.util.serialize(obj);
            global.util.setStorage(key, valueStr);
        },
        saveNotLoginSites: function (siteName) {
            var notLoginSitesStr = global.util.getStorage("order.notLoginSites");
            var notLoginSites = global.util.unserialize(notLoginSitesStr);
            if (notLoginSites.indexOf(siteName) !== -1) {
                return;
            }
            notLoginSites.push(siteName);
            notLoginSitesStr = global.util.serialize(notLoginSites);
            global.util.setStorage("order.notLoginSites", notLoginSitesStr);
        },
        updateNotLoginSites: function (siteName) {
            var notLoginSitesStr = global.util.getStorage("order.notLoginSites");
            var notLoginSites = global.util.unserialize(notLoginSitesStr);
            var siteIndex = notLoginSites.indexOf(siteName);

            if (siteIndex !== -1) {
                notLoginSites.splice(siteIndex, 1);
            }
            notLoginSitesStr = global.util.serialize(notLoginSites);
            global.util.setStorage("order.notLoginSites", notLoginSitesStr);
        },
        unserialize: function (text) {
            if (typeof JSON === "undefined") {
                throw new Error("unserialize depends on JSON!");
            }

            try {
                var json = JSON.parse(text);
            } catch (e) {
                return false;
            }

            return json;
        },
        errlog: function (siteName, info) {
            console.log(siteName, info);
        },
        replaceHtml: function (html){
            if(!!!html)
                return html;
            // xxx.com/> -> xxx.com>
            node = html.replace(/[\n\r]/g, "").
                        replace(/.com\/>/gim, ".com>").
                        replace(/.cn\/>/gim,".cn>");

            node = node.replace(/<script.*?<\/script>/gim,"");
            node = node.replace(/on[a-z|A-Z]+=\"/gm,"XXXX=\"");
            return node;
        },
        groupDetailPageData: function () {
            /*
             *（1）提交订单-> amazon:尚未发货,即将发货 taobao: 买家已付款;
                   已发货->taobao:卖家已发货;
                   运送中-> 有trackUrl ;
                   签收->
             *（2）根据站点进行分类，不包括虚拟订单，包括签收7天之内的订单。
             *（3）站点间的排序：有最新物流消息的排最前面 > 有running的 > 有订单但是没有更新 > 没有订单
             */
             var groupedOrderBySite = global.util.getOrderGroupBySite();
             var nowDate = (new Date()).getTime();
             var perDay = 24 * 60 * 60 * 1000;
             var rankedOrderList = [];
             for (siteName in groupedOrderBySite) {
                 if (groupedOrderBySite.hasOwnProperty(siteName)) {
                     var usefulOrder = [];
                     var rankingNum = 0;
                     groupedOrderBySite[siteName].forEach(function (orderInfo) {
                        var orderFlowNum = orderInfo.orderFlowNum;
                        var orderFinishTime = orderInfo.finishTime ?
                            (new Date(orderInfo.finishTime)).getTime() : nowDate;
                        // rule (2)
                        if ((nowDate - orderFinishTime) / perDay < 3) {
                            if (!!!orderInfo.trackUrl) {
                                if (orderInfo.orderFlowNum == 1) {
                                    usefulOrder.push(orderInfo);
                                    rankingNum += orderFlowNum;
                                    if (orderInfo.notifyType === "newStatus") {
                                        rankingNum += 5;
                                    }
                                }
                            } else {
                                usefulOrder.push(orderInfo);
                                rankingNum += orderFlowNum;
                                if (orderInfo.notifyType === "newStatus") {
                                    rankingNum += 5;
                                }
                            }
                            // for rule (3)
                        }
                     });

                    if (usefulOrder.length > 0) {
                        var orderListDetail = {};
                        // for rule (3)
                        var sortedOrders = usefulOrder.sort(function (orderValueA, orderValueB) {
                            return (orderValueA.orderFlowNum + 1) - (orderValueB.orderFlowNum + 1);
                        });
                        orderListDetail.sortedOrders = sortedOrders;
                        orderListDetail.rankingNum = rankingNum;
                        orderListDetail.siteName = siteName;
                        rankedOrderList.push(orderListDetail);
                        // for rule (3)
                        rankedOrderList = rankedOrderList.sort(function (orderListA, orderListB) {
                            return orderListB.rankingNum  - orderListA.rankingNum;
                        });

                    }
                 }
             }
             return rankedOrderList;
        },
        resetVirtalOrderStatus: function (orderItem, siteConf) {
            var tradeEndReg = new RegExp(siteConf.tradeEndStatus);
            if (tradeEndReg.test(orderItem.orderStatus)) {
                orderItem.logisticsStatus = "FINISH";
                orderItem.orderFlowNum = 4;

                var tmptTime = new Date();
                var finalTime = tmptTime.getFullYear() + '-' +
                    (tmptTime.getMonth() + 1) + '-' + tmptTime.getDate() + ' ' +
                    tmptTime.getHours() + ':' + tmptTime.getMinutes() + ':' +
                    tmptTime.getSeconds();
                orderItem.orderFlowInfo.push({
                        id: 4,
                        text: "已签收",
                        time: finalTime
                });
                orderItem.finishTime = finalTime;
            }
            return orderItem;
        },
        getOrderGroupBySite: function () {
            var groupedOrder = {};
            for (orderKey in localStorage) {
                if (orderKey.indexOf("order~") === 0) {
                    var orderInfo = global.util.getOrderValue(orderKey);
                    var isValidOrder = true;
                    if (!groupedOrder[orderInfo.siteName]) {
                        groupedOrder[orderInfo.siteName] = [];
                    }

                    if (orderInfo.logisticsStatus === "FINISH") {
                        if (orderInfo.notifyType !== "newStatus") {
                            isValidOrder = false;
                        }
                    }
                    if (orderInfo.logisticsStatus === "CANCEL") {
                        isValidOrder = false;
                    }
                    if (!orderInfo.currentUsr) {
                        isValidOrder = false;
                    }
                    if (isValidOrder) {
                        groupedOrder[orderInfo.siteName].push(orderInfo);
                    }

                }
            }
            return groupedOrder;
        },
        resetCurrentUsrOrder: function (siteName) {
            var groupedOrderBySite = global.util.getOrderGroupBySite();
            var orderKey;
            var validOrderList = {};
            if (groupedOrderBySite.hasOwnProperty(siteName)) {
                var orderArray = groupedOrderBySite[siteName];
                var validOrderArray = [];
                orderArray.forEach(function (item) {
                        item.currentUsr = false;
                        item.notifyType = "noNotify";
                        global.util.saveOrderInfo(item.orderKey, item);
                });
            }
        },
        getAllOrderKeys: function () {
            var allOrderKeys = [];
            for (orderKey in localStorage) {
                if (orderKey.indexOf("order~") === 0) {
                    allOrderKeys.push(orderKey);
                }
            }
            return allOrderKeys;

        },
        getOrderBySite: function (siteName) {
            var allValidOrder = global.util.getAllValidOrder();
            return allValidOrder[siteName];
        },

        cancelOrder: function (orderKey) {
            var orderValue = global.util.getOrderValue(orderKey);
            orderValue.logisticsStatus = "CANCEL";
            global.util.saveOrderInfo(orderKey, orderValue);
        },
        isEffectOrder: function (status, siteConf) {
            // Get the orderFlow
            //          提交订单         已发货         就运送中             已签收
            //Amazon    尚未发货        即将就啊或      已从库房发出
            //Taobao    买家已付款      卖家已发货
            //JD        正在出库        商品出库        等待自提|等待收获
            var orderStartStatusReg = new RegExp(siteConf.tradeStartStatus);
            var startStatusList = status.match(orderStartStatusReg);
            var orderFlow = 0;
            if (startStatusList && startStatusList.length > 0) {
                for (var i = 1; i < startStatusList.length; i ++) {
                    if (startStatusList[i]) {
                        orderFlow = i;
                        break;
                    }
                }
            }
            return orderFlow;
        },

        getAllValidOrder: function () {
            var groupedOrderBySite = global.util.getOrderGroupBySite();
            var orderKey;
            var validOrderList = {};
            for (siteName in groupedOrderBySite) {
                if (groupedOrderBySite.hasOwnProperty(siteName)) {
                    var orderArray = groupedOrderBySite[siteName];
                    var validOrderArray = [];
                    orderArray.forEach(function (item) {
                        var isValidOrder = true;
                        if (item.logisticsStatus === "FINISH" ) {
                            isValidOrder = false;
                        }
                        if (isValidOrder) {
                            validOrderArray.push(item);
                        }
                    });
                    if (validOrderArray.length) {
                        validOrderList[siteName] = validOrderArray;
                    }
                }
            }
            return validOrderList;
        },
        getStorage: function (key) {
            return localStorage[key];
        },
        setStorage: function (key, val) {
            localStorage[key] = val;
        },
        getOrderValue: function (orderKey) {
            var tmpStr = global.util.getStorage(orderKey);
            if(tmpStr==null) {
                return null;
            }
            return global.util.unserialize(tmpStr);
        },
        saveOrderInfo: function (orderKey, orderInfo) {
            var orderInfoStr = global.util.serialize(orderInfo);
            global.util.setStorage(orderKey, orderInfoStr);
        },
        updateOrderStatus: function (orderKey, status) {
            var orderInfo = global.util.getOrderValue(orderKey);

            orderInfo.orderStatus = status;
            global.util.saveOrderInfo(orderKey, orderInfo);
        },
        getOrderKey: function (orderNum, siteName){
            return "order~"+ siteName +"~"+orderNum;
        }
    };
    return global;
}(orderAssistant, window.$ || {}, window._ || {}))
