package ajax.controller.spring;

import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.JokeType;
import ajax.model.QueryParams;
import ajax.model.entity.Item;
import ajax.model.entity.TypePage;
import ajax.tools.Tools;


@Controller
@RequestMapping(value="/type")
public class TypeController {
	
	/**
	 * 该方法中 page=1获取的是maxPage那一页
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value="/params")
	public String params(HttpServletRequest request, HttpServletResponse response) {
		QueryParams qp = new QueryParams(request);
		
		int page = qp.getPage();
		int type = Tools.parseInt(qp.getVal("type"), JokeType.UNKNOWN.getId());
		
		int maxPage = TypePage.getMaxPageOf(JokeType.getJokeType(type));
		boolean hasCurrentPage = true;
		if (page > maxPage) {
			hasCurrentPage = false;
		}
		
		List<Item> items = TypePage.getItemsByPageAndType(page, type);
		
		request.setAttribute("items", items);
		request.setAttribute("page", Tools.parseInt(qp.getVal("page"), 1));
		request.setAttribute("queryParams", qp);
		request.setAttribute("hasCurrentPage", hasCurrentPage);
		
		
		return "Type";
	}
}
