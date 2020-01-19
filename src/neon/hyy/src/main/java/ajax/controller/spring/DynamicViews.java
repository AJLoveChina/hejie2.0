package ajax.controller.spring;

import javax.servlet.http.HttpServletRequest;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 动态解析路由到指定的jsp页面
 * @author ajax
 *
 */
@Controller
@RequestMapping(value="/dv")
public class DynamicViews {
	
	@Autowired
	private HttpServletRequest request;
	
	@RequestMapping(value="/{viewname}")
	public String viewName(@PathVariable("viewname") String viewname) {
		if (!viewname.matches("^[a-z|A-Z|0-9]+$")) {
			request.setAttribute("model", "/dv 路径后的path不符合要求(只能由大小写字母和数字组成)");
			return "/views/error";
		}
		
		return "/views/dv/" + viewname;
	}
	
	@Test
	public void test() {
		String str = "123abcABC/";
		
		boolean bool = str.matches("^[a-z|A-Z|0-9]+$");
		Assert.assertTrue(bool);
	}
	
	
}
