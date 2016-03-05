package ajax.model;

public enum JokeType {
	ONLY_WORD(1, "only words"),
	STATIC_IMAGE(2, "有图片, 不是动态图的笑话"),
	GIF(3, "动态图"),
	ALL(9, "所有内容");
	
	
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
	
	public static JokeType getJokeType(int id) {
		JokeType jokeType = JokeType.ONLY_WORD;
		if (id == JokeType.ONLY_WORD.getId()) {
			jokeType = JokeType.ONLY_WORD;
		} else if (id == JokeType.STATIC_IMAGE.getId()) {
			jokeType = JokeType.STATIC_IMAGE;
		} else if (id == JokeType.GIF.getId()) {
			jokeType = JokeType.GIF;
		}
		return jokeType;
	}
	JokeType(int id, String info) {
		this.id = id;
		this.info = info;
	}
	public static void main(String[] args) {
		JokeType jokeType = JokeType.getJokeType(2);
		
		System.out.println(jokeType.getId());
	}
}
