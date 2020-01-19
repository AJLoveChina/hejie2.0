package ajax.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import ajax.model.taobao.model.GoodsType;
import ajax.model.taobao.model.Platform;

public class InitServlet extends HttpServlet {
	
	@Override
	public void init() throws ServletException {
		
		try {
			
    		
			Class.forName("ajax.model.ConfigFromProperties");
			
			Class.forName("ajax.model.ConfigFromSQL");
			
			GoodsType.getTBKItemsOfRoll(Platform.PC);
			GoodsType.getTBKItemsOfRoll(Platform.WAP);
			
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		super.init();
		
	}
	
	
}
