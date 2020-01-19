package ajax.model.entity;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.annotations.Expose;

import ajax.tools.Tools;

public class GameTeamFun extends Entity<GameTeamFun>{
	public class User {
		private String nick;
		private String info;
		private Hero goodAtHero;
		public String getNick() {
			return nick;
		}
		public void setNick(String nick) {
			this.nick = nick;
		}
		public String getInfo() {
			return info;
		}
		public void setInfo(String info) {
			this.info = info;
		}
		public Hero getGoodAtHero() {
			return goodAtHero;
		}
		public void setGoodAtHero(Hero goodAtHero) {
			this.goodAtHero = goodAtHero;
		}
		public User(String nick, String info, Hero goodAtHero) {
			super();
			this.nick = nick;
			this.info = info;
			this.goodAtHero = goodAtHero;
		}
	}
	public class Hero {
		private String img;
		private String name;
		public String getImg() {
			return img;
		}
		public void setImg(String img) {
			this.img = img;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Hero(String img, String name) {
			super();
			this.img = img;
			this.name = name;
		}
		
	}
	
	@Expose 
	private int id;
	private transient long createdByUserid;
	/**
	 * 战队名称
	 */
	private String name = "";
	private String users = "";
	private String dateEntered = "";
	private List<User> $users;
	
	
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	public String getUsers() {
		return users;
	}
	public void setUsers(String users) {
		this.users = users;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getCreatedByUserid() {
		return createdByUserid;
	}
	public void setCreatedByUserid(long createdByUserid) {
		this.createdByUserid = createdByUserid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<User> get$users() {
		return $users;
	}
	public void set$users(List<User> $users) {
		this.$users = $users;
	}
	
	@Override
	public boolean save() {
		if ((this.users == null || this.users.equals("")) && this.$users != null) {
			Gson gson = new Gson();
			this.setUsers(gson.toJson(this.$users));
		}
		if (this.dateEntered == null || this.dateEntered.trim().equals("")) {
			this.setDateEntered(new SimpleDateFormat(Tools.EnumString.TABLE_TIME_FORMAT.getStr()).format(new Date()));;
		}
		return super.save();
	}
	
	/**
	 * 生成一个json字符串, 用于前端用户创建Team的数据
	 * @return
	 */
	public String getGenerateJson() {
		Gson gson = new Gson();
		
		List<User> $users = new ArrayList<User>();
		Hero goodAtHero = new Hero("", "");
		$users.add(this.new User("", "", goodAtHero));
		
		this.set$users($users);
		
		return gson.toJson(this);
	}
	
}
