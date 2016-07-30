package ajax.model.entity;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.metadata.ClassMetadata;

import com.google.gson.Gson;

import ajax.model.ItemStatus;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

public class Entity<T> {

	private String statusSplitByComma = "";
	public String getStatusSplitByComma() {
		return statusSplitByComma;
	}
	public void setStatusSplitByComma(String statusSplitByComma) {
		this.statusSplitByComma = statusSplitByComma;
	}
	
	/**
	 * 给item添加状态, 支持多状态  <br>
	 * 每个状态以 b开头, e结尾 . 为了防止  sql查询时出现   2,3,12  contains 1 出现true的情况
	 * @param itemStatus
	 */
	public void addItemStatus(ItemStatus itemStatus) {
		if (this.statusSplitByComma == null || this.statusSplitByComma.equals("")) {
			this.setStatusSplitByComma(itemStatus.wrapWithBE());
		} else if (!this.isInThisItemStatus(itemStatus)){
			String[] arr = this.statusSplitByComma.split(",");
			List<String> list = new ArrayList<String>();
			for (String s : arr) {
				list.add(s.trim());
			}
			list.add(itemStatus.wrapWithBE());
			this.setStatusSplitByComma(Tools.join(list, ","));
		}
	}
	
	/**
	 * 删除某个状态
	 * @param itemStatus
	 */
	public void removeIemStatus(ItemStatus itemStatus) {
		String str = itemStatus.wrapWithBE();
		this.setStatusSplitByComma(this.getStatusSplitByComma().replaceAll(str, ""));
		String[] arr = this.statusSplitByComma.split(",");
		List<String> list = new ArrayList<String>();
		for(String one : arr) {
			if (!one.equals("")) {
				list.add(one);
			}
		}
		this.setStatusSplitByComma(Tools.join(list, ","));
	}
	
	/**
	 * item是否处于某种指定状态
	 * @param itemStatus
	 * @return
	 */
	public boolean isInThisItemStatus(ItemStatus itemStatus) {
		if (this.statusSplitByComma == null || itemStatus == null) {
			return false;
		}
		String[] arr = this.statusSplitByComma.split(",");
		for (String s : arr) {
			if (s.equals(itemStatus.wrapWithBE())) {
				return true;
			}
		}
		return false;
	}
	
	public String getPrimaryKey() {
		ClassMetadata meta = HibernateUtil.getSessionFactory().getClassMetadata(this.getClass());
		return meta.getIdentifierPropertyName();
	}
	/**
	 * 是否设置了主键的值<br>
	 * 用来判断一个entity应该save 还是 update
	 * @return
	 */
	public boolean isSetPrimaryKeyValue() {
		String key = this.getPrimaryKey();
		String methodName = "get" + key.substring(0, 1).toUpperCase() + key.substring(1);
		try {
			Method method = this.getClass().getDeclaredMethod(methodName);
			
			int id = (Integer) method.invoke(this);
			
			return id > 0 ? true : false;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	public boolean save() {
		Session session = HibernateUtil.getCurrentSession();
		try {
			
			session.beginTransaction();
			
			session.save(this);
			
			session.getTransaction().commit();
			
			return true;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		
	}
	
	public boolean update() {
		Session session = HibernateUtil.getCurrentSession();
		
		try {
			session.beginTransaction();
			
			session.update(this);
			
			session.getTransaction().commit();
			
			return true;
		} catch (Exception e) {
			
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	public boolean delete() {
		try {
			Session session = HibernateUtil.getCurrentSession();
			
			session.beginTransaction();
			
			session.delete(this);
			
			session.getTransaction().commit();
			return true;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	@Deprecated
	public T getById(int id) {
		Session session = HibernateUtil.getCurrentSession();
		
		
		session.beginTransaction();
		
		String tableName = this.getTableName();
		// %s is not real table name , but is Java Type
		String sqlCmd = String.format("from %s where id = :id", this.getClass().getName());
		Query query = session.createQuery(sqlCmd);
		
		query.setInteger("id", id);
	
		T entity = (T)query.uniqueResult();
		
		//HibernateUtil.closeSession(session);
		session.getTransaction().commit();
		
		return entity;
	}
	
	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	public boolean load(int id) {
		
		
		try {
			Session session = HibernateUtil.getCurrentSession();
			
			session.beginTransaction();
			session.load(this, id);
			session.getTransaction().commit();
			return true;
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	public boolean load(long id) {
		
		
		try {
			Session session = HibernateUtil.getCurrentSession();
			
			session.beginTransaction();
			session.load(this, id);
			session.getTransaction().commit();
			return true;
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	/**
	 * 根据某个字段的值获取一个实体, 只返回找到的第一个. null if not find.
	 * @param column
	 * @param columnValue
	 * @param cls
	 * @return
	 */
	public static <T> T getBy(String column, String columnValue, Class<T> cls) {
		
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria cr = session.createCriteria(cls);
		
		cr.add(Restrictions.eq(column, columnValue));
		
		List<T> list = cr.list();
		
		session.getTransaction().commit();
		
		if (list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}
	/**
	 * 根据字段查询是否存在该行数据
	 * @param column
	 * @param columnValue
	 * @param cls
	 * @return
	 */
	public static <T> boolean isExist(String column, String columnValue, Class<T> cls) {
		T t = getBy(column, columnValue, cls);
		return t != null;
	}


	public String getTableName() {
		String tableName = HibernateUtil.getTableName(this.getClass());
		
		return tableName;
	}
	
	
	@Deprecated
	public List<T> getPage(int page, int pageNum) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		String sqlCmd = String.format("from %s", this.getClass().getName());
		//, (page - 1) * pageNum, pageNum
		
		Query query = session.createQuery(sqlCmd);
		query.setFirstResult((page - 1) * pageNum);
		query.setMaxResults(pageNum);
		
		
		List<T> lists = query.list();
		
		session.getTransaction().commit();
		
		return lists;
	}
	
	/**
	 * return list of T, empty list if not found
	 * @param page
	 * @param size
	 * @param cls
	 * @return
	 */
	public static <T> List<T> get(int page, int size, Class<T> cls) {
		Session session = HibernateUtil.getCurrentSession();
		
		session.beginTransaction();
		
		Criteria  cr = session.createCriteria(cls);
		cr.setMaxResults(20);
		cr.setFirstResult((page - 1) * size);
		List<T> list = cr.list();
		
		
		//HibernateUtil.closeSession(session);
		session.getTransaction().commit();
		
		return list;
	}
	
	@Deprecated
	public List<T> getList(Criteria criteria) {
		
		return criteria.list();
		
	}
	
	
	public String toJson() {
		
		Gson gson = new Gson();
		
		return gson.toJson(this);
		
	}

}
