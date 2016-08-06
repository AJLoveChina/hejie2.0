package ajax.model.taobao;

import java.math.BigDecimal;
import java.net.URL;

import org.hibernate.Session;

import ajax.model.FormComponents;
import ajax.model.UrlRoute;
import ajax.model.annotations.FormComponentAnno;
import ajax.model.annotations.FormComponentUrlAnno;
import ajax.model.entity.Entity;
import ajax.tools.HibernateUtil;

import com.google.gson.Gson;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AtbItemsDetailGetRequest;
import com.taobao.api.response.AtbItemsDetailGetResponse;

@FormComponentUrlAnno(submitUrl="/admin/itaobao_item_submit")
public class ITaobao extends Entity<ITaobao>{
	public static final String TABLE_NAME = "ITaobao";
	
	@FormComponentAnno(desc="序号", isHidden=true)
	private long id;
	@FormComponentAnno(desc="序号", isHidden=true)
	private String open_iid;
	private long seller_id;
	private String nick = "";
	@FormComponentAnno(desc="", isHidden=true)
	private String title = "";
	@FormComponentAnno(desc="商品原价(单位:元)", isDisabled=true)
	private float price;
	@FormComponentAnno(desc="商品折扣后价格(单位:元)", isDisabled=true)
	private float promotion_price;
	@FormComponentAnno(desc="佣金(单位:元)", isDisabled=true)
	private float commission;
	private String item_location = "";
	private long seller_credit_score;
	@FormComponentAnno(desc="封面图片", componentType=FormComponents.ComponentType.IMAGE)
	private String pic_url = "";
	private String coupon_rate = "";
	private float coupon_price;
	private String coupon_start_time = "";
	private String coupon_end_time = "";
	private String commission_rate = "";
	private String commission_num = "";
	private float commission_volume;
	private long volume;
	private String shop_type = "";
	private String dateEntered = null;
	@FormComponentAnno(desc="商品链接", componentType=FormComponents.ComponentType.LINK)
	private String detail_url;
	//注意不要使用is开头 否则 hibernate一直报错  ITaobao class not found, cause  there is no getter method for is..
	private boolean hasChangeToItem = false;
	@FormComponentAnno(desc="简要描述(120字左右),如果不写,系统将默认截取内容的前120字", componentType=FormComponents.ComponentType.TEXTAREA)
	private String description = "";
	@FormComponentAnno(desc="编辑内容", componentType=FormComponents.ComponentType.UEDITOR)
	private String content = "";
	
	
	
	

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public boolean isHasChangeToItem() {
		return hasChangeToItem;
	}
	public void setHasChangeToItem(boolean hasChangeToItem) {
		this.hasChangeToItem = hasChangeToItem;
	}
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
	public long getId() {
		return id;
	}
	public void setId(long id) {
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
	public long getSeller_credit_score() {
		return seller_credit_score;
	}
	public void setSeller_credit_score(long seller_credit_score) {
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
	public long getVolume() {
		return volume;
	}
	public void setVolume(long volume) {
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
	
	public float getRewardForUser() {
		float value = this.getCommission() / 2;
		BigDecimal bd = new BigDecimal(value);
		bd = bd.setScale(2, BigDecimal.ROUND_DOWN);
		return bd.floatValue();
	}
	
	public static void main(String[] args) throws ApiException {
		float value = 12.320f;
		BigDecimal bd = new BigDecimal(value);
		bd = bd.setScale(2, BigDecimal.ROUND_DOWN);
		System.out.println(bd.floatValue());
	}
	
	
}
