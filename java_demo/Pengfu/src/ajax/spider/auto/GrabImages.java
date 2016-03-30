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
				String folder = RulesTag.getRulesTagById(row.getRulesTagId()).getImageFolder();
				if (folder == null || folder == "") {
					folder = "images";
				}
				
				String newContent = row.grabImagesFromContent();
				row.setContent(newContent);
				row.setHasGetImage(true);
				row.update();
				
				
				Tools.sleep(0.1);
			} catch (Exception e) {
				
				System.out.println(e.getMessage());
				
			}
		}
	}
	
	public static void main(String[] args) {
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
}
