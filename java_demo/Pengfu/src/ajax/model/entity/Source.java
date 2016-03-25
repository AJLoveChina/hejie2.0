package ajax.model.entity;

public class Source extends Entity{
	private int id;
	private String url;
	private int itype;
	private int rulestagid;
	private boolean isGrab = false;
	private int likes;
	
	
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
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
	public int getItype() {
		return itype;
	}
	public void setItype(int itype) {
		this.itype = itype;
	}
	public int getRulestagid() {
		return rulestagid;
	}
	public void setRulestagid(int rulestagid) {
		this.rulestagid = rulestagid;
	}
	public boolean isGrab() {
		return isGrab;
	}
	public boolean getIsGrab() {
		return isGrab;
	}
	public void setIsGrab(boolean isGrab) {
		this.isGrab = isGrab;
	}
	public void setGrab(boolean isGrab) {
		this.isGrab = isGrab;
	}
	@Override
	public String toString() {
		return "Source [id=" + id + ", url=" + url + ", itype=" + itype
				+ ", rulestagid=" + rulestagid + ", isGrab=" + isGrab
				+ ", likes=" + likes + "]";
	}
	
	
}
