package ajax.model;

import java.io.*;
import java.net.*;
import java.sql.*;
import java.util.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.tools.*;

public class Joke {
	private int jokeId;
	private String url;
	private String title;
	private String content;
	private ArrayList<String> stamps;
	private int likes;
	private int dislike;
	private int hasGetImage;
	
	private static String urlPrefix = "http://m.pengfu.com/content/";
	private static String tableName = "joke";
	
	
	public int getJokeId() {
		return jokeId;
	}
	public void setJokeId(int jokeId) {
		this.jokeId = jokeId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public ArrayList<String> getStamps() {
		return stamps;
	}
	public void setStamps(ArrayList<String> stamps) {
		this.stamps = stamps;
	}
	public void setStampsByString(String stamps) {
		String[] stampsArr = stamps.split(",");
		ArrayList<String> result = new ArrayList<String>();
		
		for(String s : stampsArr) {
			result.add(s);
		}
		this.stamps = result;
	}
	public int getDislike() {
		return dislike;
	}
	public void setDislike(int dislike) {
		this.dislike = dislike;
	}
	public int getHasGetImage() {
		return hasGetImage;
	}
	public void setHasGetImage(int hasGetImage) {
		this.hasGetImage = hasGetImage;
	}
	
	// GETTER AND SETTER END 
	
	public String getHtmlFromUrl() {
		try {
			URL url = new URL(this.url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("GET");
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			
			String line;
			StringBuilder sb = new StringBuilder();
			
			while((line = in.readLine()) != null) {
				sb.append(line);
			}
			
			return sb.toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "";
		}
	}
	
	public static String getUrlById(String id) {
		return urlPrefix + id;
	}
	public static String getHtmlByUrlId(String id) {
		String content = "";
		Joke joke = new Joke();
		joke.setUrl(Joke.getUrlById(id));
		
		content = joke.getHtmlFromUrl();
		return content;
	}
	
	public static Connection getConn() {
		String url = "jdbc:mysql://127.0.0.1:3306/meajax";
		String name = "name";
		String pass = "123";
		
		
		Connection conn = null;
		try {
			Class.forName("org.gjt.mm.mysql.Driver");
			conn = DriverManager.getConnection(url, name, pass);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return conn;
	}
	
	public static Statement getStat() {
		Connection conn = getConn();
		Statement stat = null;
		try {
			stat = conn.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return stat;
	}

	
	public static void getFromPengfuAndSaveToSqlByUrlId(String id) {
		
		String url = Joke.getUrlById(id);
		ArrayList<String> stampsArr = new ArrayList<String>();
		
		
		try {
			Document doc = Jsoup.connect(url).get();
			
			Elements title = doc.select("#ctl01 > section > div.text > section.textdl > h3 > a");
			Elements content = doc.select("#ctl01 > section > div.text > section.textdl > div.tex1");
			Elements likes = doc.select("em[id*=Support_Num_]");
			Elements dislike = doc.select("em[id*=Oppose_Num_]");
			Elements stamps = doc.select("#ctl01 > section > div.text > section.textdl > div.new_1.clearfix a");
			
			Iterator<Element> iterator = stamps.iterator();
			Element ele;
			while(iterator.hasNext()) {
				ele = (Element) iterator.next();
				stampsArr.add(ele.html());
			}
			
			
			
			
			Joke joke = new Joke();
			joke.setTitle(title.html());
			joke.setContent(content.html());
			joke.setUrl(url);
			joke.setLikes(Integer.parseInt(likes.html()));
			joke.setDislike(Integer.parseInt(dislike.html()));
			
			joke.saveToSQL();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
		}
	}
	
	public boolean saveToSQL() {
		Statement stat = Mysql.getStat();
		String sqlCmd = String.format("INSERT INTO %s (title, content, stamps, likes, dislike, url) VALUES('%s', '%s', '%s', %d, %d, '%s')", 
				tableName, this.getTitle(), this.getContent(), "", this.getLikes(), this.getDislike(), this.getUrl());
		
		try {
			stat.execute(sqlCmd);
			System.out.println("Grab OK");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Grab Error");
		}
		return true;
	}
	
	public boolean update(){
		Statement stat = Mysql.getStat();
		String sqlCmd = String.format("UPDATE %s SET title = '%s',content = '%s', stamps = '%s', likes = %d, dislike = %d, url = '%s', has_get_image = %d WHERE joke_id = %d LIMIT 1", 
				tableName, this.getTitle(), this.getContent(), "", this.getLikes(), this.getDislike(), this.getUrl(), this.getHasGetImage(), 
				this.getJokeId());
		
		try {
			stat.execute(sqlCmd);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("UPdate error");
		}
		return true;
	}
	
	
//	public static Joke readFromResultSet(ResultSet rs) {
//		Joke joke = new Joke();
//		
//		
//		try {
//			if (rs.next()) {
//				joke.setJokeId(rs.getInt("joke_id"));
//				joke.setTitle(rs.getString("title"));
//				joke.setContent(rs.getString("content"));
//				joke.setStampsByString(rs.getString("stamps"));
//				joke.setUrl(rs.getString("url"));
//				joke.setLikes(rs.getInt("likes"));
//				joke.setDislike(rs.getInt("dislikes"));
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	
//		return joke;
//	}
	
	protected void readFromResultSet(ResultSet rs) {
		
		try {
			if (rs.next()) {
				this.setJokeId(rs.getInt("joke_id"));
				this.setTitle(rs.getString("title"));
				this.setContent(rs.getString("content"));
				this.setStampsByString(rs.getString("stamps"));
				this.setUrl(rs.getString("url"));
				this.setLikes(rs.getInt("likes"));
				this.setDislike(rs.getInt("dislike"));
				this.setHasGetImage(rs.getInt("has_get_image"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static Joke getOneByIdFromSQL(int id) {
		Joke joke = Joke.getIns();
		
		if (id <= 17) {
			id = 17;
		}
		
		joke.setJokeId(id);
		joke.loadById();
		
		return joke;
	}
	
	public static Joke getIns(){
		return new Joke();
	}
	
	public void loadById() {
		int id = this.getJokeId();
		
		Statement stat = Mysql.getStat();
		String sqlCmd = String.format("SELECT * FROM %s WHERE joke_id = %d LIMIT 1", tableName, id);
		
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
		
			this.readFromResultSet(rs);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	protected boolean modifyImageOfContent(Document doc) {
		Elements eles = doc.getElementsByTag("img");
		
		Iterator it = eles.iterator();
		Element ele;
		String src;
		String fileName;
		boolean isok = true;
		
		while (it.hasNext()) {
			ele = (Element)it.next();
			src = ele.attr("src");
			
			if (isImageSrcFromOuterWebsite(src)) {
				fileName = FileTools.getImageByUrl(src);
				
				if (fileName.equals("")) {
					isok = false;
				} else {
					ele.attr("src", "web/images/" + fileName);
				}
				ele.attr("alt", "汤圆小屋");
				ele.attr("title", "汤圆小屋提醒您：点击可查看大图");
			} else {
				System.out.println("This is not from origin");
			}
		}
		
		return isok;
	}
	
	protected boolean modifyAHrefOfContent(Document doc){
		Elements eles = doc.getElementsByTag("a");
		
		for (Element ele : eles) {
			ele.attr("href", "javascript:;");
		}
		
		return true;
	}
	
	public void cleanContent() {
		// remove some information from origin webSite
		String content = this.getContent();
		if (content == null || content.equals("")) {
			System.out.println("Content is empty!");
			return;
		}
		Document doc = Jsoup.parse(content);
		boolean isok = true;
		
		isok = this.modifyImageOfContent(doc);
		isok = this.modifyAHrefOfContent(doc);
		
		if (isok) {
			this.setContent(doc.body().html());
			this.setHasGetImage(1);
			this.update();
		}
	}
	
	
	public static boolean isImageSrcFromOuterWebsite(String src){
		boolean bool = true;
		
		if (src.startsWith("web/images/")) {
			bool = false;
		}
		
		return bool;
	}
	public static ArrayList<Joke> getPageOf(int page) {
		// TODO Auto-generated method stub
		int begin = 0;
		int pageSize = 10;
		ArrayList<Joke> jokes = new ArrayList<Joke>();
		
		Statement stat = getStat();
		String sqlCmd = String.format("SELECT * FROM %s LIMIT %d, %d", tableName, begin + (page - 1) * pageSize, pageSize);
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			while(rs.next()) {
				Joke joke = new Joke();
				joke.readFromResultSet(rs);
				jokes.add(joke);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return jokes;
	}	

	

	public static void main(String[] args) {
		
		Statement stat = Joke.getStat();
		ResultSet rs;
		try {
			rs = stat.executeQuery("SELECT * FROM meajax.joke");
			while(rs.next()) {
				System.out.println(rs.getString("title"));
				System.out.println(rs.getString("content"));

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}




	
	
}
