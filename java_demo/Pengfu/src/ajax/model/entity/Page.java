package ajax.model.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

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
	
	
	
}
