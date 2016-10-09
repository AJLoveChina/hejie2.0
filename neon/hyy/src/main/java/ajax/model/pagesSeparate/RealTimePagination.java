package ajax.model.pagesSeparate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.Config;
import ajax.model.entity.TypePage;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

/**
 * 实时分页保存实体, 查询实体
 * @author ajax
 *
 * @param <T>
 */
public class RealTimePagination<T extends RealTimePaginationConfiguration<T>> {
	
	private String generateMaxPageKeyByGroupId(String groupId) {
		return groupId + "-max-page-key";
	}
	
	/*
	 * 1. create typePage or update typePage
	 * 2. update maxPage config or not update
	 * 3. insert t  (Entity)
	 * 一系列操作, 保存到数据库;
	 * @param t
	 * @return
	 */
	public boolean save(String groupId, T t) {
		Config config = Config.getBy(Config.class, "key", this.generateMaxPageKeyByGroupId(groupId));
		/*
		 * 1. create typePage or update typePage
		 * 2. update maxPage config or not update
		 * 3. insert t  (Entity)
		 * */
		boolean isSuccess = false;
		
		int maxPage = this.getMaxPage(config);
		int finalNeededSize = t.getPaginationPageSize();
		TypePage typePage = null;
		
		if (maxPage >= 1) {
			typePage = TypePage.getBy(TypePage.class, "page", maxPage, "type", groupId);
		}
		
		Session session = HibernateUtil.getCurrentSession();
		session.beginTransaction();
		
		t.save(session);
		if (typePage == null || t.getPaginationPageSize() - typePage.getSize() <= 0) {	// 要生成新的一页了
			List<String> list = new ArrayList<>();
			list.add(t.getPrimaryKeyValue());
			typePage = new TypePage(list, groupId, maxPage + 1);
			
			typePage.save(session);

			if (config == null) {
				config = new Config();
				config.setKey(this.generateMaxPageKeyByGroupId(groupId));
				config.setValue(maxPage + 1 + "");
				config.save(session);
			} else {
				config.setValue(maxPage + 1 + "");
				config.update(session);
			}
		} else { // 修改上一页面
			typePage.addIdToItems(t.getPrimaryKeyValue());
			typePage.update(session);
		}
		
		try {
			session.getTransaction().commit();
			isSuccess = true;
		} catch(Exception ex) {
			System.out.println(ex.getMessage());
		}
		
		return isSuccess;
	}
	
	/**
	 * real page value or 0
	 * @param t
	 * @return
	 */
	private int getMaxPage(Config configIns) {
		if (configIns == null) return 0;
		String config = configIns.getValue();
		if (config.equals("")) {
			return 0;
		} else {
			return Integer.parseInt(config);
		}
	}

	/**
	 * 返回对应实体的集合或者空集合
	 * @param page
	 * @param t
	 * @return
	 */
	public List<T> get(String groupId, int page, T t) {
		Config config = Config.getBy(Config.class, "key", this.generateMaxPageKeyByGroupId(groupId));
		int maxPage = this.getMaxPage(config);
		
		// 这里不要改, 因为前端会根据返回的数目与size比较判断有木有下一页了
		if (page <= 0 || page > maxPage) return new ArrayList<>();
		int queryPage = maxPage - page + 1;
		
		if (maxPage == 0) {
			return new ArrayList<>();
		} else {
			TypePage typePage = TypePage.getBy(TypePage.class, "page", queryPage, "type", groupId);
			
			if (typePage == null) return new ArrayList<>();
			String[] arr = typePage.getItems().split(",");
			String[] arr2 = {};
			
			if (typePage.getSize() < t.getPaginationPageSize() && queryPage > 1) {
				TypePage typePage2 = TypePage.getBy(TypePage.class, "page", queryPage - 1, "type", groupId);
				if (typePage2 != null) {
					arr2 = typePage2.getItems().split(",");
				}
			}
			
			String[] both = (String[]) ArrayUtils.addAll(arr, arr2);
			
			
			Session session = HibernateUtil.getCurrentSession();
			session.beginTransaction();
			
			Criteria criteria = session.createCriteria(t.getClass());
			
			switch(t.getPaginationPrimaryKeyType()) {
			case INTEGER:
				List<Integer> list = new ArrayList<>();
				for (String s : both) {
					list.add(Integer.parseInt(s));
				}
				criteria.add(Restrictions.in(t.getPaginationPrimaryKey(), list));
				break;
			case LONG:
			default:
				List<Long> list2 = new ArrayList<>();
				for (String s : both) {
					list2.add(Long.parseLong(s));
				}
				criteria.add(Restrictions.in(t.getPaginationPrimaryKey(), list2));
				break;
			}
			
			List<T> items = criteria.list();
			session.getTransaction().commit();
			return items;
		}
	}
	
	/**
	 * 一页只返回指定的数目items, 第一页往往不够则由后一页补上. 最后一页往往要去除第一页不足的条数
	 * @param groupId
	 * @param page
	 * @param t
	 * @return
	 */
	public List<T> getV2(String groupId, int page, T t) {
		Config config = Config.getBy(Config.class, "key", this.generateMaxPageKeyByGroupId(groupId));
		int maxPage = this.getMaxPage(config);
		
		// 这里不要改, 因为前端会根据返回的数目与size比较判断有木有下一页了
		if (page <= 0 || page > maxPage) return new ArrayList<>();
		int queryPage = maxPage - page + 1;
		
		if (maxPage == 0) {
			return new ArrayList<>();
		} else {
			String[] arr = {};
			String[] arr2 = {};
			TypePage maxTypePage = TypePage.getBy(TypePage.class, "page", maxPage, "type", groupId);
			TypePage curTypePage = null;
			int maxPageLessItemsSize = t.getPaginationPageSize() - maxTypePage.getSize();
			if (maxPage == queryPage) {
				curTypePage = maxTypePage;
			} else {
				curTypePage = TypePage.getBy(TypePage.class, "page", queryPage, "type", groupId);
			}
			
			if (queryPage == 1) {
				arr = new String[maxTypePage.getSize()];
				System.arraycopy(curTypePage.getItems().split(","), maxPageLessItemsSize, arr, 0, maxTypePage.getSize());
			} else if (queryPage == maxPage) {
				
				arr = curTypePage.getItems().split(",");
				TypePage tp2 = TypePage.getBy(TypePage.class, "page", queryPage - 1, "type", groupId);
				arr2 = new String[maxPageLessItemsSize];
				System.arraycopy(tp2.getItems().split(","), 0, arr2, 0, maxPageLessItemsSize);
				
			} else {
				arr = new String[maxTypePage.getSize()];
				arr2 = new String[maxPageLessItemsSize];
				System.arraycopy(curTypePage.getItems().split(","), maxPageLessItemsSize, arr, 0, maxTypePage.getSize());
				TypePage tp2 = TypePage.getBy(TypePage.class, "page", queryPage - 1, "type", groupId);
				System.arraycopy(tp2.getItems().split(","), 0, arr2, 0, maxPageLessItemsSize);
			}
			
			String[] both = (String[]) ArrayUtils.addAll(arr, arr2);
			
			//ArrayUtils.reverse(both);
			Session session = HibernateUtil.getCurrentSession();
			session.beginTransaction();
			
			Criteria criteria = session.createCriteria(t.getClass());
			
			switch(t.getPaginationPrimaryKeyType()) {
			case INTEGER:
				List<Integer> list = new ArrayList<>();
				for (String s : both) {
					list.add(Integer.parseInt(s));
				}
				criteria.add(Restrictions.in(t.getPaginationPrimaryKey(), list));
				break;
			case LONG:
			default:
				List<Long> list2 = new ArrayList<>();
				for (String s : both) {
					list2.add(Long.parseLong(s));
				}
				criteria.add(Restrictions.in(t.getPaginationPrimaryKey(), list2));
				criteria.addOrder(Order.desc(t.getPaginationPrimaryKey()));
				break;
			}
			
			List<T> items = criteria.list();
			session.getTransaction().commit();
			return items;
		}
	}
}
