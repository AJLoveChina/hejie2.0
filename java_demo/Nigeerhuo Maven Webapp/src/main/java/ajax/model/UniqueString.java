package ajax.model;

public enum UniqueString {
	TBK_ITEM,
	TBK_ITEM_MAX_PAGE_KEY;
	
	/**
	 * 请使用该方法获取这个枚举值的唯一字符串
	 * @return
	 */
	public String getKey() {
		return "aj-new-unique-string-of-" + this.name(); 
	}
}
