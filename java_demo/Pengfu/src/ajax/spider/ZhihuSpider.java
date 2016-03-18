package ajax.spider;

import ajax.model.*;
import ajax.tools.Mysql;
import ajax.tools.Tools;

import java.io.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;

import org.jsoup.Jsoup;
import org.jsoup.nodes.*;
import org.jsoup.select.*;

public class ZhihuSpider {
	/*
	 * 在目前的设计里面 知乎只有 二级分类
	 **/
	
	class Question{
		private String url;
		private String title;
		private String backgroundInformation;
		private String lastScan;
		private String topicTname;
		
		// why not allowed for a static filed in non-static inner type
		public static final String tableName = "zhihuquestion";
		
		
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
	}
	
	public List<Topic> getSecondTopics(int limit) {
		// 获取 limit 个一级主题
		return Topic.getSecondTopics(limit);
	}
	
	
	private void start() {
		List<Topic> topics = getSecondTopics(30);
		
		for(Topic t : topics) {
			List<Question> questions = getQuestionsOfTopic(t);
			
			for(Question q : questions) {				
				q.save();
				
			}
		}
		
		
	}
	
	private void getBackgroundInformation() {
		
	}
	
	public List<Question> getQuestionsOfTopic(Topic t) {
		List<Question> lists = new ArrayList<Question>();
		
		try {
			Document doc = Jsoup.connect(t.getUrl() + "/hot").get();
//			
//			String html = doc.html();
//			Tools.writeDataToFile(html, new File("src/data/zhihu_topic_html.txt"));
			
			Elements questions = doc.select("div.zu-top-feed-list > div.first-combine");
			
			for (Element ele : questions) {
				String title = ele.select("a.question_link").get(0).text().trim();
				String url = ele.select("a.question_link").get(0).attr("href").trim();
				
				Question q = new Question();
				q.setTitle(title);
				url = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(url, t.getUrl());
				q.setUrl(url);
				q.setTopicTname(t.getTname());
				q.setLastScan(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
				
				lists.add(q);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return lists;
	}
	
	public static void main(String[] args) {
		ZhihuSpider zhs = new ZhihuSpider();
		
		zhs.start();
	}
}
