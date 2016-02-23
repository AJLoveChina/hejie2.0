package ajax.model;

public enum UrlRoute {
	HOME(1, "/Pengfu/Index"),
	ONEJOKE(2, "/Pengfu/OneJoke");
	
	private int id;
	private String url;
	
	UrlRoute(int id, String url) {
		this.id = id;
		this.url = url;
	}
	
	public String toString() {
		return this.url;
	}
	
}
