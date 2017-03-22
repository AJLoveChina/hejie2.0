package ajax.model.entity;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.tools.HibernateUtil;

public class Collect extends Entity<Collect>{
	private int id;
	private int itemid;
	private long userid;
	private String dateEntered;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getItemid() {
		return itemid;
	}
	public void setItemid(int itemid) {
		this.itemid = itemid;
	}
	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	
	
	public boolean isExist() {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Collect.class);
		
		cr.add(Restrictions.eq("itemid", this.itemid));
		cr.add(Restrictions.eq("userid", this.userid));
		
		List<Collect> collects = cr.list();
		
		
		HibernateUtil.closeSession(session);
		return collects.size() > 0;
	}
}
