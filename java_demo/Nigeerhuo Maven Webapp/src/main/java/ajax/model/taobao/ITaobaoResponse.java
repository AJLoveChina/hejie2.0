package ajax.model.taobao;

import java.util.List;

public class ITaobaoResponse {
	
	class Items {
		public List<ITaobao> aitaobao_item;
	}
	class Atb_items_get_response{
		public Items items;
		public int total_results;
	}
	
	public Atb_items_get_response atb_items_get_response;
	
}
