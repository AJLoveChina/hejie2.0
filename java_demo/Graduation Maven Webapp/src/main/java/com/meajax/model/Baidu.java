package com.meajax.model;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

public class Baidu {
	public class Point{
		/**
		 * 经度
		 */
		private double longitude;
		/**
		 * 纬度
		 */
		private double latitude;
		private int id;
		private String name;
		public double getLongitude() {
			return longitude;
		}
		public void setLongitude(double longitude) {
			this.longitude = longitude;
		}
		public double getLatitude() {
			return latitude;
		}
		public void setLatitude(double latitude) {
			this.latitude = latitude;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Point(double latitude, double longitude) {
			super();
			this.longitude = longitude;
			this.latitude = latitude;
		}
	}
	
	public class Distance {
		private String text;
		private double value;
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public double getValue() {
			return value;
		}
		public void setValue(double value) {
			this.value = value;
		}
		
	}
	
	public class Element{
		private Distance distance;

		public Distance getDistance() {
			return distance;
		}

		public void setDistance(Distance distance) {
			this.distance = distance;
		}
	}
	
	public class Result {
		private List<Element> elements;

		public List<Element> getElements() {
			return elements;
		}

		public void setElements(List<Element> elements) {
			this.elements = elements;
		}
	}
	
	
	public class Response{
		private int status;
		private String message;
		private Result result;
		
		
		public int getStatus() {
			return status;
		}
		public void setStatus(int status) {
			this.status = status;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public Result getResult() {
			return result;
		}
		public void setResult(Result result) {
			this.result = result;
		}
		
	}
	
	/**
	 * 获取俩点之间的实际路程, 非直线路程. 使用百度地图API
	 * @param start	起点
	 * @param end	终点
	 * @return 单位 米
	 */
	public double getDistance(Point start, Point end) {
		AjaxRequest ar = new AjaxRequest();
		
		String url = "http://api.map.baidu.com/direction/v1/routematrix";
		java.util.Map<String, String> params = new HashMap<String, String>();
		params.put("origins", start.getLongitude() + "," + start.getLatitude());
		params.put("destinations", end.getLongitude() + "," + end.getLatitude());
		params.put("output", "json");
		params.put("ak", "hemnsARytfYF7dsYlLCnaZKUeCryW93y");
		
		AjaxRequest.Config config = ar.new Config(url, params, "GET");
		
		String response = ar.getResponse(config);
		
		Gson gson = new Gson();
		Response res = gson.fromJson(response, Response.class);
		
		try {
			return res.getResult().getElements().get(0).getDistance().getValue();
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}
}
