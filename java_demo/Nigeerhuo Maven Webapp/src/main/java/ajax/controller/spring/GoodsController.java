package ajax.controller.spring;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.PageChoice;
import ajax.model.UrlRoute;
import ajax.model.entity.Goods;
import ajax.model.pagesSeparate.TbkItemsPagesSeparate;
import ajax.model.taobao.TbkItem;


@Controller
@RequestMapping(value="/goods")
public class GoodsController {
	
	@RequestMapping(value="/list")
	public String list(HttpServletRequest request) {
		List<Goods> goodsList = Goods.get(1, 20, Goods.class);
		
		request.setAttribute("model", goodsList);
		
		return "views/goods/list";
	}
	
	@RequestMapping(value="/list/{page}")
	public String listPage(HttpServletRequest request, @PathVariable("page") int page) {
		
		List<Goods> goodsList = Goods.get(page, 20, Goods.class);
		
		request.setAttribute("model", goodsList);
		
		return "views/goods/list";
	}
	
	@RequestMapping(value="/{id}")
	public String getGoodsById(@PathVariable("id") int id, HttpServletRequest request) {
		
		Goods goods = new Goods();
		
		goods.load(id);
		request.setAttribute("model", goods);
		
		return "views/goods/info";
	}
	
	@RequestMapping(value="/tbkitems")
	public String tbkItems(HttpServletRequest request) {
		
		//List<TbkItem> tbkItems = TbkItem.get(1, 20, TbkItem.class);
		
		TbkItemsPagesSeparate<TbkItem> tbkItemsPagesSeparate = new TbkItemsPagesSeparate<TbkItem>();
		List<TbkItem> tbkItems = tbkItemsPagesSeparate.getItemsByPageAndType(1);
		
	
		PageChoice pageChoice = new PageChoice(1, UrlRoute.TBK_ITEMS_PAGE_URL_TEMPLATE.getUrl());
		request.setAttribute("model", tbkItems);
		request.setAttribute("pageChoice", pageChoice);
		return "views/goods/tbkitems";
	}
	
	@RequestMapping(value="/tbkitems/page/{page}")
	public String tbkItemsPage(@PathVariable("page") int page, HttpServletRequest request) {
		
		//List<TbkItem> tbkItems = TbkItem.get(1, 20, TbkItem.class);
		
		TbkItemsPagesSeparate tbkItemsPagesSeparate = new TbkItemsPagesSeparate();
		List<TbkItem> tbkItems = tbkItemsPagesSeparate.getItemsByPageAndType(page);
		PageChoice pageChoice = new PageChoice(page, UrlRoute.TBK_ITEMS_PAGE_URL_TEMPLATE.getUrl());
		request.setAttribute("model", tbkItems);
		request.setAttribute("pageChoice", pageChoice);
		return "views/goods/tbkitems";
	}
}
