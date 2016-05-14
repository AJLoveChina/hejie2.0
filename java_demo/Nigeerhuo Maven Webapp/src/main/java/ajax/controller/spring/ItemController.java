package ajax.controller.spring;

import java.util.List;

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
	

}
