;(function (global) {
    var util = global.util;
    var $ = global.$;
    var _ = global._;
    var OrderNotification = global.OrderNotification;

    global.LogisticsTool = function () {
        var configsStr = util.getStorage("order.configs");
        var conf = util.unserialize(configsStr);
        this.sitesConf = conf.sitesConf;
        //validOrderList 是只需要继续跟踪物流的订单即不是FINISH和CANCEL的订单
        this.validOrderList = util.getAllValidOrder();
        this.promiseArray = [];
    }

    global.LogisticsTool.prototype = {
        parseAllOrders: function (site) {
            var that = this;
            var validOrderList = that.validOrderList;
            //如果有site,则为指定站点的抓取
            if (site) {
                if (validOrderList.hasOwnProperty(site)) {
                    var siteConf = _.where(that.sitesConf, {siteName: site});
                    var groupedOrder = validOrderList[site];
                    this.updateLogisticsInfo(groupedOrder, siteConf[0]);
                }
            } else {
                for(var siteName in validOrderList) {
                    if (validOrderList.hasOwnProperty(siteName)) {
                        var siteConf = _.where(that.sitesConf, {siteName: siteName});
                        var groupedOrder = validOrderList[siteName];
                        this.updateLogisticsInfo(groupedOrder, siteConf[0]);
                    }
                }
            }
        },
        updateLogisticsInfo: function (groupedOrder, siteConf) {
            var that = this;
            groupedOrder.forEach(function (orderItem) {
                var debugConf = siteConf.debugConf;
                if (debugConf && debugConf.isDebug) {
                        orderItem.trackUrl = debugConf.trackUrl;
                }
                //因为提取的是非FINISH和CANCEL的订单，所以订单会存在下面的情况
                //（1）此订单没有trackUrl，是一个提交的订单，但是并没有发货。
                //     第一次抓取此订单的信息是将其弹框类型设置为newOrder
                //     以后如果此订单仍然没有trackUrl,则弹框类型设置为noNotify
                //（2）此订单有trackUrl，则首先将弹框的类型重置为noNotify。更新订单。
                // for rule 1) 
                if (!!!orderItem.trackUrl) {
                    orderItem = util.resetVirtalOrderStatus(orderItem, siteConf);
                    if (!!!orderItem.notifyType) {
                        orderItem.notifyType = "newOrder";
                    } else {
                        orderItem.notifyType = "noNotify";
                    }
                    util.saveOrderInfo(orderItem.orderKey, orderItem);
                    return;
                }

                // for rule 2) 
                var promise = logisticsHelper["parseLogistics" +
                    orderItem.siteName](orderItem, siteConf);
                that.promiseArray.push(promise);
            });
        }
    };

    var logisticsHelper = {
        parseLogisticsTAOBAO: function (orderItem, siteConf) {
            var trackUrl = orderItem.trackUrl;
            // 设置一个deffered
            var dtd = $.Deferred();

            //如果该订单已经有LogisticsUrl，则直接parse logistics。
            if (orderItem.logisticsUrl) {
                orderItem.notifyType = "noNotify";
                util.saveOrderInfo(orderItem.orderKey, orderItem);
                var trackLogisticPromise = logisticsHelper.
                    trackLogisticsTaobao(orderItem.logisticsUrl, orderItem.orderKey, siteConf);

                trackLogisticPromise.done(function () {
                    dtd.resolve();
                });
                return dtd;
            }
            //抓取淘宝订单的详情页，得到快递公司和快递号以及物流接口
           var getLogisticsPromise = $.get(trackUrl, function (data) {
                var htmlNode = util.replaceHtml(data);
                var $htmlNode = $(htmlNode);
                if (!util.isLogin(htmlNode, siteConf)) {
                    util.saveNotLoginSites(siteConf.siteName);
                    var orderNotify = new OrderNotification();
                    orderNotify.askForLogin(siteConf.siteName);
                    return;
                }
                util.updateNotLoginSites(siteConf.siteName);
                var $trackCompany = $(siteConf.trackCompanyQ, $htmlNode);
                var $trackId = $(siteConf.trackIdQ, $htmlNode);
                if ($trackCompany.length > 0 && $trackId.length > 0) {
                    orderItem.trackCompany = $trackCompany.text().trim();
                    orderItem.trackId = $trackId.text().trim();
                }

                var taobaoOrderId = $(siteConf.taobaoOrderIdQ, $htmlNode).val();
                if (!!!taobaoOrderId) {
                    orderItem = util.resetVirtalOrderStatus(orderItem, siteConf);
                    if (!!!orderItem.notifyType) {
                        orderItem.notifyType = "newOrder";
                    } else {
                        orderItem.notifyType = "noNotify";
                    }
                } else {
                    orderItem.logisticsUrl = siteConf.logisticsBaseUrl +
                        "&order_id=" + taobaoOrderId +
                        "&seller_id=" + orderItem.trackOtherInfo.sellerId;
                }
                util.saveOrderInfo(orderItem.orderKey, orderItem);
            });

            //当抓取快递接口的prose resolve的时候，开始抓取详细的快递信息
            $.when(getLogisticsPromise).done(function () {
                if (orderItem.logisticsUrl) {
                    var trackLogisticPromise = logisticsHelper.
                        trackLogisticsTaobao(orderItem.logisticsUrl,
                                             orderItem.orderKey, siteConf);
                    trackLogisticPromise.done(function () {
                        dtd.resolve();
                    });
                } else {
                    dtd.resolve();
                }
            });
            return dtd;
        },
        trackLogisticsTaobao: function (logisticsUrl, orderKey, siteConf) {
            var debugConf = siteConf.debugConf;
            if (debugConf && debugConf.isDebug) {
                logisticsUrl = debugConf.logisticsUrl;
            }
             
            var promise = $.get(logisticsUrl, function (data) {
                if (!util.isLogin(data, siteConf)) {
                    util.saveNotLoginSites(siteConf.siteName);
                    var orderNotify = new OrderNotification();
                    orderNotify.askForLogin(siteConf.siteName);
                    return;
                }

                var pattern = /jsonp\((.*?)\)/;
                var effectData = data.match(pattern);
                if (!!!effectData || effectData.length < 2) {
                    var params = [
                        'err=LOGISTICS_PAGE_PARSE_ERROR',
                        'msg=JSONP_PATTERN_INVALID',
                        'siteName=TAOBAO',
                        'type=ARMANI_EXTENSION_ORDER'];
                    console.log("%c siteName=TAOBAO;msg=JSONP_PATTERN_INVALID",
                                "color: red");
                    sendLog(params);
                    return;
                }

                util.updateNotLoginSites(siteConf.siteName);
                var logisticsInfo = util.unserialize(effectData[1]);
                if (!!!logisticsInfo || !!!logisticsInfo.data) {
                    return;
                }

                var traces = logisticsInfo.data.traces;
                var logisticsItem = [];
                traces.forEach(function (traceInfo) {
                    var traceItem = {};
                    traceItem.context = traceInfo.text;
                    traceItem.time = traceInfo.time;
                    logisticsItem.push(traceItem);
                });
                
                var orderItemTempt = util.getOrderValue(orderKey);
                orderItemTempt = logisticsHelper.
                    resetLogisticsStatus(logisticsItem, orderItemTempt, siteConf);
                orderItemTempt.notifyType = logisticsHelper.
                    getNotificationType(logisticsItem, orderItemTempt);
                orderItemTempt.logisticsContent = logisticsItem;

                util.saveOrderInfo(orderKey, orderItemTempt);
            });

            return promise;
        },
        parseLogisticsJD: function (orderItem, siteConf) {
            orderItem.notifyType = "noNotify";
            util.saveOrderInfo(orderItem.orderKey, orderItem);
            var orderId = orderItem.orderId;
            var orderKey = orderItem.orderKey;
            var trackUrl = orderItem.trackUrl;
            var postPromse = $.post(trackUrl, {orderId: orderId}, function (data) {
                if (!util.isLogin(data, siteConf)) {
                    // And siteName to localeStorage notLoginSiteList:[]
                    // which is used for the displaying of detail page
                    util.saveNotLoginSites(siteConf.siteName);

                    var orderNotify = new OrderNotification();
                    orderNotify.askForLogin(siteConf.siteName);
                    return;
                }
                util.updateNotLoginSites(siteConf.siteName);

                var logisticsInfo = util.unserialize(data);
                if (!logisticsInfo) {
                    var params = [
                                'err=LOGISTICS_PAGE_PARSE_ERROR',
                                'msg=JSONP_PATTERN_INVALID',
                                'siteName=JD',
                                'type=ARMANI_EXTENSION_ORDER'];
                    sendLog(params);
                    return;
                }

                var traces = logisticsInfo['orderTrackInfos'];
                var logisticsItem = [];
                traces.forEach(function (traceInfo) {
                    var traceItem = {};
                    traceItem.context = traceInfo['title'] || traceInfo['content'];
                    var traceTimeStamp = traceInfo['creationTime'];
                    if (traceTimeStamp) {
                        var tmptTime = new Date(traceTimeStamp);
                        traceItem.time = tmptTime.getFullYear() + '-' +
                            (tmptTime.getMonth() + 1) + '-' + tmptTime.getDate() + ' ' +
                            tmptTime.getHours() + ':' + tmptTime.getMinutes() + ':' +
                            tmptTime.getSeconds();
                        logisticsItem.push(traceItem);
                    }
                });

                var orderItemTempt = util.getOrderValue(orderKey);
                orderItemTempt.trackCompany = "京东快递";
                orderItemTempt.trackId = orderItem.orderId;
                orderItemTempt = logisticsHelper.
                    resetLogisticsStatus(logisticsItem, orderItemTempt, siteConf);
                orderItemTempt.notifyType =  logisticsHelper.
                    getNotificationType(logisticsItem, orderItemTempt);
                orderItemTempt.logisticsContent = logisticsItem;
                util.saveOrderInfo(orderKey, orderItemTempt);
            });
            return postPromse;
        },

        parseLogisticsRowAmazon: function ($row) {
            var tdList = $('td', $row);
            var timeStr = $(tdList[1]).text().trim();
            var timeInfo = /(\d\d):(\d\d):(\d\d)\s+([p,P,a,A,m,M]{2})/.exec(timeStr);
            if (timeInfo.length !== 5) {
                sendLog("");
                return;
            }

            var contextHour = parseInt(timeInfo[1], 10);
            if (timeInfo[4].toLowerCase() === "pm") {
                contextHour = contextHour === 12 ? 12 : contextHour + 12;
            }

            var dateStr = $(tdList[0]).text().trim();
            var dateInfo = /([0-9]*)(?:\s|(?:年?))([0-9]*)月\s?([0-9]*)(?:日?)/.exec(dateStr);
            var contextYear = dateInfo[1];
            if (contextYear.length === 2) {
                contextYear = "20" + contextYear;
            }

            var content = $(tdList[3]).text().trim() + ' ' +
                $(tdList[4]).text().trim();
            var contextInfo = {
                time: contextYear + '-' + dateInfo[2] + '-' + dateInfo[3] + ' ' +
                    contextHour + ':' + timeInfo[2] + ':' + timeInfo[3],
                context: content
            }
            return contextInfo;
        },

        parseLogisticsAMAZON: function (orderItem, siteConf) {
            orderItem.notifyType = "noNotify";
            util.saveOrderInfo(orderItem.orderKey, orderItem);
            var orderId = orderItem.orderId;
            var orderKey = orderItem.orderKey;
            var trackUrl = orderItem.trackUrl;
            if (!!!trackUrl) {
                return;
            }

            var getPromise = $.get(trackUrl, function (data) {

                var htmlNode = util.replaceHtml(data);
                if (!util.isLogin(htmlNode, siteConf)) {
                    // And siteName to localeStorage notLoginSiteList:[]
                    // which is used for the displaying of detail page
                    util.saveNotLoginSites(siteConf.siteName);

                    var orderNotify = new OrderNotification();
                    orderNotify.askForLogin(siteConf.siteName);
                    return;
                }

                util.updateNotLoginSites(siteConf.siteName);

                var logisticsItem = [];
                var $htmlNode = $(htmlNode);
                $("tr > td:nth-child(1)", $htmlNode).each(function (i, td) {
                    if($(td).text().trim() === '配送公司：') {
                        var tmpTr = $(td).parent().children();
                        if(tmpTr.length === 2) {
                            orderItem.trackCompany = $(tmpTr[1]).text().trim();
                        }
                    }
                    if($(td).text().trim() === '包裹号：') {
                        tmpTr = $(td).parent().children();
                        if(tmpTr.length === 2) {
                            orderItem.trackId = $(tmpTr[1]).text().trim();
                        }
                    }
                });

                $("tr > td[nowrap='nowrap']", $htmlNode).each(function(i,td){
                    var tdTxt = $(td).text().trim();
                    var dates = /([0-9]*)(?:\s|(?:年?))([0-9]*)月\s?([0-9]*)(?:日?)/.exec(tdTxt);
                    if(!!dates && dates.length == 4){
                        var row = $(td).parent();
                        var traceItem =  logisticsHelper.
                            parseLogisticsRowAmazon(row);

                        logisticsItem.push(traceItem);
                    }
                });

                var orderItemTempt = util.getOrderValue(orderKey);
                logisticsItem = logisticsItem.reverse();
                orderItemTempt = logisticsHelper.
                    resetLogisticsStatus(logisticsItem, orderItem, siteConf);
                orderItemTempt.notifyType = logisticsHelper.
                    getNotificationType(logisticsItem, orderItemTempt);
                orderItemTempt.logisticsContent = logisticsItem;
                util.saveOrderInfo(orderKey, orderItemTempt);
            });
            return getPromise;
        },
        getNotificationType: function (logisticsItem, orderItem) {
            //首先将弹框状态初始化为noNotify
            var notificationType = "noNotify";

            //如果订单物流页面没有内容，那么就不提示弹框
            if (!logisticsItem.length) {
                notificationType = "noNotify";
                return notificationType;
            }

            //如果没有物流信息，则为新的订单
            if (!!!orderItem.logisticsContent) {
                notificationType = "newOrder";
            } else {

                var logisticsOldContent = orderItem.logisticsContent;
                if (logisticsOldContent.length === logisticsItem.length) {
                    notificationType = "noNotify";
                } else {
                    notificationType = "newStatus";
                }
            }
            return notificationType;
        },

        resetLogisticsStatus: function (logisticsItem, orderItem, siteConf) {

            var logisticsLen = logisticsItem.length
            var deliverIndex = logisticsLen - 1;
            //发货的物流状态信息
            var deliverItem = _.where(orderItem.orderFlowInfo, {id: 2});
            //运送中的物流状态信息
            var runningItem = _.where(orderItem.orderFlowInfo, {id: 3});

            logisticsItem.forEach(function (item, index) {
                if (util.isEffectOrder(item.context, siteConf) === 2) {
                    deliverIndex = index;
                    if (!!!deliverItem.length) {
                        orderItem.orderFlowInfo.push({
                            id: 2,
                            text: "已发货",
                            time: item.time
                        });
                    }
                }
            });

            //如果没有物流信息，那么就直接返回当前订单信息。
            if (logisticsLen < 1) {
                return orderItem;
            }

            //根据最后一条消息，判断物流是否已经完成
            if (orderItem.orderFlowNum <= 3 &&
                (deliverIndex < (logisticsLen - 1))) {
                if (runningItem.length < 1){
                    orderItem.orderFlowNum = 3
                    orderItem.orderFlowInfo.push({
                        id: 3,
                        text: "运送中",
                        time: logisticsItem[deliverIndex + 1].time
                    });
                }
            }

            //如果当前订单已经有物流信息，那么就是RUNING的状态
            if (orderItem.logisticsContent) {
                orderItem.logisticsStatus = "RUNNING";
            }

            //如果最后一条信息或者是订单列表页的物流状态信息满足结束正则，
            //那么此订单设置为FINISH
            var lastMessage = logisticsItem[logisticsLen - 1];
            var tradeEndReg = new RegExp(siteConf.tradeEndStatus);
            if (tradeEndReg.test(lastMessage.context) ||
                tradeEndReg.test(orderItem.orderStatus)) {
                orderItem.logisticsStatus = "FINISH";
                orderItem.orderFlowNum = 4;
                orderItem.orderFlowInfo.push({
                        id: 4,
                        text: "已签收",
                        time: lastMessage.time
                });
                orderItem.finishTime = lastMessage.time;
            }
            return orderItem;
        }
    };
}(window.orderAssistant))
