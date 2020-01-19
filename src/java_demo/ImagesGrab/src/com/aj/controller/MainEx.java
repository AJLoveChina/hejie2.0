package com.aj.controller;

import java.util.Random;

import com.aj.tools.FileTools;

public class MainEx {
	
	private static String urlMoban = "http://bkjw.hfut.edu.cn/student/photo/2012/2012211730.JPG";
	private static String url2 = "http://bkjw.hfut.edu.cn/student/photo/2012/201221";
	private static String url = "http://bkjw.hfut.edu.cn/student/photo/2011/2011";
	private static final Object LOCK = MainEx.class;
	private static int number1 = 0;
	private static int number2 = 0;
	private static int max = 5000;
	private static Random rd = new Random();
	
	static String getUrl(int schid, String url) {
		String id = schid + "";
		int len = 4 - id.length();
		while(len-- > 0) {
			id = "0" + id;
		}
		return url + id + ".JPG";
	}
	
	private static String getUrl() {
		synchronized (LOCK) {
			if (rd.nextInt(2) == 0) {
				return ++number1 > max ? null : getUrl(number1, url);
			} else {
				return ++number2 > max ? null : getUrl(number2, url2);
			}
		}
	}
	
	static void loop(){
		int len = 20;
		
		while(len-- > 0) {
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					String url = getUrl();
					while(url != null) {
						FileTools.getImageByUrl(url);
						url = getUrl();
					}
				}
			}).start();
		}
		
		
	}
	
	public static void main(String[] args) {
		loop();
	}
}
