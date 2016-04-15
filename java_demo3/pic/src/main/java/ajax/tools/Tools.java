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

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.Config;

public class Tools {
	
	public static void sleep(int seconds) {
		try {
			System.out.println("浼戞伅" + seconds + "绉�");
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
	 * 瑙ｆ瀽涓�涓瓧绗︿覆, 濡傛灉鏃犳硶瑙ｆ瀽杩斿洖0
	 * @param str
	 * @return
	 */
	public static int parseInt(String str) {
		return parseInt(str, 0);
	}
	
	/**
	 * 瑙ｆ瀽涓�涓瓧绗︿覆, 濡傛灉鏃犳硶瑙ｆ瀽杩斿洖defaultValue
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

	
	
	public static void main(String[] args) {
		
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
	
	
}
