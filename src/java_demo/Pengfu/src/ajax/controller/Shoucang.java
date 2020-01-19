package ajax.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.AjaxResponse;
import ajax.model.entity.Collect;
import ajax.model.safe.User;
import ajax.tools.Tools;

@WebServlet("/shoucang")
public class Shoucang extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public Shoucang() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/json");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
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
		
		out.println(ar.toJson());
		
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
