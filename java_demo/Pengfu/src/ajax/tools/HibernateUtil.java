package ajax.tools;

import org.hibernate.*;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.*;


public class HibernateUtil {
	private static SessionFactory sessionFactory;
	private static Session session;
	
	static {
		
		sessionFactory = new Configuration().configure().buildSessionFactory();
		
	}
	
	public static Session getSession() {
		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
														.configure()
														.build();
		try {
			sessionFactory = new MetadataSources( registry ).buildMetadata().buildSessionFactory();
			session = sessionFactory.openSession();
		}catch (Exception e) {
			// The registry would be destroyed by the SessionFactory, but we had trouble building the SessionFactory
			// so destroy it manually.
			StandardServiceRegistryBuilder.destroy( registry );
			e.printStackTrace();
		}
		
		return session;
	}
	
	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	public static void closeSession(Session session) {
		if (session != null) {
			session.close();
		}
	}
	
	
	public static void main(String[] args) {
		
	}
	
	
	
}
