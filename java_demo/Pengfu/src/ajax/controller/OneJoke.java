package ajax.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.Joke;

/**
 * Servlet implementation class OneJoke
 */
@WebServlet("/OneJoke")
public class OneJoke extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OneJoke() {
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
		
		String idParam = request.getParameter("id");
		int id;
		if (idParam == null) {
			id = 18;
		} else {
			id = Integer.parseInt(idParam);
		}
		
		Joke joke = Joke.getOneByIdFromSQL(id);
		
		request.setAttribute("joke", joke);
		RequestDispatcher rd = request.getRequestDispatcher("demo.jsp");
		rd.forward(request, response);
		
	}

}
