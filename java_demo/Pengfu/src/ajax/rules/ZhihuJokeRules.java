package ajax.rules;

import org.jsoup.select.Elements;

import ajax.model.JokeRules;
import ajax.model.Spider;

public class ZhihuJokeRules extends JokeRules{
	
	ZhihuJokeRules() {
		this.setUrl("https://www.zhihu.com/question/35860362/answer/89207200");
		this.setTitleSelector("#zh-question-title > h2 > a");
		this.setContentSelector("#zh-question-answer-wrap > div > div.zm-item-rich-text.js-collapse-body > div.zm-editable-content.clearfix");
		
		this.setUsernameSelector("#zh-question-answer-wrap > div > div.answer-head > div.zm-item-answer-author-info > a.author-link");
		this.setUserPersonalPageUrlSelector("#zh-question-answer-wrap > div > div.answer-head > div.zm-item-answer-author-info > a.author-link");
	}
	
	@Override
	public String dealUserPersonalPageUrlElements(Elements eles) {
		return eles.attr("href");
	}
	
	public static void main(String[] args) {
		Spider spider = new Spider(new ZhihuJokeRules());
		
		spider.run();
	}
}
