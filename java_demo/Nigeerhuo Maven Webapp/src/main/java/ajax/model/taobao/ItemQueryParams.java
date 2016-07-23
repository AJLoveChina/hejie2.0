package ajax.model.taobao;

public class ItemQueryParams {
	private String fields;
	private String q = null;
	private String cat = null;
	private String itemloc = null;
	private TbkItemSort sort = TbkItemSort.DEFAULT;
	private boolean is_tmall = false;
	private boolean is_overseas = false;
	private Long start_price = null;
	private Long end_price = null;
	private Long start_tk_rate = null;
	private Long end_tk_rate = null;
	private Platform platform = Platform.PC;
	private Long page_no = 1L;
	private Long page_size = 20L;
	public String getFields() {
		return fields;
	}
	public void setFields(String fields) {
		this.fields = fields;
	}
	public String getQ() {
		return q;
	}
	public void setQ(String q) {
		this.q = q;
	}
	public String getCat() {
		return cat;
	}
	public void setCat(String cat) {
		this.cat = cat;
	}
	public String getItemloc() {
		return itemloc;
	}
	public void setItemloc(String itemloc) {
		this.itemloc = itemloc;
	}
	public TbkItemSort getSort() {
		return sort;
	}
	public void setSort(TbkItemSort sort) {
		this.sort = sort;
	}
	public boolean isIs_tmall() {
		return is_tmall;
	}
	public void setIs_tmall(boolean is_tmall) {
		this.is_tmall = is_tmall;
	}
	public boolean isIs_overseas() {
		return is_overseas;
	}
	public void setIs_overseas(boolean is_overseas) {
		this.is_overseas = is_overseas;
	}
	public Long getStart_price() {
		return start_price;
	}
	public void setStart_price(Long start_price) {
		this.start_price = start_price;
	}
	public Long getEnd_price() {
		return end_price;
	}
	public void setEnd_price(Long end_price) {
		this.end_price = end_price;
	}
	public Long getStart_tk_rate() {
		return start_tk_rate;
	}
	public void setStart_tk_rate(Long start_tk_rate) {
		this.start_tk_rate = start_tk_rate;
	}
	public Long getEnd_tk_rate() {
		return end_tk_rate;
	}
	public void setEnd_tk_rate(Long end_tk_rate) {
		this.end_tk_rate = end_tk_rate;
	}
	public Platform getPlatform() {
		return platform;
	}
	public void setPlatform(Platform platform) {
		this.platform = platform;
	}
	public Long getPage_no() {
		return page_no;
	}
	public void setPage_no(Long page_no) {
		this.page_no = page_no;
	}
	public Long getPage_size() {
		return page_size;
	}
	public void setPage_size(Long page_size) {
		this.page_size = page_size;
	}
	
	
	public ItemQueryParams(String fields) {
		super();
		this.fields = fields;
	}
}
