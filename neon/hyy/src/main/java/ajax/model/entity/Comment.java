package ajax.model.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import ajax.model.UniqueString;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;
import ajax.model.safe.User;
import ajax.tools.HibernateUtil;

public class Comment extends RealTimePaginationConfiguration<Comment>{
	
	private long id;
	private long parentid = 0;
	private String commentsGroupId;
	private long userid;
	private String nickname;
	private String userimg;
	private String userInfoJson;
	private String content;
	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getUserimg() {
		return userimg;
	}
	public void setUserimg(String userimg) {
		this.userimg = userimg;
	}
	public String getUserInfoJson() {
		return userInfoJson;
	}
	public void setUserInfoJson(String userInfoJson) {
		this.userInfoJson = userInfoJson;
	}
	public long getParentid() {
		return parentid;
	}
	public void setParentid(long parentid) {
		this.parentid = parentid;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}

	public String getCommentsGroupId() {
		return commentsGroupId;
	}
	public void setCommentsGroupId(String commentsGroupId) {
		this.commentsGroupId = commentsGroupId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	

	
	public Comment(long id, long parentid, String commentsGroupId, long userid, String content) {
		super();
		this.id = id;
		this.parentid = parentid;
		this.commentsGroupId = commentsGroupId;
		this.userid = userid;
		this.content = content;
	}
	public Comment() {
		super();
	}
	public static void main(String[] args) {
//		Comment comment = new Comment();
////		comment.setCommentsGroupId(1);
////		comment.setContent("Hello Jack!");
////		comment.setUserid(13);
//		
//		comment.load(2L);
//		comment.setContent("Hi~7777~");
//		comment.update();
	}
	
	/**
	 * 从用户实体中获取相应字段的信息
	 * @param user
	 */
	public void configFromUser(User user) {
		this.setNickname(user.getFinalName());
		this.setUserid(user.getId());
		this.setUserimg(user.getImg());
		this.setUserInfoJson("");
	}
	public static List<Comment> getListByGroupIdAndPage(String commentsGroupId2, Integer page, int size) {
		Session session = HibernateUtil.getCurrentSession();
		try {
			session.beginTransaction();
			Criteria criteria = session.createCriteria(Comment.class);
			criteria.add(Restrictions.eq("commentsGroupId", commentsGroupId2));
			criteria.addOrder(Order.desc("id"));
			criteria.setFirstResult((page - 1) * size);
			criteria.setMaxResults(size);
			return criteria.list();
		} catch(Exception ex) {
			return new ArrayList<Comment>();
		} finally {
			session.getTransaction().commit();
		}
	}
	
	
	@Override
	public int getPaginationPageSize() {
		return 20;
	}
	@Override
	public String getPrimaryKeyValue() {
		return this.getId() + "";
	}
	@Override
	public String getPaginationPrimaryKey() {
		return "id";
	}
	@Override
	public ajax.model.pagesSeparate.RealTimePaginationConfiguration.PK_TYPE getPaginationPrimaryKeyType() {
		return PK_TYPE.LONG;
	}
	
	
}
