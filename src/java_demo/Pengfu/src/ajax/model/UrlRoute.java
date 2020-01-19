package ajax.model;

public enum UrlRoute {
	HOME(1, "/"),
	ONEJOKE(2, "/OneItem"),
	ROOT(3, "/"), 
	type(4, "/type"),
	QQ_REDIRECT(5, "http://www.nigeerhuo.com/sign/qq"),
	GITHUB_REDIRECT(6, "http://www.nigeerhuo.com/sign/github"),
	
	DOT_PIC(7, "http://images.nigeerhuo.com/images/web/pic/dot.jpg"),
	PIC_EXAM(8, "http://images.nigeerhuo.com/images/web/pic/exam2.jpg"),
	EXAM(9, "http://www.nigeerhuo.com/exam"),
	OSS_STATIC(10, "static/"),
	OSS_PUBLIC(11, "http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/");
	
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
