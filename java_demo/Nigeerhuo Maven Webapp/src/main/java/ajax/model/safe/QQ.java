package ajax.model.safe;

import ajax.tools.Tools;

public class QQ {
	public static void main(String[] args) {
		String url = "https://graph.qq.com/user/get_user_info";
		
		String appid = Tools.getConfig("qqAppId");
		String appkey = Tools.getConfig("qqAppKey");
		String accessToken = "";
		String openId = "";
		String format = "json";	
	}
}
