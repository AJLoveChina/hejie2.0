package ajax.spider;

@Deprecated
public class SpiderAction {
	protected String url;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public SpiderAction(String url) {
		super();
		this.url = url;
	}
	
	
	public void start() {
		
		System.out.println("I am start..");
	}
	
}
