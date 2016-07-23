package ajax.model.taobao;

public enum Platform {
	PC(1, "PC"),
	WAP(2, "无线");
	
	private long id;
	private String info;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	private Platform(int id, String info) {
		this.id = id;
		this.info = info;
	}
	
}
