package ajax.model.entity;

public class Comment extends Entity<Comment>{
	
	private long id;
	private long parentid;
	private int commentsGroupId;
	private long userid;
	private String content;
	
	
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
	public int getCommentsGroupId() {
		return commentsGroupId;
	}
	public void setCommentsGroupId(int commentsGroupId) {
		this.commentsGroupId = commentsGroupId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
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
