package ajax.model.taobao.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import ajax.tools.Tools;

public class GoodsType {
	private int id;
	/**
	 * 对应选品库的类目
	 */
	private String key;
	private String name;
	private int rank = 0;
	private boolean show = true;
	private String shortName =  "";
	private String icon = "";
	
	
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
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
	private static List<GoodsType> goodsTypesList = new ArrayList<>();
	public static final GoodsType GoodsType_ALL = new GoodsType(140, "all", "全部", 1, false);
	
	public Map<String, GoodsType> getGtMap() {
		return gtMap;
	}
	public void setGtMap(Map<String, GoodsType> gtMap) {
		GoodsType.gtMap = gtMap;
	}

	private class A {
		List<GoodsType> GoodsType;
	}
	
	static {
		String GoodsTypeJsonData = Tools.readInputStream(GoodsType.class.getResourceAsStream("GoodsType.json"));
		A a = new Gson().fromJson(GoodsTypeJsonData, A.class);
		goodsTypesList = a.GoodsType;
		Map<String,GoodsType> gtMap = new HashMap<>();
		for (GoodsType goodsType : goodsTypesList) {
			gtMap.put(goodsType.getKey(), goodsType);
		}
		GoodsType.gtMap = gtMap;
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
	
	private static List<GoodsType> goodsTypeListShowToUser = null;
	public static List<GoodsType> getShowGoodsType() {
		if (goodsTypeListShowToUser == null) {
			List<GoodsType> list = new ArrayList<>();
			for (GoodsType goodsType : goodsTypesList) {
				if (goodsType.isShow()) {
					list.add(goodsType);
				}
			}
			Collections.sort(list, new Comparator<GoodsType>() {

				@Override
				public int compare(GoodsType o1, GoodsType o2) {
					return o2.getRank() - o1.getRank();
				}
			});
			GoodsType.goodsTypeListShowToUser = list;
		}
		return goodsTypeListShowToUser;
	}
}
