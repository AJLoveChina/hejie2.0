package ajax.spider;

import ajax.model.JokeType;
import ajax.spider.rules.*;

public class ZhihuAnswerSpider{

	public static void main(String[] args) {

		
		Spider3 sp3 = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						return "https://www.zhihu.com/question/41033519/answer/91130738";
					}
					
					@Override
					public Rules returnRules() {
						return new ZhihuAnswerRules();
					}
					
					@Override
					public JokeType returnJokeType() {
						return JokeType.FILM;
					}
				};
			}
		};
		
		sp3.run();
		
		
		
	}

}
