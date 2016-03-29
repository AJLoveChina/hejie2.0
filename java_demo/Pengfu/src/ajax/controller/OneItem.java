package ajax.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.Joke;
import ajax.model.QueryParams;
import ajax.model.entity.Item;

/**
 * Servlet implementation class OneJoke
 */
@WebServlet("/OneItem")
public class OneItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OneItem() {
        super();
        // TODO Auto-generated constructor stub
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
		
		QueryParams qp = new QueryParams(request);
		
		List<Item> items = Item.query(qp);
		Item item = new Item();
		if (items.size() > 0) {
			item = items.get(0);
		} else {
			item.load(36);
		}
		
		request.setAttribute("item", item);
		request.setAttribute("queryParams", qp);
		
		RequestDispatcher rd = request.getRequestDispatcher("OneItem.jsp");
		rd.forward(request, response);
		
	}

}
