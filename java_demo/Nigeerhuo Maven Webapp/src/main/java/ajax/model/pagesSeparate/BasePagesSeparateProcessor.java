package ajax.model.pagesSeparate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.ItemStatus;
import ajax.model.JokeType;
import ajax.model.entity.Entity;
import ajax.model.entity.Item;
import ajax.model.entity.TypePage;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;


public class BasePagesSeparateProcessor<T extends Entity<T>> {
	
	public boolean generateNewPage(PagesSeparate pagesSeparate) {
		int maxPage = this.getMaxPage(pagesSeparate);
		List<T> items = pagesSeparate.getNextPageList();
		
		
		if (items.size() < pagesSeparate.getPageSize()) {
			System.out.println("无法保存, 因为该页数目只有 " + items.size() + " 个, 小于指定大小 :" + pagesSeparate.getPageSize());
			return false;
		}
		List<String> idList = new ArrayList<String>();
		
		for(T item : items) {
			idList.add(pagesSeparate.getPrimaryKeyValue(item));
		}
		
		// 1. 保存 tp对象
		TypePage tp = new TypePage();
		tp.setItems(Tools.join(idList, ","));
		tp.setPage(maxPage + 1);
		tp.setType(pagesSeparate.getPagesTypeKey().getKey());
		
		if (tp.save()) {
			// 2. 修改最大页码
			TypePage.setMaxPageOf(pagesSeparate.getMaxPageKey()	.getKey(), maxPage + 1);
			
			for(T item : items) {
				// 3.依次为item添加状态
				item.addItemStatus(pagesSeparate.getItemStatusWhichWillBeSetAfterPutInPage());
				item.update();
			}
			return true;
		} else {
			return false;
		}
	}
	
	public static int getMaxPage(PagesSeparate pagesSeparate) {
		String config = Tools.getConfig(pagesSeparate.getMaxPageKey().getKey());
		if (config == null || config.equals("")) {
			return 0;
		} else {
			return Integer.parseInt(config);
		}
	}
	
	public boolean setMaxPage(PagesSeparate pagesSeparate, int maxPage) {
		return Tools.setConfig(pagesSeparate.getPagesTypeKey().getKey(), maxPage + "");
	}
	
	
	public List<T> getItemsByPageAndType(int page, PagesSeparate pagesSeparate) {
		Session session = HibernateUtil.getSession();
		
		int maxPage = getMaxPage(pagesSeparate);
		page = page > maxPage ? maxPage : page;
		page = maxPage - page + 1;
		
		
		Criteria criteria = session.createCriteria(TypePage.class);
		criteria.add(Restrictions.eq("page", page));
		criteria.add(Restrictions.eq("type", pagesSeparate.getPagesTypeKey().getKey()));
		
		List<TypePage> typePageList = criteria.list();
		HibernateUtil.closeSession(session);
		
		List<T> items = new ArrayList<T>();
		
		if (typePageList.size() > 0) {
			TypePage typePage = typePageList.get(0);
			List<String> idList = Arrays.asList(typePage.getItems().split(","));
			
			items = this.getItemsFromIdList(idList, pagesSeparate);
		}
		return items;
	}

	private List<T> getItemsFromIdList(List<String> idList, PagesSeparate pagesSeparate) {
		List<Long> list = new ArrayList<Long>();
		
		for (String s : idList) {
			list.add(Long.parseLong(s));
		}
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(pagesSeparate.getGenericityType().getClass());
		
		cr.add(Restrictions.in(pagesSeparate.getPrimaryKey(), list));
		List<T> items = cr.list();
		HibernateUtil.closeSession(session);
		return items;
	}
}
