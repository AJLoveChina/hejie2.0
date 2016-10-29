package ajax.controller.spring;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.boot.archive.scan.spi.PackageInfoArchiveEntryHandler;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.PageChoice;
import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;
import ajax.model.taobao.model.GoodsType;
import ajax.model.taobao.model.Platform;
import ajax.model.taobao.model.TbkItem;
import ajax.model.taobao.model.TbkItemPC;
import ajax.model.taobao.model.TbkItemWap;
import ajax.model.taobao.model.TbkQuery;
import ajax.tools.HibernateUtil;

@Controller
@RequestMapping(value="/t")
public class TController {

	
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	
	@RequestMapping(value="/list")
	public String tList() {
		return "/views/tbk/list";
	}
	
	@RequestMapping(value="/goodsTypeList")
	@ResponseBody
	public AjaxResponse<List<GoodsType>> getGoodsTypeListPage() {
		AjaxResponse<List<GoodsType>> ajaxResponse = new AjaxResponse<>();
		ajaxResponse.setIsok(true);
		ajaxResponse.setData(GoodsType.getShowGoodsType());
		
		return ajaxResponse;
	}
	
	@Autowired
	private Gson gson;
	
	@RequestMapping(value="/tbkQuery")
	@ResponseBody
	public AjaxResponse<List<TbkItem>> tbkQuery(@RequestParam(name="data", defaultValue="") String data) {
		
		TbkQuery tbkQuery = gson.fromJson(data, TbkQuery.class);
		
		AjaxResponse ar = new AjaxResponse<>();
		
		switch(tbkQuery.getPlatForm()) {
		case PC:
			List<TbkItemPC> tbkItems = null;
			RealTimePagination<TbkItemPC> realTimePaginationPC = new RealTimePagination<TbkItemPC>();
			tbkItems = realTimePaginationPC.getV2(TbkItemPC.getGroupId(tbkQuery.goodsTypeId), tbkQuery.page, new TbkItemPC());
			ar.setData(tbkItems);
			ar.setIsok(true);
			break;
		case WAP:
			
			List<TbkItemWap> tbkItems2 = null;
			RealTimePagination<TbkItemWap> realTimePaginationWap = new RealTimePagination<>();
			tbkItems2 = realTimePaginationWap.getV2(TbkItemWap.getGroupId(tbkQuery.goodsTypeId), tbkQuery.page, new TbkItemWap());
			ar.setData(tbkItems2);
			ar.setIsok(true);
			break;
		case UNKNOW:
		default :
			ar.setData(null);
			ar.setIsok(false);
			break;
		}
		
		return ar;
	}
	
	
	@RequestMapping(value="/tbkSearch")
	public String tbkSearch(@RequestParam(name="data", defaultValue="") String data) throws UnsupportedEncodingException {
		
		data = URLDecoder.decode(data, "UTF8");
		TbkQuery tbkQuery = gson.fromJson(data, TbkQuery.class);
		
		AjaxResponse ar = new AjaxResponse<>();
		
		Session session = HibernateUtil.getCurrentSession();
		session.beginTransaction();
		Criteria criteria = null;
		switch(tbkQuery.getPlatForm()) {
		case PC:
			criteria = session.createCriteria(TbkItemPC.class);
			break;
		case WAP:
			criteria = session.createCriteria(TbkItemWap.class);
			break;
		default:
			criteria = session.createCriteria(TbkItemPC.class);
			break;
		}
		
		criteria.setFirstResult((tbkQuery.page - 1) * tbkQuery.size);
		criteria.setMaxResults(tbkQuery.size);
		criteria.addOrder(Order.desc("id"));
		criteria.add(Restrictions.like("title", "%" + tbkQuery.keyword + "%"));
		
		List<TbkItem> list = criteria.list();
		session.getTransaction().commit();
		
		int curPage = tbkQuery.page;
		tbkQuery.page = -1;
		String params = gson.toJson(tbkQuery);
		params = params.replace("\"page\":-1", "\"page\":{page}");
		String url = "/t/tbkSearch?data=" + URLEncoder.encode(params, "UTF8");
		
		PageChoice choice = new PageChoice(curPage, url);
		boolean isfind = list.size() > 0;
		
		request.setAttribute("isfind", isfind);
		request.setAttribute("list", list);
		request.setAttribute("pageChoice", choice);
		
		return "/views/tbk/search";
	}
	
	
	
	@RequestMapping(value="/one/{id}")
	public String getTbkItemById(@PathVariable("id") long id, @RequestParam(name="platform", defaultValue="3") long platform) {
		
		TbkItem tbkItem;
		if (platform == Platform.PC.getId()) {
			tbkItem = TbkItemPC.get(TbkItemPC.class, id);
		} else if (platform == Platform.WAP.getId()){
			tbkItem = TbkItemWap.get(TbkItemWap.class, id);
		} else {
			tbkItem = TbkItemPC.get(TbkItemPC.class, id);
		}
		
		request.setAttribute("model", tbkItem);
		return "views/tbk/one";
		
	}
	
	@Test
	public void test1() {
		TbkQuery tbkQuery = new  TbkQuery();
		tbkQuery.keyword = "礼物";
		tbkQuery.page = 1;
		tbkQuery.size = 20;
		String url = "/t/tbkSearch?data=";
		String json = new Gson().toJson(tbkQuery);
		
		System.out.println(json);
	}
	
	
}
