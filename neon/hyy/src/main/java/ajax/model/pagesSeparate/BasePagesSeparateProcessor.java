package ajax.model.pagesSeparate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.ItemStatus;
import ajax.model.UniqueString;
import ajax.model.entity.Entity;
import ajax.model.entity.TypePage;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;


public abstract class BasePagesSeparateProcessor<T extends Entity<T>> {
	
	
	public abstract UniqueString getPagesTypeKey();
	public abstract UniqueString getMaxPageKey();
	
	public abstract List<T> getNextPageList();
	
	/**
	 * 添加到该类型页面后的状态
	 * @return
	 */
	public abstract ItemStatus getItemStatusWhichWillBeSetAfterPutInPage();
	
	/**
	 * 获取主键的值
	 * @return
	 */
	public abstract String getPrimaryKeyValue(T t);
	
	public abstract T getGenericityType();
	/**
	 * 获取主键字段名称
	 * @return
	 */
	public abstract String getPrimaryKey();
	/**
	 * 获取页面大小,默认20
	 * @return
	 */
	public abstract int getPageSize();	
	
	
	public boolean generateNewPage() {
		int maxPage = this.getMaxPage();
		List<T> items = this.getNextPageList();
		
		
		if (items.size() < this.getPageSize()) {
			System.out.println("无法保存, 因为该页数目只有 " + items.size() + " 个, 小于指定大小 :" + this.getPageSize());
			return false;
		}
		List<String> idList = new ArrayList<String>();
		
		for(T item : items) {
			idList.add(this.getPrimaryKeyValue(item));
		}
		
		// 1. 保存 tp对象
		TypePage tp = new TypePage();
		tp.setItems(Tools.join(idList, ","));
		tp.setPage(maxPage + 1);
		tp.setType(this.getPagesTypeKey().getKey());
		
		if (tp.save()) {
			// 2. 修改最大页码
			TypePage.setMaxPageOf(this.getMaxPageKey()	.getKey(), maxPage + 1);
			
			for(T item : items) {
				// 3.依次为item添加状态
				item.addItemStatus(this.getItemStatusWhichWillBeSetAfterPutInPage());
				item.update();
			}
			return true;
		} else {
			return false;
		}
	}
	
	public int getMaxPage() {
		String config = Tools.getConfig(this.getMaxPageKey().getKey());
		if (config == null || config.equals("")) {
			return 0;
		} else {
			return Integer.parseInt(config);
		}
	}
	
	public boolean setMaxPage(int maxPage) {
		return Tools.setConfig(this.getPagesTypeKey().getKey(), maxPage + "");
	}
	
	
	public List<T> getItemsByPageAndType(int page) {
		
		
		int maxPage = this.getMaxPage();
		page = page > maxPage ? maxPage : page;
		page = maxPage - page + 1;
		
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria criteria = session.createCriteria(TypePage.class);
		criteria.add(Restrictions.eq("page", page));
		criteria.add(Restrictions.eq("type", this.getPagesTypeKey().getKey()));
		
		List<TypePage> typePageList = criteria.list();
		
		session.getTransaction().commit();
		
		List<T> items = new ArrayList<T>();
		
		if (typePageList.size() > 0) {
			TypePage typePage = typePageList.get(0);
			List<String> idList = Arrays.asList(typePage.getItems().split(","));
			
			items = this.getItemsFromIdList(idList);
		}
		return items;
	}
	
	@SuppressWarnings("unchecked")
	private List<T> getItemsFromIdList(List<String> idList) {
		List<Long> list = new ArrayList<Long>();
		
		for (String s : idList) {
			list.add(Long.parseLong(s));
		}
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria cr = session.createCriteria(this.getGenericityType().getClass());
		
		cr.add(Restrictions.in(this.getPrimaryKey(), list));
		
		List<T> items = cr.list();
		
		session.getTransaction().commit();
		
		return items;
	}
}
