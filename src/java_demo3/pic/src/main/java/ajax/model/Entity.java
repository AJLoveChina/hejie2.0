package ajax.model;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.tools.HibernateUtil;

public class Entity<T> {
	
	/**
	 * 
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

	
	public boolean save() {
		Session session = HibernateUtil.getSession();
		try {
			
			session.beginTransaction();
			
			session.save(this);
			
			session.getTransaction().commit();
			
			HibernateUtil.closeSession(session);
			return true;
		}catch(Exception e) {
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
			
			
		}catch(RuntimeException e) {
			System.out.println(e.getMessage());
		} finally {
			HibernateUtil.closeSession(session);
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


	
	public static void main(String[] args) {
//		Item item = new Item();
//		Item newItem = item.getById(1);
//		
//		// newItem 是数据库对应表 id = 1 的那一行
//		// 但是 我现在不想这么做
//		// 我想这样
//		Item item2 = new Item();
//		item2.setId(1);
//		
//		item2.load(); // 就是这个load方法该怎么写 我不会
//		// item2 也是 数据库对应表 id = 1 的那一行
		
	}
	public String getTableName() {
		String tableName = HibernateUtil.getTableName(this.getClass());
		
		return tableName;
	}
	
	
	public List<T> getPage(int page, int pageNum) {
		Session session = HibernateUtil.getSession();
		
		String sqlCmd = String.format("from %s", this.getClass().getName());
		//, (page - 1) * pageNum, pageNum
		
		Query query = session.createQuery(sqlCmd);
		query.setFirstResult((page - 1) * pageNum);
		query.setMaxResults(pageNum);
		
		
		List<T> lists = query.list();
		
		HibernateUtil.closeSession(session);
		return lists;
	}
	
	public List<T> getList(Criteria criteria) {
		
		return criteria.list();
		
	}

}
