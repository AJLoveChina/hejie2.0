package ajax.model.taobao;

public enum TbkItemSort {
	DEFAULT(null),
	/**
	 * 降序
	 */
	DES("_des"),
	/**
	 * 销量
	 */
	TOTAL_SALES("total_sales"),
	/**
	 * 淘客佣金比率
	 */
	TK_RATE("tk_rate"),
	/**
	 * 累计推广量
	 */
	TK_TOTAL_SALES("tk_total_sales"),
	/**
	 * 总支出佣金
	 */
	TK_TOTAL_COMMI("tk_total_commi"),
	ASC("_asc");
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private TbkItemSort(String name) {
		this.name = name;
	}
	
}
