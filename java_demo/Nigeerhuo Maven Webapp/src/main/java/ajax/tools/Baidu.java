package ajax.tools;

import java.util.HashMap;
import java.util.Map;

import ajax.model.AjaxRequest;
import ajax.model.AjaxRequest.Config;

public class Baidu {
	
	public static final String token = Tools.getConfig("baiduLinkToken");
	
	/**
	 * 提交链接
	 * @param link
	 */
	public static void uploadLinkToBaidu(String link) {
		
		AjaxRequest ar = new AjaxRequest();
		Map<String, String> map = new HashMap<String, String>();
		map.put("site", link);
		map.put("token", token);
		
		
		AjaxRequest.Config config = ar.new Config("http://data.zz.baidu.com/urls", map, "GET");
		
		String response = ar.getResponse(config);
		System.out.println(response);
		
		
	}
}
