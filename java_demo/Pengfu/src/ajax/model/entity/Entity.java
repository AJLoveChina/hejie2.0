package ajax.model.entity;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.mapping.PersistentClass;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.persister.entity.AbstractEntityPersister;

import ajax.model.JokeType;
import ajax.spider.Spider3;
import ajax.spider.rules.Rules;
import ajax.spider.rules.ZhihuAnswerRules;
import ajax.tools.HibernateUtil;

public class Entity {
	

	public void save() {
		
		try {
			Session session = HibernateUtil.getSession();
			
			session.beginTransaction();
			
			session.save(this);
			
			session.getTransaction().commit();
			
			session.flush();
			session.close();
		}catch(Exception e) {
			System.out.println(e.getMessage());
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
	

}
