package ajax.spider;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import ajax.model.ItemStatus;
import ajax.model.*;
import ajax.model.entity.Item;
import ajax.spider.rules.Rules;

public abstract class Spider3 {

	
	public abstract Rules returnRules();

	public void run() {
		Item item = this.grabItemFromPage();
		item.save();
	}
	
	public void update(int id){
		Item item = this.grabItemFromPage();
		item.setId(id);
		item.update();
	}
	
	
	public Item grabItemFromPage() {
		Document doc;
		Rules rules = this.returnRules();
		String url = rules.returnUrl();
		JokeType jokeType = rules.returnJokeType();
		
		Item item = new Item();
		
		try {
			doc = Jsoup.connect(url).get();
			
			item.setUrl(url);
			item.setStatus(ItemStatus.SPIDER.getId());
			item.setItype(jokeType.getId());
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
			e.printStackTrace();
		}
		return null;
	}
	

}
