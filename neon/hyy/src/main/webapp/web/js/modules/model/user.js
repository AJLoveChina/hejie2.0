define(function () {
	
	function User() {
		this.conatinerSelector = ".user-login";
		this.statusAttr = "data-islogin";
		this.configSelector = "#aj-user-sign-config";
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
		}
	}
	
	
	return new User();
});