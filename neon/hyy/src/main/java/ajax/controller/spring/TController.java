package ajax.controller.spring;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;
import ajax.model.taobao.model.GoodsType;
import ajax.model.taobao.model.Platform;
import ajax.model.taobao.model.TbkItem;
import ajax.model.taobao.model.TbkItemPC;
import ajax.model.taobao.model.TbkItemWap;
import ajax.model.taobao.model.TbkQuery;

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
	
	
}
