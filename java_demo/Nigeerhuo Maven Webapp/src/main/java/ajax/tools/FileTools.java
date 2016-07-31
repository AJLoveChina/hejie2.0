package ajax.tools;

import java.awt.Image;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Random;

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
		
		File f =new File(urlStr);
		String fileName= f.getName();
		String[] urlStrArr = fileName.split("\\.");
		String fileExtension;
		
		if (urlStrArr.length > 1) {
			fileExtension = urlStrArr[urlStrArr.length - 1];
		} else {
			fileExtension = "jpg";
		}
		
		sb.append("." + fileExtension);
		
		return sb.toString();
	}
	/**
	 * 该方法会在imagesContainer 表中查找是否有同url(src)值的图片,有不再抓取直接返回本地磁盘地址<br> 
	 * 成功时返回相对于项目WebRoot的图片相对路径<br>
	 * 错误时返回 空字符串<br>
	 * @param src 必须是图片的绝对路径
	 * @param folder 图片输出文件夹
	 * @return
	 */
	public static String saveImageTo(String src, String folder) {
		
		System.out.println("正在下载图片 : " + src);
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
			
			connection.setConnectTimeout(20 * 1000); // 20秒超时
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
			
			destination = destination.replaceFirst("WebRoot/", "");
			
			System.out.println("下载图片完成!");
			return destination;
			
		} catch (Exception e) {
			System.out.println("下载图片失败 : " + e.getMessage());
		}
		
		System.out.println("下载图片完成!");
		return "";
	}
	
	public static String saveImageToOss(String src, String folder) {
		
		System.out.println("正在下载图片 : " + src);
		String newFileName = getRandomFileName(src);
		if (!folder.endsWith("/")) {
			folder += "/";
		}
		String destination = folder + newFileName;
		
		destination = destination.replaceFirst("WebRoot/", "");
		
		Image image = null;
		try {
			
			URL url = new URL(src);
			
			URLConnection connection = url.openConnection();
			connection.setRequestProperty("Referer", url.getProtocol() + "://" + url.getHost());
			
			connection.setConnectTimeout(20 * 1000); // 20秒超时
			image = ImageIO.read(url);
			
			OssUtil.uploadToNigeerhuo(destination, url.openStream());
			
			
			System.out.println("下载图片完成!");
			return destination;
			
		} catch (Exception e) {
			System.out.println("下载图片失败 : " + e.getMessage());
			return "";
		}
	}
	

	
	public static void main(String[] args) {
		try {
			URL url = new URL("http://baidu.com/jsad/daskjf");
			
			String xx = url.getProtocol() + "://" + url.getHost();
			
			System.out.println(xx);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
}
