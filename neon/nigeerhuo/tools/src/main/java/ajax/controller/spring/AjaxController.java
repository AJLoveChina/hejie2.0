package ajax.controller.spring;

import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ajax.model.AjaxResponse;
import ajax.model.entity.Item;
import ajax.model.entity.Page;

@Controller
@RequestMapping(value="/ajax")
public class AjaxController {

	@RequestMapping(value="/item/one/{id}")
	@ResponseBody
	public AjaxResponse<Item> ajaxItem(@PathVariable("id") int id) {
		Item item = Item.getByItemById(id);
		AjaxResponse<Item> ar = new AjaxResponse<>();
		
		if (item == null) {
			ar.setIsok(false);
			ar.setData(null);
		} else {
			ar.setIsok(true);
			ar.setData(item);
		}
		return ar;
	}
	
	@RequestMapping(value="/item/page/{page}")
	@ResponseBody
	public AjaxResponse<List<Item>> Page(@PathVariable("page") int page) {
		List<Item> items = new ArrayList<Item>();
		
		items = Page.getPage(page);
		AjaxResponse<List<Item>> ar = new AjaxResponse<>();
		ar.setIsok(true);
		ar.setData(items);
		return ar;
	}
	
}
