package ajax.model;

public enum UrlRoute {
	HOME(1, "/Pengfu/"),
	ONEJOKE(2, "/Pengfu/OneItem");
	
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
