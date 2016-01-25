package ajax.model;

import java.io.*;
import java.net.*;
import java.sql.*;
import java.util.*;

public class Joke {
	private String url;
	private String title;
	private String content;
	private ArrayList<String> stamps;
	
	private int likes;
	private int dislike;
	private static String urlPrefix = "http://m.pengfu.com/content/";
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
	
	public static String getHtmlByUrlId(String id) {
		String content = "";
		Joke joke = new Joke();
		joke.setUrl(urlPrefix + id);
		
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
