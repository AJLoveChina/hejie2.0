package ajax.spider;

import ajax.model.JokeType;
import ajax.spider.rules.Rules;
import ajax.spider.rules.SpiderWeb;
import ajax.spider.rules.ToutiaoRules;

public class ToutiaoSpider {
	public static void main(String[] args) {
		Spider3 sp = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						//http://toutiao.com/a6274222106909753601/
						return "http://toutiao.com/a6274789128035516674/";
					}
					
					@Override
					public Rules returnRules() {
						return new ToutiaoRules();
					}
					
					@Override
					public JokeType returnJokeType() {
						return null;
					}
				};
			}
		};
		
		sp.run();
		
	}
}
