package ajax.model;

import java.util.*;

public enum JokeType {
	ONLY_WORD(1, "only words"),
	STATIC_IMAGE(2, "有图片, 不是动态图的笑话"),
	GIF(3, "动态图"),
	ZHIHU(4, "知乎精选"),
	
	FILM(31, "电影"),
	TOUR(32, "旅行"),
	FOOD(33, "美食"),
	SPORTS(34, "健身, 体育, 运动"),
	INTERNET(35, "互联网"),
	FASHION(36, "时尚"),
	SYB(37, "创业"),
	DESIGN(38, "设计"),
	SCIENCE(39, "自然科学"),
	ECONOMICS(40, "经济学"),
	CAREER(41, "职业发展"),
	HOME(42, "家居"),
	EDUCATION(43, "教育"),
	CAR(44, "汽车"),
	LAW(45, "法律"),
	MEDICINE(46, "医疗"),
	MUSIC(47, "音乐"),
	READ(48, "阅读"),
	HEALTH(49, "健康"),
	LIFESTYLE(50, "生活方式"),
	HISTORY(51, "历史"),
	CAPTURE(52, "摄影"),
	LITERATURE(53, "文学"),
	INVEST(54, "投资"),
	PHYSICS(55, "物理学"),
	GAME(56, "游戏"),
	BUSINESS(57, "商业, 金融"),
	TECH(58, "科技"),
	
	ALL(9, "所有内容"),
	UNKNOWN(99, "未知分类");
	
	
	private int id;
	private String info;
	private String iconClassName;
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
	public String getIconClassName() {
		return iconClassName;
	}
	public void setIconClassName(String iconClassName) {
		this.iconClassName = iconClassName;
	}
	
	
	public static JokeType getJokeType(int id) {
		
		JokeType[] jokeTypes = JokeType.values();
		
		for (JokeType jt : jokeTypes) {
			if (jt.id == id) {
				return jt;
			}
		}
		return JokeType.UNKNOWN;
		
	}
	JokeType(int id, String info) {
		this.id = id;
		this.info = info;
		this.iconClassName = "glyphicon glyphicon-star";	// default icon classname
	}
	JokeType(int id, String info, String iconClassName) {
		this.id = id;
		this.info = info;
		this.iconClassName = iconClassName;
	}
	
	public static JokeType getJokeTypeByInfo(String info) {
		JokeType[] jokeTypes = JokeType.values();
		
		for (JokeType jt : jokeTypes) {
			if (jt.info.contains(info)) {
				return jt;
			}
		}
		return JokeType.UNKNOWN;
	}
	
	public static JokeType[] getAllJokeTypes() {
		return JokeType.values();
	}
	
	public String getTypeHref() {
		return Joke.getHrefByJokeType(this);
	}
	
	
	public static void main(String[] args) {
//		JokeType jokeType = JokeType.getJokeType(2);
//		
//		System.out.println(jokeType.getId());
		
	}
	public static JokeType getLegalJokeTypeByTypeId(Integer typeID) {
		
		JokeType result = null;
		for (JokeType jokeType : JokeType.values()) {
			if (typeID == jokeType.getId()) {
				result = jokeType;
			}
		}
		if (result == null) {
			result = JokeType.ALL;
		}
		
		return result;
	}
}
