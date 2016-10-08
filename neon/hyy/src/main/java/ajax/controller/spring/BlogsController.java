package ajax.controller.spring;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.entity.Blog;
import ajax.model.exception.AJRunTimeException;
import ajax.model.pagesSeparate.RealTimePagination;

@Controller
@RequestMapping(value="/blog")
public class BlogsController {
	
	@RequestMapping(value="/user/{name}")
	public String whosBlog(@PathVariable("name") String name) throws AJRunTimeException {
		
		return whosBlog2(name, 1);
		
	}
	
	@RequestMapping(value="/user/{name}/{page}")
	public String whosBlog2(@PathVariable("name") String name, @PathVariable("page") Integer page) throws AJRunTimeException {
		if (page == null || page == 0)  page = 1;
		if (name == null || name.equals("")) throw new AJRunTimeException("错误!您正在查找不存在的用户");
		
		RealTimePagination<Blog> pagination = new RealTimePagination<>();
		return null;
	}
	
	
}
