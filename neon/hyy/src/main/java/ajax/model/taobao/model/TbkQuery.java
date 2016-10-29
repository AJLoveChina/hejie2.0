package ajax.model.taobao.model;

public class TbkQuery {
	public int plateForm;
	public int page = 1;
	public int goodsTypeId;
	public int size = 20;
	public String keyword = null;
	
	private transient Platform platformObj = null;
	
	public boolean isSetKeyword() {
		return this.keyword != null && !"".equals(this.keyword.trim());
	}
	
	public Platform getPlatForm() {
		if (this.platformObj == null) {
			Platform[] platforms = Platform.values();
			for (Platform p : platforms) {
				if (p.getId() == plateForm) {
					this.platformObj = p;
					break;
				}
			}
		}
		if (this.platformObj == null) this.platformObj = Platform.UNKNOW;
		return this.platformObj;
	}
}
