package ajax.spider.auto;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
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
				
				String newContent = Tools.grabImagesFromString(new URL(row.getUrl()), row.getContent(), folder);
				row.setContent(newContent);
				row.setHasGetImage(true);
				row.update();
				System.out.println("图片抓取成功 : " + row.getTitle());
				
				
			} catch (MalformedURLException e) {
				
				System.out.println(e.getMessage());
				
			}
		}
	}
	
	public static void main(String[] args) {
		List<Item> items = new ArrayList<Item>();
		int page = 1;
		int pageNum = 10;
		
		Item item = new Item();
		
		do {
			Criteria cr = HibernateUtil.getSession().createCriteria(Item.class);
			cr.add(Restrictions.eq("hasGetImage", false));
			cr.setFirstResult((page - 1) * pageNum);
			cr.setMaxResults(pageNum);
			
			items = cr.list();
			
			grab(items);
			Tools.sleep(1);
			
		}while(items.size() > 0);
		
	}
}
