package ajax.model.taobao.model;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;import org.hibernate.transform.RootEntityResultTransformer;

import ajax.model.FormComponents;
import ajax.model.ItemStatus;
import ajax.model.annotations.FormComponentAnno;
import ajax.model.annotations.FormComponentUrlAnno;
import ajax.model.entity.Entity;
import ajax.model.entity.EntityInterface;
import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;
import ajax.model.taobao.Coupon;
import ajax.model.taobao.TaobaoUtil;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;
/**
 * 
 * 关于TbkItem的几个任务
 * 1. TaobaoUtil.grabTbkItemsFromXuanpinkuAndSaveToPcAndWapTable();
 * 	  自动抓取淘宝客选品库商品并保存到数据库中
 * 2. TbkItem.generateTbkItemsPCAndWapPages();
 *    从淘宝客商品数据库中生成页面
 * @author ajax
 *
 * @param <T>
 */
@FormComponentUrlAnno(submitUrl="/admin/tbkitems/submit")
public abstract class TbkItem<T> extends Entity<T> implements EntityInterface<T>,RealTimePaginationConfiguration{
	public class SmallImages{
		private List<String> string;

		public List<String> getString() {
			return string;
		}
		public void setString(List<String> string) {
			this.string = string;
		}
	}
	
	@FormComponentAnno(desc="自增序号", isHidden=true)
	private long id;
	@FormComponentAnno(desc="淘宝序号", isHidden=true)
	private long num_iid;
	@FormComponentAnno(desc="标题")
	private String title;
	@FormComponentAnno(desc="封面图片", componentType=FormComponents.ComponentType.IMAGE)
	private String pict_url;
	@FormComponentAnno(isDiscard=true)
	private SmallImages small_images;
	@FormComponentAnno(isHidden=true)
	private String small_images_string;
	@FormComponentAnno(desc="商品一口价格", isDisabled=true)
	private String reserve_price;
	@FormComponentAnno(desc="商品折扣价格", isDisabled=true)
	private String zk_final_price;
	@FormComponentAnno(isHidden=true)
	private long user_type;
	@FormComponentAnno(desc="宝贝所在地", isDisabled=true)
	private String provcity;
	@FormComponentAnno(desc="商品链接", componentType=FormComponents.ComponentType.LINK)
	private String item_url;
	@FormComponentAnno(desc="商品slick链接", componentType = FormComponents.ComponentType.LINK)
	private String click_url;
	@FormComponentAnno(desc="卖家昵称", isDisabled=true)
	private String nick;
	@FormComponentAnno(isDiscard=true)
	private long seller_id;
	@FormComponentAnno(desc="30天内交易量(Tip:根据销售量可以判断该商品是否容易转化)", isDisabled=true)
	private long volume;
	@FormComponentAnno(desc="无线折扣价，即宝贝在无线上的实际售卖价格。", componentType = FormComponents.ComponentType.TEXT, isDisabled=true)
	private double zk_final_price_wap;
	@FormComponentAnno(desc="招商活动开始时间； 如果该宝贝取自普通选品组，则取值为1970-01-01 00:00:00；",  componentType = FormComponents.ComponentType.TEXT, isDisabled=true)
	private String event_start_time;
	@FormComponentAnno(desc="招行活动的结束时间； 如果该宝贝取自普通的选品组，则取值为1970-01-01 00:00:00",  componentType = FormComponents.ComponentType.TEXT, isDisabled=true)
	private String event_end_time;
	@FormComponentAnno(desc="简要描述(120字左右),如果不写,系统将默认截取内容的前120字", componentType=FormComponents.ComponentType.TEXTAREA)
	private String description = "";
	@FormComponentAnno(desc="编辑内容", componentType=FormComponents.ComponentType.UEDITOR)
	private String content = "";
	private int goodsTypeId = 140;	// 140 means all type
	private String commission_rate;
	//佣金
	private Double commission = 0.0;
	private String website;
	private String shopName;
	private boolean hasCoupon = false;
	private long coupon_id = 0;
	private String coupon_link_slick  = "";
	private String coupon_denomination;
	
	
	
	public void setCoupon_link_slick(String coupon_link_slick) {
		this.coupon_link_slick = coupon_link_slick;
	}
	public String getCoupon_link_slick() {
		return coupon_link_slick;
	}
	public String getCoupon_denomination() {
		return coupon_denomination;
	}
	public void setCoupon_denomination(String coupon_denomination) {
		this.coupon_denomination = coupon_denomination;
	}
	public boolean isHasCoupon() {
		return hasCoupon;
	}
	public void setHasCoupon(Boolean hasCoupon) {
		if (hasCoupon == null) hasCoupon = false;
		this.hasCoupon = hasCoupon;
	}
	public long getCoupon_id() {
		return coupon_id;
	}
	public void setCoupon_id(Long coupon_id) {
		if (coupon_id == null) coupon_id = 0L;
		this.coupon_id = coupon_id;
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
	public String getCommission_rate() {
		return commission_rate;
	}
	public void setCommission_rate(String commission_rate) {
		this.commission_rate = commission_rate;
	}
	public Double getCommission() {
		return commission;
	}
	public void setCommission(Double commission) {
		this.commission = commission;
	}
	public int getGoodsTypeId() {
		return goodsTypeId;
	}
	public void setGoodsTypeId(int goodsTypeId) {
		this.goodsTypeId = goodsTypeId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getClick_url() {
		return click_url;
	}
	public void setClick_url(String click_url) {
		this.click_url = click_url;
	}
	public double getZk_final_price_wap() {
		return zk_final_price_wap;
	}
	public void setZk_final_price_wap(double zk_final_price_wap) {
		this.zk_final_price_wap = zk_final_price_wap;
	}
	public String getEvent_start_time() {
		return event_start_time;
	}
	public void setEvent_start_time(String event_start_time) {
		this.event_start_time = event_start_time;
	}
	public String getEvent_end_time() {
		return event_end_time;
	}
	public void setEvent_end_time(String event_end_time) {
		this.event_end_time = event_end_time;
	}
	/**
	 * 商品ID
	 * @return
	 */
	public long getNum_iid() {
		return num_iid;
	}
	public void setNum_iid(long num_iid) {
		this.num_iid = num_iid;
	}
	/**
	 * 商品标题
	 * @return
	 */
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
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
	/**
	 * 商品主图
	 * @return
	 */
	public String getPict_url() {
		return pict_url;
	}
	public void setPict_url(String pict_url) {
		this.pict_url = pict_url;
	}
	/**
	 * 商品小图列表
	 * @return
	 */
	public SmallImages getSmall_images() {
		if (small_images == null || small_images.getString().size() == 0 && !this.small_images_string.equals("")) {
			this.small_images = this.changeStringToSmallImages(this.small_images_string);
		}
		return small_images;
	}
	public void setSmall_images(SmallImages small_images) {
		this.small_images = small_images;
	}

	public String getSmall_images_string() {
		return small_images_string;
	}
	public void setSmall_images_string(String small_images_string) {
		this.small_images_string = small_images_string;
	}
	/**
	 * 商品一口价格
	 * @return
	 */
	public String getReserve_price() {
		return reserve_price;
	}
	public void setReserve_price(String reserve_price) {
		this.reserve_price = reserve_price;
	}
	/**
	 * 商品折扣价格
	 * @return
	 */
	public String getZk_final_price() {
		return zk_final_price;
	}
	public void setZk_final_price(String zk_final_price) {
		this.zk_final_price = zk_final_price;
	}
	/**
	 * 卖家类型，0表示集市，1表示商城
	 * @return
	 */
	public long getUser_type() {
		return user_type;
	}
	public void setUser_type(long user_type) {
		this.user_type = user_type;
	}
	/**
	 * 宝贝所在地
	 * @return
	 */
	public String getProvcity() {
		return provcity;
	}
	public void setProvcity(String provcity) {
		this.provcity = provcity;
	}
	/**
	 * 商品地址
	 * @return
	 */
	public String getItem_url() {
		return item_url;
	}
	public void setItem_url(String item_url) {
		this.item_url = item_url;
	}
	/**
	 * 卖家昵称
	 * @return
	 */
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	/**
	 * 卖家id
	 * @return
	 */
	public long getSeller_id() {
		return seller_id;
	}
	public void setSeller_id(long seller_id) {
		this.seller_id = seller_id;
	}
	/**
	 * 30天销量
	 * @return
	 */
	public long getVolume() {
		return volume;
	}
	public void setVolume(long volume) {
		this.volume = volume;
	}
	
//	public static void main(String[] args) {
//		TbkItem tbkItem = new TbkItem();
//		tbkItem.addItemStatus(ItemStatus.NORMAL);
//		tbkItem.setNum_iid(12345123);
//		tbkItem.setTitle("");
//		tbkItem.setPict_url("");
//		tbkItem.setSmall_images_string("");
//		tbkItem.setReserve_price("");
//		tbkItem.setZk_final_price("");
//		tbkItem.setProvcity("");
//		tbkItem.setItem_url("");
//		tbkItem.setNick("");
//		tbkItem.save();
//		
//		tbkItem.isInThisItemStatus(ItemStatus.IS_TBKITEM_CHANGE_TO_NORMAL_ITEM);
//	}
	
	
	public String changeSmallImagesToString(SmallImages small_images) {
		if (small_images == null) {
			return "";
		}
		return Tools.join(small_images.getString(), "~,,~");
	}
	public SmallImages changeStringToSmallImages(String small_images_string) {
		String[] urls = small_images_string.split("~,,~");
		List<String> list = new ArrayList<String>();
		if (urls.length > 0 && !"".equals(urls[0])) {
			list = Arrays.asList(urls);
		}
		SmallImages si = new SmallImages();
		si.setString(list);
		return si;
	}
	
	@Override
	public boolean save() {
		this.small_images_string = this.changeSmallImagesToString(this.small_images);
		return super.save();
	}
	
	@Override
	public void save(Session session) {
		this.small_images_string = this.changeSmallImagesToString(this.small_images);
		super.save(session);
	}
	
	/**
	 * return this.isInThisItemStatus(ItemStatus.IS_TBKITEM_CHANGE_TO_NORMAL_ITEM)
	 * @return
	 */
	public boolean isChangeToItem() {
		return this.isInThisItemStatus(ItemStatus.IS_TBKITEM_CHANGE_TO_NORMAL_ITEM);
	}
	
	/**
	 * 比较field之间的不同
	 * @param tbkItem
	 */
	public void compareDifferenceWith(TbkItem tbkItem) {
		Field[] fields = this.getClass().getDeclaredFields();
		
		for (Field field : fields) {
			Object val1;
			try {
				val1 = field.get(this);
				Object val2 = field.get(tbkItem);
				if (!val1.equals(val2)) {
					System.out.println(field.getName());
					System.out.println(val1);
					System.out.println(val2);
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
	}
	@Override
	public String toString() {
		return "TbkItem [num_iid=" + num_iid + ", title=" + title + ", pict_url=" + pict_url + ", item_url=" + item_url
				+ ", click_url=" + click_url + "]";
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
	public ajax.model.pagesSeparate.RealTimePaginationConfiguration.PK_TYPE getPaginationPrimaryKeyType() {
		return PK_TYPE.LONG;
	}
	
	/**
	 * 生成PC和Wap的TbkItems分页
	 */
	public static void generateTbkItemsPCAndWapPages() {
		
		List<GoodsType> list = GoodsType.getAllGoodsType();
		
		for (GoodsType goodsType : list) {
			generateTbkItemsPCAndWapPages(goodsType);
		}
		
	}
	/**
	 * 生成特定的goodsType =の=> PC和Wap的TbkItems分页
	 */
	private static void generateTbkItemsPCAndWapPages(GoodsType goodsType) {
		
		int limit = 100;
		List<TbkItem> tbkItemPCs = getTbkItemsNotInPage(goodsType, Platform.PC, limit);
		
		RealTimePagination<TbkItemPC> pagination = new RealTimePagination<>();
		
		for (TbkItem tbkItem : tbkItemPCs) {
			TbkItemPC tbkItemPC = (TbkItemPC)tbkItem;
			pagination.saveWithoutSaveT(TbkItemPC.getGroupId(goodsType.getId()), tbkItemPC);
			tbkItemPC.addItemStatus(ItemStatus.TBKITEM_IN_PAGE);
			tbkItemPC.update();
		}
		
		
		List<TbkItem> tbkItemWaps = getTbkItemsNotInPage(goodsType, Platform.WAP, limit);
		
		RealTimePagination<TbkItemWap> pagination2 = new RealTimePagination<>();
		
		for (TbkItem tbkItem : tbkItemWaps) {
			TbkItemWap tbkItemWap = (TbkItemWap)tbkItem;
			pagination2.saveWithoutSaveT(TbkItemWap.getGroupId(goodsType.getId()), tbkItemWap);
			tbkItemWap.addItemStatus(ItemStatus.TBKITEM_IN_PAGE);
			tbkItemWap.update();
		}
		
		
		
	}
	
	private static List<TbkItem> getTbkItemsNotInPage(GoodsType goodsType, Platform pf, int limit) {
		
		Session session = HibernateUtil.getCurrentSession();
		session.beginTransaction();
		
		Criteria criteria = null;
		Class<?> cls = null;
		switch(pf) {
		case PC:
			cls = TbkItemPC.class;
			break;
		case WAP:
			cls = TbkItemWap.class;
			break;
		case UNKNOW:
			return new ArrayList<>();
		}

		criteria = session.createCriteria(cls);
		criteria.setFirstResult(0);
		criteria.setMaxResults(limit);
		criteria.addOrder(Order.desc(HibernateUtil.getPrimaryKey(cls)));
		criteria.add(Restrictions.eq("goodsTypeId", goodsType.getId()));
		Entity.notThisStatus(criteria, ItemStatus.TBKITEM_IN_PAGE);
		
		List<TbkItem> items = criteria.list();
		session.getTransaction().commit();
		return items;
	}
	
	
	/**
	 * 获取商品在你个二货详情页面的url
	 * @return
	 */
	public abstract String getDetailUrl();
	public static final String DETAIL_URL_PREFIX = "/t/one/";
	
	public static void main(String[] args) {
		TbkItem.getCouponLinkSlickOnCouponIdAlreadyKnown();
	}
	
	/**
	 * 根据关键词获取商品的goodsTypeId
	 * @param goods_type
	 * @return
	 */
	public static int getGoodsTypeIdByKeyWord(String keyword) {
		return GoodsType.getGOodsTypeIdByKeyWord(keyword);
	}
	
	/**
	 * 在已知couponid的情况下获取couponLinkSlick(优惠券领取slick链接)
	 */
	private static void getCouponLinkSlickOnCouponIdAlreadyKnown() {
		List<TbkItemPC> tbkItemPCs = null;
		do {
			Session session = HibernateUtil.getCurrentSession();
			session.beginTransaction();
			Criteria criteria = session.createCriteria(TbkItemPC.class);
			criteria.add(Restrictions.eq("hasCoupon", true));
			criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(1000);
			criteria.setFirstResult(0);
			tbkItemPCs = TbkItemPC.getListWithoutStatus(ItemStatus.IS_GET_COUPON_LINK_SLICK, criteria, TbkItemPC.class);
			
			for (TbkItemPC item : tbkItemPCs) {
				try {
					Coupon coupon = Coupon.get(Coupon.class, item.getCoupon_id());
					item.setCoupon_link_slick(coupon.getCoupon_link_slick());
					item.addItemStatus(ItemStatus.IS_GET_COUPON_LINK_SLICK);
					item.update();
				} catch(Exception ex) {
					System.out.println(ex.getMessage());
				}
			}
			
		} while (tbkItemPCs.size() == 1000);
		
		
		List<TbkItemWap>  tbkItemWaps = null;
		do {
			Session session = HibernateUtil.getCurrentSession();
			session.beginTransaction();
			Criteria criteria = session.createCriteria(TbkItemWap.class);
			criteria.add(Restrictions.eq("hasCoupon", true));
			criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(1000);
			criteria.setFirstResult(0);
			tbkItemWaps = TbkItemWap.getListWithoutStatus(ItemStatus.IS_GET_COUPON_LINK_SLICK, criteria, TbkItemWap.class);
			
			
			for (TbkItemWap item : tbkItemWaps) {
				try {
					Coupon coupon = Coupon.get(Coupon.class, item.getCoupon_id());
					item.setCoupon_link_slick(coupon.getCoupon_link_slick());
					item.addItemStatus(ItemStatus.IS_GET_COUPON_LINK_SLICK);
					item.update();
				} catch (Exception ex) {
					System.out.println(ex.getMessage());
				}
			}
			
		} while (tbkItemWaps.size() == 1000);
		
		
	}
	
	
	
}
