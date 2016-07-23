package ajax.controller.spring;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.entity.Goods;
import ajax.model.taobao.TbkItem;
import ajax.tools.HibernateUtil;


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
		
		List<TbkItem> tbkItems = TbkItem.get(1, 20, TbkItem.class);
		
		request.setAttribute("model", tbkItems);
		return "views/goods/tbkitems";
	}
}
