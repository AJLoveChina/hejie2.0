package ajax.model.entity;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.JokeType;
import ajax.model.QueryParams;
import ajax.model.UrlRoute;
import ajax.spider.Spider3;
import ajax.spider.rules.Rules;
import ajax.spider.rules.RulesTag;
import ajax.spider.rules.SpiderWeb;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;


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
						return jokeType;
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
	
	public String getOneJokeUrlById() {
		return UrlRoute.ONEJOKE + "?id=" + this.getId(); 
	}
	
	public boolean hasAuthor() {
		return (this.getUsername() != null && this.getUsername().trim() != "");
	}
	
	public static void main(String[] args) {
		
	}
	
	/**
	 * 根据QueryParams 对象查询 item实体集
	 * @param qp
	 * @return
	 */
	public static List<Item> query(QueryParams qp) {
		Session session = HibernateUtil.getSession();
		
		Criteria criteria = session.createCriteria(Item.class);
		
		int page = 1;
		int size = 10;
		if (qp.isSet("page")) {
			page = Tools.parseInt(qp.getVal("page"), 1);
		}
		if (qp.isSet("size")) {
			size = Tools.parseInt(qp.getVal("size"), 10);
		}
			
		criteria.setFirstResult((page - 1) * size);
		criteria.setMaxResults(size);
		
		if (qp.isSet("type")) {
			criteria.add(Restrictions.eq("itype", Tools.parseInt(qp.getVal("type"), JokeType.UNKNOWN.getId())));
		}
		
		return criteria.list();
	}
	
	/**
	 * 根据content获取图片并保存到本地磁盘<br>
	 * return new Content that contains imgs which src is alright. 
	 */
	public String grabImagesFromContent() {
		int rulesTagid = this.getRulesTagId();
		RulesTag rt = RulesTag.getRulesTagById(rulesTagid);
		String folder = rt.getImageFolder();
		
		String newContent;
		try {
			
			newContent = Tools.grabImagesFromString(new URL(this.getUrl()), this.getContent(), folder);
			
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			newContent = this.getContent();
		}
		
		return newContent;
	}
	
	/**
	 * 根据QueryParams 获取对应的URL
	 * @param qp
	 * @return
	 */
	public static String getHrefByQueryParams(UrlRoute urlRoute, QueryParams qp) {
		StringBuilder sb = new StringBuilder();
		sb.append(urlRoute.getUrl());
		sb.append("?");
		
		
		
		
		return sb.toString();
	}
	
	
	
}



