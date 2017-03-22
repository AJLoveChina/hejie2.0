package ajax.spider;

public enum Spiders {
	PENGFU(1, "", ""),
	ZHIHU(2, "", "");
	
	private int id;
	private String className;
	private String info;
	private Spiders(int id, String className, String info) {
		this.id = id;
		this.className = className;
		this.info = info;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
}
