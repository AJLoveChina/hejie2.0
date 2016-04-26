package ajax.spider.auto;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.*;
import ajax.spider.rules.RulesTag;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

/**
 * 抓取内容的图片
 * @author ajax
 *
 */
public class GrabImages {
	private static void grab(List<Item> items) {
		for (Item row : items) {
			
			try {

//				String newContent = row.grabImagesFromContent();
//				row.setContent(newContent);
//				row.setHasGetImage(true);
//				row.update();
				
				row.grabImagesFromContentAndUpdate();
				
				Tools.sleep(0.1);
			} catch (Exception e) {
				
				System.out.println(e.getMessage());
				
			}
		}
	}
	
	private static void do1() {
		List<Item> items = new ArrayList<Item>();
		int page = 1;
		int pageNum = 100;
		
		Item item = new Item();
		
		
		do {
			Session session = HibernateUtil.getSession();
			Criteria cr = session.createCriteria(Item.class);
			cr.add(Restrictions.eq("hasGetImage", true));
			cr.setFirstResult((page - 1) * pageNum);
			cr.setMaxResults(pageNum);
			
			items = cr.list();
			
			grab(items);
			
			page ++;
			HibernateUtil.closeSession(session);
		}while(items.size() > 0);
	}
	
	private static void do2() {
		List<Item> items = new ArrayList<Item>();
		Session session = HibernateUtil.getSession();
		int page = 1;
		int size = 20;
		do {
			Criteria cr = session.createCriteria(Item.class);
			cr.add(Restrictions.eq("hasGetImage", false));
			cr.add(Restrictions.eq("rulesTagId", RulesTag.ZHIHU_ANSWER.getId()));
			cr.setFirstResult((page - 1) * size );
			cr.setMaxResults(size);
			
			
			items = cr.list();
			
			grab(items);
			page++;
		}while(items.size() > 0);
		
	}
	
	
	private static void do3() {
		int maxPage = Page.getNowMaxPage();
		int page  = 1;
		do {
			List<Item> items = Page.getPage(page);
			
			for(Item item : items) {
				item.grabImagesFromContentAndUpdate();
				System.out.println("Images OK : " + item.getTitle());
			}
		}while(page ++  < maxPage);
		
	}
	
	private static void do4() {
		Item item = new Item();
		item.load(39956);
		
		
		item.setContent(item.grabImagesFromContentAndSaveToOssThenReturnContent(null));
		item.setContent(item.generateLazyImageContentAndReturnByForce());
		item.update();
		
		
	}
	
	
	public static void main(String[] args) {
		do4();
	}
}
