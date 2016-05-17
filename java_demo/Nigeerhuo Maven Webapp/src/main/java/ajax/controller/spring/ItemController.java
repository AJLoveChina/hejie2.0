package ajax.controller.spring;

import java.util.List;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.QueryParams;
import ajax.model.entity.Item;
import ajax.tools.Tools;


@Controller
public class ItemController {
	
	@RequestMapping(value="/item/{id}")
	public String Item(HttpServletRequest request, @PathVariable("id") int id) {
		
		Item item = new Item();
		item.load(id);
		
		request.setAttribute("item", item);
		
		return "OneItem";
	}
	
	@RequestMapping(value="/item")
	public String getItem(HttpServletRequest request) {
		String idParam = request.getParameter("id");
		int id = Tools.parseInt(idParam, -1);
		
		if (id == -1) {
			request.setAttribute("error", "您木有指定id");
			
			return "Error";
		} else {
			Item item = new Item();
			item.load(id);
			
			request.setAttribute("item", item);

			return "Item";			
		}
	}
	
	@RequestMapping(value="/OneItem")
	public String oneItem(HttpServletRequest request) {
		int id = Tools.parseInt(request.getParameter("id"), new Random().nextInt(1000) + 100);
		Item item = new Item();
		item.load(id);
		
		request.setAttribute("item", item);
		
		return "OneItem";
	}
	
	
}
