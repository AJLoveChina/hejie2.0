package ajax.model;

import java.io.*;
import java.net.*;
import java.sql.*;
import java.util.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.tools.Mysql;

public class Joke {
	private int jokeId;
	private String url;
	public int getJokeId() {
		return jokeId;
	}
	public void setJokeId(int jokeId) {
		this.jokeId = jokeId;
	}

	private String title;
	private String content;
	private ArrayList<String> stamps;
	
	private int likes;
	private int dislike;
	private static String urlPrefix = "http://m.pengfu.com/content/";
	private static String tableName = "joke";
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
		String url = "jdbc:mysql://127.0.0.1:3306/primeton";
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
	
	public static Joke readFromResultSet(ResultSet rs) {
		Joke joke = new Joke();
		
		
		try {
			if (rs.next()) {
				joke.setJokeId(rs.getInt("joke_id"));
				joke.setTitle(rs.getString("title"));
				joke.setContent(rs.getString("content"));
				joke.setStampsByString(rs.getString("stamps"));
				joke.setUrl(rs.getString("url"));
				joke.setLikes(rs.getInt("likes"));
				joke.setDislike(rs.getInt("dislikes"));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		return joke;
	}
	public static Joke getOneByIdFromSQL(int id) {
		Joke joke = null;
		if (id <= 0) {
			id = 1;
		}
		
		Statement stat = Mysql.getStat();
		String sqlCmd = String.format("SELECT * FROM %s WHERE joke_id = %d LIMIT 1", tableName, id);
		
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			joke = Joke.readFromResultSet(rs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return joke;
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
