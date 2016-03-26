package ajax.tools;

import java.awt.Image;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Date;


import java.util.*;

import javax.imageio.ImageIO;

public class FileTools {
	
	public static String getSrc(String urlStr){
		
		return getRandomFileName(urlStr);
	}
	
	@Deprecated
	public static String getImageByUrl(String urlStr) {	// 成功时返回新的文件名, 失败时返回空字符串
		String fileName = getSrc(urlStr); 	// 新的文件名
		Image image = null;
		
		URL url;
		
		try {
			
			url = new URL(urlStr);
			
			URLConnection connection = url.openConnection();
			connection.setRequestProperty("Referer", "http://img1.pengfu.cn/");
			
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
			sb.append("WebRoot/web/images/");
			sb.append(fileName);
			
			FileOutputStream fos = new FileOutputStream(sb.toString());
			fos.write(response);
			fos.close();
			System.out.println("Grab ok : " + urlStr);
			
			
		} catch (Exception e) {
			
			fileName = "";
		}
		
		return fileName;
	}
	
	private static String getRandomFileName(String urlStr) {
		StringBuilder sb = new StringBuilder();
		
		Random rd = new Random();
		float percent = rd.nextFloat();
		
		int random = (int) Math.floor(1000 + 8000 * percent);
		
		
		java.util.Date date = new java.util.Date();
		
		long time = date.getTime();
		
		sb.append(time + "" + random);
		
		String[] urlStrArr = urlStr.split("\\.");
		String fileExtension = urlStrArr[urlStrArr.length - 1];
		sb.append("." + fileExtension);
		
		return sb.toString();
	}
	
	public static String saveImageTo(String src, String folder) {
		String newFileName = getRandomFileName(src);
		if (!folder.endsWith("/")) {
			folder += "/";
		}
		String destination = folder + newFileName;
		
		Image image = null;
		try {
			
			URL url = new URL(src);
			
			URLConnection connection = url.openConnection();
//			connection.setRequestProperty("Referer", "http://img1.pengfu.cn/");
			
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
			sb.append(destination);
			
			FileOutputStream fos = new FileOutputStream(sb.toString());
			fos.write(response);
			fos.close();
			
			return destination;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return "";
	}
	

	
	public static void main(String[] args) {
//		String src = getImageByUrl("http://img1.pengfu.cn/big/57/1006057.gif");
//		System.out.println(src);
		
		String src = getSrc("http://img1.pengfu.cn/big/57/1006057.gif");
		
		System.out.println(src);
	}
}
