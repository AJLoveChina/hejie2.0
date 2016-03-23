package ajax.spider.rules;

public interface Rules {
	
	public RulesTag getRulesTag();
	public String getTitleSelector();
	public String getSummarySelector();
	public String getContentSelector();
	public String getStampsSelector();
	public String getLikesSelector();
	public String getDislikesSelector();
	public String getUsernameSelector();
	public String getUserPersonalPageUrlSelector();
	public String getBackgroundInformationSelector();
	
	
}
