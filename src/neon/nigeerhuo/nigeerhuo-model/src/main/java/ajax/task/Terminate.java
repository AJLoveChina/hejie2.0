package ajax.task;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.JokeStatus;
import ajax.model.entity.Item;
import ajax.tools.HibernateUtil;

public class Terminate {
	
	/**
	 * Yes, I am terminate.For item, you just need me only!
	 * @param args
	 */
	public static void main(String[] args) {
		List<Item> items = new ArrayList<Item>();
		
		do {
			Session session = HibernateUtil.getSession();
			Criteria cr = session.createCriteria(Item.class);
			
			cr.add(Restrictions.ne("statusForTest", JokeStatus.BETTER_THAN_BETTER.getId()));
			cr.setMaxResults(30);
			
			items = cr.list();
			
			for (Item item : items) {
				item.betterThanBetter();
			}
			
			HibernateUtil.closeSession(session);
		}while(items.size() > 0);
		
	}
}
