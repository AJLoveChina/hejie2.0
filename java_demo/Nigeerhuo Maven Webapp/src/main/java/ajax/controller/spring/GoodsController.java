package ajax.controller.spring;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.entity.Goods;


@Controller
@RequestMapping(value="/goods")
public class GoodsController {
	
	@RequestMapping(value="/list")
	public String list(HttpServletRequest request) {
		List<Goods> goodsList = Goods.get(1, 20, Goods.class);
		
		request.setAttribute("model", goodsList);
		
		return "views/goods/list";
	}
}
