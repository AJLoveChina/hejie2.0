package ajax.model.taobao;

import java.util.List;

import ajax.model.taobao.model.TbkItem;

public class ItemInfoGetResponse<X> {
	
	class R {
		public List<X> n_tbk_item;
	}
	class T {
		public R results;
	}
	public T tbk_item_info_get_response;
}
