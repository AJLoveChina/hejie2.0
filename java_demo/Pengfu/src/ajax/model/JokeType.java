package ajax.model;

import java.util.*;

public enum JokeType {
	
	// id, info, realName, iconClassName, isShowToUser
	ONLY_WORD(1, "only words", null, null, false),
	STATIC_IMAGE(2, "有图片, 不是动态图的笑话", null, null, false),
	GIF(3, "动态图", null, null, false),
	ZHIHU(4, "知乎精选", null, null, false),
	
	FILM(31, "电影"),
	TOUR(32, "旅行"),
	FOOD(33, "美食"),
	SPORTS(34, "健身, 体育, 运动", "运动"),
	INTERNET(35, "互联网"),
	FASHION(36, "时尚"),
	SYB(37, "创业"),
	DESIGN(38, "设计"),
	SCIENCE(39, "自然科学", "科学"),
	ECONOMICS(40, "经济学", null, null, false),
	CAREER(41, "职业发展", "职业"),
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
	PHYSICS(55, "物理学", null, null, false),
	GAME(56, "游戏"),
	BUSINESS(57, "商业, 金融", "商业"),
	TECH(58, "科技"),
	
	ALL(9, "所有内容", null, null, false),
	UNKNOWN(99, "未知分类", "未知世界", null, true);
	
	
	private int id;
	private String info;
	private String realName;
	private String iconClassName;
	private boolean isShowToUser;
	
	public boolean isShowToUser() {
		return isShowToUser;
	}
	public void setShowToUser(boolean isShowToUser) {
		this.isShowToUser = isShowToUser;
	}
	public String getRealName() {
		return realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}
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
	
	

	JokeType(int id, String info) {
		this(id, info, null, null, true);
	}
	JokeType(int id, String info, String realName) {
		
		this(id, info, realName, null, true);
		
	}
	
	JokeType(int id, String info, String realName, String iconClassName) {
		
		this(id, info, realName, iconClassName, true);
		
	}
	
	JokeType(int id, String info, String realName,
			String iconClassName, boolean isShowToUser) {
		this.id = id;
		this.info = info == null ? "" : info;
		this.realName = realName == null ? info : realName;
		this.iconClassName = iconClassName == null ? "glyphicon glyphicon-star" : iconClassName;
		this.isShowToUser = isShowToUser;
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
	public static List<JokeType> getLegalJokeTypes() {
		List<JokeType> types = new ArrayList<JokeType>();
		for(JokeType j : JokeType.values()) {
			if (j.isShowToUser) {
				types.add(j);
			}
		}
		return types;
	}
	
	public String getTypeHref() {
		return Joke.getHrefByJokeType(this);
	}
	
	
	public static void main(String[] args) {
//		JokeType jokeType = JokeType.getJokeType(2);
//		
//		System.out.println(jokeType.getId());
		
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
	
	/**
	 * 
	 * 返回realname, 如果为null 则返回info
	 * @return
	 */
	public String getNickName() {
		if (this.realName != null) {
			return this.realName;
		}
		return this.info;
	}
	
	@Deprecated
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
