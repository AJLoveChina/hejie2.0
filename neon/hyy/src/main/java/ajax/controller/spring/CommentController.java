package ajax.controller.spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ajax.model.AjaxResponse;
import ajax.model.entity.Comment;

@Controller
@RequestMapping(value="/comment")
public class CommentController {
	
	
	@ResponseBody
	@RequestMapping(value="/get")
	public AjaxResponse<List<Comment>> getCommentsByGroupId(@RequestParam("commentsGroupId") String commentsGroupId ) {
		
		AjaxResponse<List<Comment>> ar = new AjaxResponse<>();
		
		List<Comment> list = new ArrayList<>();
		list.add(new Comment(1L, 2L, commentsGroupId, 1L, "Hello World"));
		list.add(new Comment(1L, 2L, commentsGroupId, 1L, "Hello World"));
		list.add(new Comment(1L, 2L, commentsGroupId, 1L, "Hello World"));
		list.add(new Comment(1L, 2L, commentsGroupId, 1L, "Hello World"));
		ar.setIsok(true);
		ar.setData(list);
		return ar;
	}
}
