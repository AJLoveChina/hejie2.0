package com.aj.tools;

import java.awt.Image;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Date;


import java.util.*;

import javax.imageio.ImageIO;

public class FileTools {
	
	public static String getSrc(String urlStr){
		StringBuilder sb = new StringBuilder();
		
		String[] strArr = urlStr.split("\\/");
		
		return strArr[strArr.length - 1];
		
	}
	
	public static String getImageByUrl(String urlStr) {	// 成功时返回新的文件名, 失败时返回空字符�?
		String fileName = getSrc(urlStr); 	// 新的文件�?
		Image image = null;
		
		URL url;
		
		try {
			
			url = new URL(urlStr);
			
			URLConnection connection = url.openConnection();
			
			image = ImageIO.read(url);
			InputStream in = new BufferedInputStream(url.openStream());
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int n = 0;
			while (-1!=(n=in.read(buf)))
			{
			   out.write(buf, 0, n);
			}
			out.close();
			in.close();
			byte[] response = out.toByteArray();
			
			
			StringBuilder sb = new StringBuilder();
			sb.append("images/2011/");
			sb.append(fileName);
			
			FileOutputStream fos = new FileOutputStream(sb.toString());
			fos.write(response);
			fos.close();
			System.out.println("Grab ok : " + urlStr);
			
			
		} catch (Exception e) {
			//e.printStackTrace();
			fileName = "";
		}
		
		return fileName;
	}
	
	public static void main(String[] args) {
	}
}
