package ajax.model;

public class PageChoice {
	private int curPage;
	private String urlTemplate;
	public int getCurPage() {
		return curPage;
	}
	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
	public String getUrlTemplate() {
		return urlTemplate;
	}
	public void setUrlTemplate(String urlTemplate) {
		this.urlTemplate = urlTemplate;
	}
	public PageChoice(int curPage, String urlTemplate) {
		super();
		this.curPage = curPage;
		this.urlTemplate = urlTemplate;
	}
}
