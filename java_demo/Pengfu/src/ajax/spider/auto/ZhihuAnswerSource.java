package ajax.spider.auto;

import java.io.IOException;
import java.util.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.*;

import ajax.model.JokeType;
import ajax.model.Topic;
import ajax.spider.rules.RulesTag;
import ajax.tools.Tools;

public class ZhihuAnswerSource implements Source{
	
	private static void grabPageof(Topic t, int page) {
		String url = t.getUrl() + "/top-answers?page=" + page;
		
		try {
			Document doc = Jsoup.connect(url).get();
			
			Elements questions = doc.select("#zh-topic-top-page-list > div.feed-item");
			
			for (Element ele : questions) {
				ajax.model.entity.Source s = new ajax.model.entity.Source();
				
				String href = ele.select(".entry-body .zm-item-rich-text").get(0).attr("data-entry-url");
				
				href = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(href, "http://www.zhihu.com/topic");
				
				s.setItype(JokeType.getJokeTypeByInfo(t.getTname()).getId());
				s.setRulestagid(RulesTag.ZHIHU_ANSWER.getId());
				s.setUrl(href);
				s.setLikes(Tools.parseInt(ele.select(".entry-body .zm-item-vote-count").get(0).attr("data-votecount")));
				
				s.save();
			}
			
			Tools.sleep(1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
	}
	
	private static void GrabAllTopicsOfPage(int page) {
		// 获取所有主题的第page页
		
		int begin = 1;
		int num = 10;
		List<Topic> topics = new ArrayList<Topic>();
		do {
			
			topics = Topic.getSecondTopics(begin, num);
			
			for(Topic t : topics) {
				grabPageof(t, page);
			}
			
			begin ++;
			
			Tools.sleep(1);
		}while(topics.size() > 0);
		
	}
	
	
	private static void grabPages(int limit) {
		
		int page = 1;
		
		while(true) {
			GrabAllTopicsOfPage(page);
			page ++;
			System.out.println("已获取所有主题的第" + page + "页");
			Tools.sleep(30);
			
			if (page >= limit) {
				break;
			}
		}
		
	}
	public static void main(String[] args) {
		
		grabPages(30);
		
	}
}
