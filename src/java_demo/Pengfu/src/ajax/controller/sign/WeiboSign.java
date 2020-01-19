package ajax.controller.sign;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;














import ajax.model.AjaxResponse;
import ajax.model.entity.Info;
import ajax.model.safe.User;
import ajax.tools.Tools;


@WebServlet("/sign/weibo")
public class WeiboSign extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public WeiboSign() {
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
