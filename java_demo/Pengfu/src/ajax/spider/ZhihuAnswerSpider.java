package ajax.spider;

import ajax.spider.rules.*;

public class ZhihuAnswerSpider extends SpiderAction implements Spider2{

	
	public ZhihuAnswerSpider(String url) {
		super(url);
	}
	
	
	@Override
	public Rules getRules() {
		return new ZhihuAnswerRules();
	}

	
	public static void main(String[] args) {
		
		String url = "https://www.zhihu.com/question/38501171/answer/90733378";
		ZhihuAnswerSpider s = new ZhihuAnswerSpider(url);
		s.start();
		
	}
}
