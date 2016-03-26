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
	
	
	public Class<?> getById(int id) {
		Session session = HibernateUtil.getSession();
		
		String sqlCmd = String.format("from %s where id = :id", this.getTableName());
		Query query = session.createQuery(sqlCmd);
		
		query.setInteger("id", id);
	
		
		Class<?> entity = (Class<?>)query.uniqueResult();
		return entity;
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
