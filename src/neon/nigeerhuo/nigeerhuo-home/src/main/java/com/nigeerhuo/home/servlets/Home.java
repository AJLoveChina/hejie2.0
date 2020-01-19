package com.nigeerhuo.home.servlets;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.pagesSeparate.RealTimePagination;
import ajax.model.taobao.Coupon;
import ajax.model.taobao.model.GoodsType;
import ajax.model.taobao.model.Platform;
import ajax.model.taobao.model.TbkItem;

/**
 * Servlet implementation class Home
 */
@WebServlet("")
public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Home() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<? extends TbkItem> tbkItemsRoll = GoodsType.getTBKItemsOfRoll(Platform.PC);
		
		List<GoodsType> goodsTypes = GoodsType.getShowGoodsType();
		
		RealTimePagination<Coupon> pagination = new RealTimePagination<>();
		List<Coupon> coupons = pagination.get(Coupon.COUPON_PAGINATION_GROUPID, 1, new Coupon());
		
		
		request.setAttribute("itemsRoll", tbkItemsRoll);
		request.setAttribute("goodsTypes", goodsTypes);
		request.setAttribute("coupons", coupons);
		
		RequestDispatcher rd = request.getRequestDispatcher("home.jsp");
		
		rd.forward(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
