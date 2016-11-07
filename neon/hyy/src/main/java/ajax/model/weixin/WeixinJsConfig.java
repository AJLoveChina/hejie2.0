package ajax.model.weixin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;

import ajax.tools.Tools;

public class WeixinJsConfig {
	private String appId;
	private String timestamp;
	private String nonceStr;
	private String signature;
	private String jsApiList;
	private String url;
	
	/**
	 * 自动生成签名
	 * @param appId
	 * @param timestamp
	 * @param nonceStr
	 * @param jsApiList
	 */
	public WeixinJsConfig(String appId, String timestamp, String nonceStr, String jsApiList, String url) {
		super();
		this.appId = appId;
		this.timestamp = timestamp;
		this.nonceStr = nonceStr;
		this.jsApiList = jsApiList;
		this.url = url;
		
		this.generateSignature();
	}
	
	private class A {
		String key;
		String val;
		public A(String key, String val) {
			super();
			this.key = key;
			this.val = val;
		}
		@Override
		public String toString() {
			return this.key + "=" + this.val;
		}
	}
	private void generateSignature() {
		List<String> list = new ArrayList<>();

		list.add(new A("jsapi_ticket", this.jsApiList).toString());
		list.add(new A("noncestr", this.nonceStr).toString());
		list.add(new A("timestamp", this.timestamp).toString());
		list.add(new A("url", this.url).toString());
		
		String data = Tools.join(list, "&");
		
		this.signature = Tools.sha1(data);
		
	}


	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getNonceStr() {
		return nonceStr;
	}
	public void setNonceStr(String nonceStr) {
		this.nonceStr = nonceStr;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public String getJsApiList() {
		return jsApiList;
	}
	public void setJsApiList(String jsApiList) {
		this.jsApiList = jsApiList;
	}
	
	
}
