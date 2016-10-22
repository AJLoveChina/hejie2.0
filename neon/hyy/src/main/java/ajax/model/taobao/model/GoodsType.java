package ajax.model.taobao.model;

import java.util.HashMap;
import java.util.Map;

public class GoodsType {
	private int id;
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
	
	
	private Map<String, GoodsType> gtMap = new HashMap<>();
	
	public Map<String, GoodsType> getGtMap() {
		return gtMap;
	}
	public void setGtMap(Map<String, GoodsType> gtMap) {
		this.gtMap = gtMap;
	}

	{
		
	}
	
	private GoodsType(){
		
	}
}
