;(function () {
    var orderNotifyUtil = {
        newOrder: function (key, val) {
            var siteName =  this.getSiteDisName(key.split(":")[1]);
            var id = val.expressId;
            var productName = val.productName.length>15 ? val.productName.substring(0,15)+"...":val.productName;
            if (id.length!=0) {
                id = "(" + id + ")";
            }

            return {
                siteName: siteName,
                productName: productName,
                expressCompany: val.expressCompany,
                id: id
            }
        },

        orderNewStatus: function (key, val, index) {
            console.log("orderNewStatus.val", val);
            console.log("orderNewStatus.index", index);
            var idx = parseInt(index);
            var len = val.content.length;
            var siteName =  this.getSiteDisName(key.split(":")[1]);
            if(idx <= 0 || len < idx) {
                console.log("parse msgIndex error.");
            }
            var record = val.content[len-idx];
            var productName = val.productName.length>17?val.productName.substring(0,17)+"...":val.productName;
            return {
                productName: productName,
                record: record,
                siteName: siteName,
                href: val.detailLink
            }
        },
        askUserLogin: function (site) {
            var orderNum = 0;

            for(var orderKey in localStorage) {
                if(orderKey.indexOf("order:") == 0) {
                    var orderValue = this.getOrderValue(orderKey);
                    if(!!orderValue && (orderValue['status'] == 'RUNNING' || orderValue['status'] == 'NEW')
                         && orderKey.indexOf(site)>0)
                        orderNum += 1;
                }
            }
            var name = this.getSiteDisName(site);
            var userLoginInfo = {
                orderNum : orderNum,
                loginUrl: this.getSiteLoginUrl(site),
                name: name
            }

            var configStr = localStorage['orderConfig']; 			
            if(!!configStr){
                try{
                    var orderConfig = JSON.parse(configStr);
                    userLoginInfo.helpUrl = orderConfig["global"].helpUrl;
                }catch(e){
                    console.log(e);
                }
            }
            return userLoginInfo;
        },
        getOrderValue: function (orderKey){
            var tmpStr = localStorage[orderKey];
            if(tmpStr==null)
                return null;
            try{
                var orderValue = JSON.parse(tmpStr);
            }catch(e){
                localStorage.removeItem(orderKey);
                console.log(e);
            }
            return orderValue;
       },
       getSiteDisName: function (site){
            switch(site){
                case 'JD':
                    var siteName = "京东商城";
                    break;
                case 'TAOBAO':
                    var siteName = "淘宝商城";
                    break;
                case 'TMALL':
                    var siteName = "天猫商城";
                    break;
                case 'AMAZON':
                    var siteName = "亚马逊";
                    break;
            }
            return siteName;
        },
        getSiteLoginUrl: function (site) {
            switch(site){
                case 'JD':
                    return 'http://passport.jd.com/new/login.aspx';
                case 'TAOBAO':
                    return 'https://login.taobao.com/member/login.jhtml';
                case 'TMALL':
                    return 'https://login.taobao.com/member/login.jhtml';
                case 'AMAZON':
                    return 'https://www.amazon.cn';
            }
        }
    }

    window.orderNotifyUtil= orderNotifyUtil;
}())
