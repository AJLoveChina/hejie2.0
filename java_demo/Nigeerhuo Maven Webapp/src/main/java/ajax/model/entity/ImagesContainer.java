package ajax.model.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.tools.HibernateUtil;

public class ImagesContainer extends Entity<ImagesContainer>{
	private int id;
	private String url;
	private String diskPath;
	private String webPath;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDiskPath() {
		return diskPath;
	}
	public void setDiskPath(String diskPath) {
		this.diskPath = diskPath;
	}
	public String getWebPath() {
		return webPath;
	}
	public void setWebPath(String webPath) {
		this.webPath = webPath;
	}
	

	
	/**
	 * 
	 * @param src src is webPath
	 * @return null if not found 
	 */
	public static ImagesContainer getByWebPath(String src) {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(ImagesContainer.class);
		cr.add(Restrictions.eq("webPath", src));
		
		List<ImagesContainer> lists = cr.list();
		
		HibernateUtil.closeSession(session);
		if (lists.size() > 0) {
			return lists.get(0);
		} else {
			return null;
		}
	}
	
	/**
	 * 根据url从表中判断是否存在该url图片<br>
	 * 如果有, 返回实体对象<br>
	 * 否则返回 null
	 * @return
	 */
	public static ImagesContainer existed(String url) {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(ImagesContainer.class);
		cr.add(Restrictions.eq("url", url));
		List<ImagesContainer> lists = cr.list();
		
		HibernateUtil.closeSession(session);
		if (lists.size() > 0) {
			return lists.get(0);
		} else {
			return null;
		}
	}
	
	public static ImagesContainer getByUrl(String url) {
		return existed(url);
	}
	
}
