package ajax.tools;

import java.util.logging.Level;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.persister.entity.AbstractEntityPersister;


public class  HibernateUtil{
	private static SessionFactory sessionFactory;
	private static Session session;
	private static StandardServiceRegistry registry;
	
	static {
		
		//java.util.logging.Logger.getLogger("org.hibernate.SQL").setLevel(Level.INFO);
		
		registry = new StandardServiceRegistryBuilder().configure().build();
		try {
			sessionFactory = new MetadataSources( registry ).buildMetadata().buildSessionFactory();
		}catch(Exception e) {
			System.out.println(e.getMessage());
			StandardServiceRegistryBuilder.destroy( registry );
			e.printStackTrace();
		}

	}
	
	public static Session getSession() {
		
		session = sessionFactory.openSession();
		
		return session;
	}
	/**
	 * 适合 multi-user client/server application <br>
	 * 无需手动关闭session
	 * @return
	 */
	public static Session getCurrentSession() {
		session = sessionFactory.getCurrentSession();
		return session;
	}
	
	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	public static void closeSession(Session session) {
		try {
			if (session != null) {
				session.close();
				session = null;
			}
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	public static String getTableName(Class<?> cls) {
		SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
		ClassMetadata hibernateMetadata = sessionFactory.getClassMetadata(cls);
		String tableName = null;

		if (hibernateMetadata instanceof AbstractEntityPersister)
		{
		     AbstractEntityPersister persister = (AbstractEntityPersister) hibernateMetadata;
		     tableName = persister.getTableName();
		     String[] columnNames = persister.getKeyColumnNames();
		}
		
		return tableName;
		
	}
	
	public static void main(String[] args) {
		
	}
	
}
