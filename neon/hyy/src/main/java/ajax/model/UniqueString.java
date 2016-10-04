package ajax.model;

public enum UniqueString {
	TBK_ITEM,
	ITAOBAO_ITEM,
	ITAOBAO_ITEM_MAX_PAGE_KEY,
	TBK_ITEM_MAX_PAGE_KEY, ZHIDEMAI_PAGESTYPE_KEY, ZHIDEMAI_MAX_PAGE_KEY, COMMENT_MAX_PAGE_KEY, 
	COMMENT_PAGE_TYPE_KEY;
	
	/**
	 * 请使用该方法获取这个枚举值的唯一字符串
	 * @return
	 */
	public String getKey() {
		return "aj-new-unique-string-of-" + this.name(); 
	}
	
	/**
	 * 前缀更少的枚举值的唯一字符串
	 * @return
	 */
	public String getKeyV2() {
		return "uuid" + this.name();
	}
}
