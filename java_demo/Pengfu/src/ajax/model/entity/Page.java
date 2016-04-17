package ajax.model.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import ajax.model.QueryParams;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

public class Page extends Entity<Page>{
	private int id;
	private int page;
	private String items;
	
	private List<Integer> $items = new ArrayList<Integer>();
	/**
	 * 一页item的数目
	 */
	public static final int $num = 20;
	
	
	public List<Integer> get$items() {
		if ($items.size() <= 0) {
			String[] arr = this.items.split(",");
			
			for (String s : arr) {
				this.$items.add(Tools.parseInt(s));
			}
		}
		return this.$items;
	}
	public void set$items(List<Integer> $items) {
		this.$items = $items;
		this.items = Tools.join($items, ",");
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public String getItems() {
		return items;
	}
	public void setItems(String items) {
		this.items = items;
	}
	
	public static int getNowMaxPage() {
		Session session = HibernateUtil.getSession();
		
		Criteria cr = session.createCriteria(Page.class);
		cr.addOrder(Order.desc("id"));
		cr.setMaxResults(1);
		
		List<Page> pages = cr.list();
		
		HibernateUtil.closeSession(session);
		if (pages.size() <= 0) {
			return 0;
		} else {
			Page page = pages.get(0);
			return page.getPage();
		}
		
	}
	
	public void addOneItem(Item item) {
		if (this.$items.size() > Page.$num) {
			System.out.println("Error : More than " + Page.$num);
			return;
		}
		
		this.$items.add(item.getId());
		this.setItems(Tools.join(this.get$items(), ","));
	}
	
	/**
	 * 获取第page页<br>
	 * 注意 page = 1, 指的是获取page表的页码最大的一页 <br>
	 * 如果给定的页码不存在, 该程序会返回固定的20个item
	 * @param page
	 * @return
	 */
	public static List<Item> getPage(int page) {
		int maxPage = Page.getNowMaxPage();
		int tablePage = maxPage - page + 1;
		if (tablePage <= 1) {
			tablePage = 1;
		}
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Page.class);
		
		cr.add(Restrictions.eq("page", tablePage));
		List<Page> list = cr.list();
		
		HibernateUtil.closeSession(session);
		
		
		List<Item> items = new ArrayList<Item>();
		if (list.size() > 0) {
			Page p = list.get(0);
			List<Integer> itemsId = p.get$items();
			items = Item.get(itemsId);
		}
		
		return items;
	}
	public static Page getByPage(int page2) {
		Session sess = HibernateUtil.getSession();
		Criteria cr = sess.createCriteria(Page.class);
		
		cr.add(Restrictions.eq("page", page2));
		List<Page> pages = cr.list();
		HibernateUtil.closeSession(sess);
		
		
		if (pages.size() > 0) {
			return pages.get(0);
		} else {
			return null;
		}
		
	}
	
}
