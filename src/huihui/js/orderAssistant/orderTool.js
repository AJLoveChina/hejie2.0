;(function (global) {
    var util = global.util;
    var $ = global.$;
    var _ = global._;
    var OrderNotification = global.OrderNotification;

    global.OrderTool = function (options, conf) {
        var configsStr = util.getStorage("order.configs");
        var conf = util.unserialize(configsStr);
        this.DEFAULTS = {};
        this.options = $.extend({}, global.OrderTool.DEFAULTS, options);
        this.config = conf;
    }

    global.OrderTool.prototype = {
         triggerParser: function () {
            setTimeout( timer);
         },
         parserController:function () {
             var that = this;
             var perMinute = 60 * 1000;
             var conf = that.config;
             if (conf.switchKey !== "ON") {
                return;
             }

             var timer = parseInt(conf.timer, 10);
             that.getOrderListInfo(true);
             if (that.defferdList.length) {
                $.when.apply($, that.defferdList).done(function () {
                    var logisticsTool = new global.LogisticsTool(that.config.sitesConf);
                    logisticsTool.parseAllOrders();
                    $.when.apply($, logisticsTool.promiseArray).done(function () {
                        var notifications = new global.OrderNotification();
                        notifications.triggerNotify();
                        setTimeout(function () {
                            that.parserController();
                        }, timer * perMinute);
                    });
                });
             }
         },
         getOrderListInfo: function (init, url) {
             var that = this;
             var conf = that.config;
             var siteConfList = conf.sitesConf;

             var defferdList = [];

             if (conf.isDebug) {
                var debugFile = 'order_debug.json';
                var jsonPromise = $.getJSON(chrome.extension.getURL(debugFile), function (data) {
                    util.saveOrderInfo(data.orderKey, data.orderInfo);
                });
                defferdList.push(jsonPromise);
             }
             siteConfList.forEach(function (siteConf) {
                 var urlReg = new RegExp(siteConf.urlPattern);
                 if (init || urlReg.test(url)) {
                     var debugConf = siteConf.debugConf;
                     if (debugConf && debugConf.isDebug) {
                         var debugUrlReg = new RegExp(debugConf.debugPattern);
                         if (!!!url || debugUrlReg.test(url)) {
                            siteConf.listUrl = debugConf.listUrl;
                         }
                     }
                     if (init) {
                         util.setStorage("order.notLoginSites", "[]");
                     }
                     that.targetSite = siteConf.siteName;
                     var postPromise = $.post(siteConf.listUrl, function (data) {
                         var orderHelper  = new OrderHelper(siteConf, data);
                         orderHelper.parseListDetail();
                     });
                     defferdList.push(postPromise);
                 }
             });
             this.defferdList = defferdList;
         }
    }

    function OrderHelper(siteConf, htmlStr) {
        this.siteConf= siteConf;
        this.htmlStr = htmlStr;
    };

    OrderHelper.prototype = {
        parseListDetail: function () {
            var siteConf = this.siteConf;
            var htmlNode = util.replaceHtml(this.htmlStr);
            if (!util.isLogin(htmlNode, siteConf)) {
                util.saveNotLoginSites(siteConf.siteName);
                var orderNotify = new OrderNotification();
                orderNotify.askForLogin(siteConf.siteName);
                return;
            }

            util.updateNotLoginSites(siteConf.siteName);
            var filterReg = new RegExp(siteConf.listPageFilterReg);
            var filterNode = filterReg.exec(htmlNode);

            if (!!!filterNode || filterNode.length !== 1) {
                var params = [
                    'err=LIST_PAGE_PARSE_ERROR',
                    'msg=FILTERNODE_INVALID',
                    'siteName=' + siteConf.siteName,
                    'type=ARMANI_EXTENSION_ORDER'];
                sendLog(params);
                return;
            }
            
            util.resetCurrentUsrOrder(siteConf.siteName);
            this.parseGeneralListNode(filterNode[0]);
        },
        parseGeneralListNode: function (effectNode) {
            var siteConf = this.siteConf;
            var rowQ= siteConf.rowQ;
            var orderIdQ= siteConf.orderIdQ;
            var orderStatusQ = siteConf.orderStatusQ;
            var orderInfoList = [];

            $(rowQ, effectNode).each(function (i, nodeStr) {
                var $node = $(nodeStr);
                var orderId = $(orderIdQ, $node).text().trim();

                if (!!!orderId || orderId.length <= 0) {
                    var params = [
                        'err=LIST_PAGE_PARSE_ERROR',
                        'msg=HAVE_NO_ORDERID',
                        "type=ARMANI_EXTENSION_ORDER"];
                    sendLog(params);
                    console.log('%c %s msg=HAVE_NO_ORDERID', 'color: red', siteConf.siteName);
                    return;
                }

                var blackWordsReg = new RegExp(siteConf.blackWordsReg);
                var blackWords = blackWordsReg.exec($node.text());
                if (!!blackWords) {
                    return;
                }
                var orderKey = util.getOrderKey(orderId, siteConf.siteName);
                var orderStatus = $(orderStatusQ, $node).text().trim();

                var orderFlowNum = util.isEffectOrder(orderStatus, siteConf);

                var trackInfo= orderDetailHelper["getTrackInfo" +
                    siteConf.siteName]($node, siteConf, orderId);
                //如果订单已经存在，则会有下面三种情况。无论那种情况都会退出本函数
                //（1）订单有物流的链接，这时只需要更新商品详情页提供的物流状态
                //（2）订单没有物流链接，如果getTrackInfo有信心，那么更新物流信息
                //（3）订单没有物流链接，且getTrackInfo没有信息，那么就退出。
                if (orderDetailHelper.isAlreadySaved(orderId, siteConf.siteName)) {
                    var orderValueTempt = util.getOrderValue(orderKey);
                    orderValueTempt.currentUsr = true;
                    orderValueTempt.orderStatus = orderStatus;
                        // for rule (2)
                    if (trackInfo) {
                        orderValueTempt.trackUrl = trackInfo.url;
                        orderValueTempt.trackOtherInfo = trackInfo.param;
                    }
                    util.saveOrderInfo(orderKey, orderValueTempt);
                    return;
                }

                var orderInfo = {};
                //orderFlowNum是根据订单详情页，判断此订单是否有效。0为无效订单
                if (orderFlowNum === 0) {
                    return;
                }

                //经过上面的筛选，下面就是对一个新订单的解析。
                var orderDetails = orderDetailHelper["parseOrderDetail" +
                    siteConf.siteName]($node, siteConf);

                var orderFlowInfo = [];

                //默认订单为提交状态
                var orderFlowItem = {
                    id: 1,
                    text: "提交订单",
                    time: orderDetails.orderStartTime
                };
                orderFlowInfo.push(orderFlowItem);

                orderInfo = {
                    siteName: siteConf.siteName,
                    orderId: orderId,
                    orderKey: orderKey,
                    detailLink: orderDetails.detailLink,
                    logisticsStatus: "NEW",
                    currentUsr: true,
                    cnName: siteConf.cnName,
                    orderStatus: orderStatus,
                    orderFlowNum: orderFlowNum,
                    orderFlowInfo:orderFlowInfo,
                    baobeiInfo: orderDetails.baobeiList
                };

                if (trackInfo) {
                    orderInfo.trackUrl = trackInfo.url;
                    orderInfo.trackOtherInfo = trackInfo.param;
                }

                //保存新的订单
                util.saveOrderInfo(orderKey, orderInfo);
            });
        }
    };

    var orderDetailHelper = {
       isAlreadySaved: function (orderId, siteName) {
            var orderKey = util.getOrderKey(orderId, siteName);
            if (util.getOrderValue(orderKey)) {
                return true;
            }
        },
        getTrackInfoTAOBAO: function ($node, siteConf) {
            var orderId;
            orderId = $node.attr(siteConf.orderIdAttr);

            var sellerIdArrQ = siteConf.sellerIdArrQ;
            var sellerId = $(sellerIdArrQ, $node).val();

            var trackURL = siteConf.trackBaseURL +
                "&trade_id=" + orderId +
                "&seller_id=" + sellerId;
            return {
                    url: trackURL,
                    param: {
                        tradeId: orderId,
                        sellerId: sellerId
                    }};
        },
        getTrackInfoAMAZON: function ($node, siteConf) {
            //.track-window > span a
            var trackQ = siteConf.trackQ;
            var targetUrl = $(trackQ, $node).attr("href");
            if (!!!targetUrl) {
                return false;
            }
            var trackUrl = siteConf.trackBaseURL + targetUrl;
            return {url: trackUrl};
        },
        getTrackInfoJD: function ($node, siteConf) {
            return {url: siteConf.trackBaseURL};
        },
        parseOrderDetailTAOBAO: function ($node, siteConf) {
             var baobeiQ = siteConf.baobeiQ;
             var baobeiImgQ = siteConf.baobeiImgQ;
             var baobeiDescQ = siteConf.baobeiDescQ;
             var baobeiSpecQ = siteConf.baobeiSpecQ;
             var baobeiList = [];
             $(baobeiQ, $node).each(function () {
                 var $this = $(this);
                 var baobeiInfo = {};
                 baobeiInfo.imgSrc = $(baobeiImgQ, $this).attr("src");
                 baobeiInfo.title = $(baobeiDescQ, $this).text();
                 baobeiInfo.href = $(baobeiDescQ, $this).attr("href");
                 baobeiInfo.spec = $(baobeiSpecQ, $this).text();
                 baobeiList.push(baobeiInfo);
             });


             var orderStartTimeQ = siteConf.orderStartTimeQ;
             var $orderStartTime = $(orderStartTimeQ, $node);
             var orderStartTime;
             var orderStartTimeRegStr = siteConf.orderStartTimeReg;
             orderStartTimeReg = new RegExp(orderStartTimeRegStr);
             if (orderStartTimeQ.length > 0) {
                orderStartTime = $orderStartTime.text();
                var orderStartTimeMatch = orderStartTime.match(orderStartTimeReg);
                if (orderStartTimeMatch && orderStartTimeMatch.length === 2) {
                    orderStartTime = orderStartTimeMatch[1];
                }
             }
             var orderDetailLinkQ = siteConf.orderDetailLinkQ;
             var detailLink = $(orderDetailLinkQ, $node).attr("href");
             return {
                 baobeiList: baobeiList,
                 detailLink: detailLink,
                 orderStartTime: orderStartTime
             };
        },
        parseOrderDetailAMAZON: function ($node, siteConf) {
             var baobeiQ = siteConf.baobeiQ;
             var baobeiImgQ = siteConf.baobeiImgQ;
             var baobeiList = [];

             var orderStartTimeQ = siteConf.orderStartTimeQ;
             var $orderStartTime = $(orderStartTimeQ, $node);
             var orderStartTime;
             var orderStartTimeRegStr = siteConf.orderStartTimeReg;
             orderStartTimeReg = new RegExp(orderStartTimeRegStr);
             if (orderStartTimeQ.length > 0) {
                orderStartTime = $orderStartTime.text();
                var orderStartTimeMatch = orderStartTime.match(orderStartTimeReg);
                if (orderStartTimeMatch && orderStartTimeMatch.length === 4) {
                    orderStartTime = orderStartTimeMatch[1] + "-" +
                        orderStartTimeMatch[2] + "-" +
                        orderStartTimeMatch[3];
                }
             }
             $(baobeiQ, $node).each(function () {
                 var $this = $(this);
                 var baobeiInfo = {};
                 var $baobeiImg = $(baobeiImgQ, $this);
                 var $baobeiImgAnchor = $baobeiImg.parent();
                 var deepNum = 3;
                 while (!!!$baobeiImgAnchor.attr("href")) {
                    if (!!!deepNum) {
                        break;
                     }
                    $baobeiImgAnchor = $baobeiImgAnchor.parent();
                    deepNum -= 1;
                 }

                 baobeiInfo.imgSrc = $baobeiImg.attr("src");
                 baobeiInfo.title = $baobeiImg.attr("title");
                 baobeiInfo.href = $baobeiImgAnchor.attr("href");
                 if (baobeiInfo.title) {
                     baobeiList.push(baobeiInfo);
                 }
            });

             var orderDetailLinkQ = siteConf.orderDetailLinkQ;
             var detailLink = siteConf.trackBaseURL + $(orderDetailLinkQ, $node).attr("href");
             return {
                 baobeiList: baobeiList,
                 detailLink: detailLink,
                 orderStartTime: orderStartTime
             };
        },
        parseOrderDetailJD: function ($node, siteConf) {
             var baobeiQ = siteConf.baobeiQ;
             var baobeiImgQ = siteConf.baobeiImgQ;
             var baobeiList = [];
             $(baobeiQ, $node).each(function () {
                 var $this = $(this);
                 var $baobeiImg = $(baobeiImgQ, $this);
                 var $imgParent = $baobeiImg.parent();
                 var baobeiInfo = {};
                 baobeiInfo.imgSrc = $baobeiImg.attr("src");
                 baobeiInfo.title = $baobeiImg.attr("title");
                 baobeiInfo.href = $imgParent.attr("href");
                 baobeiList.push(baobeiInfo);
            });

             var orderStartTimeQ = siteConf.orderStartTimeQ;
             var $orderStartTime = $(orderStartTimeQ, $node);
             var orderStartTime;
             if (orderStartTimeQ.length > 0) {
                orderStartTime = $orderStartTime.val();
             }
            var orderDetailLinkQ = siteConf.orderDetailLinkQ;
             var detailLink = $(orderDetailLinkQ, $node).attr("href");
             return {
                 baobeiList: baobeiList,
                 orderStartTime: orderStartTime,
                 detailLink: detailLink
             };
        }
    };

}(window.orderAssistant))
