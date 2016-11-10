package ajax.model.taobao.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.google.gson.Gson;

import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

public class GoodsType {
	public static enum All{
		DIANQI(10),
		JIAJU(30),
		HULI(50),
		YIFU(60),
		MUYIN(80),
		FOOD(90),
		BOOKS(100),
		STARS(110),
		JKJ(120),
		ROLL(130),
		ALL(140);
		
		public final int id;
		private All(int id) {
			this.id = id;
		}
		
	}
	
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
	private String keys = "";
	private List<String> keysList;
	
	
	public List<String> getKeysList() {
		return keysList;
	}
	public void setKeysList(List<String> keysList) {
		this.keysList = keysList;
	}
	public String getKeys() {
		return keys;
	}
	public void setKeys(String keys) {
		this.keys = keys;
	}
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
		
		for (GoodsType goodsType : goodsTypesList) {
			goodsType.keysList = Arrays.asList(goodsType.keys.split(","));
		}
		
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
	/**
	 * 只返回在首页滚动页面加载的goodsType
	 * @return
	 */
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
	
	/**
	 * 返回所有的goodsType
	 * @return
	 */
	public static List<GoodsType> getAllGoodsType() {
		return goodsTypesList;
	}
	
	private static List<TbkItem> tbkItemsRollForPC;
	private static List<TbkItem> tbkITemsRollForWap;
	/**
	 * 返回tbkitem 首页滚动图 (容量20)
	 * @param platform
	 * @return
	 */
	public static List<TbkItem> getTBKItemsOfRoll(Platform platform) {
		
		switch(platform) {
		case WAP:
			if (tbkITemsRollForWap == null) {
				synchronized (GoodsType.class) {
					Session session = HibernateUtil.getCurrentSession();
					session.beginTransaction();
					Criteria criteria = session.createCriteria(TbkItemWap.class);
					criteria.add(Restrictions.eq("goodsTypeId", 130));
					criteria.setFirstResult(0);
					criteria.setMaxResults(20);
					criteria.addOrder(Order.desc("id"));
					tbkITemsRollForWap = criteria.list();
					session.getTransaction().commit();
				}
			}
			return tbkITemsRollForWap;
		case PC:
		default:
			if (tbkItemsRollForPC == null) {
				synchronized(GoodsType.class) {
					Session session = HibernateUtil.getCurrentSession();
					session.beginTransaction();
					Criteria criteria = session.createCriteria(TbkItemPC.class);
					criteria.add(Restrictions.eq("goodsTypeId", 130));
					criteria.setFirstResult(0);
					criteria.setMaxResults(20);
					criteria.addOrder(Order.desc("id"));
					tbkItemsRollForPC = criteria.list();
					session.getTransaction().commit();
				}
			}
			return tbkItemsRollForPC;
		}
		
	}
	
	private static class Hit {
		int id;
		int num = 0;
		public Hit(int id, int num) {
			super();
			this.id = id;
			this.num = num;
		}
		
	}
	/**
	 * 根据关键词获取商品的goodsTypeId, 如果木有匹配返回  "全部类型 " 的id
	 * @param keyword
	 * @return
	 */
	public static int getGOodsTypeIdByKeyWord(String keyword) {
		List<GoodsType> list = GoodsType.getAllGoodsType();
		
		List<Hit> hits = new ArrayList<>();
		for (GoodsType goodsType : list) {
			int num = 0;
			for (String s : goodsType.keysList) {
				if (keyword.toLowerCase().contains(s.toLowerCase())) {
					num ++;
				}
			}
			if (num > 0) {
				hits.add(new Hit(goodsType.id, num));
			}
		}
		
		if (hits.size() > 0) {
			// 有匹配
			Collections.sort(hits, new Comparator<Hit>() {

				@Override
				public int compare(Hit o1, Hit o2) {
					return o2.num - o1.num;
				}
				
			});
			return hits.get(0).id;
		} else {
			return 140;
		}
	}
}
