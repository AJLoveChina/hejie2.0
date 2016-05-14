package ajax.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import ajax.model.AjaxRequest;
import ajax.model.AjaxResponse;
import ajax.model.AuthException;
import ajax.model.entity.ItemsRoll;
import ajax.model.safe.User;

@WebServlet("/ads")
public class Ads extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public Ads() {
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
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			RequestDispatcher rd = request.getRequestDispatcher("Error.jsp");
			
			rd.forward(request, response);
			return;
		}
		
		
		String action = request.getParameter("action");
		
		
		if (action != null && !action.trim().equals("")) {
			
			AjaxResponse<String> ar = new AjaxResponse<String>();
			
			
			if (User.isAdmin(request, response)) {
				String model = request.getParameter("model");
				Gson gson = new Gson();
				ItemsRoll itemsRoll = gson.fromJson(model, ItemsRoll.class);
				
				if (action.equals("update")) {
					itemsRoll.update();
				} else if (action.equals("delete")) {
					itemsRoll.delete();
				} else if (action.equals("save")) {
					itemsRoll.save();
				}
				
				ar.setIsok(true);
				ar.setData("");
				
				
			} else {
				
				ar.setIsok(false);
				ar.setData("木有权限");
				
			}

			ar.flush(response);
			
		} else {
			RequestDispatcher rd = request.getRequestDispatcher("ads.jsp");
			
			rd.forward(request, response);
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
