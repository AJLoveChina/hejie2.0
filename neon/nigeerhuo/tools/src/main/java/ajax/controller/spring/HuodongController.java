package ajax.controller.spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/huodong")
public class HuodongController {
	
	@RequestMapping(value="/songci")
	public String makeSongci() {
		return "views/huodong/songci";
	}
	
}
