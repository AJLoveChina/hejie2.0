package ajax.spider;

import ajax.model.*;
import ajax.tools.Mysql;

import java.io.IOException;
import java.sql.*;
import java.util.*;

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
			
			String sqlCmd = String.format("INSERT INTO %s (title, url, backgroundInformation, lastScan, topicTname)", 
					tableName, this.url, this.title, this.backgroundInformation, this.lastScan, this.topicTname);
			
			try {
				stat.execute(sqlCmd);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
	
	public List<Topic> getSecondTopics(int limit) {
		// 获取 limit 个一级主题
		return Topic.getSecondTopics(limit);
		
	}
	
	
	private void start() {
		List<Topic> topics = getSecondTopics(1);
		
		for(Topic t : topics) {
			List<Question> questions = getQuestionsOfTopic(t);
			
			
		}
	}
	
	public List<Question> getQuestionsOfTopic(Topic t) {
		List<Question> lists = new ArrayList<Question>();
		
		try {
			Document doc = Jsoup.connect(t.getUrl()).get();
			
			Elements questions = doc.select("#zh-topic-feed-list > div.first-combine");
			
			for (Element ele : questions) {
				String title = ele.select("a.question_link").get(0).text().trim();
				String url = ele.select("a.question_link").get(0).attr("href").trim();
				
				Question q = new Question();
				q.setTitle(title);
				q.setUrl(url);
				
				q.save();
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
		return null;
	}
	
	public static void main(String[] args) {
		ZhihuSpider zhs = new ZhihuSpider();
		
		zhs.start();
	}
}
