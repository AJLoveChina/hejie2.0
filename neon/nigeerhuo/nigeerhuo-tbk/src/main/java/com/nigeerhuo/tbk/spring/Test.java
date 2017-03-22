package com.nigeerhuo.tbk.spring;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.taobao.model.GoodsType;
import ajax.model.taobao.model.TbkItem;
import ajax.model.taobao.model.TbkItemPC;

/**
 * Servlet implementation class Test
 */
@WebServlet("/test123")
public class Test extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Test() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		long id = Long.parseLong(request.getParameter("id"));
		
		TbkItem tbkItem;
		String commentAreaId = null;
		tbkItem = TbkItemPC.get(TbkItemPC.class, id);
		commentAreaId = "ajax.model.taobao.model.TbkItemPC-" + tbkItem.getId();
		
		request.setAttribute("model", tbkItem);
		request.setAttribute("title", tbkItem.getTitle());
		request.setAttribute("commentAreaId", commentAreaId);
		request.setAttribute("stamps", GoodsType.getShowGoodsType());
		
		
		request.getRequestDispatcher("/views/tbk/one.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
