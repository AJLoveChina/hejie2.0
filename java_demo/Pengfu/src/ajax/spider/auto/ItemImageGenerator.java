package ajax.spider.auto;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.Item;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

/**
 * 生成一条Item的缩略图, 从content图片中选择一张
 * @author ajax
 *
 */
public class ItemImageGenerator {
	
	public static void main(String[] args) {
		int page = 1;
		int size = 100;
		
		List<Item> items = new ArrayList<Item>();
		
		
		do {
			
			Session session = HibernateUtil.getSession();
			Criteria cr = session.createCriteria(Item.class);
			cr.setFirstResult((page - 1) * size);
			cr.setMaxResults(size);
			
			items = cr.list();
			
			
			for (Item i : items) {
				i.generateItemImage();
			}
			
			page ++;
			HibernateUtil.closeSession(session);
			System.out.println(page);
			
		}while(items.size() > 0);

	}
}
