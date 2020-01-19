package ajax.model;

public enum PageType {
	PREV(1, "previous page"),
	CUR(2, "Current Page"),
	NEXT(3, "Next Page");
	
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
	
	private PageType(int id, String info) {
		this.setId(id);
		this.setInfo(info);
	}
	
}
