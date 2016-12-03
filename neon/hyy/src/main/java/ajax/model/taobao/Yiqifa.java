package ajax.model.taobao;

import java.util.HashMap;
import java.util.Map;

import ajax.model.AjaxRequest;
import ajax.model.ConfigFromProperties;

public class Yiqifa {
	public static final String ZDM_LINK = "http://o.yiqifa.com/servlet/channelProductSearch";
	
	public static class ZdmQueryConfig {
		
	}
	
	public static void getZDM() {
		String userid = ConfigFromProperties.getYIQIFA_SITE_OWNER_ID();
		String siteid = ConfigFromProperties.getYIQIFA_SITE_ID();
		String sitepass = ConfigFromProperties.getYIQIFA_SITE_PASS();
		
		String method = "GET";
		String url = ZDM_LINK;
		Map<String, String> map = new HashMap<>();
		map.put("userId", userid);
		map.put("psw", sitepass);
		map.put("siteId", siteid);
		map.put("channel", "2");	//1= 海淘值得买//2= 国内值得买
		/**
		 * 商品可推广的终端，默认是1
			1= 不限制
			2= 可在pc推广
			3 = 可在移动推广
		 */
		map.put("device", "1");				
		/**
		 * 页码
		 */
		map.put("pageIndex", "1");

		
		
		AjaxRequest.Config config = new AjaxRequest.Config(url, map, method);
		String content = config.getResponse();
		
		System.out.println(content);
	}
	
	public static void main(String[] args) {
		getZDM();
	}
	
}
