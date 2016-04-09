package ajax.spider.auto;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.Item;
import ajax.model.entity.Page;
import ajax.spider.rules.RulesTag;
import ajax.tools.HibernateUtil;

public class SummaryGenerator {
	
	private static void generateSummary(List<Item> items) {
		for (Item item : items) {
			item.generateSummary();
		}
	}
	
	
	private static void do1() {
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
	
	
	private static void do2() {
		Item item = new Item();
		item.load(925);
		
		item.generateSummary();
		
	}
	
	private static void do3() {
		int maxPage = Page.getNowMaxPage();
		
		do {
			List<Item> items = Page.getPage(maxPage);
			
			for(Item item : items) {
				item.generateSummary();
				System.out.println("Summary OK : " + item.getTitle());
			}
		}while(maxPage-- > 0);
	}
	
	public static void main(String[] args) {
		
		do3();
	}
}
