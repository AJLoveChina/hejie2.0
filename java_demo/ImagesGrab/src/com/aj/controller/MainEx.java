package com.aj.controller;

import com.aj.tools.FileTools;

public class MainEx {
	
	private static String urlMoban = "http://bkjw.hfut.edu.cn/student/photo/2012/2012211730.JPG";
	private static String url2 = "http://bkjw.hfut.edu.cn/student/photo/2012/201221";
	private static String url = "http://bkjw.hfut.edu.cn/student/photo/2011/2011";
	
	
	static String getUrl(int schid) {
		String id = schid + "";
		int len = 4 - id.length();
		while(len-- > 0) {
			id = "0" + id;
		}
		return url + id + ".JPG";
	}
	static void loop(){
		int start = 1;
		int end = 5000;
		
		while(start++ < end) {
			FileTools.getImageByUrl(getUrl(start));
		}
		
		
	}
	
	public static void main(String[] args) {
		loop();
	}
}
