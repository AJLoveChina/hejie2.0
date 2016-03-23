package ajax.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.*;
import ajax.tools.*;
/**
 * Servlet implementation class Index
 */
@WebServlet("/Index")
public class Index extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Index() {
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
		String pageParam = request.getParameter("page");
		String typeParam = request.getParameter("type");
		
		JokeType jokeType = null;
		if (typeParam != null) {
			Integer typeID = Integer.parseInt(typeParam);
			
			jokeType = JokeType.getLegalJokeTypeByTypeId(typeID);
		}
		
		int page = 0;
		if (pageParam != null) {
			page = Integer.parseInt(pageParam);
		}
		
		if (page <= 0) {
			page = 1;
		}
		
		ArrayList<Joke> jokes = new ArrayList<Joke>();
		if (jokeType == null) {
			int truePage = Joke.getTruePageNumForIndexPage(page);
			jokes = Joke.getPageOf(truePage);
		} else {
			jokes = Joke.getJokesByType(jokeType, page);
		}
		
		
		
		request.setAttribute("jokes", jokes);
		request.setAttribute("page", page);
		
		RequestDispatcher rd = request.getRequestDispatcher("Index.jsp");
		
		rd.forward(request, response);
		
	}

}
