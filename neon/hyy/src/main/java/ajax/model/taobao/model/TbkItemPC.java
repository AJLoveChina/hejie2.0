package ajax.model.taobao.model;

public class TbkItemPC extends TbkItem<TbkItemPC>{
	public static String getGroupId(int goodsTypeId) {
		return "ajax.model.taobao.model.TbkItemPC-" + goodsTypeId + "-" + Platform.WAP.getId();
	}

	private static Platform platform = Platform.PC;
	@Override
	public String getDetailUrl() {
		return TbkItem.DETAIL_URL_PREFIX + this.getId() + "?platform=" + platform.getId();
	}
	
	
}
