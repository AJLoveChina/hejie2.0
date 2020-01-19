package ajax.controller.spring;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/error")
public class ErrorController {

	
	@RequestMapping("/404")
	public String error404(HttpServletRequest request) {
		
		request.setAttribute("model", "二货君找不到你要搜索的页面哎╮(╯▽╰)╭   (404)");
		return "/views/error/error";
	}
	
	@RequestMapping("/runtime")
	public String runtimeException(HttpServletRequest request) {
		request.setAttribute("model", "前方高能,非战斗人员迅速撤离到首页! 二货君也表示灰常抱歉,我们会立刻抢救现场! (AJRunTimeException)");
		return "/views/error/error";
	}	
	
	@RequestMapping("/exception")
	public String justAnException(HttpServletRequest request) {
		request.setAttribute("model", "发生了一个小小的错误, 二货君会立刻修复! (Exception)");
		return "/views/error/error";
	}	
	
}
