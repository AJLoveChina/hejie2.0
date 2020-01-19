package ajax.model.taobao.model;

import java.util.List;

public class ITaobaoResponse {
	
	public class Items {
		public List<ITaobao> aitaobao_item;
	}
	public class Atb_items_get_response{
		public Items items;
		public int total_results;
	}
	
	public Atb_items_get_response atb_items_get_response;
	
}
