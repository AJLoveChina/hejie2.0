package ajax.tools;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.Joke;
import ajax.model.JokeStatus;
import ajax.model.entity.Item;
import ajax.model.entity.Source;

public class Tools {
	
	public static void sleep(int seconds) {
		try {
			System.out.println("休息" + seconds + "秒");
			Thread.sleep(seconds * 1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
		}
	}
	
	public static void sleep(double seconds) {
		try {
			Thread.sleep((int)Math.ceil(seconds * 1000));
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
		}
	}
	
	private static void deleteJokeById(int id) {
		Connection conn = Mysql.getConn();
		
		
		try {
			
			Statement stat = conn.createStatement();
			String sqlCmd = String.format("UPDATE %s SET jokeStatus = %d WHERE joke_id = %d LIMIT 1", Joke.tableName, JokeStatus.DELETE.getId(), id);
			stat.executeUpdate(sqlCmd);
			
			System.out.println("DELETE 完成 : id = " + id);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static String readInputStream(InputStream in) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		byte[] bytes = new byte[1024];
		int len;
		
		try {
			while((len = in.read(bytes)) != -1) {
				out.write(bytes, 0, len);
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return out.toString();
	}
	
	public static void writeDataToFile(String data, File file) {
		FileWriter fw;
		try {
			
			fw = new FileWriter(file);
			fw.write(data);
			
			fw.close();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public static void appendDataToFile(String data, File file) {
		String copy = readFile(file);
		
		writeDataToFile(copy + data,  file);
		
	}
	
	public static String readFile(File file) {
		FileInputStream fin;
		
		try {
			
			fin = new FileInputStream(file);
			
			String data = readInputStream(fin);
			
			return data;
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "";
	}
	
	public static String getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(String relativeUrl, String absoluteUrl) {
		try {
			String result;
			URL aURL = new URL(absoluteUrl);
			if (relativeUrl.startsWith("http")) {
				return relativeUrl;
			}
			if (relativeUrl.startsWith("//")) {
				return aURL.getProtocol() + ":" + relativeUrl;
			}
			if (relativeUrl.startsWith("/")) {
				
//					such as http://www.malianyi.com:8080/Pengfu/Index?type=9
//			        protocol = http
//		    		authority = www.malianyi.com:8080
//		    		host = www.malianyi.com
//		    		port = 8080
//		    		path = /Pengfu/Index
//		    		query = type=9
//		    		filename = /Pengfu/Index?type=9
//		    		ref = null
				return aURL.getProtocol() + "://" + aURL.getAuthority() + relativeUrl;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return relativeUrl;
	}
	


	
	public static int parseInt(String str) {
		if(str == null || str.trim() == "") {
			return 0;
		}
		int radix = 1;
		if (str.toLowerCase().endsWith("k")) {
			str = str.substring(0, str.length() - 1);
			radix = 1000;
		}
		if (str.toLowerCase().endsWith("w")) {
			str = str.substring(0, str.length() - 1);
			radix = 10000;
		}
		if (str.toLowerCase().endsWith("m")) {
			str = str.substring(0, str.length() - 1);
			radix = 1000000;
		}
		
		try {
			double result = Double.parseDouble(str) * radix;
			return (int)Math.floor(result);
		}catch(Exception e) {
			return 0;
		}
	}
	/**
	 * 获取content内容中的图片 并保存到 webRoot/web/路径下的images文件夹, 你可以替换images为 folder<br>
	 * 自动修改content中img src,alt 的值<br>
	 * <span style="color:green;">返回值 : 处理后的 content</span><br>
	 * @param content 内容
	 * @param folder 新文件夹
	 */
	public static String grabImagesFromString(URL pageUrl, String content, String folder) {
		
		Document doc = Jsoup.parse(content);
		
		Elements images = doc.select("img");
		String destination = "WebRoot/web";
		if (folder == null) {
			folder = "/images/";
		}
		if (!folder.startsWith("/")) {
			folder = "/" + folder;
		}
		if (!folder.endsWith("/")) {
			folder += "/";
		}
		destination += folder;
		
		for (Element img : images) {
			String src;
			
			if (img.attr("data-origin-image-url") != null && img.attr("data-origin-image-url") != "") {
				src = img.attr("data-origin-image-url");
			} else {
				src = img.attr("src");
			}
			if (src != null) {
				img.attr("data-origin-image-url", src);
				src = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(src, pageUrl.toString());
				String path = FileTools.saveImageTo(src, destination);
				if (path == "") {
					path = "web/pic/unknown.png";
				}
				img.attr("src", path);
			}
		}
		
		return doc.body().html();
	}
	/**
	 * 获取content内容中的图片 并保存到 webRoot/web/路径下的images文件夹
	 * @param content
	 */
	public static void grabImagesFromString(URL url, String content) {
		
		grabImagesFromString(url, content, null);
		
	}
	
	
	public static void main(String[] args) {

		Item item = new Item();
		item.load(36);
		
		try {
			URL pageUrl = new URL(item.getUrl());
			
			String newContent = grabImagesFromString(new URL(item.getUrl()), item.getContent(), "zhihu");
			item.setContent(newContent);
			item.update();
			
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			System.out.println(e.getMessage());
		}
		
		
	}
	
	public static String join(List<String> list, String delimeter) {
		StringBuilder sb = new StringBuilder();
		sb.append(list.get(0));
		for (int i = 1; i < list.size(); i++) {
			sb.append(delimeter);
			sb.append(list.get(i));
		}
		return sb.toString();
	}
	

	
}
