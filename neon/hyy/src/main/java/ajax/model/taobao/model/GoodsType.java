package ajax.model.taobao.model;

import java.util.HashMap;
import java.util.Map;

public class GoodsType {
	private int id;
	/**
	 * 对应选品库的类目
	 */
	private String key;
	private String name;
	private int rank = 0;
	private boolean show = true;
	
	
	public boolean isShow() {
		return show;
	}
	public void setShow(boolean show) {
		this.show = show;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	private static Map<String, GoodsType> gtMap = new HashMap<>();
	public static final GoodsType GoodsType_ALL = new GoodsType(140, "all", "全部", 1, false);
	
	public Map<String, GoodsType> getGtMap() {
		return gtMap;
	}
	public void setGtMap(Map<String, GoodsType> gtMap) {
		this.gtMap = gtMap;
	}

	{
		
	}
	
	private GoodsType(){}
	
	private GoodsType(int id, String key, String name, int rank, boolean show) {
		super();
		this.id = id;
		this.key = key;
		this.name = name;
		this.rank = rank;
		this.show = show;
	}
	
	/**
	 * 根据选品库类目获取对应的GoodsType
	 * @param key
	 * @return
	 */
	public static GoodsType getByKey(String key) {
		GoodsType goodsType = gtMap.get(key);
		
		return goodsType == null ? GoodsType_ALL : goodsType;
	}
}
