package ajax.spider;

import ajax.model.JokeType;
import ajax.model.entity.Item;
import ajax.spider.rules.*;

public class ZhihuAnswerSpider{

	public static void main(String[] args) {

		
		Spider3 sp3 = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						// https://www.zhihu.com/question/38783139/answer/92970757
						return "https://www.zhihu.com/question/38783139/answer/92970757";
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

			@Override
			public Item returnItem() {
				// TODO Auto-generated method stub
				return null;
			}
		};
		
		sp3.run();
		
		
		
	}

}
