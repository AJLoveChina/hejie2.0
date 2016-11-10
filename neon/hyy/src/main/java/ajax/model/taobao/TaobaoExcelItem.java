package ajax.model.taobao;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.taobao.api.ApiException;

import ajax.model.annotations.ExcelColumnName;
import ajax.model.entity.Entity;
import ajax.model.entity.EntityInterface;
import ajax.model.taobao.model.GoodsType;
import ajax.model.taobao.model.Platform;
import ajax.model.taobao.model.TbkItem;
import ajax.model.taobao.model.TbkItemPC;
import ajax.model.taobao.model.TbkItemWap;

public class TaobaoExcelItem extends Entity<TaobaoExcelItem> implements EntityInterface<TaobaoExcelItem>{
	private long id;
	@ExcelColumnName("商品id")
	private String num_iid;
	@ExcelColumnName("商品名称")
	private String title;
	@ExcelColumnName("商品主图")
	private String pict_url;
	@ExcelColumnName("商品详情页链接地址")
	private String item_url;
	@ExcelColumnName("商品一级类目")
	private String goods_type;
	@ExcelColumnName("淘宝客链接")
	private String click_url;
	@ExcelColumnName("商品价格(单位：元)")
	private String price;
	@ExcelColumnName("商品月销量")
	private String volume;
	@ExcelColumnName("收入比率(%)")
	private String commission_rate;
	@ExcelColumnName("佣金")
	private String commission;
	@ExcelColumnName("卖家旺旺")
	private String nick;
	@ExcelColumnName("卖家id")
	private String nick_id;
	@ExcelColumnName("店铺名称")
	private String shopName;
	@ExcelColumnName("平台类型")//不是指PC or WAP, 二是天猫还是淘宝
	private String website;
	@ExcelColumnName("优惠券id")
	private String coupon_id;
	@ExcelColumnName("优惠券总量")
	private String coupon_total;
	@ExcelColumnName("优惠券剩余量")
	private String coupon_remain;
	@ExcelColumnName("优惠券面额")
	private String coupon_denomination;
	@ExcelColumnName("优惠券开始时间")
	private String coupon_start_time;
	@ExcelColumnName("优惠券结束时间")
	private String coupon_end_time;
	@ExcelColumnName("优惠券链接")
	private String coupon_link;
	@ExcelColumnName("商品优惠券推广链接")
	private String coupon_link_slick;
	
	private Coupon coupon = null;
	
	
	public Coupon getCoupon() {
		return coupon;
	}
	public void setCoupon(Coupon coupon) {
		this.coupon = coupon;
	}
	public String getNick_id() {
		return nick_id;
	}
	public void setNick_id(String nick_id) {
		this.nick_id = nick_id;
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
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getCommission_rate() {
		return commission_rate;
	}
	public void setCommission_rate(String commission_rate) {
		this.commission_rate = commission_rate;
	}
	public String getCommission() {
		return commission;
	}
	public void setCommission(String commission) {
		this.commission = commission;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
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
	
	/**
	 * 生成优惠券实体对象
	 * @return
	 */
	public Coupon toCoupon() {
		
		Gson gson = new Gson();
		String json = gson.toJson(this);
		Coupon coupon = gson.fromJson(json, Coupon.class);
		
		return coupon;
	}
	
	public TbkItemPC toTbkItemPC() throws ApiException {
		TbkItemPC tbkItem = Taobao.getTbkItemByIDFromTaobao(this.num_iid, Platform.PC, TbkItemPC.class);
		
		tbkItemGetFieldInfoFromTaobaoExcelItem(tbkItem);
		return tbkItem;
	}
	
	
	public TbkItemWap toTbkItemWap() {
		TbkItemWap tbkItem = Taobao.getTbkItemByIDFromTaobao(this.num_iid, Platform.WAP, TbkItemWap.class);
		tbkItemGetFieldInfoFromTaobaoExcelItem(tbkItem);
		return tbkItem;
	}
	/**
	 * 从taobaoExcelITem 获取tbkitem的信息并且填充字段
	 * @param tbkItem
	 * @param taobaoExcelItem
	 */
	private void tbkItemGetFieldInfoFromTaobaoExcelItem(TbkItem tbkItem) {

		tbkItem.setGoodsTypeId(TbkItem.getGoodsTypeIdByKeyWord(this.goods_type));
		tbkItem.setClick_url(this.click_url);
		tbkItem.setCommission_rate(this.commission_rate);
		tbkItem.setCommission(Double.parseDouble(this.commission));
		tbkItem.setShopName(this.shopName);
		tbkItem.setWebsite(this.website);
		
		if (this.coupon != null && this.coupon.getId() >  0) {
			tbkItem.setHasCoupon(true);
			tbkItem.setCoupon_id(this.coupon.getId());
			tbkItem.setCoupon_denomination(this.coupon.getCoupon_denomination());
		}

		// 对十分之一的商品的goodsTypeId做特殊处理
		if (Math.random() < 0.1) {
			if (tbkItem.getVolume() > 10000) {
				tbkItem.setGoodsTypeId(GoodsType.All.STARS.id);
			} else if (Double.parseDouble(tbkItem.getZk_final_price()) < 10) {
				tbkItem.setGoodsTypeId(GoodsType.All.JKJ.id);
			}
		}
		
	}
	
}
