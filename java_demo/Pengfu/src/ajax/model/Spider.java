package ajax.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Spider{
	private JokeRules jokeRules;

	public Spider(JokeRules jokeRules) {
		this.setJokeRules(jokeRules);
	}
	public JokeRules getJokeRules() {
		return jokeRules;
	}
	public void setJokeRules(JokeRules jokeRules) {
		this.jokeRules = jokeRules;
	}
	
	
	public void run() {
		try {
			Document doc = Jsoup.connect(jokeRules.getUrl()).get();
			Joke joke = new Joke();
			joke.setUrl(jokeRules.getUrl());
			joke.setJokeStatus(JokeStatus.SPIDER);
			joke.set_jokeType(JokeType.ZHIHU);
			joke.setHasGetImage(0);
			
			if (jokeRules.getTitleSelector() != null) {
				Elements title = doc.select(jokeRules.getTitleSelector());
				joke.setTitle(jokeRules.dealTitleElements(title));
			}
			
			if (jokeRules.getContentSelector() != null) {
				Elements content = doc.select(jokeRules.getContentSelector());
				joke.setContent(jokeRules.dealContentElements(content));
			}
			
			if (jokeRules.getLikesSelector() != null) {
				Elements likes = doc.select(jokeRules.getLikesSelector());
				joke.setLikes(jokeRules.dealLikesElements(likes));
			}
			
			if (jokeRules.getDislikeSelector() != null) {
				Elements dislike = doc.select("em[id*=Oppose_Num_]");
				joke.setDislike(jokeRules.dealDislikeElements(dislike));
			}
			
			if (jokeRules.getStampsSelector() != null) {
				Elements stamps = doc.select(jokeRules.getStampsSelector());
				joke.setStamps(jokeRules.dealStampsElements(stamps));
			}
			
			if (jokeRules.getUsernameSelector() != null) {
				Elements username = doc.select(jokeRules.getUsernameSelector());
				joke.setUsername(jokeRules.dealUsernameElements(username));
			}
			
			if (jokeRules.getUserPersonalPageUrlSelector() != null) {
				Elements userPersonalPageUrl = doc.select(jokeRules.getUserPersonalPageUrlSelector());
				joke.setUserPersonalPageUrl(jokeRules.dealUserPersonalPageUrlElements(userPersonalPageUrl));
			}
			
			if (jokeRules.getBackgroundInformationSelector() != null) {
				Elements backgroundInformation = doc.select(jokeRules.getBackgroundInformationSelector());
				joke.setBackgroundInformation(jokeRules.dealBackgroundInformationElements(backgroundInformation));
			}
			
			joke.saveToSqlFromSpider();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
