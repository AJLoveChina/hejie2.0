package ajax.model;

import java.io.IOException;
import java.sql.*;
import java.util.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import ajax.tools.Mysql;

public class Answer implements JokeAdapter{
	private int id;
	private String title;
	private String content;
	private String url;
	private String username;
	private int agree;
	private String summary;
	private int jokeType;
	private String backgroundInformation;
	private boolean hasCommit = false;	// 有木有提交给  joke 数据表, 默认未提交

	public static String tableName = "answer";
	
	
	
	
	public String getBackgroundInformation() {
		return backgroundInformation;
	}
	public void setBackgroundInformation(String backgroundInformation) {
		this.backgroundInformation = backgroundInformation;
	}
	public boolean isHasCommit() {
		return hasCommit;
	}
	public void setHasCommit(boolean hasCommit) {
		this.hasCommit = hasCommit;
	}
	public int getJokeType() {
		return jokeType;
	}
	public void setJokeType(int jokeType) {
		this.jokeType = jokeType;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public int getAgree() {
		return agree;
	}
	public void setAgree(int agree) {
		this.agree = agree;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public void readFromResultSet(ResultSet rs) {
		try {
			this.setAgree(rs.getInt("agree"));
			this.setContent(rs.getString("content"));
			this.setHasCommit(rs.getBoolean("hasCommit"));
			this.setId(rs.getInt("id"));
			this.setJokeType(rs.getInt("jokeType"));
			this.setSummary(rs.getString("summary"));
			this.setTitle(rs.getString("title"));
			this.setUrl(rs.getString("url"));
			this.setUsername(rs.getString("username"));
			this.setBackgroundInformation(rs.getString("backgroundInformation"));
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	public void save() {
		String sqlCmd2 = String.format("INSERT INTO %s (title, content, url, username, agree, summary, jokeType, hasCommit, backgroundInformation) "
				+ "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
				tableName);
		try {
			PreparedStatement ps = Mysql.getConn().prepareStatement(sqlCmd2);
			
			ps.setString(1, this.getTitle());
			ps.setString(2, this.getContent());
			ps.setString(3, this.getUrl());
			ps.setString(4, this.getUsername());
			ps.setInt(5, this.getAgree());
			ps.setString(6, this.getSummary());
			ps.setInt(7, this.getJokeType());
			ps.setBoolean(8, this.isHasCommit());
			ps.setString(9, this.getBackgroundInformation());
			
			ps.execute();
			System.out.println("Grab OK" + this.getTitle());
		} catch (SQLException e1) {
			//e1.printStackTrace();
			System.out.println(e1.getMessage());
		}
	}
	
	public void update() {
		String sqlCmd = String.format("UPDATE %s SET title = ?, content = ?, url = ?, username = ?, agree = ?, "
				+ "summary = ?, jokeType = ?, hasCommit = ?, backgroundInformation = ? WHERE id = ? LIMIT 1", 
				tableName);
		try {
			PreparedStatement ps = Mysql.getConn().prepareStatement(sqlCmd);
			
			ps.setString(1, this.getTitle());
			ps.setString(2, this.getContent());
			ps.setString(3, this.getUrl());
			ps.setString(4, this.getUsername());
			ps.setInt(5, this.getAgree());
			ps.setString(6, this.getSummary());
			ps.setInt(7, this.getJokeType());
			ps.setBoolean(8, this.isHasCommit());
			ps.setString(9, this.getBackgroundInformation());
			ps.setInt(10, this.getId());
			
			ps.execute();
			System.out.println("Grab OK" + this.getTitle());
		} catch (SQLException e1) {
			//e1.printStackTrace();
			System.out.println(e1.getMessage());
		}
	}
	
	private static List<Answer> getList(String sqlCmd) {
		List<Answer> lists = new ArrayList<Answer>();
		
		ResultSet rs;
		try {
			
			rs = Mysql.getStat().executeQuery(sqlCmd);
			while(rs.next()) {
				Answer a = new Answer();
				a.readFromResultSet(rs);
				lists.add(a);
			}
			
			Mysql.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return lists;
	}
	
	public static List<Answer> getAnswersWithAgreeMoreThan(int agree) {
		String sqlCmd = String.format("SELECT * FROM %s WHERE agree > %d", tableName, agree);
		
		List<Answer> lists = getList(sqlCmd);
		
		return lists;
	}
	
	private static void pushAnswersToJoke() {
		List<Answer> answers = getAnswersWithAgreeMoreThan(1000);
		
		for (Answer a : answers) {
			
			
			Joke.commit(a);
		}
	}
	
	public void grabBackgroundInformation(){
		try {
			Document doc = Jsoup.connect(this.getUrl()).get();
			
			Elements eles = doc.select("#zh-question-detail > div.zm-editable-content");
			
			this.setBackgroundInformation(eles.html().trim());
			
			this.update();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	public static void main(String[] args) {
		pushAnswersToJoke();
	}
	
	
	@Override
	public String adaptedUrl() {
		return this.getUrl();
	}
	@Override
	public String adaptedTitle() {
		return this.getTitle();
	}
	@Override
	public String adaptedContent() {
		return this.getContent();
	}
	@Override
	public String adaptedStamps() {
		return null;
	}
	@Override
	public int adaptedLikes() {
		return this.getAgree();
	}
	@Override
	public int adaptedDislike() {
		return 0;
	}
	@Override
	public int adaptedhasGetImage() {
		return 0;
	}
	@Override
	public String adaptedDateEntered() {
		return null;
	}
	@Override
	public String adaptedUsername() {
		return this.getUsername();
	}
	@Override
	public String adaptedUserPersonalPageUrl() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public JokeStatus adaptedJokeStatus() {
		return JokeStatus.NORMAL;
	}
	@Override
	public String adaptedBackgroundInformation() {
		return this.getBackgroundInformation();
	}
	@Override
	public JokeType adapted_JokeType() {
		return JokeType.getJokeType(this.getJokeType());
	}
}

//END
