package ajax.controller.spring;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.model.Joke;

@Controller
@RequestMapping(value="/joke")
public class JokeController {
	
	@RequestMapping(value="/{id}")
	public String getById(@PathVariable("id") int id, HttpServletRequest request) {
		
		System.out.println(id);
		Joke joke = new Joke();
		joke.setJokeId(id);
		joke.loadById();
		
		request.setAttribute("joke", joke);
		
		return "joke";
	}
}
