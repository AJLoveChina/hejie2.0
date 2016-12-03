package ajax.tools;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ajax.model.AjaxRequest;
import ajax.model.AjaxRequest.Config;

import com.google.gson.Gson;

public class Baidu {
	
	
	private static String token = null;
	private static final String site = "http://www.nigeerhuo.com";
	
	public static String getToken() {
		if (Baidu.token == null) {
			Baidu.token = Tools.getConfig("baiduLinkToken");//Tools.getConfig("baiduLinkToken")
		}
		return Baidu.token;
	}
	
	class BaiduLinkResponse{
		public int remain;
		public int success;
	}
	/**
	 * 提交链接
	 * 这个方法有点问题, 因为提交显示没有错误,但是返回的success码一直为0, 官方文档解释是:success是提交链接成功的数目. (修复)
	 * 返回成功索引的url数目
	 * @param link
	 */
	public static int uploadLinkToBaidu(List<String> links) {
		
		AjaxRequest ar = new AjaxRequest();
		Map<String, String> map = new HashMap<String, String>();
		
		AjaxRequest.Config config = new Config("http://data.zz.baidu.com/urls?site=" + Baidu.site + "&token=" + Baidu.getToken(), map, "POST");
		config.setBody(Tools.join(links, "\n"));
		
		String response = AjaxRequest.getResponse(config);
		Gson gson = new Gson();
		Baidu.BaiduLinkResponse res = gson.fromJson(response, Baidu.BaiduLinkResponse.class);
		
		return res.success;
	}
	
	public static void main(String[] args) {
		List<String> urls = new ArrayList<String>();
		urls.add("http://nigeerhuo.com/item/26505");
		urls.add("http://nigeerhuo.com/item/26722");
		
		uploadLinkToBaidu(urls);
	}
}
