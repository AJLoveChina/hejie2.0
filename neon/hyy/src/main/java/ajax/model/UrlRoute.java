package ajax.model;

public enum UrlRoute {
	HOME(1, "/"),
	ONEJOKE(2, "/OneItem"),
	ROOT(3, "/"), 
	type(4, "/type/params"),
	QQ_REDIRECT(5, "http://www.nigeerhuo.com/sign/qq"),
	GITHUB_REDIRECT(6, "http://www.nigeerhuo.com/sign/github"),
	
	DOT_PIC(7, "http://images.nigeerhuo.com/images/web/pic/dot.jpg"),
	PIC_EXAM(8, "http://images.nigeerhuo.com/images/web/pic/exam2.jpg"),
	EXAM(9, "http://www.nigeerhuo.com/exam"),
	OSS_STATIC(10, "static/"),
	OSS_PUBLIC(11, "http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/"),
	PAGE(12, "/page"),
	ONEJOKE_V2(13, "/item"),
	TBK_ITEMS_PAGE_URL_TEMPLATE(14, "/admin/tbkitems/page/{page}"),
	ADMIN_CHANGE_TBKITEM_URL(15, "/admin/tbkitems/changeToItem"), 
	TBK_ITEMS_SUBMIT(16, "/admin/tbkitems/submit"),
	ITAOBAO_ITEMS_PAGE_URL_TEMPLATE(17, "/admin/itaobao/{page}"),
	ADMIN_CHANGE_ITAOBAO_URL(18, "/admin/itaobao/changeToItem"),
	
	
	
	
	ADMIN_ITAOBAO_MANAGEMENT_URL(19, "/admin/itaobaoitems"),
	ADMIN_TBKITEMS_MANAGEMENT_URL(20, "/admin/tbkitems"),
	ADMIN_HOME_ROLLADS_MANAGEMENT_URL(21, "/admin/ads"), 
	ITAOBAO_ITEM_SUBMIT(22, "/admin/itaobao_item_submit"),
	ADMIN_GAME_TEAM_GENERATE_URL(23, "/admin/gameTeamGenerate");;
	
	private int id;
	private String url;
	
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

	UrlRoute(int id, String url) {
		this.id = id;
		this.url = url;
	}
	
	public String toString() {
		return this.url;
	}
	
}
