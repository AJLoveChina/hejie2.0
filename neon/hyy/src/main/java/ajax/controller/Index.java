package ajax.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.PropertyConfigurator;

import ajax.model.*;
import ajax.tools.*;
import ajax.model.entity.*;
/**
 * Servlet implementation class Index
 */
@WebServlet("")
public class Index extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Index() {
        super();
        // TODO Auto-generated constructor stub
    }

    @Override
    public void init() throws ServletException {
    	
    	try {
    		
			Class.forName("ajax.model.ConfigFromProperties");
			
			Class.forName("ajax.model.ConfigFromSQL");
			
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	super.init();
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		List<Item> items = new ArrayList<Item>();
		
		QueryParams qp = new QueryParams(request);
		
//		items = Item.query(qp);
		items = Page.getPage(qp.getPage());
		
		request.setAttribute("items", items);
		request.setAttribute("page", Tools.parseInt(qp.getVal("page"), 1));
		request.setAttribute("queryParams", qp);
		
		RequestDispatcher rd = request.getRequestDispatcher("Index.jsp");
		
		rd.forward(request, response);
	}

}
