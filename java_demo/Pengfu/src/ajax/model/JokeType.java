package ajax.model;

import java.util.*;

public enum JokeType {
	
	// id, info, realName, iconClassName, isShowToUser, rank
	ONLY_WORD(1, "only words", null, null, false),
	STATIC_IMAGE(2, "有图片, 不是动态图的笑话", null, null, false),
	GIF(3, "动态图", null, null, false),
	ZHIHU(4, "知乎精选", "知乎", null, false),
	
	FILM(31, "电影", "电影", "glyphicon glyphicon-film", true, 100),
	TOUR(32, "旅行", "旅行", "glyphicon glyphicon-plane", true, 100),
	FOOD(33, "美食", "美食", "glyphicon glyphicon-cutlery", true, 100),
	SPORTS(34, "健身, 体育, 运动", "运动", "glyphicon glyphicon-fire", true, 100),
	INTERNET(35, "互联网, 社交网络,网络安全", "互联网", "glyphicon glyphicon-cloud", true, 90),
	FASHION(36, "时尚", "时尚", "glyphicon glyphicon-credit-card", true, 90),
	SYB(37, "创业", "创业", "glyphicon glyphicon-usd", true, 90),
	DESIGN(38, "设计,平面设计", "设计", "glyphicon glyphicon-tower", true, 90),
	SCIENCE(39, "自然科学", "科学", "glyphicon glyphicon-tree-deciduous", true, 80),
	ECONOMICS(40, "经济学, 经济", "经济学", null, false),
	CAREER(41, "职业发展", "职业"),
	HOME(42, "家居", "家居", "glyphicon glyphicon-home", true, 80),
	EDUCATION(43, "教育", "教育", "glyphicon glyphicon-education", true, 80),
	CAR(44, "汽车", "汽车", "glyphicon glyphicon-asterisk", true, 80),
	LAW(45, "法律,税务", "法律", "glyphicon glyphicon-lock", true, 80),
	MEDICINE(46, "医疗", "医疗", "glyphicon glyphicon-leaf", true, 80),
	MUSIC(47, "音乐", "音乐", "glyphicon glyphicon-headphones", true, 70),
	READ(48, "阅读", "阅读", "glyphicon glyphicon-book", true, 70),
	HEALTH(49, "健康", "健康", "glyphicon glyphicon-heart", true, 70),
	LIFESTYLE(50, "生活方式,室友,人生,恋爱,社会现象", "生活", "glyphicon glyphicon-lamp", true, 60),
	HISTORY(51, "历史", "历史", "glyphicon glyphicon-list-alt", true, 60),
	CAPTURE(52, "摄影", "摄影", "glyphicon glyphicon-camera", true, 50),
	LITERATURE(53, "文学", "文学", "glyphicon glyphicon-book", true, 50),
	INVEST(54, "投资", "投资", "glyphicon glyphicon-object-align-top", true, 50),
	PHYSICS(55, "物理学", "", "", false),
	GAME(56, "游戏", "游戏", "glyphicon glyphicon-knight", true, 50),
	BUSINESS(57, "商业, 金融,职场", "商业", "glyphicon glyphicon-jpy", true, 40),
	TECH(58, "科技", "科技", "glyphicon glyphicon-apple", true, 40),
	
	STORY(101, "故事,清朝历史,考古,AV", "故事", "glyphicon glyphicon-bookmark", true, 30),
	
	ALL(9, "所有内容", null, null, false),
	UNKNOWN(99, "未知分类", "未知世界", "glyphicon glyphicon-menu-right", true);
	
	
	private int id;
	private String info;
	private String realName;
	private String iconClassName;
	private boolean isShowToUser;
	private int rank;	// the more of rank means more important of this type 
	
	
	
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
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
		this(id, info, null, "glyphicon glyphicon-star", true, 1);
	}
	JokeType(int id, String info, String realName) {
		
		this(id, info, realName, "glyphicon glyphicon-star", true, 1);
		
	}
	
	JokeType(int id, String info, String realName, String iconClassName) {
		
		this(id, info, realName, iconClassName, true, 1);
		
	}
	
	JokeType(int id, String info, String realName,
			String iconClassName, boolean isShowToUser) {
		this(id, info, realName, iconClassName, isShowToUser, 1);
	}
	
	JokeType(int id, String info, String realName,
			String iconClassName, boolean isShowToUser, int rank) {
		this.id = id;
		this.info = info;
		this.realName = realName;
		this.iconClassName = iconClassName;
		this.isShowToUser = isShowToUser;
		this.rank = rank;
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
		String s = "你好世界";
		
		System.out.println(s.contains("世界2"));
		
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
	
	/**
	 * Cause This returns null when not found the given typeID, You should use getJokeType instead of this method!
	 * @param typeID
	 * @return
	 */
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
	
	/**
	 * 根据stamp猜测一个jokeType并返回, 猜测不到返回null
	 * @param stamp
	 * @return
	 */
	public static JokeType guessType(String stamp) {
		JokeType[] types = JokeType.getAllJokeTypes();
		
		for (JokeType type : types) {
			
			if (type.getInfo().contains(stamp)) {
				return type;
			}
		}
		return null;
	}
	
}
