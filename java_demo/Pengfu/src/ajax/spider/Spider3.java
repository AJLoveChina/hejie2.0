package ajax.spider;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import ajax.model.ItemStatus;
import ajax.model.*;
import ajax.model.entity.Item;
import ajax.spider.rules.Rules;

public class Spider3 {
	private String url;
	private Rules rules;
	private JokeType jokeType = JokeType.ALL;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Rules getRules() {
		return rules;
	}
	public void setRules(Rules rules) {
		this.rules = rules;
	}
	public JokeType getJokeType() {
		return jokeType;
	}
	public void setJokeType(JokeType jokeType) {
		this.jokeType = jokeType;
	}	
	
	

	public void run() {
		Document doc;
		try {
			Rules rules = this.getRules();
			doc = Jsoup.connect(this.getUrl()).get();
			
			Item item = new Item();
			item.setUrl(this.getUrl());
			item.setStatus(ItemStatus.SPIDER.getId());
			item.setItype(this.getJokeType().getId());
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
			
			item.save();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
