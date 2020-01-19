package com.meajax.model;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class QueryResult {
	public class Point{
		double longitude;
		double latitude;
		String name;
		String color;
		
		public String getColor() {
			return color;
		}
		public void setColor(String color) {
			this.color = color;
		}
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
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Point(double longitude, double latitude, String name) {
			super();
			this.longitude = longitude;
			this.latitude = latitude;
			this.name = name;
		}
	}
	
	public class Line{
		List<Point> points;
		String color;
		String info;
		public List<Point> getPoints() {
			return points;
		}
		public void setPoints(List<Point> points) {
			this.points = points;
		}
		public String getColor() {
			return color;
		}
		public void setColor(String color) {
			this.color = color;
		}
		public String getInfo() {
			return info;
		}
		public void setInfo(String info) {
			this.info = info;
		}
		public Line(List<Point> points, String color, String info) {
			super();
			this.points = points;
			this.color = color;
			this.info = info;
		}
	}
	
	public class Data {
		private List<Line> lines;

		public List<Line> getLines() {
			return lines;
		}
		public void setLines(List<Line> lines) {
			this.lines = lines;
		}
		public Data(List<Line> lines) {
			super();
			this.lines = lines;
		}
	}
	private boolean isok;
	private Data data;
	
	public boolean isIsok() {
		return isok;
	}
	public void setIsok(boolean isok) {
		this.isok = isok;
	}
	public Data getData() {
		return data;
	}
	public void setData(Data data) {
		this.data = data;
	}
	public QueryResult(boolean isok, Data data) {
		super();
		this.isok = isok;
		this.data = data;
	}
	
	public QueryResult() {
		super();
	}
	
	public static void main(String[] args) {
		// 调用示例
		
		QueryResult qr = new QueryResult();
		
		boolean isok = true;
		List<QueryResult.Point> points = null;
		String color = "#000";
		String info = "1";
		
		
		
		QueryResult.Line line1 = qr.new Line(points, color, info);
		
		List<QueryResult.Line> lines = new ArrayList<QueryResult.Line>();
		lines.add(line1);
		// lines.add(line2)...
		
		QueryResult.Data data = qr.new Data(lines);
		
		
		qr.setIsok(isok);
		qr.setData(data);
		
		Gson gson = new Gson();
		
		String json = gson.toJson(qr);
		
		// 返回json给前端
	}
}
