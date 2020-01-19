package ajax.spider;

import ajax.model.JokeType;
import ajax.model.entity.Item;
import ajax.spider.rules.Rules;
import ajax.spider.rules.SpiderWeb;
import ajax.spider.rules.WeixinRules;

public class WeixinSpider{

	public static void main(String[] args) {
		Spider3 sp = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						return "http://mp.weixin.qq.com/s?src=3&timestamp=1461305172&ver=1&signature=6NO9SdGWTgcQnVoOE7JDonE7lyi0v-GVpnt5SKRLaJ3ivmlAI17NvLk0OL1zVvCMh9RxnVZ8YCMl1ZKFgnmgTC5Y-oet9X8*PPTGbdC5UCEGRNFW*wP8-1WhvDvM314K9J-2R6Nf-3NSj0uNjlT3RXRf*5MneBR*vbK*XSxyNWQ=";
					}
					
					@Override
					public Rules returnRules() {
						// TODO Auto-generated method stub
						return new WeixinRules();
					}
					
					@Override
					public JokeType returnJokeType() {
						return null;
					}
				};
			}
			
			@Override
			public Item returnItem() {
				// TODO Auto-generated method stub
				return null;
			}
		};
		
		sp.run();
	}
	
}
