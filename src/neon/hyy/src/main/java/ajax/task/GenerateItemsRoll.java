package ajax.task;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.Item;
import ajax.model.entity.ItemsRoll;
import ajax.tools.HibernateUtil;

public class GenerateItemsRoll {
	public static void main(String[] args) {
		Session session = HibernateUtil.getSession();
		
		Criteria cr = session.createCriteria(Item.class);
		
		cr.setFirstResult(0);
		cr.setMaxResults(10);
		cr.addOrder(Order.desc("likes"));
		cr.add(Restrictions.isNotNull("previewImage"));
		
		List<Item> items = cr.list();
		
		for (Item item : items) {
			ItemsRoll ir = new ItemsRoll();
			ir.setItemId(item.getId());
			ir.setTitle(item.getTitle());
			ir.setSrc(item.getPreviewImage());
			ir.save();
		}
		
	}
}
