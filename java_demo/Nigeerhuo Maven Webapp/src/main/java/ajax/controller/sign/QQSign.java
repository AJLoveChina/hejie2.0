package ajax.controller.sign;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import ajax.model.AjaxResponse;
import ajax.model.entity.Config;
import ajax.model.entity.Item;
import ajax.model.safe.SignStatus;
import ajax.model.safe.User;
import ajax.model.safe.User.QQAccess;

@WebServlet("/sign/qq")
public class QQSign extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public QQSign() {
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
			
			RequestDispatcher rd = request.getRequestDispatcher("/views/html/close.html");
			rd.forward(request, response);
			
		} else {
			if (action == null || action.equals("")) {
				RequestDispatcher rd = request.getRequestDispatcher("/views/html/qqsign.html");
				rd.forward(request, response);
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
				PrintWriter out = response.getWriter();
				
				out.println(json);
				
				out.flush();
				out.close();
			}
			
		}
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
