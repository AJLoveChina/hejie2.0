package ajax.model;

import java.sql.*;
import java.sql.SQLException;

import ajax.tools.Mysql;

public class Answer {
	private int id;
	private String title;
	private String content;
	private String url;
	private String username;
	private int agree;
	private String summary;
	
	public static String tableName = "answer";
	
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
	public void save() {
		String sqlCmd = String.format("INSERT INTO %s (title, content, url, username, agree, summary) "
				+ "VALUES('%s', '%s', '%s', '%s', %d, '%s')", 
				tableName, this.getTitle(), this.getContent(), this.getUrl(), this.getUsername(), this.getAgree(), this.getSummary());
		
		String sqlCmd2 = String.format("INSERT INTO %s (title, content, url, username, agree, summary) "
				+ "VALUES(?, ?, ?, ?, ?, ?)", 
				tableName);
		try {
			PreparedStatement ps = Mysql.getConn().prepareStatement(sqlCmd2);
			
			ps.setString(1, this.getTitle());
			ps.setString(2, this.getContent());
			ps.setString(3, this.getUrl());
			ps.setString(4, this.getUsername());
			ps.setInt(5, this.getAgree());
			ps.setString(6, this.getSummary());
			
			ps.execute();
			System.out.println("Grab OK" + this.getTitle());
		} catch (SQLException e1) {
			//e1.printStackTrace();
			System.out.println(e1.getMessage());
		}
	}
}
