package ajax.tools;

import java.awt.Image;
import java.io.FileOutputStream;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;

import javax.imageio.ImageIO;

public class File {
	public static Boolean getImageByUrl(String urlStr) {
		Boolean isok = true;
		Image image = null;
		
		URL url;
		String[] urlStrArr = urlStr.split("\\.");
		String fileExtension = urlStrArr[urlStrArr.length - 1];
		
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
			
			FileOutputStream fos = new FileOutputStream("WebRoot/web/images/demo." + fileExtension);
			fos.write(response);
			fos.close();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			System.out.println("One error happen=>" + urlStr);
			isok = false;
		}
		
		return isok;
	}
	
	public static void main(String[] args) {
		boolean isok = getImageByUrl("http://img1.pengfu.cn/big/57/1006057.gif");
		System.out.println(isok);
	}
}
