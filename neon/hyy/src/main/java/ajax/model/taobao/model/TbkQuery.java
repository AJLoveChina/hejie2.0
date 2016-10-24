package ajax.model.taobao.model;

public class TbkQuery {
	public int plateForm;
	public int page;
	public int goodsTypeId;
	
	private Platform platformObj = null;
	
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
