define(function () {
	var tools = {
		joinParams : function (url, params) {
			
			var paramsArr = [];
			for (var i = 0; i < params.length; i++) {
				paramsArr.push(params[i].key + "=" + encodeURIComponent(params[i].val));
			}
			url += "?" + paramsArr.join("&");
			
			return url;
		},
		openUrl : function (url) {
			window.open(url, 'oauth2Login_10914' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
		},
		logException : function (e) {
			console.log("An error happen..");
			console.log(e);
		},
		isLocal : function () {
			if (location.hostname.toLowerCase() == "localhost") {
				return true;
			} else {
				return false;
			}
		},
		tishi : function (info) {
			var container = $("#aj-gobal-tishi-modal");
			
			
			container.find(".modal-body").html(info);
			
			container.modal("show");
		},
		timeago : function (timeString) {
			// This method depends on a third js library
		    return (new timeago()).format(timeString, 'zh_CN');
		}
	};
	
	return tools;
});
