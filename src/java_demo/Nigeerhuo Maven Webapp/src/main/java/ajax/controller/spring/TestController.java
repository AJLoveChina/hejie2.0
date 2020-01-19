package ajax.controller.spring;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ajax.test.Test01;


@Controller
@RequestMapping(value="/test")
public class TestController {

	@RequestMapping(value="/testFinalProperty")
	public void testFinalProperty(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String test = Test01.getConfigFromTable();
		
		PrintWriter out = response.getWriter();
		
		out.println(test);
		
		out.flush();
		out.close();
		
	}
}
