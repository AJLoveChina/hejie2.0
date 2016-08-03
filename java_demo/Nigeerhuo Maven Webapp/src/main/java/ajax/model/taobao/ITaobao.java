package ajax.model.taobao;

import java.net.URI;
import java.net.URL;

import org.hibernate.Session;

import ajax.model.entity.Entity;
import ajax.tools.HibernateUtil;

import com.google.gson.Gson;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AtbItemsDetailGetRequest;
import com.taobao.api.request.AtbItemsGetRequest;
import com.taobao.api.response.AtbItemsDetailGetResponse;
import com.taobao.api.response.AtbItemsGetResponse;

public class ITaobao extends Entity<ITaobao>{
	public static final String TABLE_NAME = "ITaobao";
	
	private int id;
	private String open_iid;
	private long seller_id;
	private String nick = "";
	private String title = "";
	private float price;
	private String item_location = "";
	private int seller_credit_score;
	private String pic_url = "";
	private String coupon_rate = "";
	private float coupon_price;
	private String coupon_start_time = "";
	private String coupon_end_time = "";
	private String commission_rate = "";
	private float commission;
	private String commission_num = "";
	private float commission_volume;
	private int volume;
	private String shop_type = "";
	private float promotion_price;
	private String dateEntered;
	private String detail_url;
	
	
	public String getDetail_url() {
		return detail_url;
	}
	public void setDetail_url(String detail_url) {
		this.detail_url = detail_url;
	}
	public String getDateEntered() {
		return dateEntered;
	}
	public void setDateEntered(String dateEntered) {
		this.dateEntered = dateEntered;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOpen_iid() {
		return open_iid;
	}
	public void setOpen_iid(String open_iid) {
		this.open_iid = open_iid;
	}
	public long getSeller_id() {
		return seller_id;
	}
	public void setSeller_id(long seller_id) {
		this.seller_id = seller_id;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getItem_location() {
		return item_location;
	}
	public void setItem_location(String item_location) {
		this.item_location = item_location;
	}
	public int getSeller_credit_score() {
		return seller_credit_score;
	}
	public void setSeller_credit_score(int seller_credit_score) {
		this.seller_credit_score = seller_credit_score;
	}
	public String getPic_url() {
		return pic_url;
	}
	public void setPic_url(String pic_url) {
		this.pic_url = pic_url;
	}
	public String getCoupon_rate() {
		return coupon_rate;
	}
	public void setCoupon_rate(String coupon_rate) {
		this.coupon_rate = coupon_rate;
	}
	public float getCoupon_price() {
		return coupon_price;
	}
	public void setCoupon_price(float coupon_price) {
		this.coupon_price = coupon_price;
	}
	public String getCoupon_start_time() {
		return coupon_start_time;
	}
	public void setCoupon_start_time(String coupon_start_time) {
		this.coupon_start_time = coupon_start_time;
	}
	public String getCoupon_end_time() {
		return coupon_end_time;
	}
	public void setCoupon_end_time(String coupon_end_time) {
		this.coupon_end_time = coupon_end_time;
	}
	public String getCommission_rate() {
		return commission_rate;
	}
	public void setCommission_rate(String commission_rate) {
		this.commission_rate = commission_rate;
	}
	public float getCommission() {
		return commission;
	}
	public void setCommission(float commission) {
		this.commission = commission;
	}
	public String getCommission_num() {
		return commission_num;
	}
	public void setCommission_num(String commission_num) {
		this.commission_num = commission_num;
	}
	public float getCommission_volume() {
		return commission_volume;
	}
	public void setCommission_volume(float commission_volume) {
		this.commission_volume = commission_volume;
	}
	public int getVolume() {
		return volume;
	}
	public void setVolume(int volume) {
		this.volume = volume;
	}
	public String getShop_type() {
		return shop_type;
	}
	public void setShop_type(String shop_type) {
		this.shop_type = shop_type;
	}
	public float getPromotion_price() {
		return promotion_price;
	}
	public void setPromotion_price(float promotion_price) {
		this.promotion_price = promotion_price;
	}
	
	/**
	 * 因为淘宝在taobao.atb.items.get (爱淘宝商品查询)中没有返回商品链接, 所以需要再次发送请求查询商品链接<br>
	 * 我很纳闷为什么淘宝不在上面提到的这一个接口中提供商品链接, 日了狗了
	 * @return
	 */
	public boolean getDetailUrlFromTaobao() {
		TaobaoClient client = new DefaultTaobaoClient(Taobao.itaobaoUrl, Taobao.getTAOBAO_NIGEERHUO_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO_APP_SECRET());
		AtbItemsDetailGetRequest req = new AtbItemsDetailGetRequest();
		req.setFields("detail_url");
		req.setOpenIids(this.getOpen_iid());
		AtbItemsDetailGetResponse rsp;
		try {
			
			rsp = client.execute(req);
			String json = rsp.getBody();
			Gson gson = new Gson();
			ITaobaoDetailResponse iTaobaoDetailResponse = gson.fromJson(json, ITaobaoDetailResponse.class);
			String url = iTaobaoDetailResponse.atb_items_detail_get_response.atb_item_details.aitaobao_item_detail.get(0).item.detail_url;
			
			// IF url is not correct, Go exception!
			URL url2 = new URL(url);
			
			this.setDetail_url(url);
			return true;
		} catch (Exception e) {
			
			System.out.println(e.getMessage());
			System.out.println("爱淘宝商品链接获取失败");
		}
		return false;
	}
	
	/**
	 * 保存之前获取detail_url, 获取失败则不保存!
	 */
	@Override
	public boolean save() {
		if (this.getDetail_url() == null || this.getDetail_url().equals("")) {
			if (!this.getDetailUrlFromTaobao()) {
				return false;
			}
		}
		
		Session session = HibernateUtil.getCurrentSession();
		try {
			
			session.beginTransaction();
			
			session.save(this);
			
			session.getTransaction().commit();
			
			return true;
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	public static void main(String[] args) throws ApiException {
		String url = null;
		String appkey = null;
		String secret = null;
		
		TaobaoClient client = new DefaultTaobaoClient(url, appkey, secret);
		AtbItemsGetRequest req = new AtbItemsGetRequest();
		req.setArea("杭州");
		req.setAutoSend("true");
		req.setCid(123L);
		req.setEndCommissionNum("10000");
		req.setEndCommissionRate("2345");
		req.setEndCredit("1heart");
		req.setEndPrice("999");
		req.setEndTotalnum("10");
		req.setFields("open_iid");
		req.setGuarantee("true");
		req.setRealDescribe("true");
		req.setKeyword("abc");
		req.setCashCoupon("true");
		req.setVipCard("true");
		req.setPageNo(1L);
		req.setPageSize(40L);
		req.setOverseasItem("true");
		req.setOnemonthRepair("true");
		req.setSevendaysReturn("true");
		req.setSort("price_desc");
		req.setStartCommissionNum("1000");
		req.setStartCommissionRate("1234");
		req.setStartCredit("1heart");
		req.setStartPrice("1");
		req.setStartTotalnum("1");
		req.setSupportCod("true");
		req.setMallItem("true");
		AtbItemsGetResponse rsp = client.execute(req);
		System.out.println(rsp.getBody());
	}
}
