package ajax.model.taobao.model;

import org.hibernate.Session;

public class TbkItemPC extends TbkItem<TbkItemPC>{
	public static String getGroupId(int goodsTypeId) {
		return "ajax.model.taobao.model.TbkItemPC-" + goodsTypeId + "-" + Platform.PC.getId();
	}

	private static Platform platform = Platform.PC;
	@Override
	public String getDetailUrl() {
		return TbkItem.DETAIL_URL_PREFIX + this.getId() + "?platform=" + platform.getId();
	}
	
	@Override
	public void save(Session session) {
		super.save(session);
	}
	
	@Override
	public boolean save() {
		return super.save();
	}
	
	
}
