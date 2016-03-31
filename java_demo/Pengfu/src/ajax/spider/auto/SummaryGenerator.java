package ajax.spider.auto;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.Item;
import ajax.spider.rules.RulesTag;
import ajax.tools.HibernateUtil;

public class SummaryGenerator {
	
	private static void generateSummary(List<Item> items) {
		for (Item item : items) {
			item.generateSummary();
		}
	}
	
	public static void main(String[] args) {
		int page = 1, size = 100;
		List<Item> items = new ArrayList<Item>();
		
		Session session = HibernateUtil.getSession();
		
		
		do {
			Criteria cr = session.createCriteria(Item.class);
			
			cr.setFirstResult((page - 1) * size);
			cr.setMaxResults(size);
			cr.add(Restrictions.eq("rulesTagId", RulesTag.ZHIHU_ANSWER.getId()));
			cr.add(Restrictions.isNull("summary"));
			
			items = cr.list();
			
			generateSummary(items);
			
			page ++;
			System.out.println(page);
		}while(items.size() > 0);
		
	}
}
