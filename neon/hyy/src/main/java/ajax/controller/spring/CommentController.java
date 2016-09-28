package ajax.controller.spring;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.entity.Comment;
import ajax.model.safe.User;
import ajax.tools.HibernateUtil;

@Controller
@RequestMapping(value="/comment")
public class CommentController {
	
	@Autowired
	private Gson gson;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	
	@ResponseBody
	@RequestMapping(value="/get")
	public AjaxResponse<List<Comment>> getCommentsByGroupId(@RequestParam("commentsGroupId") String commentsGroupId,
			@RequestParam(value="page", required=false) Integer page) {
		if (page == null) page = 1;
		int size = 20;
		AjaxResponse<List<Comment>> ar = new AjaxResponse<>();
		
		List<Comment> list = Comment.getListByGroupIdAndPage(commentsGroupId, page, size);
		
		ar.setIsok(true);
		ar.setData(list);
		return ar;
	}
	
	@ResponseBody
	@RequestMapping(value="/submit")
	public AjaxResponse<String> submit(@RequestParam("data") String data) {
		AjaxResponse<String> ar = new AjaxResponse<>();
		User user = User.getLoginUser(request);
		if (user == null) {
			ar.setIsok(false);
			ar.setData("登陆了才能评论哦~~");
			return ar;
		}
		Comment comment = gson.fromJson(data, Comment.class);
		comment.configFromUser(user);
		
		if (comment.save()) {
			ar.setIsok(true);
			ar.setData("保存成功!");
		} else {
			ar.setIsok(true);
			ar.setData("评论失败, 二货君犯了一些小错误, 请待会再试试吧~~");
		}
		
		return ar;
	}
}
