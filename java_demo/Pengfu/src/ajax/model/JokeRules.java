package ajax.model;

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
	
	
}
