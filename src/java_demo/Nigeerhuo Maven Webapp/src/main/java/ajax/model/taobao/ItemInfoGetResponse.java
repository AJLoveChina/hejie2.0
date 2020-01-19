package ajax.model.taobao;

import java.util.List;

public class ItemInfoGetResponse {
	
	class R {
		public List<TbkItem> n_tbk_item;
	}
	class T {
		public R results;
	}
	public T tbk_item_info_get_response;
}
