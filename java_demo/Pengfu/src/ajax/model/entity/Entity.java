package ajax.model.entity;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.tools.HibernateUtil;

public class Entity<T> {
	

	public boolean save() {
		Session session = HibernateUtil.getSession();
		try {
			
			session.beginTransaction();
			
			session.save(this);
			
			session.getTransaction().commit();
			
			
			HibernateUtil.closeSession(session);
			return true;
		}catch(Exception e) {
			System.out.println(e.toString());
			HibernateUtil.closeSession(session);
			return false;
		}
	}
	
	public void update() {
		Session session = HibernateUtil.getSession();
		
		try {
			session.beginTransaction();
			
			session.update(this);
			
			session.getTransaction().commit();
			
			HibernateUtil.closeSession(session);
		}catch(RuntimeException e) {
			System.out.println(e.getMessage());
		}
	}
	
	public void delete() {
		Session session = HibernateUtil.getSession();
		
		session.beginTransaction();
		
		session.delete(this);
		
		session.getTransaction().commit();
		
//		session.flush();
//		session.close();
		HibernateUtil.closeSession(session);
	}
	
	@Deprecated
	public T getById(int id) {
		Session session = HibernateUtil.getSession();
		
		String tableName = this.getTableName();
		// %s is not real table name , but is Java Type
		String sqlCmd = String.format("from %s where id = :id", this.getClass().getName());
		Query query = session.createQuery(sqlCmd);
		
		query.setInteger("id", id);
	
		T entity = (T)query.uniqueResult();
		
		HibernateUtil.closeSession(session);
		
		return entity;
	}
	
	/**
	 * 根据主键id值从数据库加载该实体对象
	 * @param id
	 */
	public void load(int id) {
		Session session = HibernateUtil.getSession();
		
		try {
			session.load(this,id);
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}finally {
			HibernateUtil.closeSession(session);
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
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(cls);
		
		cr.add(Restrictions.eq(column, columnValue));
		
		List<T> list = cr.list();
		
		HibernateUtil.closeSession(session);
		
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
		Session session = HibernateUtil.getSession();
		
		String sqlCmd = String.format("from %s", this.getClass().getName());
		//, (page - 1) * pageNum, pageNum
		
		Query query = session.createQuery(sqlCmd);
		query.setFirstResult((page - 1) * pageNum);
		query.setMaxResults(pageNum);
		
		
		List<T> lists = query.list();
		
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
		Session session = HibernateUtil.getSession();
		
		Criteria  cr = session.createCriteria(cls);
		List<T> list = cr.list();
		
		HibernateUtil.closeSession(session);
		return list;
	}
	
	@Deprecated
	public List<T> getList(Criteria criteria) {
		
		return criteria.list();
		
	}

}
