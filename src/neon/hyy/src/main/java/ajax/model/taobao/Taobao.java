package ajax.model.taobao;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.hibernate.Session;
import org.junit.Test;

import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.taobao.ItemInfoGetResponse.R;
import ajax.model.taobao.ItemInfoGetResponse.Z;
import ajax.model.taobao.model.ITaobao;
import ajax.model.taobao.model.ITaobaoItemQueryParams;
import ajax.model.taobao.model.ITaobaoResponse;
import ajax.model.taobao.model.Platform;
import ajax.model.taobao.model.TbkItem;
import ajax.model.taobao.model.TbkItemPC;
import ajax.model.taobao.model.TbkItemWap;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AtbItemsDetailGetRequest;
import com.taobao.api.request.AtbItemsGetRequest;
import com.taobao.api.request.TbkItemGetRequest;
import com.taobao.api.request.TbkItemInfoGetRequest;
import com.taobao.api.request.TbkItemRecommendGetRequest;
import com.taobao.api.response.AtbItemsDetailGetResponse;
import com.taobao.api.response.AtbItemsGetResponse;
import com.taobao.api.response.TbkItemGetResponse;
import com.taobao.api.response.TbkItemInfoGetResponse;
import com.taobao.api.response.TbkItemRecommendGetResponse;

public class Taobao {
	/**
	 * 正式环境url
	 */
	public static final String url = "http://gw.api.taobao.com/router/rest";
	/**
	 * 联盟合作网站
	 */
	private static String TAOBAO_NIGEERHUO388_APP_KEY = null;
	/**
	 * 联盟合作网站
	 */
	private static String TAOBAO_NIGEERHUO388_APP_SECRET = null;
	
	public static final String itaobaoUrl = "http://gw.api.taobao.com/router/rest";
	/**
	 * 	百川无线应用
	 */
	private static String TAOBAO_NIGEERHUO_APP_KEY = null;
	/**
	 * 	百川无线应用
	 */
	private static String TAOBAO_NIGEERHUO_APP_SECRET = null;
	
	
	
	public static String getTAOBAO_NIGEERHUO_APP_KEY() {
		if (TAOBAO_NIGEERHUO_APP_KEY == null) {
			TAOBAO_NIGEERHUO_APP_KEY = Tools.getConfig("TAOBAO_NIGEERHUO_APP_KEY");
		}
		return TAOBAO_NIGEERHUO_APP_KEY;
	}
	public static String getTAOBAO_NIGEERHUO_APP_SECRET() {
		if (TAOBAO_NIGEERHUO_APP_SECRET == null) {
			TAOBAO_NIGEERHUO_APP_SECRET = Tools.getConfig("TAOBAO_NIGEERHUO_APP_SECRET");
		}
		return TAOBAO_NIGEERHUO_APP_SECRET;
	}
	public static String getTAOBAO_NIGEERHUO388_APP_KEY() {
		if (Taobao.TAOBAO_NIGEERHUO388_APP_KEY == null) {
			TAOBAO_NIGEERHUO388_APP_KEY = Tools.getConfig("taobao_nigeerhuo388_app_key");
		}
		return TAOBAO_NIGEERHUO388_APP_KEY;
	}
	public static void setTAOBAO_NIGEERHUO388_APP_KEY(
			String tAOBAO_NIGEERHUO388_APP_KEY) {
		TAOBAO_NIGEERHUO388_APP_KEY = tAOBAO_NIGEERHUO388_APP_KEY;
	}
	public static String getTAOBAO_NIGEERHUO388_APP_SECRET() {
		if (TAOBAO_NIGEERHUO388_APP_SECRET == null) {
			TAOBAO_NIGEERHUO388_APP_SECRET = Tools.getConfig("taobao_nigeerhuo388_app_secret");
		}
		return TAOBAO_NIGEERHUO388_APP_SECRET;
	}
	public static void setTAOBAO_NIGEERHUO388_APP_SECRET(
			String tAOBAO_NIGEERHUO388_APP_SECRET) {
		TAOBAO_NIGEERHUO388_APP_SECRET = tAOBAO_NIGEERHUO388_APP_SECRET;
	}
	
	
	/**
	 * 获取爱淘宝商品
	 * @return
	 */
	public static List<ITaobao> getITaobaoItems(ITaobaoItemQueryParams iTaobaoItemQueryParams) {
		List<ITaobao> iTaobaos = new ArrayList<ITaobao>();
		
		TaobaoClient client = new DefaultTaobaoClient(Taobao.itaobaoUrl, 
				Taobao.getTAOBAO_NIGEERHUO_APP_KEY(),
				Taobao.getTAOBAO_NIGEERHUO_APP_SECRET());
		AtbItemsGetRequest req = new AtbItemsGetRequest();
		
		//req.setArea("杭州");
		//req.setAutoSend("true");
		//req.setCid(123L);
		//req.setEndCommissionNum("10000");
		//req.setEndCommissionRate("2345");
		//req.setEndCredit("1heart");
		//req.setEndPrice("999");
		//req.setEndTotalnum("10");
		//req.setGuarantee("true");
		//req.setRealDescribe("true");
		req.setKeyword(iTaobaoItemQueryParams.keyword);
		//req.setCashCoupon("true");
		//req.setVipCard("true");
		req.setFields("open_iid,title,nick,pic_url,price,commission,commission_rate,commission_num,commission_volume,seller_credit_score,item_location,volume,coupon_start_time,coupon_end_time,coupon_rate,promotion_price");
		req.setPageNo(iTaobaoItemQueryParams.page_no);
		req.setPageSize(iTaobaoItemQueryParams.page_size);
		//req.setOverseasItem("true");
		//req.setOnemonthRepair("true");
		//req.setSevendaysReturn("true");
		//req.setSort("price_desc");
		//req.setStartCommissionNum("1000");
		//req.setStartCommissionRate("1234");
		//req.setStartCredit("1heart");
		//req.setStartPrice("1");
		//req.setStartTotalnum("1");
		//req.setSupportCod("true");
		//req.setMallItem("true");
		
		AtbItemsGetResponse rsp;
		try {
			rsp = client.execute(req);
			String json = rsp.getBody();
			System.out.println(json);
			
			Gson gson = new Gson();
			ITaobaoResponse iTaobaoResponse = gson.fromJson(json, ITaobaoResponse.class);
			
			return iTaobaoResponse.atb_items_get_response.items.aitaobao_item;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return iTaobaos;
	}
	
	public static void getITaobaoItemsAndSave() {
		int max = 20;
		int i = 1;
		
		do {
			ITaobaoItemQueryParams iTaobaoItemQueryParams = new ITaobaoItemQueryParams();
			iTaobaoItemQueryParams.page_no = i;
			
			List<ITaobao> iTaobaos = Taobao.getITaobaoItems(iTaobaoItemQueryParams);
			
			for (ITaobao iTaobao : iTaobaos) {
				if (iTaobao.save()) {
					System.out.println("保存成功 : " + iTaobao.getTitle());
				}
			}
			
		} while(++i < max);
		
	}
	
	/**
	 * taobao.tbk.item.get
	 * 淘宝客商品搜索查询接口
	 */
	public static void taobaoTbkItemGet(ItemQueryParams itemQueryParams) {
		String url = "http://gw.api.taobao.com/router/rest";
		
		TaobaoClient client = new DefaultTaobaoClient(url, Taobao.getTAOBAO_NIGEERHUO388_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO388_APP_SECRET());
		TbkItemGetRequest req = new TbkItemGetRequest();
		req.setFields(itemQueryParams.getFields());
		req.setQ(itemQueryParams.getQ());
		req.setCat(itemQueryParams.getCat());
		req.setItemloc(itemQueryParams.getItemloc());
		req.setSort(itemQueryParams.getSort().getName());
		req.setIsTmall(itemQueryParams.isIs_tmall());
		req.setIsOverseas(itemQueryParams.isIs_overseas());
		if (itemQueryParams.getStart_price() != null) {
			req.setStartPrice(itemQueryParams.getStart_price());
		}
		
		req.setEndPrice(itemQueryParams.getEnd_price());
		req.setStartTkRate(itemQueryParams.getStart_tk_rate());
		req.setEndTkRate(itemQueryParams.getEnd_tk_rate());
		req.setPlatform(itemQueryParams.getPlatform().getId());
		req.setPageNo(itemQueryParams.getPage_no());
		req.setPageSize(itemQueryParams.getPage_size());
		
		try {
			TbkItemGetResponse rsp;
			rsp = client.execute(req);
			System.out.println(rsp.getBody());
			Gson gson = new Gson();
			ItemGetResponse itemGetResponse = gson.fromJson(rsp.getBody(), ItemGetResponse.class);
			System.out.println(itemGetResponse);
			
			for (TbkItem tbkItem : itemGetResponse.getTbk_item_get_response().getResults().getN_tbk_item()) {
				if (tbkItem.save()) {
					System.out.println("Success : " + tbkItem.getTitle());
				}
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
//	/**
//	 * 根据 商品id从淘宝获取一件商品的详细信息
//	 * @return
//	 * @throws ApiException
//	 */
//	public static TbkItem getTbkItemByIDFromTaobao(String num_iid) throws ApiException{
//		TaobaoClient client = new DefaultTaobaoClient(url, Taobao.getTAOBAO_NIGEERHUO388_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO388_APP_SECRET());
//		TbkItemInfoGetRequest req = new TbkItemInfoGetRequest();
//		req.setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,nick,seller_id,volume");
//		req.setPlatform(1L);
//		req.setNumIids(num_iid);
//		TbkItemInfoGetResponse rsp = client.execute(req);
//		System.out.println(rsp.getBody());
//		Gson gson = new Gson();
//		ItemInfoGetResponse itemInfoGetResponse = gson.fromJson(rsp.getBody(), ItemInfoGetResponse.class);
//		
//		return itemInfoGetResponse.tbk_item_info_get_response.results.n_tbk_item.get(0);
//	}
	
	
	private class TBKItemPCInfoGetResponse {
		
		class R {
			public List<TbkItemPC> n_tbk_item;
		}
		class Z {
			public R results;
		}
		public Z tbk_item_info_get_response;
	}

	private class TBKItemWapInfoGetResponse {
		
		class R {
			public List<TbkItemWap> n_tbk_item;
		}
		class Z {
			public R results;
		}
		public Z tbk_item_info_get_response;
	}

	/**
	 * 根据 商品id从淘宝获取一件商品的详细信息
	 * @return null if error
	 */
	public static <T> T getTbkItemByIDFromTaobao(String num_iid, Platform platform, Class<T> cls) {
		TaobaoClient client = new DefaultTaobaoClient(url, Taobao.getTAOBAO_NIGEERHUO388_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO388_APP_SECRET());
		TbkItemInfoGetRequest req = new TbkItemInfoGetRequest();
		req.setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,nick,seller_id,volume");
		req.setPlatform(platform.getId());
		req.setNumIids(num_iid);
		TbkItemInfoGetResponse rsp;
		try {
			rsp = client.execute(req);
		} catch (ApiException e) {
			return null;
		}
		
		Gson gson = new Gson();
		
		switch(platform) {
		case WAP:
			TBKItemWapInfoGetResponse itemInfoGetResponse2 = gson.fromJson(rsp.getBody(), TBKItemWapInfoGetResponse.class);
			return (T)itemInfoGetResponse2.tbk_item_info_get_response.results.n_tbk_item.get(0);
			
		case PC:
		default:
			TBKItemPCInfoGetResponse itemInfoGetResponse = gson.fromJson(rsp.getBody(), TBKItemPCInfoGetResponse.class);
			return (T)itemInfoGetResponse.tbk_item_info_get_response.results.n_tbk_item.get(0);
		}
	}
	
	/**
	 * taobao.tbk.item.recommend.get (淘宝客商品关联推荐查询)
	 * @return
	 * @throws ApiException
	 */
	public static List<TbkItem> getTbkItemsRecommend(long num_iid) throws ApiException {
		TaobaoClient client = new DefaultTaobaoClient(url, Taobao.getTAOBAO_NIGEERHUO388_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO388_APP_SECRET());
		TbkItemRecommendGetRequest req = new TbkItemRecommendGetRequest();
		req.setFields("num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url");
		req.setNumIid(num_iid);
		req.setCount(10L);
		req.setPlatform(1L);
		TbkItemRecommendGetResponse rsp = client.execute(req);
//		System.out.println(rsp.getBody());
		Gson gson = new Gson();
		ItemRecommendGetResponse itemRecommendGetResponse = gson.fromJson(rsp.getBody(), ItemRecommendGetResponse.class);
		return itemRecommendGetResponse.tbk_item_recommend_get_response.results.n_tbk_item;
	}
	
	/**
	 * alibaba.wholesale.category.get (获取类目信息)
	 */
	public static void getCategory() {
		TaobaoClient client = new DefaultTaobaoClient(url, Taobao.getTAOBAO_NIGEERHUO388_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO388_APP_SECRET());
//		AlibabaWholesaleCategoryGetRequest req = new AlibabaWholesaleCategoryGetRequest();
//		AlibabaWholesaleCategoryGetResponse rsp = client.execute(req);
//		System.out.println(rsp.getBody());
	}
	
	private static void do1() {
		long page = 1000;
		long index = 1;
		String fields = "num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick";
		
		
		while (index ++ < page) {
			
			ItemQueryParams itemQueryParams = new ItemQueryParams(fields);
			itemQueryParams.setPage_no(index);
			itemQueryParams.setStart_price(1L);
			itemQueryParams.setEnd_price(15L);
			
			
			taobaoTbkItemGet(itemQueryParams);
		}
	}
	
//	private static void do2() {
//		try {
//			TbkItem tbkItem = getTbkItemByIDFromTaobao("530160087783");
//			
//			System.out.println(tbkItem);
//		} catch (ApiException e) {
//			System.out.println(e.getMessage());
//		}
//	}
	
	private static void do3() {
		List<TbkItem> tbkItems;
		try {
			tbkItems = Taobao.getTbkItemsRecommend(530160087783L);
			
			System.out.println(tbkItems);
		} catch (ApiException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static String getITaobao() throws ApiException {
		TaobaoClient client = new DefaultTaobaoClient(url, Taobao.getTAOBAO_NIGEERHUO_APP_KEY(), Taobao.getTAOBAO_NIGEERHUO_APP_SECRET());
		AtbItemsDetailGetRequest req = new AtbItemsDetailGetRequest();
		req.setFields("open_iid,title");
		req.setOpenIids("AAGR3e_NAClMYSXsyD_PHpLF");
		AtbItemsDetailGetResponse rsp = client.execute(req);
		return rsp.getBody();
	}
	
	/**
	 * 从Excel读取tbkitem 和coupon 商品
	 * @throws Exception
	 */
	public static void getItemsFromExcel(String filepath) throws Exception {
		List<TaobaoExcelItem> excelItems = Tools.readExcel(new File(filepath), TaobaoExcelItem.class);
		Random rd = new Random();
		for (TaobaoExcelItem taobaoExcelItem : excelItems) {
			Session session = HibernateUtil.getCurrentSession();
			session.beginTransaction();
			
			//1.save taobao excel item, it is not important and not used now, just for log
			taobaoExcelItem.save(session);
			
			//2.taobaoExcelItem change to Coupon and save
			Coupon coupon = taobaoExcelItem.toCoupon();
			coupon.save(session);
			
			
			try {
				session.getTransaction().commit();
				taobaoExcelItem.setCoupon(coupon);
				
				//2.1选择部分优惠券显示给用户, 即加入pagination
				double cut = coupon.getVolume() / (coupon.getVolume() + 1000.0); 
				if (rd.nextInt(10) <=1 || rd.nextInt(100) < 100 * cut) {
					RealTimePagination<Coupon> couponPagination = new RealTimePagination<>();
					couponPagination.saveWithoutSaveT(Coupon.COUPON_PAGINATION_GROUPID, coupon);
				}
			} catch(Exception ex) {
				System.out.println(ex.getMessage());
			}
			
			//3.taobaoExcelItem change to tbkitem pc and wap
			TbkItemPC tbkItemPC = null;
			TbkItemWap tbkItemWap = null;
			try {
				tbkItemPC = taobaoExcelItem.toTbkItemPC();
				tbkItemWap = taobaoExcelItem.toTbkItemWap();
			} catch(Exception ex) {
				System.out.println(ex.getMessage());
			}
			
			if (tbkItemPC != null) {
				//4.save tbkitem pc
				RealTimePagination<TbkItemPC> pagination = new RealTimePagination<>();
				pagination.save(TbkItemPC.getGroupId(tbkItemPC.getGoodsTypeId()), tbkItemPC);
			}
			
			if (tbkItemWap != null) {
				//5.save tbkitem wap
				RealTimePagination<TbkItemWap> pagination2 = new RealTimePagination<>();
				pagination2.save(TbkItemWap.getGroupId(tbkItemWap.getGoodsTypeId()), tbkItemWap);
			}
			
		}
		
		
	}
	
	@Test
	public void do5() throws ApiException {
		System.out.println(Taobao.getITaobao());;
	}
	
}
