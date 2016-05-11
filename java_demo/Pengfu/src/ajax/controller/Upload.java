package ajax.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.entity.Item;
import ajax.model.safe.User;
import ajax.tools.Tools;

@WebServlet("/upload")
public class Upload extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public Upload() {
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

		int id = Tools.parseInt(request.getParameter("id"), -1);
		String action = request.getParameter("action");
		
		
		if (action != null) {
			
			AjaxResponse<String> ar = new AjaxResponse<String>();
			
			// 必须要有权限
			if(User.isAdmin(request, response)) {
				String itemJson = request.getParameter("item");
				Gson gson = new Gson();
				Item item = gson.fromJson(itemJson, Item.class);
				
				
				if (action.equals("submit")) {
					if (item.getId() > 0) {
						item.update();
					} else {
						item.setUrl(null);
						if (item.getStamps().trim().equals("")) {
							item.setStamps(null);
						}
						item.setContent(item.changeUeditorUploadContentImagesSrcAndReturnContent());
						item.save();
					}
					
					ar.setIsok(true);
					ar.setData(item.getOneItemPageUrl());
				} else if (action.equals("remove")) {
					item.delete();
					
					ar.setIsok(true);
					ar.setData("删除成功!");
				}
				
			} else {

				ar.setIsok(false);
				ar.setData("权限不足");
				
			}
			
			ar.flush(response);
		} else {
			Item item = new Item();
			
			if (id != -1) {
				item.load(id);
			} else {
				item.setContent("");
				item.setBackgroundInformation("");
				item.setPreviewImage("");
				item.setStamps("");
				item.setSummary("");
				item.setTitle("");
				item.setUrl("");
				item.setUsername("");
				item.setUserPersonalPageUrl("");
			}
			
			request.setAttribute("item", item);
			
			RequestDispatcher rd = request.getRequestDispatcher("upload.jsp");
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
