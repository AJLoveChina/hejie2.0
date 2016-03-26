package ajax.model.entity;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import ajax.tools.HibernateUtil;

public class Entity<T> {
	

	public void save() {
		
		try {
			Session session = HibernateUtil.getSession();
			
			session.beginTransaction();
			
			session.save(this);
			
			session.getTransaction().commit();
			
			session.flush();
			session.close();

			System.out.println("Grab OK : " + this.toString());
		}catch(Exception e) {
			System.out.println("Grab Error : " + e.getMessage());
		}
		
	}
	
	public void update() {
		Session session = HibernateUtil.getSession();
		
		try {
			session.beginTransaction();
			
			session.update(this);
			
			session.getTransaction().commit();
			
		}catch(RuntimeException e) {
			e.printStackTrace();
		}finally{
			
			session.flush();
			session.close();
			
		}
	}
	
	public void delete() {
		Session session = HibernateUtil.getSession();
		
		session.beginTransaction();
		
		session.delete(this);
		
		session.getTransaction().commit();
		
		session.flush();
		session.close();
		
	}
	
//	@Deprecated
	public T getById(int id) {
		Session session = HibernateUtil.getSession();
		
		String sqlCmd = String.format("from %s where id = :id", this.getTableName());
		Query query = session.createQuery(sqlCmd);
		
		query.setInteger("id", id);
	
		T entity = (T)query.uniqueResult();
		
		HibernateUtil.closeSession(session);
		
		return entity;
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
		
		String sqlCmd = String.format("from %s", this.getTableName());
		//, (page - 1) * pageNum, pageNum
		
		Query query = session.createQuery(sqlCmd);
		query.setFirstResult((page - 1) * pageNum);
		query.setMaxResults(pageNum);
		
		
		List<T> lists = query.list();
		
		return lists;
	}

}
