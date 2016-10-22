package ajax.model.taobao.model;

import ajax.model.entity.Config;

public class XuanPinKu {
	private long type;
	private long favorites_id;
	private String favorites_title;
	public long getType() {
		return type;
	}
	public void setType(long type) {
		this.type = type;
	}
	public long getFavorites_id() {
		return favorites_id;
	}
	public void setFavorites_id(long favorites_id) {
		this.favorites_id = favorites_id;
	}
	public String getFavorites_title() {
		return favorites_title;
	}
	public void setFavorites_title(String favorites_title) {
		this.favorites_title = favorites_title;
	}
	
	
	/**
	 * 选品库已经抓取过了
	 * @return
	 */
	public boolean isGrab() {
		Config config = Config.getBy(Config.class, "key", this.getKey());
		return config != null;
	}
	
	/**
	 * 选品库设置成已抓取
	 */
	public void setIsGrab() {
		Config config = new Config();
		config.setKey(this.getKey());
		config.setValue("1");
		config.save();
	}
	
	private String getKey() {
		return "xuanpinku-type-" + this.type + "-favorites_id-" + this.favorites_id;
	}
	
	
}
