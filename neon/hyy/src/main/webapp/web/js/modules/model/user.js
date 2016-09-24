define(function () {
	
	function User() {
		this.conatinerSelector = ".user-login";
		this.statusAttr = "data-islogin";
		this.configSelector = "#aj-user-sign-config";
		this.loginSuccessEventName= "aj.userLoginSuccess";
		this.logoutSuccessEventName = "aj.userLogoutSuccess";
	}
	User.prototype = {
		isLogin : function () {
			var form = $(this.configSelector)[0];
			
			if (form["isLogin"]) {
				try {
					return JSON.parse(form["isLogin"].value);
				}catch(ex) {
					return false;
				}
			} else {
				return false;
			}
		},
		getUserid : function () {
			var form = $(this.configSelector)[0];
			
			if (form["userid"]) {
				return form.userid.value;
			} else {
				return 0;
			}
		},
		getUserimg : function () {
			var form = $(this.configSelector)[0];
			
			if (form["img"]) {
				return form["img"].value;
			} else {
				return "";
			}
		},
		getNickname : function () {
			var form = $(this.configSelector)[0];
			
			if (form["nickname"]) {
				return form["nickname"].value;
			} else {
				return "";
			}
		},
		/**
		 * 因为有些第三方登陆成功后是不刷新网页的, 所以触发登陆成功事件, 以让程序以外的
		 * 部分响应用户登录的情况
		 */
		triggerLoginEvent : function () {
			$(window).trigger(this.loginSuccessEventName);
		},
		triggerLogoutEvent : function () {
			$(window).trigger(this.logoutSuccessEventName);
		},
		onLogin : function (fn) {
			$(window).on(this.loginSuccessEventName, fn);
		},
		onLogout : function (fn) {
			$(window).on(this.logoutSuccessEventName, fn);
		}
	}
	
	
	return new User();
});