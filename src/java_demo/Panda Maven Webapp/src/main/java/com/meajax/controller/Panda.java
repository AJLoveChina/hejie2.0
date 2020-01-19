package com.meajax.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import com.google.gson.Gson;
import com.meajax.model.AjaxRequest;

public class Panda {
	public class Config{
		String content;
		String roomid;
		String cookie;
		String token;
		
		public String getToken() {
			return token;
		}
		public void setToken(String token) {
			this.token = token;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public String getRoomid() {
			return roomid;
		}
		public void setRoomid(String roomid) {
			this.roomid = roomid;
		}
		public String getCookie() {
			return cookie;
		}
		public void setCookie(String cookie) {
			this.cookie = cookie;
		}
		public Config(String content, String roomid, String cookie, String token) {
			super();
			this.content = content;
			this.roomid = roomid;
			this.cookie = cookie;
			this.token = token;
		}
		
	}
	public static void main(String[] args) throws URISyntaxException, InterruptedException {
		
		
		int id = 1;
		//10066, 322650, 351562, 404055, 
		int[] roomidArr = {308174};
		Gson gson = new Gson();
		while(true) {
			id ++;
			for (int rid : roomidArr) {
				
				Panda p = new Panda();
				String content = "合肥工业大学发来贺电";
				String roomid = "" + rid;
				String cookie = "__guid=0.2113482555596918300.1462975859445.541; R=r%3D23729454%26u%3DCnaqnGi23729454%26n%3D%25R9%25N3%258R%25R5%258Q%258R%25R6%25NQ%25N3%25R8%258P%2582%25R7%2581%25NP%25R9%2598%25OS%25R6%259Q%25O0%26le%3DAmZ1ZwL3AQHlWGDjpKRhL29g%26m%3DZGtjAmHjAmL2ZGV%3D%26im%3DnUE0pPHmDFHlEvHlEzx3YaOxnJ0hM3ZyZxMyLmyxAmAvMJL3AmqzMGAvZTMwAmLjL2MyAQN3ZGZ1Lv5jozp%3D; M=t%3D1463053131%26v%3D1.0%26mt%3D1463053131%26s%3D790276b8c02c14d20299ac903d60927e; OUTFOX_SEARCH_USER_ID_NCOO=1913427611.2774246; __guid=208163603.415315874824126660.1463824071989.965; aliyungf_tc=AQAAAJMSAiTcEgYA2YqEPaWApsZSGZhV; monitor_count=171; Hm_lvt_204071a8b1d0b2a04c782c44b88eb996=1463887546,1463973136,1463996556,1464059127; Hm_lpvt_204071a8b1d0b2a04c782c44b88eb996=1464084080";
				String token = "99a4d98ae1fa626e475e7c571304e343";
				
				Panda.Config config = p.new Config(content, roomid, cookie, token);
				String result = Panda.sendDanmu(config);
				
				System.out.println(result);
				Panda.Reslult resultCls = gson.fromJson(result, Panda.Reslult.class);
				
				if (resultCls.getErrno() > 0) {
					Thread.sleep(1000 * 5);
				}
				Thread.sleep(1000);
			}
		}
	}
	public class Reslult {
		int errno;
		String data;
		public int getErrno() {
			return errno;
		}
		public void setErrno(int errno) {
			this.errno = errno;
		}
		public String getData() {
			return data;
		}
		public void setData(String data) {
			this.data = data;
		}
	}
	
	
	public static String sendDanmu(Config config) {
		
		AjaxRequest ar = new AjaxRequest();
		String url = "http://www.panda.tv/ajax_send_group_msg";
		Map<String, String> map = new HashMap<String, String>();
		String method = "GET";
		
		map.put("token", config.getToken());
		map.put("roomid", config.getRoomid());
		map.put("type", "1");
		map.put("content", config.getContent());
		map.put("hostid", "7372810");
		map.put("_", new Date().getTime() + "");
		
		
		
		AjaxRequest.Config arconfig = ar.new Config(url, map, method);
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Cookie", config.getCookie());
		arconfig.setHeaders(headers);
		String result = ar.getResponse(arconfig);
		
		return result;
	}
}
