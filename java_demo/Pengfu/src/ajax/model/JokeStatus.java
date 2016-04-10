package ajax.model;

public enum JokeStatus {
	NORMAL(0, "正常"),
	DELETE(1, "删除"),
	STATIC(3, "已静态化"),
	SPIDER(2, "刚刚获取");
	
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

	JokeStatus(int id, String info) {
		this.id = id;
		this.info = info;
	}

	public static JokeStatus getStatusById(int id) {
		if (id == JokeStatus.NORMAL.getId()) {
			return JokeStatus.NORMAL;
		} else if (id == JokeStatus.DELETE.getId()){
			return JokeStatus.DELETE;
		} else if (id == JokeStatus.SPIDER.getId()) {
			return JokeStatus.SPIDER;
		}
		
		return JokeStatus.NORMAL;
	}
}
