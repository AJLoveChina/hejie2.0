package ajax.controller.spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class Type {
	 @RequestMapping(value="/hello")
	 public String hello() {
		 
		 return "hello";
	 }
	 
}
