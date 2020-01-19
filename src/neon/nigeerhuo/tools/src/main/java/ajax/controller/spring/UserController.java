package ajax.controller.spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller

@RequestMapping(value="/user")
public class UserController {
	
	@RequestMapping(value="/home")
	public String userHome() {
		return "userhome";
	}
	
}
