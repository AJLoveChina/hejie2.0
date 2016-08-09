package ajax.controller.spring;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.AjaxResponse;
import ajax.model.entity.Collect;
import ajax.model.safe.User;
import ajax.tools.Tools;

@Controller
@RequestMapping(value="/collect")
public class CollectionController {
	
	
	@RequestMapping(value="/shoucang")
	public String shoucang(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("text/json");
		response.setCharacterEncoding("utf-8");
		
		String id = request.getParameter("id");
		int id2 = Tools.parseInt(id);
		
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		if (!User.isLogin(request, response)) {
			ar.setIsok(false);
			ar.setData("亲, 你木有登陆啊~~");
		} else if (id2 == 0) {
			ar.setIsok(false);
			ar.setData("收藏的文章编号出现了问题, 待会再试试吧~");
		} else {
			User u = User.getLoginUser(request);
			
			Collect cl = new Collect();
			cl.setItemid(id2);
			cl.setUserid(u.getId());
			
			if (!cl.isExist()) {
				cl.save();

				ar.setIsok(true);
				ar.setData("收藏成功");
				
			} else {

				ar.setIsok(true);
				ar.setData("已收藏");
			}
		}
		
		request.setAttribute("model", ar.toJson());
		return "Ajax";
		
	}
}
