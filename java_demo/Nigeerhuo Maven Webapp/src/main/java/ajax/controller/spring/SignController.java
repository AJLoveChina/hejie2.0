package ajax.controller.spring;

import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.AjaxResponse;
import ajax.model.entity.Info;
import ajax.model.safe.User;
import ajax.model.safe.User.QQAccess;


@Controller
@RequestMapping(value="/sign")
public class SignController {
	
	@RequestMapping(value="/qq")
	public String signQQ(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String action = request.getParameter("action");
		String code = request.getParameter("code");
		String responseString = "";
		
		if (code != null && !code.equals("")) {
			QQAccess qa = User.getQQAccess(code);
			
			if (qa.isOK()) {
				User.QQOpenIdModel qim = User.getQQOpenId(qa);
				
				User.QQUserSimpleModel usm = User.getQQSimpleModel(qa, qim);
				
				User u = new User();
				u.setAccessToken(qa.getAccess_token());
				u.setFrom(User.Source.QQ.getId());
				u.setOpenId(User.Source.dealOpenId(qim.getOpenid(), User.Source.QQ));
				u.setImg(usm.getUserimg());
				u.setUsername(usm.getNickname());
				
				responseString = u.signIn(request, response);
				
			}
			
			
			return "views/html/close";
			
		} else {
			if (action == null || action.equals("")) {
				
				
				return "views/html/qqSign";
				
				
			} else {
				
				request.setCharacterEncoding("UTF-8");
				String openId = request.getParameter("id");
				String accessToken = request.getParameter("token");
				String nickname = request.getParameter("nickname");
				String img = request.getParameter("img");
				openId = User.Source.dealOpenId(openId, User.Source.QQ);
				
				User u = new User();
				u.setOpenId(openId);
				u.setUsername(nickname);
				u.setAccessToken(accessToken);
				u.setFrom(User.Source.QQ.getId());
				u.setImg(img);
				
				String json = u.signIn(request, response);
				
				response.setContentType("text/json");
				response.setCharacterEncoding("UTF-8");
				
				request.setAttribute("model", json);
				
				return "Ajax";
			}
			
		}
	}
	
	@RequestMapping(value="/weibo")
	public String signWeibo(HttpServletRequest request, HttpServletResponse response) {
		String code = request.getParameter("code");
		String responseString = "";
		
		
		if (code != null && !code.equals("")) {
			User.WeiboAccess wa = User.getWeiboAccess(code);
			
			
			if(wa.isOK()) {
				
				
				User.WeiboUserSimpleModel wsm = User.getWeiboUserSimpleModel(wa);
				
				
				Info info = new Info();
				info.setKey("weibosign");
				info.setValue("可以获取到用户信息" + wsm.getName());
				info.save();
				
				User u = new User();
				u.setAccessToken(wa.getAccess_token());
				u.setFrom(User.Source.WEIBO.getId());
				u.setOpenId(User.Source.dealOpenId(wa.getUid(), User.Source.WEIBO));
				u.setImg(wsm.getAvatar_large());
				u.setUsername(wsm.getName());
				
				responseString = u.signIn(request, response);
				
				
				info = new Info();
				info.setKey("weibosign");
				info.setValue("sign in 执行成功" + u.getId());
				info.save();
			} else {
				AjaxResponse<String> ar = new AjaxResponse<String>();
				ar.setIsok(false);
				ar.setData("请求授权环节失败");
				responseString = ar.toJson();
			}
			
		}
		
		return "views/html/close";
	}
	
	@RequestMapping(value="/github")
	public String signGithub(HttpServletRequest request, HttpServletResponse response) {
		String code = request.getParameter("code");
		String state = request.getParameter("state");
		
		if (code != null && !code.equals("")) {
			User.GithubAccessToken gat = User.getGithubAccessToken(code, state);
			
			
			if(gat.isOK()) {
				
				
				User.GithubUserSimpleModel gusm = User.getGithubUserSimpleModel(gat);
				
				
				
				User u = new User();
				u.setAccessToken(gat.getAccess_token());
				u.setFrom(User.Source.GITHUB.getId());
				u.setOpenId(User.Source.dealOpenId(gusm.getId(), User.Source.GITHUB));
				u.setImg(gusm.getAvatar_url());
				u.setUsername(gusm.getLogin());
				
				u.signIn(request, response);
				
			}
		}
		
		return "views/html/close";
	}
	
	@RequestMapping(value="/out")
	public String signOut(HttpServletRequest request, HttpServletResponse response) {
		User.signout(request, response);
		
		
		
		AjaxResponse<String> ar = new AjaxResponse<String>();
		
		ar.setIsok(true);
		ar.setData("sign out ok");
		
		request.setAttribute("model", ar.toJson());
		return "Ajax";
		
	}
}
