package ajax.tools;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.io.RandomAccessFile;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.log4j.chainsaw.Main;
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
import ajax.model.entity.ImagesContainer;

public class Tools {

	/**
	 * 反射, 获取对象域值
	 * @param field
	 * @param o
	 * @return
	 */
	public static Object getFieldValue(Field field, Object o) {
		for (Method method : o.getClass().getDeclaredMethods()) {
			
			if (method.getName().startsWith("get") && (method.getName().length() == field.getName().length() + 3)) {
				
				if (method.getName().toLowerCase().endsWith(field.getName().toLowerCase())) {
					try {
						return method.invoke(o);
					} catch(Exception ex) {
						System.out.println(ex.getMessage());
						return null;
					}
				}
			}
		}
		return null;
	}
	
	/**
	 * 反射, 获取对象方法的返回值
	 * @param methodToGetValue
	 * @param o
	 * @return
	 */
	public static Object getMethodValue(String methodToGetValue, Object o) {
		for (Method method : o.getClass().getDeclaredMethods()) {
			
			if (method.getName().equals(methodToGetValue)) {
				try {
					return method.invoke(o);
				} catch (Exception e) {
					return null;
				}
			}
		}
		return null;
	}
	
	@Deprecated
	public static enum EnumString {
		TABLE_TIME_FORMAT("yyyy-MM-dd HH:mm:ss");
		private String str;

		public String getStr() {
			return str;
		}
		public void setStr(String str) {
			this.str = str;
		}
		private EnumString(String str) {
			this.str = str;
		}
	}

	public static void sleep(int seconds) {
		try {
			System.out.println("休息" + seconds + "秒");
			Thread.sleep(seconds * 1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		}
	}

	public static void sleep(double seconds) {
		try {
			Thread.sleep((int) Math.ceil(seconds * 1000));
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		}
	}

	private static void deleteJokeById(int id) {
		Connection conn = Mysql.getConn();

		try {

			Statement stat = conn.createStatement();
			String sqlCmd = String.format(
					"UPDATE %s SET jokeStatus = %d WHERE joke_id = %d LIMIT 1",
					Joke.tableName, JokeStatus.DELETE.getId(), id);
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
			while ((len = in.read(bytes)) != -1) {
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
			e.printStackTrace();
		}
	}

	public static void writeDataToFile(String data, File file, String charset) {
		try {
			BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream(file), "UTF-8"));

			writer.write(data);
			writer.close();

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	

	public static void appendDataToFile(String data, File file) {
		String copy = readFile(file);

		writeDataToFile(copy + data, file);

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

	public static String getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(
			String relativeUrl, String absoluteUrl) {
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

				// such as http://www.malianyi.com:8080/Pengfu/Index?type=9
				// protocol = http
				// authority = www.malianyi.com:8080
				// host = www.malianyi.com
				// port = 8080
				// path = /Pengfu/Index
				// query = type=9
				// filename = /Pengfu/Index?type=9
				// ref = null
				return aURL.getProtocol() + "://" + aURL.getAuthority()
						+ relativeUrl;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return relativeUrl;
	}

	/**
	 * 解析一个字符串, 如果无法解析返回0
	 * 
	 * @param str
	 * @return
	 */
	public static int parseInt(String str) {
		return parseInt(str, 0);
	}

	/**
	 * 解析一个字符串, 如果无法解析返回defaultValue
	 * 
	 * @param str
	 * @param defaultValue
	 * @return
	 */
	public static int parseInt(String str, int defaultValue) {
		if (str == null || str.trim().equals("")) {
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
			return (int) Math.floor(result);
		} catch (Exception e) {
			return defaultValue;
		}
	}

	/**
	 * 获取content内容中的图片 并保存到 webRoot/web/路径下的images文件夹, 你可以替换images为 folder<br>
	 * 自动修改content中img src,alt 的值<br>
	 * <span style="color:green;">返回值 : 处理后的 content</span><br>
	 * 
	 * @param content
	 *            内容
	 * @param folder
	 *            新文件夹
	 */
	public static String grabImagesFromString(URL pageUrl, String content,
			String folder, Callback<Element, String> dealImgEle) {

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

				src = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(
						src, pageUrl.toString());

				ImagesContainer ic = ImagesContainer.existed(src);
				String path;

				if (ic != null) {

					path = ic.getWebPath();
					System.out.println("图片已存在");

				} else {
					path = FileTools.saveImageTo(src, destination);
					if (path.equals("")) {
						path = "web/pic/unknown.png";
					}
					// *******
					ImagesContainer ic2 = new ImagesContainer();
					ic2.setUrl(src);
					ic2.setDiskPath("WebRoot/" + path);
					ic2.setWebPath(path);
					ic2.save();
					// ********
				}

				img.attr("src", path);

			}
		}

		return doc.body().html();
	}

	public static String grabImagesFromStringThenUploadToOss(URL pageUrl,
			String content, String folder, Callback<Element, String> dealImgEle) {

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

		if (dealImgEle == null) {
			dealImgEle = new Callback<Element, String>() {

				@Override
				public String deal(Element in) {
					return in.attr("src");
				}

			};
		}

		for (Element img : images) {

			String src = dealImgEle.deal(img);

			if (!src.equals("")) {

				// 获取绝对路径
				src = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(
						src, pageUrl.toString());

				ImagesContainer ic = ImagesContainer.existed(src);
				String path;

				if (ic != null) {

					path = ic.getWebPath();
					System.out.println("图片已存在");

				} else {
					path = FileTools.saveImageToOss(src, destination);
					if (path.equals("")) {
						path = "/images/web/pic/unknown.png";
					}
					// *******
					ImagesContainer ic2 = new ImagesContainer();
					ic2.setUrl(src);
					ic2.setDiskPath("");
					ic2.setWebPath(path);
					ic2.save();
					// ********
				}

				img.attr("src", path);

			}
		}

		return doc.body().html();
	}

	/**
	 * 获取content内容中的图片 并保存到 webRoot/web/路径下的images文件夹
	 * 
	 * @param content
	 */
	public static void grabImagesFromString(URL url, String content) {

		grabImagesFromString(url, content, null, null);

	}

	public static <T> String join(List<T> list, String delimeter) {
		if (list.size() == 0) {
			return "";
		}
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
	 * 
	 * @param key
	 * @return
	 */
	public static String getConfig(String key) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria cr = session.createCriteria(Config.class);

		cr.add(Restrictions.eq("key", key));
		List<Config> configs = cr.list();

		
		session.getTransaction().commit();
		
		if (configs.size() > 0) {
			return configs.get(0).getValue();
		} else {
			return null;
		}

	}

	/**
	 * 添加配置到数据库中, 注意key的值是唯一的
	 * 
	 * @param key
	 * @param value
	 */
	public static boolean setConfig(String key, String value) {
		String str = getConfig(key);
		if (str == null) {
			Config config = new Config(key, value);

			return config.save();
		} else {
			updateConfig(key, value);
			return true;
		}
	}

	public static void updateConfig(String key, String newValue) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria cr = session.createCriteria(Config.class);

		cr.add(Restrictions.eq("key", key));
		List<Config> configs = cr.list();

		session.getTransaction().commit();
		
		Config config = configs.get(0);
		if (configs.size() > 0) {

			config.setValue(newValue);
			config.update();

		}
	}

	public class Image {
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
		// File picture = new File(url);

		Map<String, Float> map = new HashMap<String, Float>();

		BufferedImage sourceImg;
		try {
			URL link = new URL(url);
			sourceImg = ImageIO.read(link.openStream());

			Image image = (new Tools()).new Image();
			image.setHeight(sourceImg.getHeight());
			image.setWidth(sourceImg.getWidth());

			return image;

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return null;
	}

	public static boolean meituUploadImageToOss(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			// PrintWriter out = response.getWriter();
			HttpSession session = request.getSession();
			String temp = (String) session.getId();// 获得sessionId
			String filetype = request.getParameter("filetype");
			// System.out.println(filetype);
			File f1 = new File((String) request.getRealPath("photo") + "/",
					"tmp" + temp); // 获得photo所在的目录，并加上sessionId
			if (!f1.exists()) {
				f1.mkdirs();
			}
			// out.println(f1);
			FileOutputStream o = new FileOutputStream(f1);// 文件输出流指向上传文件所在路径
			// out.println(o);
			InputStream in = request.getInputStream(); // 从客户端获得文件输入流
			int n;
			byte b[] = new byte[10000000];// 设置缓冲数组的大小
			while ((n = in.read(b)) != -1) {
				o.write(b, 0, n); // 将数据从输入流读入到缓冲数组然后再从缓冲数组写入到文件中
			}
			o.close();
			in.close(); // 关闭输入流和文件输出流
			RandomAccessFile random = new RandomAccessFile(f1, "r"); // 文件随机读取写入流
			int second = 1;
			String secondLine = null;
			while (second <= 2) {
				secondLine = random.readLine();// 读入临时文件名
				second++;
			}
			int position = secondLine.lastIndexOf('\\');
			String filename = new String((secondLine.substring(position + 1,
					secondLine.length() - 1)).getBytes("iso-8859-1"), "gb2312");// 去掉临时文件名中的sessionId，获得文件名，并用iso-8859-1编码，
																				// 避免出现中文乱码问题
			random.seek(0);
			long forthEnPosition = 0;
			int forth = 1;
			while ((n = random.readByte()) != 1 && forth <= 4) {
				if (n == '\n') {
					forthEnPosition = random.getFilePointer();
					forth++;
				}// 去掉临时文件开头的4个'\n'字符
			}
			long currentTime = System.currentTimeMillis();
			String newFileName = "MT_" + Long.toString(currentTime);
			File f2 = new File((String) request.getRealPath("photo") + "/",
					newFileName + "." + filetype); // 以文件的名创建另一个文件随机读取
			RandomAccessFile random2 = new RandomAccessFile(f2, "rw");
			random.seek(random.length());
			long endPosition = random.getFilePointer(); // 以文件的名创建另一个文件随机读取写入流
			int j = 1;
			long mark = endPosition;
			while (mark <= 0 && j <= 6) { // 去掉临时文件末尾的6个'\n'字符
				mark--;
				random.seek(mark);
				n = random.readByte();
				if (n == '\n') {
					endPosition = random.getFilePointer();
					j++;
				}
			}
			random.seek(forthEnPosition);
			long startPosition = random.getFilePointer();
			while (startPosition < endPosition - 1) {// 将临时文件去掉头尾后写入到新建的文件中
				n = random.readByte();
				random2.write(n);
				startPosition = random.getFilePointer();
			}
			random2.close();
			random.close();
			f1.delete();
//			out.println("上传文件成功！");
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * 
	 * @param url
	 * @param parameter
	 * @return null if not find this parameter
	 * @throws Exception
	 */
	public static String getParameterValueFromUrl(String url, String parameter) throws Exception {
		
		List<org.apache.http.NameValuePair> nameValuePairs = URLEncodedUtils.parse(new URI(url), "UTF-8");
	    
	    
	    for (org.apache.http.NameValuePair nameValuePair : nameValuePairs) {
	    	if (nameValuePair.getName().equals(parameter)) {
	    		return nameValuePair.getValue();
	    	}
	    }
		return null;
	}

	/**
	 * 安全处理用户从ueditor编辑并上传的内容
	 * @param content
	 * @return
	 */
	public static String makeContentSafeOfUEditor(String content) {
		// TODO AJ
		return content;
	}

	public static String removeHTML(String description) {
		Document doc = Jsoup.parse(description);
		
		return doc.body().text();
	}

	public static void main(String[] args) {
		String text = "<p>123</p><img /><script><a>aa</a>";
		
		System.out.println(Tools.removeHTML(text));
	}

}
