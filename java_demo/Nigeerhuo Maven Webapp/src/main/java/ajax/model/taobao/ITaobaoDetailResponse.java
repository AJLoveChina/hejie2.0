package ajax.model.taobao;

import java.util.List;

public class ITaobaoDetailResponse {
	
	public class Item {
		public String detail_url;
	}
	public class Aitaobao_item_detail {
		public Item item;
	}
	public class Atb_item_details {
		public List<Aitaobao_item_detail> aitaobao_item_detail;
	}
	public class Atb_items_detail_get_response{
		public Atb_item_details atb_item_details;
	}
	
	public Atb_items_detail_get_response atb_items_detail_get_response;
}
