package ajax.model.taobao;

import java.util.List;
import java.util.Random;

import ajax.model.entity.Entity;
import ajax.model.entity.EntityInterface;
import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;

public class Coupon extends Entity<Coupon> implements EntityInterface<Coupon>, RealTimePaginationConfiguration{
	public static final String COUPON_PAGINATION_GROUPID = "ajax.model.taobao.Coupon";
	private long id;
	////@ExcelColumnName("商品id")
	private String num_iid;
	////@ExcelColumnName("商品名称")
	private String title;
	////@ExcelColumnName("商品主图")
	private String pict_url;
	//@ExcelColumnName("商品详情页链接地址")
	private String item_url;
	//@ExcelColumnName("商品一级类目")
	private String goods_type;
	//@ExcelColumnName("淘宝客链接")
	private String click_url;
	//@ExcelColumnName("商品价格(单位：元)")
	private double price;
	//@ExcelColumnName("商品月销量")
	private long volume;
	//@ExcelColumnName("收入比率(%)")
	private String commission_rate;
	//@ExcelColumnName("佣金")
	private double commission;
	//@ExcelColumnName("卖家旺旺")
	private String nick;
	//@ExcelColumnName("卖家id")
	private String nick_id;
	//@ExcelColumnName("店铺名称")
	private String shopName;
	//@ExcelColumnName("平台类型")//不是指PC or WAP, 二是天猫还是淘宝
	private String website;
	//@ExcelColumnName("优惠券id")
	private String coupon_id;
	//@ExcelColumnName("优惠券总量")
	private String coupon_total;
	//@ExcelColumnName("优惠券剩余量")
	private String coupon_remain;
	//@ExcelColumnName("优惠券面额")
	private String coupon_denomination;
	//@ExcelColumnName("优惠券开始时间")
	private String coupon_start_time;
	//@ExcelColumnName("优惠券结束时间")
	private String coupon_end_time;
	//@ExcelColumnName("优惠券链接")
	private String coupon_link;
	//@ExcelColumnName("商品优惠券推广链接")
	private String coupon_link_slick;
	private long likes = 0;
	private long dislikes = 0;
	
	public long getLikes() {
		return likes;
	}
	public void setLikes(long likes) {
		this.likes = likes;
	}
	public long getDislikes() {
		return dislikes;
	}
	public void setDislikes(long dislikes) {
		this.dislikes = dislikes;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNum_iid() {
		return num_iid;
	}
	public void setNum_iid(String num_iid) {
		this.num_iid = num_iid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPict_url() {
		return pict_url;
	}
	public void setPict_url(String pict_url) {
		this.pict_url = pict_url;
	}
	public String getItem_url() {
		return item_url;
	}
	public void setItem_url(String item_url) {
		this.item_url = item_url;
	}
	public String getGoods_type() {
		return goods_type;
	}
	public void setGoods_type(String goods_type) {
		this.goods_type = goods_type;
	}
	public String getClick_url() {
		return click_url;
	}
	public void setClick_url(String click_url) {
		this.click_url = click_url;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public long getVolume() {
		return volume;
	}
	public void setVolume(long volume) {
		this.volume = volume;
	}
	public String getCommission_rate() {
		return commission_rate;
	}
	public void setCommission_rate(String commission_rate) {
		this.commission_rate = commission_rate;
	}
	public double getCommission() {
		return commission;
	}
	public void setCommission(double commission) {
		this.commission = commission;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getNick_id() {
		return nick_id;
	}
	public void setNick_id(String nick_id) {
		this.nick_id = nick_id;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getCoupon_id() {
		return coupon_id;
	}
	public void setCoupon_id(String coupon_id) {
		this.coupon_id = coupon_id;
	}
	public String getCoupon_total() {
		return coupon_total;
	}
	public void setCoupon_total(String coupon_total) {
		this.coupon_total = coupon_total;
	}
	public String getCoupon_remain() {
		return coupon_remain;
	}
	public void setCoupon_remain(String coupon_remain) {
		this.coupon_remain = coupon_remain;
	}
	public String getCoupon_denomination() {
		return coupon_denomination;
	}
	public void setCoupon_denomination(String coupon_denomination) {
		this.coupon_denomination = coupon_denomination;
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
	public String getCoupon_link() {
		return coupon_link;
	}
	public void setCoupon_link(String coupon_link) {
		this.coupon_link = coupon_link;
	}
	public String getCoupon_link_slick() {
		return coupon_link_slick;
	}
	public void setCoupon_link_slick(String coupon_link_slick) {
		this.coupon_link_slick = coupon_link_slick;
	}
	
	
	@Override
	public int getPaginationPageSize() {
		return 20;
	}
	@Override
	public String getPrimaryKeyValue() {
		return this.getId() + "";
	}
	@Override
	public String getPaginationPrimaryKey() {
		return "id";
	}
	@Override
	public PK_TYPE getPaginationPrimaryKeyType() {
		return PK_TYPE.LONG;
	}
	
	public static void main(String[] args) {
		List<Coupon> coupons = Coupon.get(1, 1000, Coupon.class);
		
		RealTimePagination<Coupon> pagination = new RealTimePagination<>();
		for (Coupon coupon : coupons) {
			pagination.saveWithoutSaveT(Coupon.COUPON_PAGINATION_GROUPID, coupon);
		}
	}
	@Override
	public String toString() {
		return "Coupon [id=" + id + ", num_iid=" + num_iid + ", title=" + title + ", pict_url=" + pict_url
				+ ", item_url=" + item_url + ", goods_type=" + goods_type + ", click_url=" + click_url + ", price="
				+ price + ", volume=" + volume + ", commission_rate=" + commission_rate + ", commission=" + commission
				+ ", nick=" + nick + ", nick_id=" + nick_id + ", shopName=" + shopName + ", website=" + website
				+ ", coupon_id=" + coupon_id + ", coupon_total=" + coupon_total + ", coupon_remain=" + coupon_remain
				+ ", coupon_denomination=" + coupon_denomination + ", coupon_start_time=" + coupon_start_time
				+ ", coupon_end_time=" + coupon_end_time + ", coupon_link=" + coupon_link + ", coupon_link_slick="
				+ coupon_link_slick + "]";
	}
	
	/**
	 * 补充一些字段的信息, 根据已有的字段信息
	 */
	public void calculateMoreInfo() {
		/**
		 * 1.set likes and dislikes
		 */
		Random rd = new Random();
		this.likes = this.volume / 10;
		this.dislikes = this.likes / (6 + rd.nextInt(4));
		if (this.commission < 1 && this.volume < 2000) {
			this.dislikes = this.likes * (1 + rd.nextInt(2));
		}
		
		if (this.volume < 1000) {
			this.dislikes += this.likes / 4;
		}
		
		if (this.volume > 3000) {
			this.dislikes /= 2;
		}
	}
	
	
}
