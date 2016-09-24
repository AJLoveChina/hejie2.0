package ajax.model.entity;

public class Comment extends Entity<Comment>{
	
	private long id;
	private long parentid;
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
	
	
}
