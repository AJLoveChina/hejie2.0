package ajax.tools;

import java.util.HashMap;
import java.util.Map;

import ajax.model.AjaxRequest;
import ajax.model.AjaxRequest.Config;

public class Baidu {
	
	public static final String token = Tools.getConfig("baiduLinkToken");
	
	/**
	 * 提交链接
	 * 这个方法有点问题(TODO), 因为提交显示没有错误,但是返回的success码一直为0, 官方文档解释是:success是提交链接成功的数目.
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
