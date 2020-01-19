package com.meajax.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.meajax.model.QueryResult;
import com.meajax.model.Run;
import com.meajax.model.base2.Point;
import com.meajax.model.base2.SchemePopulation;
import com.meajax.model.interfaces.Individual;
import com.meajax.model.interfaces.Population;

@WebServlet("/index")
public class Index extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public Index() {
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
		response.setCharacterEncoding("UTF-8");
		
		if (action != null && !action.equals("")) { 
			
			
			// 随机初始化几个资源点
			List<Point> resourcePoints = new ArrayList<Point>();
			
			for (int i = 0; i < 5; i++) {
				resourcePoints.add(new Point(Point.Type.RESOURCE, i));
			}
			
			// 随机初始化几个灾害点
			List<Point> damagePoints = new ArrayList<Point>();
			for (int i = 0; i < 10; i++) {
				damagePoints.add(new Point(Point.Type.DAMAGE, i));
			}
			
			
			SchemePopulation pop = new SchemePopulation();
			pop.setResourcesPoints(resourcePoints);
			pop.setDamagesPoints(damagePoints);
			
			pop.init();
			
			System.out.println("种群初始化完成.");
			System.out.println("种群第一代进化...");
			
			Run run = new Run(pop);
			Population finalPop = run.start(100);
			
			List<SchemePopulation.Front> fronts = finalPop.nonDominatedSort(finalPop.getSchemes());
			List<Individual> schemes = fronts.get(0).getSchemes();
			
			List<QueryResult> qrs = new ArrayList<QueryResult>();
			for (Individual scheme : schemes) {
				qrs.add(scheme.toQueryResult());
			}
			
			Gson gson = new Gson();
			PrintWriter out = response.getWriter();
			
			out.print(gson.toJson(qrs.get(0)));
			out.flush();
			out.close();
			
			
		} else {
			RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
			
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
