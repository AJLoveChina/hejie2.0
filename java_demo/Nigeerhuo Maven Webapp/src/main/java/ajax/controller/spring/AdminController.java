package ajax.controller.spring;

import java.io.UnsupportedEncodingException;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.entity.ItemsRoll;
import ajax.model.safe.SignStatus;
import ajax.model.safe.User;



@Controller
@RequestMapping(value="/admin")
public class AdminController {
	
	@RequestMapping(value="/home")
	public String admin(HttpServletRequest request, HttpServletResponse response) {
		SignStatus ss = User.getSignStatus(request, response);
		
		RequestDispatcher  rd = request.getRequestDispatcher("Admin.jsp");
		
		request.setAttribute("signStatus", ss);
		
		
		return "Admin";
	}
	
	@RequestMapping(value="/ads")
	public String ads(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		if (!User.isAdmin(request, response)) {
			
			request.setAttribute("error", "权限不足");
			
			return "Error";
		}
		
		
		return "ads";
		
		
	}
	
	@RequestMapping(value="/ads/{action}")
	public void adsAction(@PathVariable("action") String action, HttpServletRequest request, HttpServletResponse response) {
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
		
	}
}
