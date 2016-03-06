package ajax.model;

public class JokeRules {
	private String tableName = "joke";
	private String url;
	private String titleSelector;
	private String contentSelector;
	private String stampsSelector;
	private String likesSelector;
	private String dislikeSelector;
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
	
	
	
	
}
