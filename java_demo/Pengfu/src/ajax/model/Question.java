package ajax.model;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.*;
import org.jsoup.select.Elements;

import ajax.spider.ZhihuSpider;
import ajax.tools.Mysql;
import ajax.tools.Tools;

public class Question{
	private int id;
	private String url;
	private String title;
	private String backgroundInformation;
	private String lastScan;
	private String topicTname;
	
	// why not allowed for a static filed in non-static inner type
	public static final String tableName = "zhihuquestion";
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBackgroundInformation() {
		return backgroundInformation;
	}
	public void setBackgroundInformation(String backgroundInformation) {
		this.backgroundInformation = backgroundInformation;
	}
	public String getLastScan() {
		return lastScan;
	}
	public void setLastScan(String lastScan) {
		this.lastScan = lastScan;
	}
	public String getTopicTname() {
		return topicTname;
	}
	public void setTopicTname(String topicTname) {
		this.topicTname = topicTname;
	}
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
	
	public void save() {
		Statement stat = Mysql.getStat();
		
		String sqlCmd = String.format("INSERT INTO %s (title, url, backgroundInformation, lastScan, topicTname) "
				+ "VALUES ('%s', '%s', '%s', '%s', '%s')", 
				tableName, this.title, this.url, this.backgroundInformation, this.lastScan, this.topicTname);
		
		try {
			stat.execute(sqlCmd);
			System.out.println("Grab ok : " + this.getTitle());
		} catch (SQLException e) {
			System.out.println("Error : " + e.getMessage());
		}
	}
	
	public void grabBackgroundInformation() {
		try {
			Document doc = Jsoup.connect(this.getUrl()).get();
			
			Elements eles = doc.select("#zh-question-detail > div");
			
			this.setBackgroundInformation(eles.html());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void readFromResultSet(ResultSet rs) {
		try {
			this.setId(rs.getInt("id"));
			this.setLastScan(rs.getString("lastScan"));
			this.setTitle(rs.getString("title"));
			this.setTopicTname(rs.getString("topicTname"));
			this.setUrl(rs.getString("url"));
			this.setBackgroundInformation(rs.getString("backgroundInformation"));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void update() {
		String sqlCmd = String.format("UPDATE %s set title = '%s', url = '%s', backgroundInformation = '%s', lastScan = '%s', topicTname = '%s' WHERE id = %d LIMIT 1",
				tableName, this.title, this.url, this.backgroundInformation, this.lastScan, this.topicTname, this.getId());
		
		Statement stat = Mysql.getStat();
		
		try {
			stat.execute(sqlCmd);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			Mysql.close();
		}
	}
	
	public static List<Question> getQuestionsWhichHaveNoBackgroundInformation() {
		String sqlCmd = String.format("SELECT * FROM %s WHERE backgroundInformation = 'null' or backgroundInformation = ''", tableName);
		
		ResultSet rs;
		List<Question> lists = new ArrayList<Question>();
		try {
			rs = Mysql.getStat().executeQuery(sqlCmd);
			
			
			while(rs.next()) {
				Question q = new Question();
				q.readFromResultSet(rs);
				lists.add(q);
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return lists;
	}
	public static List<Question> getTopQuestions(int page, int pageNum) {
		String sqlCmd = String.format("SELECT * FROM %s ORDER BY id limit %d, %d", tableName, (page - 1) * pageNum, pageNum);
		
		Statement stat = Mysql.getStat();
		List<Question> questions = new ArrayList<Question>();
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			while(rs.next()) {
				Question q = new Question();
				q.readFromResultSet(rs);
				questions.add(q);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return questions;
	}
	
	public void grabAnswers() {
		// 获取该问题的回答, (回答的内容不在这里抓取)
		String url = this.getUrl();
		
		try {
			Document doc = Jsoup.connect(url).get();
			
			Elements answers = doc.select("#zh-question-answer-wrap .zm-item-answer");
			
			for (Element answer : answers) {
				Answer a = new Answer();
				Element div = answer.select(".zm-item-rich-text").get(0);
				
				a.setTitle(this.getTitle());
				a.setContent(div.select(".zm-editable-content").text().trim());
				a.setSummary(div.select(".zh-summary").text().trim());
				a.setUsername(div.attr("data-author-name").trim());
				a.setAgree(Tools.parseInt(answer.select(".zm-votebar .count").text().trim()));
				a.setUrl(Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(div.select(".zm-item-rich-text").attr("data-entry-url").trim(), this.getUrl()));
				a.setJokeType(JokeType.getJokeTypeByInfo(this.getTopicTname()).getId());
				
				a.save();
				
			}
			Tools.sleep(0.01);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			System.out.println("Grab Error : " + e.getMessage());
		}
		
		
		
	}
}