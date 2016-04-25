package ajax.tools;

import java.awt.image.BufferedImage;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.Callback;
import ajax.model.Joke;
import ajax.model.JokeStatus;
import ajax.model.entity.Config;
import ajax.model.entity.Entity;
import ajax.model.entity.ImagesContainer;
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
	/**
	 * 如果文件名不存在则创建
	 * @param data
	 * @param filePath
	 */
	public static void writeDataToFile(String data, String filePath) {
		FileWriter fw;
		File file = new File(filePath);
		if (file.exists()) {
			file.mkdirs();
		}
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
	


	/**
	 * 解析一个字符串, 如果无法解析返回0
	 * @param str
	 * @return
	 */
	public static int parseInt(String str) {
		return parseInt(str, 0);
	}
	
	/**
	 * 解析一个字符串, 如果无法解析返回defaultValue
	 * @param str
	 * @param defaultValue
	 * @return
	 */
	public static int parseInt(String str, int defaultValue) {
		if(str == null || str.trim() == "") {
			return defaultValue;
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
			return defaultValue;
		}
	}	
	/**
	 * 获取content内容中的图片 并保存到 webRoot/web/路径下的images文件夹, 你可以替换images为 folder<br>
	 * 自动修改content中img src,alt 的值<br>
	 * <span style="color:green;">返回值 : 处理后的 content</span><br>
	 * @param content 内容
	 * @param folder 新文件夹
	 */
	public static String grabImagesFromString(URL pageUrl, String content, String folder, Callback<Element, String> dealImgEle) {
		
		Document doc = Jsoup.parse(content);
		
		Elements images = doc.select("img");
		String destination = "WebRoot/images/web";
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
		
		// 如果文件夹不存在, 创建文件夹
		File folderGenerate = new File(destination);
		if (!folderGenerate.exists()) {
			folderGenerate.mkdirs();
		}
		
		if (dealImgEle == null) {
			dealImgEle = new Callback<Element, String>() {

				@Override
				public String deal(Element in) {
					return in.attr("src");
				}
				
			};
		}
		
		for (Element img : images) {
			img.removeAttr("data-origin-image-url");
			// String src = img.attr("data-actualsrc");
			String src = dealImgEle.deal(img);
			
			
			if (src != "") {
				
				src = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(src, pageUrl.toString());
				
				ImagesContainer ic = ImagesContainer.existed(src);
				String path;
				
				if (ic != null) {
					
					path = ic.getWebPath();
					System.out.println("图片已存在");
					
				} else {
					path = FileTools.saveImageTo(src, destination);
					if (path == "") {
						path = "web/pic/unknown.png";
					}
					//*******
					ImagesContainer ic2 = new ImagesContainer();
					ic2.setUrl(src);
					ic2.setDiskPath("WebRoot/" + path);
					ic2.setWebPath(path);
					ic2.save();
					//********
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
		
		grabImagesFromString(url, content, null, null);
		
	}

	
	public static <T> String join(List<T> list, String delimeter) {
		StringBuilder sb = new StringBuilder();
		sb.append(list.get(0));
		for (int i = 1; i < list.size(); i++) {
			sb.append(delimeter);
			sb.append(list.get(i));
		}
		return sb.toString();
	}
	
	public static boolean isLocal(String url) {
		URL u;
		try {
			u = new URL(url);
			
			return u.getHost().toLowerCase().equals("localhost");
		} catch (MalformedURLException e) {
			
		}
		return false;
		
	}
	

	

	
	/**
	 * 从数据库中加载配置, null if not configured!
	 * @param key
	 * @return
	 */
	public static String getConfig(String key) {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Config.class);
		
		cr.add(Restrictions.eq("key", key));
		List<Config> configs = cr.list();
		
		HibernateUtil.closeSession(session);
		if (configs.size() > 0) {
			return configs.get(0).getValue();
		} else {
			return null;
		}
		
	}
	/**
	 * 添加配置到数据库中, 注意key的值是唯一的
	 * @param key
	 * @param value
	 */
	public static boolean setConfig(String key, String value) {
		Config config = new Config(key, value);
		
		return config.save();
	}
	
	public static void updateConfig(String key, String newValue) {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Config.class);
		
		cr.add(Restrictions.eq("key", key));
		List<Config> configs = cr.list();
		
		HibernateUtil.closeSession(session);
		Config config = configs.get(0);
		if (configs.size() > 0) {
			
			config.setValue(newValue);
			config.update();
			
		}
	}
	
	public class Image{
		private float width;
		private float height;
		public float getWidth() {
			return width;
		}
		public void setWidth(float width) {
			this.width = width;
		}
		public float getHeight() {
			return height;
		}
		public void setHeight(float height) {
			this.height = height;
		}
	}
	
	public static Image getImageInfo(String url) {
		//File picture = new File(url);
		
		Map<String, Float> map = new HashMap<String, Float>();
		
		BufferedImage sourceImg;
		try {
			URL link = new URL(url);
			sourceImg = ImageIO.read(link.openStream());
			
			Image image = (new Tools()).new Image();
			image.setHeight(sourceImg.getHeight());
			image.setWidth(sourceImg.getWidth());
			
			return image;
			
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	
	public static void main(String[] args) {
		Tools.Image image = Tools.getImageInfo("http://localhost:8888/images/web/itemsroll/library.jpg");
		
		System.out.println(image);
	}
	
}
