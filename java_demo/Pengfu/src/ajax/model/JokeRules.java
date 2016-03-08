package ajax.model;

import java.net.MalformedURLException;
import java.net.URL;

import org.jsoup.select.Elements;

public class JokeRules {
	protected String tableName = "joke";
	protected String url;
	protected String titleSelector;
	protected String contentSelector;
	protected String stampsSelector;
	protected String likesSelector;
	protected String dislikeSelector;
	protected String usernameSelector;
	protected String userPersonalPageUrlSelector;
	
	
	public String dealTitleElements(Elements eles) {
		return eles.html();
	}
	public String dealContentElements(Elements eles) {
		return eles.html();
	}
	public String dealStampsElements(Elements eles) {
		return eles.html();
	}
	public int dealLikesElements(Elements eles) {
		return Integer.parseInt(eles.html());
	}
	public int dealDislikeElements(Elements eles) {
		return Integer.parseInt(eles.html());
	}
	public String dealUsernameElements(Elements eles) {
		return eles.html();
	}
	public String dealUserPersonalPageUrlElements(Elements eles) {
		return eles.html();
	}
	
	
	
	
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getTitleSelector() {
		return titleSelector;
	}
	public void setTitleSelector(String titleSelector) {
		this.titleSelector = titleSelector;
	}
	public String getContentSelector() {
		return contentSelector;
	}
	public void setContentSelector(String contentSelector) {
		this.contentSelector = contentSelector;
	}
	public String getStampsSelector() {
		return stampsSelector;
	}
	public void setStampsSelector(String stampsSelector) {
		this.stampsSelector = stampsSelector;
	}
	public String getLikesSelector() {
		return likesSelector;
	}
	public void setLikesSelector(String likesSelector) {
		this.likesSelector = likesSelector;
	}
	public String getDislikeSelector() {
		return dislikeSelector;
	}
	public void setDislikeSelector(String dislikeSelector) {
		this.dislikeSelector = dislikeSelector;
	}
	public String getUsernameSelector() {
		return usernameSelector;
	}
	public void setUsernameSelector(String usernameSelector) {
		this.usernameSelector = usernameSelector;
	}
	public String getUserPersonalPageUrlSelector() {
		return userPersonalPageUrlSelector;
	}
	public void setUserPersonalPageUrlSelector(String userPersonalPageUrlSelector) {
		this.userPersonalPageUrlSelector = userPersonalPageUrlSelector;
	}
	
	public String getAbsoluteUrlFromUrl(String url) {
		if (url.startsWith("http")) {
			return url;
		}
		
		if (url.startsWith("/")) {
			String grabUrl = this.getUrl();
			URL u;
			try {
				
				u = new URL(grabUrl);
				String prefix = grabUrl.replaceFirst(u.getFile(), "");
				
				url = prefix + url;
				return url;
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				// e.printStackTrace();
				System.out.println(e.getMessage());
			}
		}
		
		return "";
	}
	
	public static void main(String[] args) {
		JokeRules j = new JokeRules();
		j.setUrl("");
		j.getAbsoluteUrlFromUrl("https://www.zhihu.com/question/35860362/answer/89207200");
	}
	
	
}
