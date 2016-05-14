package ajax.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ajax.model.Joke;

/**
 * Servlet implementation class SaveJoke
 */
@WebServlet("/SaveJoke.do")
public class SaveJoke extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveJoke() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("urlId");
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		int like = Integer.parseInt(request.getParameter("like").trim());
		int dislike = Integer.parseInt(request.getParameter("dislike").trim());
		
		Joke joke = new Joke();
		joke.setUrl(Joke.getUrlById(id));
		joke.setTitle(title);
		joke.setContent(content);
		joke.setLikes(like);
		joke.setDislike(dislike);
		
		PrintWriter out = response.getWriter();
		out.print(123);
	}
	
	public static void main(String[] args) {
		
	}

}
