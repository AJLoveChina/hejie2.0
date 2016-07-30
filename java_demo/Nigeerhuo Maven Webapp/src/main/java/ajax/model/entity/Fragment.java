package ajax.model.entity;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.jayway.jsonpath.Criteria;

import ajax.tools.HibernateUtil;

/**
 * 处理一些 html碎片
 * @author ajax
 *
 */
public class Fragment extends Entity<Fragment>{
	public enum Type {
		HOME_PAGE_THREE_ADS(1, "");
		
		
		int typeId;
		String info;
		public int getTypeId() {
			return typeId;
		}
		public void setTypeId(int typeId) {
			this.typeId = typeId;
		}
		public String getInfo() {
			return info;
		}
		public void setInfo(String info) {
			this.info = info;
		}
		private Type(int typeId, String info) {
			this.typeId = typeId;
			this.info = info;
		}
	}
	
	private int id;
	private int type;
	private String val;
	private String dateEntered;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getVal() {
		return val;
	}
	public void setVal(String val) {
		this.val = val;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	
	public static List<Fragment> getFragments(Type type) {
		List<Fragment> fragments;
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		org.hibernate.Criteria cr = session.createCriteria(Fragment.class);
		
		cr.add(Restrictions.eq("type", type.getTypeId()));
		cr.addOrder(Order.desc("dateEntered"));
		
		fragments = cr.list();
		
		session.getTransaction().commit();
		//HibernateUtil.closeSession(session);
		
		return fragments;
	}
	
}
