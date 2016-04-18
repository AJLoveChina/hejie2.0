package ajax.model.safe;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.AjaxResponse;
import ajax.model.entity.Collect;
import ajax.model.entity.Entity;
import ajax.model.entity.Item;
import ajax.tools.HibernateUtil;

public class User extends Entity<User>{
	
	public enum Sex{
		BOY(1),
		GIRL(2),
		BUZHIDAO(3);
		
		private int id;
		Sex(int id) {
			this.id = id;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		
	}
	
	
	public enum UserRights{
		NORMAL(1, "普通用户"),
		FORMID(4, "黑名单用户"),
		ADMIN(99, "管理员");
		
		private int id;
		private String info;
		private UserRights(int id, String info) {
			this.id = id;
			this.info = info;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getInfo() {
			return info;
		}
		public void setInfo(String info) {
			this.info = info;
		}
	}
	
	public enum Source{
		QQ(1, "QQ"),
		WEIBO(2, "WEIBO");
		
		private int id;
		private String prefix;
		
		private static final String HEAD = "aj-prefix-";
		
		
		private Source(int id, String prefix) {
			this.id = id;
			this.prefix = prefix;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getPrefix() {
			return prefix;
		}
		public void setPrefix(String prefix) {
			this.prefix = prefix;
		}
		
		public static String dealOpenId(String openId, Source s) {
			if (openId.startsWith(HEAD)) {
				return openId;
			} else {
				return HEAD + s.getPrefix() + openId;
			}
		}
		
	}
	
	private int id;
	private String username;
	private int sex;
	private String openId;
	private String accessToken;
	private int userRights = UserRights.NORMAL.id;
	private String dateEntered;
	private int from;
	private String img;
	
	public static final String SIGN_SESSION_ATTR = "aj-sign-sess-status";
	
	
	
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public int getFrom() {
		return from;
	}
	public void setFrom(int from) {
		this.from = from;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	public int getUserRights() {
		return userRights;
	}
	public void setUserRights(int userRights) {
		this.userRights = userRights;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	
	private static String getFinalOpenId(String openId, Source source) {
		return source.getPrefix() + openId;
	}
	
	
	/**
	 * 第三方登陆, 如果木有注册则注册
	 * @param request
	 * @param response
	 * @return
	 */
	public String signIn(HttpServletRequest request, HttpServletResponse response) {
		SignStatus ss = null;
		
		if (User.isLogin(request, response)) {
			
			ss = User.getSignStatus(request, response);
			
		} else {
			
			User u = new User();
			if (!this.isExist("openId", this.getOpenId(), User.class)) {
				
				this.save();
				u = this;
				
			} else {
				u = User.getBy("openId", this.getOpenId(), User.class);
				u.setAccessToken(this.getAccessToken());
			}
			
		
			HttpSession session = request.getSession();
			
			ss = new SignStatus();
			ss.setSuccess(true);
			ss.setUser(u);			
			session.setAttribute(SIGN_SESSION_ATTR, ss);
		}
		
		
		AjaxResponse<SignStatus> ar = new AjaxResponse<SignStatus>();
		ar.setIsok(true);
		ar.setData(ss);
		return ar.toJson();
	}
	
	/**
	 * @param request
	 * @param response
	 * @return null if not set
	 */
	public static SignStatus getSignStatus(HttpServletRequest request, HttpServletResponse response) {
		return (SignStatus)request.getSession().getAttribute(SIGN_SESSION_ATTR);
	}
	
	public static boolean isLogin(HttpServletRequest request, HttpServletResponse response) {
		SignStatus ss = (SignStatus)request.getSession().getAttribute(SIGN_SESSION_ATTR);
		
		if (ss == null) {
			return false;
		} else {
			return ss.isSuccess();
		}
	}
	
	public static User getLoginUser(HttpServletRequest request) {
		SignStatus ss = (SignStatus)request.getSession().getAttribute(SIGN_SESSION_ATTR);
		
		if (ss == null) {
			return null;
		} else {
			return ss.getUser();
		}
	}
	
	public static void signout(HttpServletRequest request, HttpServletResponse response) {
		
		request.getSession().removeAttribute(SIGN_SESSION_ATTR);
		
		
	}
	
	public boolean isAdmin() {
		return this.getUserRights() == UserRights.ADMIN.getId();
	}
	
	public static boolean isAdmin(HttpServletRequest request, HttpServletResponse response) {
		SignStatus ss = User.getSignStatus(request, response);
		
		if (ss == null) {
			return false;
		} else {
			User u = ss.getUser();
			
			if (u != null && u.isAdmin()) {
				return true;
			} else {
				return false;
			}
		}
		
	}
	
	
	public List<Item> getCollections() {
		Session session = HibernateUtil.getSession();
		Criteria cr = session.createCriteria(Collect.class);
		
		cr.add(Restrictions.eq("userid", this.getId()));
		
		cr.setMaxResults(20);
		
		List<Collect> collections = cr.list();
		
		
		List<Integer> itemsid = new ArrayList<Integer>();
		
		
		for (Collect c : collections) {
			//items.add(Item.getByItemById(c.getItemid()));
			
			itemsid.add(c.getItemid());
			
		}
		
		HibernateUtil.closeSession(session);
		// ----------------------------------------
		
		List<Item> items = new ArrayList<Item>();
		Session session2 = HibernateUtil.getSession();
		Criteria cr2 = session2.createCriteria(Item.class);
		
		cr2.add(Restrictions.in("id", itemsid));
		
		items = cr2.list();
		
		HibernateUtil.closeSession(session2);
		
		return items;
	}
	
	
	public static void main(String[] args) {
		User u = new User();
		u.load(4);
		List<Item> items = u.getCollections();
		
		System.out.println(items);
		
		
	}
	
	
}
