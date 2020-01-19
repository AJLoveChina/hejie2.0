package ajax.model.taobao;

import java.util.List;

public class ItemGetResponse {

	class Results {
		private List<TbkItem> n_tbk_item;

		public List<TbkItem> getN_tbk_item() {
			return n_tbk_item;
		}

		public void setN_tbk_item(List<TbkItem> n_tbk_item) {
			this.n_tbk_item = n_tbk_item;
		}
	}
	class TbkItemGetResponse {
		private Results results;
		private long total_results;
		private String request_id;
		
		public Results getResults() {
			return results;
		}
		public void setResults(Results results) {
			this.results = results;
		}
		public long getTotal_results() {
			return total_results;
		}
		public void setTotal_results(long total_results) {
			this.total_results = total_results;
		}
		public String getRequest_id() {
			return request_id;
		}
		public void setRequest_id(String request_id) {
			this.request_id = request_id;
		}
		
	}
	
	private TbkItemGetResponse tbk_item_get_response;

	public TbkItemGetResponse getTbk_item_get_response() {
		return tbk_item_get_response;
	}

	public void setTbk_item_get_response(TbkItemGetResponse tbk_item_get_response) {
		this.tbk_item_get_response = tbk_item_get_response;
	}
	
}
