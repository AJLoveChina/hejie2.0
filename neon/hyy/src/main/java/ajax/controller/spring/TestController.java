package ajax.controller.spring;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ajax.model.AjaxResponse;


@Controller
@RequestMapping(value="/test")
public class TestController {

	@RequestMapping(value="/test1")
	@ResponseBody
	public AjaxResponse<List<String>> testFinalProperty(){
		
		String[] arr = {"Hello", "I", "Love", "You"};
		
		AjaxResponse<List<String>> ar = new AjaxResponse<>();
		ar.setData(Arrays.asList(arr));
		ar.setIsok(true);
		return ar;
		
	}
}
