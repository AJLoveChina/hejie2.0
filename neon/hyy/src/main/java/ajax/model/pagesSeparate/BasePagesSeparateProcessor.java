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
import ajax.model.taobao.ITaobao;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

/**
 * BasePagesSeparateProcessor 解决的是数据已经存储在表中了, 这时候后台一个任务每隔一段时间处理一次分页<br>
 * 但是对于实时插入需要分页的系统,该类有性能问题.<br>
 * 因为在寻找下一组可以插入的items时会因为 items所在表大小产生性能问题
 * @author ajax
 *
 * @param <T>
 */
public abstract class BasePagesSeparateProcessor<T extends Entity<T>> {
	
	public abstract UniqueString getPagesTypeKey();
	public abstract UniqueString getMaxPageKey();
	
	public abstract List<T> getNextPageList(int listSize);
	
	
	
	/**
	 * 添加到该类型页面后的状态
	 * @return
	 */
	public abstract ItemStatus getItemStatusWhichWillBeSetAfterPutInPage();
	
	/**
	 * 获取主键的值, 不是指主键名称
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
		int finalNeededSize = this.getPageSize();
		TypePage previousTypePage = null;
		TypePage currentTypePage = null;
		
		if (maxPage > 1) {
			previousTypePage = TypePage.getBy(TypePage.class, "page", maxPage, "type", this.getPagesTypeKey().getKey());
		}
		
		List<T> itemsLeft;
		List<T> itemsRight;
		
		if (previousTypePage != null) {
			finalNeededSize = (this.getPageSize() - previousTypePage.getSize()) + this.getPageSize();
		}
		
		// 获取下一批可以插入到页面的 items
		List<T> items = this.getNextPageList(finalNeededSize);
		
		// items.size() == 0 直接返回false
		if (items.size() == 0) {
			System.out.println("items 数目==0");
			return false;
		}
		
		// 计算 itemsLeft 和 itemsRight
		if (previousTypePage != null) {
			int lessNum = this.getPageSize() - previousTypePage.getSize();
			
			if (lessNum >= 0) {
				
				// 如果待添加的items 正好只够上一个页面填满
				if (items.size() <= lessNum) {
					itemsLeft = items;
					itemsRight = new ArrayList<T>();
				} else {
					itemsLeft = items.subList(0, lessNum);
					itemsRight = items.subList(lessNum, items.size());
				}
				
			} else {
				itemsLeft = new ArrayList<T>();
				itemsRight = items;
			}
		} else {
			itemsLeft = new ArrayList<T>();
			itemsRight = items;
		}
		
		boolean isSuccess = true;
		boolean isNewPage = false;
		Session session = HibernateUtil.getCurrentSession();
		session.beginTransaction();
		
		if (itemsLeft.size() > 0) {
			previousTypePage = this.generateNewPageType(previousTypePage, itemsLeft);
			
			previousTypePage.update(session);
		}
		
		if (itemsRight.size() > 0) {
			currentTypePage = this.generateNewPageType(currentTypePage, itemsRight);
			currentTypePage.setPage(maxPage + 1);
			currentTypePage.setType(this.getPagesTypeKey().getKey());
			
			currentTypePage.save(session);
			isNewPage = true;
		}
		
		try {
			session.getTransaction().commit();
		}catch(Exception ex) {
			isSuccess = false;
		}
		
		if (isSuccess) {
			
			if (isNewPage) {
				// 2. 修改最大页码
				TypePage.setMaxPageOf(this.getMaxPageKey().getKey(), maxPage + 1);
			}
			
			
			// 3.依次为item添加状态
			for(T item : items) {
				item.addItemStatus(this.getItemStatusWhichWillBeSetAfterPutInPage());
				item.update();
			}
		}
		
		return isSuccess;
	}
	
	
	/**
	 * 对TypePage进行修改, 传入的TypePage可能为null
	 * @param typePage
	 * @param itemsPart
	 * @return
	 */
	private TypePage generateNewPageType(TypePage typePage, List<T> itemsPart) {
		List<String> idList = new ArrayList<String>();
		for(T item : itemsPart) {
			idList.add(this.getPrimaryKeyValue(item));
		}
		
		if (typePage != null) {
			String[] arr = typePage.getItems().split(",");
			
			for (String s : arr) {
				idList.add(s);
			}
			
			typePage.setItems(Tools.join(idList, ","));
			typePage.setSize(idList.size());
			
		} else {
			typePage = new TypePage();
			typePage.setItems(Tools.join(idList, ","));
			typePage.setSize(idList.size());
		}
		
		return typePage;
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
		
		TypePage typePage = TypePage.getBy(TypePage.class, "page", page, "type", this.getPagesTypeKey().getKey());
		
		
		List<T> items = new ArrayList<T>();
		
		if (typePage != null) {
			List<String> more = new ArrayList<String>();;
			if (typePage.getSize() < this.getPageSize() && page > 1) {
				TypePage typePage2 = TypePage.getBy(TypePage.class, "page", page - 1, "type", this.getPagesTypeKey().getKey());
				if (typePage2 != null) {
					more = Arrays.asList(typePage2.getItems().split(","));
				}
			}
			
			List<String> idList = Arrays.asList(typePage.getItems().split(","));
			idList.addAll(more);
			
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
