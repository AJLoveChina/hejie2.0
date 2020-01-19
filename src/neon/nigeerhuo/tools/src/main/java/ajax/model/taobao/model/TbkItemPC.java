package ajax.model.taobao.model;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;

import ajax.model.ItemStatus;

public class TbkItemPC extends TbkItem<TbkItemPC>{
	public static String getGroupId(int goodsTypeId) {
		return "ajax.model.taobao.model.TbkItemPC-" + goodsTypeId + "-" + Platform.PC.getId();
	}

	private static Platform platform = Platform.PC;
	@Override
	public String getDetailUrl() {
		return TbkItem.DETAIL_URL_PREFIX + "pc/" + this.getId();
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
