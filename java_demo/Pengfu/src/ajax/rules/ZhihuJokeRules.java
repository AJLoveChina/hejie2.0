package ajax.rules;

import org.jsoup.select.Elements;

import ajax.model.JokeRules;
import ajax.spider.*;

public class ZhihuJokeRules extends JokeRules{
	
	ZhihuJokeRules() {
		this.setUrl("https://www.zhihu.com/question/21872451/answer/19586789");
		this.setTitleSelector("#zh-question-title > h2 > a");
		this.setContentSelector("#zh-question-answer-wrap > div > div.zm-item-rich-text.js-collapse-body > div.zm-editable-content.clearfix");
		
		this.setUsernameSelector("#zh-question-answer-wrap > div > div.answer-head > div.zm-item-answer-author-info > a.author-link");
		this.setUserPersonalPageUrlSelector("#zh-question-answer-wrap > div > div.answer-head > div.zm-item-answer-author-info > a.author-link");
	}
	
	@Override
	public String dealUserPersonalPageUrlElements(Elements eles) {
		String href = eles.attr("href");
		return this.getAbsoluteUrlFromUrl(href);
	}
	
	public static void main(String[] args) {
		Spider spider = new Spider(new ZhihuJokeRules());
		
		spider.run();
	}
}
