package ajax.model.taobao.model;

import org.hibernate.Session;

import ajax.model.entity.Entity;

public class TbkItemWap extends TbkItem<TbkItemWap>{
	
	public static String getGroupId(int goodsTypeId) {
		return "ajax.model.taobao.model.TbkItemWap-" + goodsTypeId + "-" + Platform.WAP.getId();
	}

	private static Platform platform = Platform.WAP;
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
