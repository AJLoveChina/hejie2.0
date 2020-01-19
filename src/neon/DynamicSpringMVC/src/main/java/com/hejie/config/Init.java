package com.hejie.config;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class Init extends HttpServlet{

	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
		

        try {
			Class.forName("com.hejie.util.HibernateUtil");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
