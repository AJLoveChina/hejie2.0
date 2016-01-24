package ajax.model;

import java.io.*;
import java.net.*;
import java.util.*;

public class Joke {
	private String url;
	private String title;
	private String content;
	private ArrayList<String> stamps;
	
	private int like;
	private int dislike;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
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
	public int getLike() {
		return like;
	}
	public void setLike(int like) {
		this.like = like;
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
	
	
	
	public static void main(String[] args) {
		Joke joke = new Joke();
		
		joke.setUrl("http://m.pengfu.com/content/1470484/");

		System.out.println(joke.getHtmlFromUrl());
	}
	
	
}
