package ajax.model.safe;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import ajax.model.AjaxRequest;
import ajax.model.AjaxResponse;
import ajax.model.UrlRoute;
import ajax.model.entity.Collect;
import ajax.model.entity.Entity;
import ajax.model.entity.Item;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

import com.google.gson.Gson;

public class User extends Entity<User>{

	
	private static String qqAppId = null;
	private static String qqAppKey = null;
	private static String weiboAppKey = null;
	private static String weiboSecret = null;
	private static String githubClientSecret = null;
	private static String githubClientId = null;
	

	
	public static String getQqAppId() {
		if (User.qqAppId == null) {
			User.qqAppId = Tools.getConfig("qqAppId");
		}
		return User.qqAppId;
	}
	public static String getQqAppKey() {
		if (User.qqAppKey == null) {
			User.qqAppKey = Tools.getConfig("qqAppKey");
		}
		return User.qqAppKey;
	}
	public static String getWeiboAppKey() {
		if (User.weiboAppKey == null) {
			User.weiboAppKey = Tools.getConfig("weiboAppKey");
		}
		return User.weiboAppKey;
	}
	public static String getWeiboSecret() {
		if (User.weiboSecret == null) {
			User.weiboSecret = Tools.getConfig("weiboSecret");
		}
		return User.weiboSecret;
	}
	public static String getGithubClientSecret() {
		if (User.githubClientSecret == null) {
			User.githubClientSecret = Tools.getConfig("githubClientSecret");
		}
		return User.githubClientSecret;
	}
	public static String getGithubClientId() {
		if (User.githubClientId == null) {
			User.githubClientId = Tools.getConfig("githubClientId");
		}
		return User.githubClientId;
	}

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
		ADMIN(99, "管理员"),
		BOSS(9999, "AJ");
		
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
		WEIBO(2, "WEIBO"),
		GITHUB(3, "GITHUB");
		
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
	
	private long id;
	private String username;
	private String nickname;
	private int sex;
	private String openId;
	private String accessToken;
	private int userRights = UserRights.NORMAL.id;
	private String dateEntered;
	private int from;
	private String img;
	
	public static final String SIGN_SESSION_ATTR = "aj-sign-sess-status";
	
	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
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
	public long getId() {
		return id;
	}
	public void setId(long id) {
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
	 * 获取用户的昵称, 如果用户没有自己设定,则返回默认的登陆名
	 */
	public String getFinalName() {
		if (this.nickname != null && !this.nickname.trim().equals("")) {
			return this.nickname;
		}
		return this.username;
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
	
	/**
	 * @param request
	 * @return null if not login
	 */
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
		
		if (itemsid.size() > 0) {
			Session session2 = HibernateUtil.getSession();
			Criteria cr2 = session2.createCriteria(Item.class);
			
			cr2.add(Restrictions.in("id", itemsid));
			
			items = cr2.list();
			
			HibernateUtil.closeSession(session2);
		}
		
		return items;
	}
	

	
	
	public class WeiboAccess {
		private String access_token;
		private String expires_in;
		private String remind_in;
		private String uid;
		public String getAccess_token() {
			return access_token;
		}
		public void setAccess_token(String access_token) {
			this.access_token = access_token;
		}
		public String getExpires_in() {
			return expires_in;
		}
		public void setExpires_in(String expires_in) {
			this.expires_in = expires_in;
		}
		public String getRemind_in() {
			return remind_in;
		}
		public void setRemind_in(String remind_in) {
			this.remind_in = remind_in;
		}
		public String getUid() {
			return uid;
		}
		public void setUid(String uid) {
			this.uid = uid;
		}
		
		/**
		 * 如果获取到了access_token 说明请求授权正常, 如果为null说明请求授权失败
		 * @return
		 */
		public boolean isOK() {
			return this.access_token != null;
		}
	}
	
	
	public class WeiboUserSimpleModel {
		private String id;
		private String name;
		private String avatar_large;

		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getAvatar_large() {
			return avatar_large;
		}
		public void setAvatar_large(String avatar_large) {
			this.avatar_large = avatar_large;
		}
	}
	

	public class QQAccess {
		private String access_token;
		private String expires_in;
		private String refresh_token;
		public String getAccess_token() {
			return access_token;
		}
		public void setAccess_token(String access_token) {
			this.access_token = access_token;
		}
		public String getExpires_in() {
			return expires_in;
		}
		public void setExpires_in(String expires_in) {
			this.expires_in = expires_in;
		}
		public String getRefresh_token() {
			return refresh_token;
		}
		public void setRefresh_token(String refresh_token) {
			this.refresh_token = refresh_token;
		}
		
		public boolean isOK() {
			return this.access_token != null;
		}
	}
	
	public class QQUserSimpleModel {
		/**
		 * ret== 0 means alright!
		 */
		private int ret;
		private String nickname;
		/**
		 * 大头像
		 */
		private String figureurl_qq_2;
		/**
		 * 小头像
		 */
		private String figureurl_qq_1;
		public int getRet() {
			return ret;
		}
		public void setRet(int ret) {
			this.ret = ret;
		}
		public String getNickname() {
			return nickname;
		}
		public void setNickname(String nickname) {
			this.nickname = nickname;
		}
		public String getFigureurl_qq_2() {
			return figureurl_qq_2;
		}
		public void setFigureurl_qq_2(String figureurl_qq_2) {
			this.figureurl_qq_2 = figureurl_qq_2;
		}
		public String getFigureurl_qq_1() {
			return figureurl_qq_1;
		}
		public void setFigureurl_qq_1(String figureurl_qq_1) {
			this.figureurl_qq_1 = figureurl_qq_1;
		}
		/**
		 * 模型中有俩个图片属性, 其中较大的那个可能不存在, 所以需要返回其中一个
		 * @return
		 */
		public String getUserimg() {
			if (this.figureurl_qq_2 != null && this.figureurl_qq_2 != "") {
				return this.figureurl_qq_2;
			} else {
				return this.figureurl_qq_1;
			}
		}
	}
	
	
	/**
	 * 返回的对象中包含用户uid 和 access_token<br>
	 * 如果出现异常, 返回null
	 * @param code
	 * @return
	 */
	public static WeiboAccess getWeiboAccess(String code) {
		
		HttpClient client = HttpClientBuilder.create().build();
		
		HttpPost post = new HttpPost("https://api.weibo.com/oauth2/access_token");
		
		List<NameValuePair> pairs = new ArrayList<NameValuePair>();
		pairs.add(new BasicNameValuePair("client_id", User.getWeiboAppKey()));
		pairs.add(new BasicNameValuePair("client_secret", User.getWeiboSecret()));
		pairs.add(new BasicNameValuePair("grant_type", "authorization_code"));
		pairs.add(new BasicNameValuePair("code", code));
		pairs.add(new BasicNameValuePair("redirect_uri", "http://www.nigeerhuo.com/sign/weibo"));
				
		StringBuffer result = new StringBuffer();
		
		try {
			
			post.setEntity(new UrlEncodedFormEntity(pairs));
			HttpResponse back = client.execute(post);

			BufferedReader rd = new BufferedReader(
			        new InputStreamReader(back.getEntity().getContent()));

			
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			
			Gson gson = new Gson();
			WeiboAccess wa = gson.fromJson(result.toString(), User.WeiboAccess.class);
			
			return wa;
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	
	public static QQAccess getQQAccess(String code) {
		String url = "https://graph.qq.com/oauth2.0/token";
		Map<String, String> map = new HashMap<String, String>();
		
		map.put("grant_type", "authorization_code");
		map.put("client_id", User.getQqAppId());
		map.put("client_secret", User.getQqAppKey());
		map.put("code", code);
		map.put("redirect_uri", UrlRoute.QQ_REDIRECT.getUrl());
		
		AjaxRequest.Config config = (new AjaxRequest()).new Config(url, map, "GET");
		
		String response = AjaxRequest.getResponse(config);
		// access_token=FE04************************CCE2&expires_in=7776000&refresh_token=88E4************************BE14
		Gson gson = new Gson();
		// QQAccess qa = gson.fromJson(response, User.QQAccess.class);
		
		String[] params = response.split("&");
		QQAccess qa = (new User()).new QQAccess();
		
		for (String param : params) {
			String[] arr = param.split("=");

			if (arr[0].equals("access_token")) {
				qa.setAccess_token(arr[1]);
			} else if (arr[0].equals("expires_in")) {
				qa.setExpires_in(arr[1]);
			} else if (arr[0].equals("refresh_token")) {
				qa.setRefresh_token(arr[1]);
			}
		}
		
		return qa;
	}
	
	public static WeiboUserSimpleModel getWeiboUserSimpleModel(WeiboAccess wa) {
		String url = "https://api.weibo.com/2/users/show.json";
		Map<String, String> map = new HashMap<String, String>();
		map.put("access_token", wa.getAccess_token());
		map.put("uid", wa.getUid());
		String method = "GET";
		
		AjaxRequest.Config config = (new AjaxRequest()).new Config(url, map, method);
		
		String response = AjaxRequest.getResponse(config);
		
		Gson gson = new Gson();
		WeiboUserSimpleModel wsm = gson.fromJson(response, User.WeiboUserSimpleModel.class);
		
		return wsm;
	}
	
	public class QQOpenIdModel {
		private String client_id;
		private String openid;
		public String getClient_id() {
			return client_id;
		}
		public void setClient_id(String client_id) {
			this.client_id = client_id;
		}
		public String getOpenid() {
			return openid;
		}
		public void setOpenid(String openid) {
			this.openid = openid;
		}
	}
	

	
	public static QQOpenIdModel getQQOpenId(QQAccess qa) {
		String url = "https://graph.qq.com/oauth2.0/me";
		Map<String, String> map = new HashMap<String, String>();
		map.put("access_token", qa.getAccess_token());
		String method = "GET";
		
		AjaxRequest.Config config = (new AjaxRequest()).new Config(url, map, method);
		
		String response = AjaxRequest.getResponse(config);
		
		
		response = response.replaceAll("callback\\(", "");
		response = response.replaceAll("\\)\\W+", "");
		
		Gson gson = new Gson();
		QQOpenIdModel qim = gson.fromJson(response, QQOpenIdModel.class);
		
		return qim;
	}
	
	public static void main(String[] args) {
//		String response = "callback( {\"client_id\":\"YOUR_APPID\",\"openid\":\"YOUR_OPENID\"} );";
//		
//		response = response.replaceAll("callback\\(", "");
//		response = response.replaceAll("\\)\\W+", "");
//		//reponse.replaceFirst(")\\$", "");
//		
//		System.out.println(response);
		
		
//		System.out.println(User.githubClientSecret);
		
	}
	
	public static QQUserSimpleModel getQQSimpleModel(QQAccess qa, QQOpenIdModel qim) {
		String url = "https://graph.qq.com/user/get_user_info";
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("access_token", qa.getAccess_token());
		map.put("openid", qim.getOpenid());
		map.put("format", "json");
		map.put("oauth_consumer_key", User.getQqAppId());
		String method = "GET";
		
		AjaxRequest.Config config = (new AjaxRequest()).new Config(url, map, method);
		
		String response = AjaxRequest.getResponse(config);
		
		Gson gson = new Gson();
		
		QQUserSimpleModel qsm = gson.fromJson(response, QQUserSimpleModel.class);
		
		return qsm;
	}
	
	
	public class GithubAccessToken {
		private String access_token;
		private String scope;
		private String token_type;
		public String getAccess_token() {
			return access_token;
		}
		public void setAccess_token(String access_token) {
			this.access_token = access_token;
		}
		public String getScope() {
			return scope;
		}
		public void setScope(String scope) {
			this.scope = scope;
		}
		public String getToken_type() {
			return token_type;
		}
		public void setToken_type(String token_type) {
			this.token_type = token_type;
		}
		public boolean isOK() {
			return this.access_token != null;
		}
		
	}
	
	public static GithubAccessToken getGithubAccessToken(String code, String state) {
		String url = "https://github.com/login/oauth/access_token";
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("client_id", User.getGithubClientId());
		map.put("client_secret", User.getGithubClientSecret());
		map.put("code", code);
		map.put("state", state);
		
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Accept", "application/json");
		
		String method = "POST";
		
		AjaxRequest.Config config = (new AjaxRequest()).new Config(url, map, method);
		config.setHeaders(headers);
		
		String response = AjaxRequest.getResponse(config);
		
		Gson gson = new Gson();
		
		GithubAccessToken gat = gson.fromJson(response, GithubAccessToken.class);
		
		return gat;
	}
	
	public class GithubUserSimpleModel {
		private String id;
		private String login;
		private String avatar_url;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getLogin() {
			return login;
		}
		public void setLogin(String login) {
			this.login = login;
		}
		public String getAvatar_url() {
			return avatar_url;
		}
		public void setAvatar_url(String avatar_url) {
			this.avatar_url = avatar_url;
		}
	}
	
	public static GithubUserSimpleModel getGithubUserSimpleModel(GithubAccessToken gat) {
		String url = "https://api.github.com/user?access_token=" + gat.getAccess_token();
		
		AjaxRequest.Config config = (new AjaxRequest()).new Config(url, null, "GET");
		
		String response = AjaxRequest.getResponse(config);
		
		Gson gson = new Gson();
		GithubUserSimpleModel gusm = gson.fromJson(response, GithubUserSimpleModel.class);
		
		return gusm;
	}
	
	/**
	 * 随机获取一个二货官方小编
	 * @return
	 */
	public static User getAEditorByRandom() {
		// TODO AJ
		return null;
	}
	
	
}
