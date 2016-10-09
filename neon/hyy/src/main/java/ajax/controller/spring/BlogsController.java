package ajax.controller.spring;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.FormComponents;
import ajax.model.annotations.EditorPointcut;
import ajax.model.annotations.EditorPointcutForAjax;
import ajax.model.entity.Blog;
import ajax.model.exception.AJRunTimeException;
import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.safe.User;

@Controller
@RequestMapping(value="/blog")
public class BlogsController {
	
	@Autowired
	private Gson gson;
	@Autowired
	private HttpServletRequest request;
	
	@RequestMapping(value="/user/{name}")
	public String whosBlog(@PathVariable("name") String name) throws AJRunTimeException {
		
		return whosBlog2(name, 1);
		
	}
	
	@RequestMapping(value="/user/{name}/{page}")
	public String whosBlog2(@PathVariable("name") String name, @PathVariable("page") Integer page) throws AJRunTimeException {
		if (page == null || page == 0)  page = 1;
		if (name == null || name.equals("")) throw new AJRunTimeException("错误!您正在查找不存在的用户");
		
		User user = User.getBy(User.class, "pencilName", name);
		if (user == null || !user.isCanWriteBlogs()) {
			throw new AJRunTimeException("您所查看的用户不是博客写手..");
		}
		
		RealTimePagination<Blog> pagination = new RealTimePagination<>();
		List<Blog> blogs = pagination.get(Blog.getGroupIdOfUser(user), page, new Blog());
		
		request.setAttribute("blogs", blogs);
		return "views/blogs/list";
	}
	
	@RequestMapping(value="/edit")
	public String edit() throws AJRunTimeException {
		
		FormComponents components = new Blog().getFormComponents(Blog.class);
		request.setAttribute("formComponentsJson", gson.toJson(components));
		
		return "views/tools/formComponents";
	}
	
	@RequestMapping(value="/submit")
	@ResponseBody
	@EditorPointcutForAjax
	public AjaxResponse<String> submit(@RequestParam(name="entity", defaultValue="") String data) {
		Blog blog = gson.fromJson(data, Blog.class);
		AjaxResponse<String> ar = new AjaxResponse<>();
		
		if (blog == null) {
			ar.setIsok(false);
			ar.setData("blog == null");
			return ar;
		}
		RealTimePagination<Blog> pagination = new RealTimePagination<>();
		User user = User.getLoginUser(request);
		
		String groupId = Blog.getGroupIdOfUser(user);
		blog.setUserid(user.getId());
		if (pagination.save(groupId, blog)) {
			ar.setIsok(true);
			ar.setData("OK");
		} else {
			ar.setIsok(false);
			ar.setData("can not save");
		}
		return ar;
	}
	
	
	
}
