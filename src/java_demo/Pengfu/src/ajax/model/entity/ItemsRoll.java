package ajax.model.entity;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import ajax.tools.HibernateUtil;

public class ItemsRoll extends Entity<ItemsRoll>{
	private int id;
	private int itemId;
	private String title;
	private String src;
	private String dateEntered;
	private boolean deleted;
	private int rank;
	
	
	
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public int getItemId() {
		return itemId;
	}
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	
	
	public static List<ItemsRoll> getList(int num) {
		Session session = HibernateUtil.getSession();
		
		Criteria cr = session.createCriteria(ItemsRoll.class);
		
		cr.setFirstResult(0);
		cr.setMaxResults(num);
		cr.add(Restrictions.eq("deleted", false));
		
		cr.addOrder(Order.desc("rank"));
		return cr.list();
	}
	
	/**
	 * 列出所有不是删除状态的 itemsRoll
	 * @return
	 */
	public static List<ItemsRoll> getList() {
		Session session = HibernateUtil.getSession();
		
		Criteria cr = session.createCriteria(ItemsRoll.class);
		
		cr.add(Restrictions.eq("deleted", false));
		cr.addOrder(Order.desc("rank"));
		
		return cr.list();
	}	
	public String getOneItemPageUrl() {
		return Item.getOneItemPageUrl(this.itemId);
	}
	
	
	@Override
	public void delete() {
		this.setDeleted(true);
		this.update();
	}
	
}
