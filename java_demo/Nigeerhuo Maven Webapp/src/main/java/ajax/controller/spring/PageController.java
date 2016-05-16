package ajax.controller.spring;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ajax.model.QueryParams;
import ajax.model.entity.Item;
import ajax.model.entity.Page;
import ajax.tools.Tools;


@Controller
public class PageController {
	
	
	@RequestMapping(value="/page/{page}")
	public String Page(HttpServletRequest request, HttpServletResponse response, @PathVariable("page") int page) {
		List<Item> items = new ArrayList<Item>();
		
		QueryParams qp = new QueryParams(request);
		
		qp.set("page", page + "");
		items = Page.getPage(page);
		
		request.setAttribute("items", items);
		request.setAttribute("page", page);
		request.setAttribute("queryParams", qp);
		
		
		return "Page";
	}
	
	@RequestMapping(value="/pagetest")
	public String pageTest() {
		
		return "views/test/test";
		
		
	}
}
