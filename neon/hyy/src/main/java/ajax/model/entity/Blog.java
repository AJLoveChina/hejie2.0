package ajax.model.entity;

import ajax.model.FormComponents.ComponentType;
import ajax.model.UniqueString;
import ajax.model.annotations.FormComponentAnno;
import ajax.model.annotations.FormComponentUrlAnno;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;
import ajax.model.safe.User;

@FormComponentUrlAnno(submitUrl="/blog/submit")
public class Blog extends RealTimePaginationConfiguration<Blog>{

	@FormComponentAnno(isHidden=true)
	private Long id = 0L;
	@FormComponentAnno(isDiscard=true)
	private Long userid = 0L;
	@FormComponentAnno(desc="stamps, 请用逗号分开")
	private String stamps = "";
	@FormComponentAnno()
	private String title = "";
	@FormComponentAnno()
	private String desc = "";
	@FormComponentAnno(componentType=ComponentType.UEDITOR)
	private String content = "";
	@FormComponentAnno(isHidden=true)
	private int view = 1;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getStamps() {
		return stamps;
	}

	public void setStamps(String stamps) {
		this.stamps = stamps;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getView() {
		return view;
	}

	public void setView(int view) {
		this.view = view;
	}

	/**
	 * get stamps array
	 * @return
	 */
	public String[] getStampsArr() {
		if (this.stamps == null || this.stamps.equals("")) return new String[]{};
		
		return this.stamps.split(",");
	}
	
	/**
	 * 是否有content
	 * @return
	 */
	public boolean hasContent() {
		if (this.content == null || this.content.trim().equals("")) return false;
		return true;
	}
	
	@Override
	public int getPaginationPageSize() {
		return 10;
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

	public static String getGroupIdOfUser(User user) {
		return "ajax.model.entity.Blog-" + user.getId();
	}

	@Override
	public String toString() {
		return "Blog [id=" + id + ", userid=" + userid + ", stamps=" + stamps + ", title=" + title + ", desc=" + desc
				+ ", content=" + content + ", view=" + view + "]";
	}

}
