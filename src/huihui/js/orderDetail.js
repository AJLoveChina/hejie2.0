(function (global) {
    var util = global.util;
	var keyFrom = /keyfrom=(.*)/.exec(location.search);
    if (!!keyFrom && keyFrom.length == 2) {
        var keySource = keyFrom[1];
        if (keySource == "dialog") {
            renderDetailPage();
            bindEvents();
        }
    } else {
        chrome.extension.sendRequest(
            {type: "detailPage", url: location.href},
            function(response) {
                if (response.isOver) {
                    console.log("%c parse over: ", "background-color: red");
                    renderDetailPage();
                    bindEvents();
                }
            }
        );
    }
    try {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            switch (request.type) {
                case "reRenderDetailPage":
                    console.log("%c reRenderDetailPage: ", "background-color: red");
                    renderDetailPage();
                break;
                default: break;
            }
        });
    } catch (e) {
        renderDetailPage();
    }

   function bindEvents() {
        $(document).delegate(".-state-words span", "mouseover", function () {
            var $this = $(this);
            var $followCont = $this.closest(".-follow-cont");
            var flowNum = $this.attr("data-flownum");
            var timeStateQ = "[data-statenum='" + flowNum + "']"
            if ($(timeStateQ, $followCont).length > 0) {
                var params = [
                    'action=CHROMEPOPUP_ORDER_STATE_' + flowNum + '_SHOW',
                    'type=ARMANI_EXTENSION_ACTION'];
                sendLog(params);
                $(timeStateQ, $followCont).show();
            }
        });
        $(document).delegate(".-state-words span", "mouseleave", function () {
            var $this = $(this);
            var $followCont = $this.closest(".-follow-cont");
            var flowNum = $this.attr("data-flownum");
            var timeStateQ = "[data-statenum='" + flowNum + "']"
            if ($(timeStateQ, $followCont).css("display") === "block") {
                $(timeStateQ, $followCont).hide();
            }
        });

        $(document).delegate(".-cancelOrder", "click", function () {
            var $checkbox = $(".-checkbox");
            if ($checkbox.css("display") === "block") {
                return;
            } else {
                var $this = $(this);
                var orderKey = $this.attr("data-orderkey");
                var $submitBtn= $(".-submit");
                $submitBtn.attr("data-orderkey", orderKey);
                var offsetLeft = $this.offset().left;
                var offsetTop = $this.offset().top + 50;
                $checkbox.css({
                    top: offsetTop,
                    left: offsetLeft
                });
                $checkbox.show();
            }
        });
        $(document).delegate(".-close, .-cancel", "click", function () {
            var $checkbox = $(".-checkbox");
            $checkbox.hide();
        });
        $(document).delegate(".-submit", "click", function () {
            var $checkbox = $(".-checkbox");
            var $submitBtn= $(".-submit");
            var orderKey = $submitBtn.attr("data-orderkey");
            util.cancelOrder(orderKey);
            renderDetailPage();
            $checkbox.hide();
        });
    }
    function getTmplById(id) {
        return document.getElementById(id).innerHTML;
    }
    function getOrderNoticeHtml() {
        var orderNoticeTmpl = getTmplById("orderNotice");
        var groupedOrderList = util.groupDetailPageData();

        var notLoginSitesStr = util.getStorage("order.notLoginSites");
        var notLoginSites = util.unserialize(notLoginSitesStr);

        var inValidOrderNum = 0;
        var validOrderNum = 0;
        var runningOrderNum = 0;
        var deliverOrderNum = 0;
        var submitOrderNum = 0;
        var newStatusNum = 0;
        groupedOrderList.forEach(function (siteOrderInfo, index) {
            var siteName = siteOrderInfo.siteName;
            var sortedOrders = siteOrderInfo.sortedOrders;
            sortedOrders.forEach(function (orderValue) {
                var orderFlowInfo = orderValue.orderFlowInfo || [];
                var orderFlowInfoLen = orderFlowInfo.length || 1;
               if (_.indexOf(notLoginSites, orderValue.siteName) !== -1 &&
                    orderValue.logisticsStatus !== "FINISH") {
                    inValidOrderNum += 1;
                } else {
                    if (orderValue.notifyType == "newStatus") {
                        newStatusNum += 1;
                    }
                    if (orderValue.logisticsStatus !== "FINISH") {
                        validOrderNum += 1;
                        if (orderFlowInfoLen === 3) {
                            runningOrderNum += 1;
                        }
                        if (orderFlowInfoLen === 2) {
                            deliverOrderNum += 1;
                        }
                        if (orderFlowInfoLen === 1) {
                            submitOrderNum += 1;
                        }
                    }
                }
            });
        });

        var newOrderStatusHtml = "";
        if (newStatusNum > 0) {
            var newOrderStatusTmpl = getTmplById("newOrderStatusTmpl");
            newOrderStatusHtml = tmpl(newOrderStatusTmpl, {newStatusNum: newStatusNum});
        } else if (validOrderNum > 0)  {

            var orderStaticsTmpl = getTmplById("orderStaticsTmpl");

            var deliverOrderNumHtml = "";
            if (deliverOrderNum > 0) {
                var deliverOrderNumTmpl = getTmplById("deliverOrderNumTmpl");
                if (submitOrderNum > 0) {
                    deliverOrderNumHtml += "，";
                }
                deliverOrderNumHtml =  tmpl(deliverOrderNumTmpl, {
                    deliverOrderNum: deliverOrderNum
                });
            }

            var runningOrderNumHtml = "";
            if (runningOrderNum > 0) {
                var runningOrderNumTmpl = getTmplById("runningOrderNumTmpl");
                if (submitOrderNum > 0 || deliverOrderNum > 0) {
                    runningOrderNumHtml += "，";
                }
                runningOrderNumHtml = tmpl(runningOrderNumTmpl, {
                    runningOrderNum: runningOrderNum 
                });
            }

            var submitOrderNumHtml = "";
            if (submitOrderNum > 0) {
                var submitOrderNumTmpl = getTmplById("submitOrderNumTmpl");
                submitOrderNumHtml = tmpl(submitOrderNumTmpl, {
                    submitOrderNum: submitOrderNum
                });
            }

            newOrderStatusHtml = tmpl(orderStaticsTmpl, {
                validOrderNum: validOrderNum,
                runningOrderNumHtml: runningOrderNumHtml,
                submitOrderNumHtml: submitOrderNumHtml,
                deliverOrderNumHtml: deliverOrderNumHtml
            });
        }
        var orderInvalidHtml = "";
        if (inValidOrderNum > 0) {
            var inValidOrderTmpl = getTmplById("orderInvalid");
            orderInvalidHtml = tmpl(inValidOrderTmpl, {inValidOrder: inValidOrderNum})
        }
        return tmpl(orderNoticeTmpl, {
            newOrderStatusHtml: newOrderStatusHtml,
            orderInvalidHtml: orderInvalidHtml
        });
    }
    function getNotLoginWithRunningOrderHtml (siteConf) {
        var siteName = siteConf.siteName;
        var siteItemWrapperTmpl = getTmplById("siteItemWrapperTmpl");
        var notLoginWithRunningTmpl = getTmplById("notLoginWithRunningTmpl");
        var groupedOrderList = util.groupDetailPageData();
        var thisSiteOrders= _.where(groupedOrderList, {siteName: siteName})[0];
        var validOrder = [];
        if (thisSiteOrders.sortedOrders) {
            validOrder = thisSiteOrders.sortedOrders;
            validOrder = _.filter(validOrder, function (item) {
                return item.logisticsStatus !== "FINISH";
            });
        }

        var notLoginWithRunningHtml = tmpl(notLoginWithRunningTmpl, {
            runningOrderNum: validOrder.length,
            loginUrl: siteConf.loginUrl
        });

        return  tmpl(siteItemWrapperTmpl, {
                    siteConf: siteConf,
                    newMessageHtml: "",
                    orderItemsHtml: notLoginWithRunningHtml
                });
    }

    function getNotLoginWithNoRunningOrderHtml (siteConf) {
        var notLoginWithNoRunningTmpl = getTmplById("notLoginWithNoRunningTmpl");
        var siteItemWrapperTmpl = getTmplById("siteItemWrapperTmpl");
        var notLoginWithNoRunningHtml = tmpl(notLoginWithNoRunningTmpl, {
            loginUrl: siteConf.loginUrl
        });
        return  tmpl(siteItemWrapperTmpl, {
            siteConf: siteConf,
            newMessageHtml: "",
            orderItemsHtml: notLoginWithNoRunningHtml
        });
    }
    function getLoginWithNoRunningOrderHtml (siteConf) {
        var loginWithNoRunningTmpl = getTmplById("loginWithNoRunningTmpl");
        var siteItemWrapperTmpl = getTmplById("siteItemWrapperTmpl");
        return  tmpl(siteItemWrapperTmpl, {
                    siteConf: siteConf,
                    newMessageHtml: "",
                    orderItemsHtml: loginWithNoRunningTmpl
                });
    }

    function getLoginWithRunningOrderHtml (sortedOrders, siteConf) {
        var baobeiItemTmpl = getTmplById("baobeiItemTmpl");
        var morePicTmpl = getTmplById("morePicTmpl");
        var orderWrapperTmpl = getTmplById("orderWrapperTmpl");
        var logisticsItemTmpl = getTmplById("logisticsItemTmpl");
        var orderStateNewStatusTmpl = getTmplById("orderStateNewStatusTmpl");
        var orderStateCurrentStatusTmpl = getTmplById("orderStateCurrentStatusTmpl");
        var orderFlowTimeTmpl = getTmplById("orderFlowTimeTmpl");
        var newMessageTmpl = getTmplById("newMessageTmpl");
        var orderItemsHtml = '';

        var newStatusNum = 0;
        sortedOrders.forEach(function (orderItem, index) {
            var logisticsContent = orderItem.logisticsContent;
            var logisticsHtml = '';
            if (logisticsContent) {
                logisticsContent = logisticsContent.reverse();
                logisticsContent.forEach(function (logisticsItem, index) {
                   if (index < 3) {
                        var logisticsItemHtml = tmpl(logisticsItemTmpl, {
                            logisticsItem: logisticsItem
                        });
                        logisticsHtml += logisticsItemHtml;
                    }
                });
            } 

            var baobeiInfo = orderItem.baobeiInfo;
            var baobeiHtml = '';
            baobeiInfo.forEach(function (baobeiItem, index) {
                if (index < 3){
                   var baobeiItemHtml = tmpl(baobeiItemTmpl, {baobeiItem: baobeiItem});
                   baobeiHtml += baobeiItemHtml;
                }
            });

            var morePicHtml = '';
            if (baobeiInfo.length > 3) {
                morePicHtml = tmpl(morePicTmpl, {
                    morePicNum: (baobeiInfo.length - 2)
                });
            }

            baobeiHtml += morePicHtml;

            var orderStateHtml = '';
            var orderFlowInfo = orderItem.orderFlowInfo;
            var newestFlow = orderFlowInfo[orderFlowInfo.length - 1];
            if (orderItem.notifyType === "newStatus") {
                newStatusNum += 1;
                orderStateHtml = orderStateNewStatusTmpl;
            } else {
                orderStateHtml = tmpl(orderStateCurrentStatusTmpl, {
                    orderNewestFlow: newestFlow
                });
            }

            var orderFlowTimeHtml = '';
            orderFlowInfo.forEach(function (flowItem) {
                orderFlowTimeHtml += tmpl(orderFlowTimeTmpl, {
                    orderFlowNum: flowItem.id,
                    time: flowItem.time
                });
            });

            if (orderItem.siteName === "JD") {
                orderItem.trackUrl = siteConf.listUrl;
            }

            var trackUrl = orderItem.trackUrl || siteConf.listUrl;
            if (orderItem.siteName === "TAOBAO") {
                if (!!!orderItem.logisticsUrl) {
                    trackUrl = siteConf.listUrl;
                }
            }
            var trackCompany = orderItem.trackCompany || '';
            var trackId = orderItem.trackId || '暂无';
            var orderWrapperHtml = tmpl(orderWrapperTmpl, {
                orderItem: orderItem,
                trackCompany: trackCompany,
                trackId: trackId,
                trackUrl: trackUrl,
                index: index + 1,
                baobeiHtml: baobeiHtml,
                orderStateHtml: orderStateHtml,
                newestFlow: newestFlow,
                orderFlowTimeHtml: orderFlowTimeHtml,
                logisticsHtml: logisticsHtml
            });
            orderItemsHtml += orderWrapperHtml;
        });
        var newMessageHtml = '';
        if (newStatusNum > 0) {
            newMessageHtml = tmpl(newMessageTmpl, {newStatusNum: newStatusNum});
        }
        return {
            orderItemsHtml: orderItemsHtml,
            newMessageHtml: newMessageHtml
        };
    }
    function renderDetailPage () {
        //需要展示的订单的条件如下
        //（1）非CANCEL的
        //（2）FINISH的并且是最近3天才FINISH的
        //（3）NEW和RUNNING的。
        var orderNotice = document.getElementById("order-notice");
        orderNotice.innerHTML = getOrderNoticeHtml();

        var groupedOrderList = util.groupDetailPageData();
        var siteItem;
        var configsStr = util.getStorage("order.configs");
        var conf = util.unserialize(configsStr);
        var notLoginSitesStr = util.getStorage("order.notLoginSites");
        var notLoginSites = util.unserialize(notLoginSitesStr);
        var siteConfList = conf.sitesConf;

        var confSiteNameArray = [];
        siteConfList.forEach(function (siteConf) {
            confSiteNameArray.push(siteConf.siteName);
        });

        var orderDetailHtml = '';

        var loginWithRunningSites = [];
        var notLoginWithRunningSites = [];
        var hasRunningSites = [];
        groupedOrderList.forEach(function (siteOrderInfo, index) {
            var siteName = siteOrderInfo.siteName;
            var sortedOrders = siteOrderInfo.sortedOrders;
            var siteConf = _.where(siteConfList, {siteName: siteName})[0];
            if (!_.contains(notLoginSites, siteName)) {
                hasRunningSites.push(siteName);
                loginWithRunningSites.push(siteName);
                var orderItemsHtml = getLoginWithRunningOrderHtml(sortedOrders, siteConf);
                var siteItemWrapperTmpl = getTmplById("siteItemWrapperTmpl");
                var siteItemHtml = tmpl(siteItemWrapperTmpl, {
                    siteConf: siteConf,
                    newMessageHtml: orderItemsHtml.newMessageHtml,
                    orderItemsHtml: orderItemsHtml.orderItemsHtml
                });
                orderDetailHtml += siteItemHtml;
            } else {
                var runningOrders = _.filter(sortedOrders, function (orderItem) {
                    return orderItem.orderFlowNum < 4;
                })
                var runningOrderNum = runningOrders.length;
                if (runningOrderNum > 0) {
                    hasRunningSites.push(siteName);
                    notLoginWithRunningSites.push(siteName);
                }
            }
        });
        var withNoRunningSites = _.difference(confSiteNameArray, hasRunningSites);
        var notLoginWithNoRunningSites = _.intersection(withNoRunningSites, notLoginSites);
        notLoginWithRunningSites.forEach(function (siteName) {
            var siteConf = _.where(siteConfList, {siteName: siteName})[0];
            orderDetailHtml += getNotLoginWithRunningOrderHtml(siteConf);
        });
        notLoginWithNoRunningSites.forEach(function (siteName) {
            var siteConf = _.where(siteConfList, {siteName: siteName})[0];
            orderDetailHtml += getNotLoginWithNoRunningOrderHtml(siteConf);
        });

        var loginSites = _.difference(confSiteNameArray, notLoginSites);
        var loginWithNoRunningSites = _.difference(loginSites, hasRunningSites);
        loginWithNoRunningSites.forEach(function (siteName) {
            var siteConf = _.where(siteConfList, {siteName: siteName})[0];
            orderDetailHtml += getLoginWithNoRunningOrderHtml(siteConf);
        });

        var orderDetailWrapper = document.getElementById("order-detail");
        orderDetailWrapper.innerHTML = orderDetailHtml;
    }
}(window.orderAssistant))
