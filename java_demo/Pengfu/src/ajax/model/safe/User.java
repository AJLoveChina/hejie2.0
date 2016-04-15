package ajax.model.safe;

import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.entity.Entity;
import ajax.tools.HibernateUtil;

public class User extends Entity<User>{
	
	enum Sex{
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
	
	
	enum UserRights{
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
	
	enum Source{
		QQ(1, "QQ"),
		WEIBO(2, "WEIBO");
		
		private int id;
		private String prefix;
		
		
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
		
	}
	
	private int id;
	private String username;
	private int sex;
	private String openId;
	private String accessToken;
	private int userRights = UserRights.NORMAL.id;
	private String dateEntered;
	
	
	
	
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
	
	private static boolean sign(String openId) {
		User u = User.getBy("openId", openId, User.class);
		
		if (u != null) {
			SignStatus ss = new SignStatus();
			ss.setLogin(true);
			ss.setUser(u);
			
			
			return true;
		} else {
			return false;
		}
	}
	
	public static void signWithQQ(String openId, String accessToken) {
		String finalOpenId = getFinalOpenId(openId, Source.QQ);
		
		// 注册
		if (!User.isExist("openId", finalOpenId, User.class)) {
			User u = new User();
			u.setOpenId(finalOpenId);
			u.save();
		}
		
		sign(finalOpenId);
	}
	
	
}
