package ajax.model;

public enum UrlRoute {
	HOME(1, "/"),
	ONEJOKE(2, "/OneItem"),
	type(4, "/type"),
	QQ_REDIRECT(5, "http://www.nigeerhuo.com/sign/qq"),
	GITHUB_REDIRECT(6, "http://www.nigeerhuo.com/sign/github"),
	ROOT(3, "/"), 
	DOT_PIC(4, "http://images.nigeerhuo.com/images/web/pic/dot.jpg");
	
	private int id;
	private String url;
	
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

	UrlRoute(int id, String url) {
		this.id = id;
		this.url = url;
	}
	
	public String toString() {
		return this.url;
	}
	
}
