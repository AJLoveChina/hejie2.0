package ajax.spider;

import ajax.model.*;
import ajax.tools.*;

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
	

	public static void getBackgroundInformationForSomeRows() {
		List<Question> lists = Question.getQuestionsWhichHaveNoBackgroundInformation();
		
		for(Question q : lists) {
			q.grabBackgroundInformation();
			q.update();
			System.out.println("UPDate ok : " + q.getTitle());
		}
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
	
	public static void getQuestionsOfTopic() {
		List<Question> questions = new ArrayList<Question>();
		int page = 1;
		do {
			questions = Question.getTopQuestions(page, 30);
			
			for (Question q : questions) {
				q.grabAnswers();
			}
			
			page++;
		}while(questions.size() > 0);
		
	}
	
	public static void main(String[] args) {
		getQuestionsOfTopic();
		
		
//		
//		ZhihuSpider zhs = new ZhihuSpider();
//		
//		zhs.start();
		
	}
}
