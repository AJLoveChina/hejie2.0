package ajax.model.weixin;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import ajax.model.AjaxRequest;
import ajax.model.AjaxRequest.Config;
import ajax.model.ConfigFromProperties;

public class Weixin {
	private static final Object LOCK = Weixin.class;
	
	private static Long timestampWhenGetAccessToken = null;
	private static String accessToken = null;
	/**
	 * 获取access_token
	 * @return
	 */
	public static String getAccessToken() {
		synchronized (LOCK) {
			if (accessToken == null) {
				refreshAccessToken();
				timestampWhenGetAccessToken = new Date().getTime();
			}
			
			// 每小时刷新一次
			if ((new Date().getTime() - timestampWhenGetAccessToken) / (1000 * 60)  > 60) {
				refreshAccessToken();
			}
			return accessToken;
		}
	}
	
	private static final Object LOCK2 = Weixin.class;
	private static String JsApiTicket;
	private static Long ts2 = null;
	public static String getJsApiTicket() {
		synchronized (LOCK2) {
			if (JsApiTicket == null) {
				refreshJsApiTicket();
				ts2 = new Date().getTime();
			}
			if ((new Date().getTime() - ts2) / (1000 * 60)  > 60) {
				refreshJsApiTicket();
			}
			return JsApiTicket;
		}
	}
	
	private static void refreshJsApiTicket() {
		AjaxRequest ar = new AjaxRequest();
		
		
		Config config = ar.new Config("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" +  Weixin.getAccessToken() + "&type=jsapi", null, "GET");
		String res = AjaxRequest.getResponse(config);
		JsonObject json = new JsonParser().parse(res).getAsJsonObject();
		
		String ticket = json.get("ticket").getAsString();
		Weixin.JsApiTicket = ticket;
	}




	private static void refreshAccessToken() {
		AjaxRequest ar = new AjaxRequest();
		String appid = ConfigFromProperties.getWEIXIN_NIGEERHUO_APPID();
		String appsecret = ConfigFromProperties.getWEIXIN_NIGEERHUO_APPSECRET();
		
		
		Config config = ar.new Config("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + appsecret, null, "GET");
		String res = AjaxRequest.getResponse(config);
		JsonObject json = new JsonParser().parse(res).getAsJsonObject();
		
		String access_token = json.get("access_token").getAsString();
		Weixin.accessToken = access_token;
	}
	
	@Test
	public void test() {
		Assert.assertNotNull(Weixin.getAccessToken());
	}
	
	@Test
	public void test2() {
		Assert.assertNotNull(Weixin.getJsApiTicket());
	}
	
	public static void main(String[] args) {
		String[] strs = {"a", "v", "d", "a", "rr", "ab", "zyy", "zv"};
		List<String> list = Arrays.asList(strs);
		Collections.sort(list, new Comparator<String>() {

			@Override
			public int compare(String o1, String o2) {
				return o1.compareTo(o2);
			}
		});
		System.out.println(list);
	}
	
}
