package ajax.controller.spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/error")
public class ErrorController {

	
	@RequestMapping("/404")
	public String error404() {
		return "404";
	}
	
	
	
}
