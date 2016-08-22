package ajax.model.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.ItemStatus;
import ajax.model.JokeType;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

public class TypePage extends Entity<TypePage>{
	public static final String MAX_PAGE_PREFIX = "aj-type-page-maxpage-of-joketype-id-";
	
	
	private int id;
	private String items;
	private String type;
	private int page;
	private int size;
	private String dateEntered;
	
	
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getItems() {
		return items;
	}
	public void setItems(String items) {
		this.items = items;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	
	/**
	 * 根据jokeType 类型生成对应新的一页, 默认 size=20
	 * @param jokeType
	 * @return 
	 */
	public static boolean generateOnePageOf(JokeType jokeType) {
		
		return generateOnePageOf(jokeType, 20);
		
	}
	
	public static boolean generateOnePageOf(JokeType jokeType, int size) {
		int maxPage = getMaxPageOf(jokeType);
		List<Item> items = Item.getItemsOfSpecifiedJokeTypeAndIsNotInTypePage(jokeType, size);
		
		
		if (items.size() < size) {
			System.out.println("JokeTYpe =" + jokeType.getId() + ", 不足20个item");
			return false;
		}
		
		List<Integer> idList = new ArrayList<Integer>();
		
		for(Item item : items) {
			idList.add(item.getId());
		}
		
		// 1. 保存 tp对象
		TypePage tp = new TypePage();
		tp.setItems(Tools.join(idList, ","));
		tp.setPage(maxPage + 1);
		tp.setType(jokeType.getId() + "");
		tp.setSize(items.size());
		
		if (tp.save()) {
			// 2. 修改jokeType最大页码
			TypePage.setMaxPageOf(jokeType, maxPage + 1);
			
			for(Item item : items) {
				// 3.依次为item添加状态
				item.addItemStatus(ItemStatus.IS_SAVE_TO_TYPE_PAGE);
				item.update();
			}
			return true;
		} else {
			return false;
		}
	}
	
	public static int getMaxPageOf(JokeType jokeType) {
		String maxPage = Tools.getConfig(MAX_PAGE_PREFIX + jokeType.getId());
		
		if (maxPage == null || maxPage.equals("")) {
			return 0;
		} else {
			return Integer.parseInt(maxPage);
		}
	}
	
	/**
	 * 针对jokeType类的page保存最大页码,因为需要加上特定前缀
	 * @param jokeType
	 * @param maxPage
	 */
	public static void setMaxPageOf(JokeType jokeType, int maxPage) {
		Tools.setConfig(MAX_PAGE_PREFIX + jokeType.getId(), maxPage + "");
	}
	
	/**
	 * 普通类别页面的最大页面设定
	 * @param key
	 * @param maxPage
	 */
	public static void setMaxPageOf(String key, int maxPage){
		Tools.setConfig(key, maxPage + "");
	}
	
	/**
	 * 根据jokeTYpe的type id 和  page获取List
	 * @param page
	 * @param type
	 * @return
	 */
	public static List<Item> getItemsByPageAndType(int page, int type) {
		
		int maxPage = TypePage.getMaxPageOf(JokeType.getJokeType(type));
		page = page > maxPage ? maxPage : page;
		page = maxPage - page + 1;
		
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria criteria = session.createCriteria(TypePage.class);
		criteria.add(Restrictions.eq("page", page));
		criteria.add(Restrictions.eq("type", type + ""));
		
		List<TypePage> typePageList = criteria.list();
		session.getTransaction().commit();
		
		List<Item> items = new ArrayList<Item>();
		if (typePageList.size() > 0) {
			TypePage typePage = typePageList.get(0);
			List<String> idList = Arrays.asList(typePage.getItems().split(","));
			items = Item.getV2(idList);
		}
		
		return items;
	}
	
	
	public static void main(String[] args) {
		TypePage.maintainSize();
	}
	
	/**
	 * 重新计算每个页面的item数目
	 */
	private static void maintainSize() {
		TypePage typePage = new TypePage();
		while(typePage.hasNext()) {
			TypePage typePage2 = typePage.next();
			typePage2.setSize(typePage2.getItems().split(",").length);
			typePage2.update();
		}
	}
	
}
