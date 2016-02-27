package ajax.model;

public enum JokeType {
	ONLY_WORD(1, "only words"),
	STATIC_IMAGE(2, "有图片, 不是动态图的笑话"),
	GIF(3, "动态图");
	
	
	private int id;
	private String info;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	JokeType(int id, String info) {
		this.id = id;
		this.info = info;
	}
}
