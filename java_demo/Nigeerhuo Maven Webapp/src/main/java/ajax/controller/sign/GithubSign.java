package ajax.controller.sign;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;

import ajax.model.AjaxResponse;
import ajax.model.entity.Info;
import ajax.model.safe.Github;
import ajax.model.safe.User;

@WebServlet("/sign/github")
public class GithubSign extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public GithubSign() {
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
		
		RequestDispatcher rd = request.getRequestDispatcher("/views/html/close.html");
		rd.forward(request, response);
		
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
