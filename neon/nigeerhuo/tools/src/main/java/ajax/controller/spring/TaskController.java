package ajax.controller.spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/task")
public class TaskController {
	
	
	@RequestMapping("/list")
	public List<String> getTasks() {
		List<String> list = new ArrayList<String>();
		
		
		list.add("Jack");
		list.add("Lily");
		list.add("Bob");
		
		return list;	
	}
	
	
	
	
}
