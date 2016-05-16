package ajax.controller.spring;

import java.io.File;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.AjaxResponse;
import ajax.model.UrlRoute;
import ajax.model.entity.Exam;
import ajax.model.entity.Exam.Paper;
import ajax.model.safe.User;
import ajax.tools.Tools;

import com.google.gson.Gson;

@Controller
@RequestMapping(value="/exam")
public class ExamController extends HttpServlet {
	
	
	
	@RequestMapping(value="/edit")
	public String editExam(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String action = request.getParameter("action");
		User user = User.getLoginUser(request);
		AjaxResponse<String> ar = new AjaxResponse<String>();
		PrintWriter out = response.getWriter();
		
		boolean isLogin = false;
		boolean isAdmin = false;
		if (user != null) {
			isLogin = true;
			
			if (user.isAdmin()) {
				isAdmin = true;
			}
		}
		
		
		request.setAttribute("isLogin", isLogin);
		request.setAttribute("isAdmin", isAdmin);
		
		Exam exam = new Exam();
		exam.setTitle("出题系统");
		exam.setDiffuculty(3);
		exam.setImg(UrlRoute.PIC_EXAM.getUrl());
		exam.setNum(10);
		exam.setSeconds(300);
		exam.setType("选择题");
		exam.setUrl("/static/exam/blank.txt");
		
		request.setAttribute("exam", exam);
		
		return "editExam";
	}
	
	@RequestMapping(value="/save")
	public void examSave(HttpServletRequest request, HttpServletResponse response) throws Exception{
		AjaxResponse<String> ar = new AjaxResponse<String>();
		PrintWriter out = response.getWriter();
		User user = User.getLoginUser(request);
		
		if (!User.isAdmin(request, response)) {
			ar.setIsok(false);
			ar.setData("未登录, 或者无权限");
			out.println(ar.toJson());
			out.flush();
			out.close();
			return;
		}
		String dataParam = request.getParameter("data");
		dataParam = URLDecoder.decode(dataParam, "utf-8");
		Gson gson = new Gson();
		Exam exam = new Exam();
		String filePath = new Date().getTime() + ".txt";
		Exam.Paper paper = exam.new Paper();
		
		paper = gson.fromJson(dataParam, Exam.Paper.class);
		
		Exam.Data data = paper.getData();
		exam.setDiffuculty(data.getCover().getDifficulty().length);
		exam.setImg(UrlRoute.PIC_EXAM.getUrl());
		exam.setNum(10);
		exam.setSeconds(data.getCover().getSeconds());
		exam.setTitle(data.getCover().getTitle());
		exam.setType("选择题");
		exam.setUserid(user.getId());
		exam.setUrl("/static/exam/" + filePath);
		
		
		if (exam.save()) {
			
			paper.getData().getConfig().setId(exam.getId());
			
			Gson gson2 = new Gson();
			String path = "/static/exam/" + filePath;
			String fileData = gson2.toJson(paper);
			
			
			path = this.getServletContext().getRealPath(path);
			Tools.writeDataToFile(fileData, new File(path), "UTF-8");
			
			
			ar.setIsok(true);
			ar.setData(exam.getLink());
			out.println(ar.toJson());
			out.flush();
			out.close();
			
		} else {
			
			ar.setIsok(false);
			ar.setData("保存失败");
			out.println(ar.toJson());
			out.flush();
			out.close();
		}
	}
	
	
}
