package ajax.model.entity;

import java.util.*;

import org.hibernate.Session;

import ajax.model.JokeType;
import ajax.spider.Spider3;
import ajax.spider.rules.Rules;
import ajax.spider.rules.RulesTag;
import ajax.spider.rules.SpiderWeb;
import ajax.tools.HibernateUtil;


public class Item extends Entity<Item>{
	private int id;
	private String url;
	private String title;
	private String summary;
	private String content;
	private String stamps;
	private int likes;
	private int dislikes;
	private boolean hasGetImage = false;
	private int itype;
	private int status;
	private String username;
	private String userPersonalPageUrl;
	private String backgroundInformation;
	private String dateEntered;
	private int rulesTagId;
	
	
	public int getRulesTagId() {
		return rulesTagId;
	}
	public void setRulesTagId(int rulesTagId) {
		this.rulesTagId = rulesTagId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStamps() {
		return stamps;
	}
	public void setStamps(String stamps) {
		this.stamps = stamps;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getDislikes() {
		return dislikes;
	}
	public void setDislikes(int dislikes) {
		this.dislikes = dislikes;
	}
	public boolean isHasGetImage() {
		return hasGetImage;
	}
	public void setHasGetImage(boolean hasGetImage) {
		this.hasGetImage = hasGetImage;
	}
	public int getItype() {
		return itype;
	}
	public void setItype(int itype) {
		this.itype = itype;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserPersonalPageUrl() {
		return userPersonalPageUrl;
	}
	public void setUserPersonalPageUrl(String userPersonalPageUrl) {
		this.userPersonalPageUrl = userPersonalPageUrl;
	}
	public String getBackgroundInformation() {
		return backgroundInformation;
	}
	public void setBackgroundInformation(String backgroundInformation) {
		this.backgroundInformation = backgroundInformation;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	
	
	public void updateBySpider() {
		final String url = this.getUrl();
		final JokeType jokeType = JokeType.getJokeType(this.getItype());
		final RulesTag rulesTag = RulesTag.getRulesTagById(this.getRulesTagId());
		
		Spider3 sp3 = new Spider3() {
			
			@Override
			public SpiderWeb returnSpiderWeb() {
				return new SpiderWeb() {
					
					@Override
					public String returnUrl() {
						return url;
					}
					
					@Override
					public Rules returnRules() {
						try {
							
							return (Rules) Class.forName("ajax.spider.rules.ZhihuAnswerRules").newInstance();
							
						} catch (InstantiationException e) {
							System.out.println("Error : " + e.getMessage());
						} catch (IllegalAccessException e) {
							System.out.println("Error : " + e.getMessage());
						} catch (ClassNotFoundException e) {
							System.out.println("Error : " + e.getMessage());
						}
						return null;
					}
					
					@Override
					public JokeType returnJokeType() {
						return JokeType.FILM;
					}
				};
			}
		};
		
		sp3.update(this.getId());
	}
	
	
	public static Item getByItemById(int id) {
		
		Session session = HibernateUtil.getSession();
		
		Item entity = (Item)session.get(Item.class, id);
		
		return entity;
		
	}
	

	
	public static void main(String[] args) {
		
	}
	
	
	
}



