package ajax.spider;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import ajax.model.*;
import ajax.model.entity.Item;
import ajax.spider.rules.*;

public abstract class Spider3 {

	
	public abstract SpiderWeb returnSpiderWeb();

	
	private boolean checked(){
		SpiderWeb sw = this.returnSpiderWeb();
		Rules rules = sw.returnRules();
		String url = sw.returnUrl();
		JokeType jokeType = sw.returnJokeType();
		
		if (rules == null) {
			System.out.println("Error : 有一只spider3 木有rules, 无法运行已跳过");
			return false;
		}
		if (url == null || url == "") {
			System.out.println("Error : 有一只spider3 木有url, 无法运行已跳过");
			return false;
		}
		return true;
	}
	public void run() {
		SpiderWeb sw = this.returnSpiderWeb();
		
		if (this.checked()) {
			Item item = this.grabItemFromPage();
			
			item = this.generateIType(item);
			
			// 抓取图片
			item.setContent(item.grabImagesFromContent(sw.returnRules().returnImgCallback()));
			// 生成缩略图
			item.setPreviewImage(item.generateItemImageAndReturn());
			// 摘要
			item.setSummary(item.generateSummaryAndReturn());
			
			item.save();
		}
	}
	
	
	public Item generateIType(Item item) {
		JokeType jt = this.returnSpiderWeb().returnJokeType();
		
		if (jt == null) {
			jt = item.generateTypeAndReturn();
		}
		
		item.setItype(jt.getId());
		return item;
	}
	
	public Item grabItem() {
		if (this.checked()) {
			return this.grabItemFromPage();
		}
		return null;
	}
	
	public void update(int id){
		if (this.checked()) {
			Item item = this.grabItemFromPage();
			item.setId(id);
			item.update();
		}
	}
	
	
	public Item grabItemFromPage() {
		Document doc;
		SpiderWeb sw = this.returnSpiderWeb();
		Rules rules = sw.returnRules();
		String url = sw.returnUrl();
		//JokeType jokeType = sw.returnJokeType();
		
		Item item = new Item();
		
		try {
			doc = Jsoup.connect(url).get();
			
			item.setUrl(url);
			item.setStatus(ItemStatus.SPIDER.getId());
			//item.setItype(jokeType.getId());
			item.setHasGetImage(false);
			item.setRulesTagId(rules.getRulesTag().getId());
			
			
			if (rules.getTitleSelector() != null) {
				Elements title = doc.select(rules.getTitleSelector());
				item.setTitle(rules.preProcessTitleElements(title));
			}
			
			if (rules.getContentSelector() != null) {
				Elements content = doc.select(rules.getContentSelector());
				item.setContent(rules.preProcessContentElements(content));
			}
			
			if (rules.getLikesSelector() != null) {
				Elements likes = doc.select(rules.getLikesSelector());
				item.setLikes(rules.preProcessLikesElements(likes));
			}
			
			if (rules.getDislikesSelector() != null) {
				Elements dislike = doc.select("em[id*=Oppose_Num_]");
				item.setDislikes(rules.preProcessDislikesElements(dislike));
			}
			
			if (rules.getStampsSelector() != null) {
				Elements stamps = doc.select(rules.getStampsSelector());
				item.setStamps(rules.preProcessStampsElements(stamps));
			}
			
			if (rules.getUsernameSelector() != null) {
				Elements username = doc.select(rules.getUsernameSelector());
				item.setUsername(rules.preProcessUsernameElements(username));
			}
			
			if (rules.getUserPersonalPageUrlSelector() != null) {
				Elements userPersonalPageUrl = doc.select(rules.getUserPersonalPageUrlSelector());
				item.setUserPersonalPageUrl(rules.preProcessUserPersonalPageUrlElements(userPersonalPageUrl));
			}
			
			if (rules.getBackgroundInformationSelector() != null) {
				Elements backgroundInformation = doc.select(rules.getBackgroundInformationSelector());
				item.setBackgroundInformation(rules.preProcessBackgroundInformationElements(backgroundInformation));
			}
			
			return item;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}
	

}
