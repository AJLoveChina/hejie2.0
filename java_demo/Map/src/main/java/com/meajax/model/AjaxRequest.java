package com.meajax.model;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.meajax.Tools.Tools;




public class AjaxRequest {
	public class Config{
		private String url;
		private Map<String, String> map;
		private String method = "POST";
		private Map<String, String> headers = null;
		
		
		
		public Map<String, String> getHeaders() {
			return headers;
		}
		public void setHeaders(Map<String, String> headers) {
			this.headers = headers;
		}
		public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public Map<String, String> getMap() {
			return map;
		}
		public void setMap(Map<String, String> map) {
			this.map = map;
		}
		public String getMethod() {
			return method;
		}
		public void setMethod(String method) {
			this.method = method;
		}
		public Config(String url, Map<String, String> map, String method) {
			super();
			this.url = url;
			this.map = map;
			this.method = method.toUpperCase();
		}
	}
	
	public static String getResponse(Config config) {
		
		HttpClient client = HttpClientBuilder.create().build();
		
		String method = config.getMethod().toLowerCase();
		Map<String, String> params = config.getMap();
		
		
		
		//HttpRequestBase request = null;
		
		
		HttpResponse back = null;
		
		StringBuffer result = new StringBuffer();
		
		try {
			
			if (method.toUpperCase().equals("POST"))  {
				HttpPost request = new HttpPost(config.getUrl());
				
				if (config.getMap() != null) {
					List<NameValuePair> pairs = new ArrayList<NameValuePair>();
					for (String key : params.keySet()) {
						pairs.add(new BasicNameValuePair(key, params.get(key)));
					}
					request.setEntity(new UrlEncodedFormEntity(pairs));
				}
				
			
				if (config.getHeaders()!= null) {
					Map<String, String> headers = config.getHeaders();
					
					for (String key : headers.keySet()) {
						request.setHeader(key, headers.get(key));
					}
				}
				back = client.execute(request);
				
			} else {
				String url = config.getUrl();
				
				if (params != null) {
					List<String> list = new ArrayList<String>();
					for (String key : params.keySet()) {
						
						list.add(key + "=" + URLEncoder.encode(params.get(key), "UTF-8"));
					}
					url += "?" + Tools.join(list, "&");
				}
				
				HttpGet request = new HttpGet(url);
				
				if (config.getHeaders()!= null) {
					Map<String, String> headers = config.getHeaders();
					
					for (String key : headers.keySet()) {
						request.setHeader(key, headers.get(key));
					}
				}
				
				back = client.execute(request);
				
			}
			
			
			
//			BufferedReader rd = new BufferedReader(
//			        new InputStreamReader(back.getEntity().getContent()));
//
//			
//			String line = "";
//			while ((line = rd.readLine()) != null) {
//				result.append(line);
//			}
			
//			return result.toString();
			return EntityUtils.toString(back.getEntity(), "UTF-8");
			
		} catch (Exception e) {
			return null;
		}
	}
	
}
