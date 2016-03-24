package ajax.tools;

import org.hibernate.*;
import org.hibernate.cfg.*;


public class HibernateUtil {
	private static SessionFactory sessionFactory;
	private static Session session;
	
	static {
		
		sessionFactory = new Configuration().configure().buildSessionFactory();
		
	}
	
	public static Session getSession() {
		session = sessionFactory.openSession();
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
	
	
	
}
