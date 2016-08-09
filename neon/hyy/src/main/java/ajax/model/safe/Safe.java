package ajax.model.safe;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;

public class Safe {
	private static final String STATE_ATTR = "aj-sign-state-avoid-csrf";
	
	public static void generateState(HttpServletRequest request) {
		String state = new Random().nextInt(10000) + 10000 + "";
		request.getSession().setAttribute(STATE_ATTR, state);
	}
	
	public static String getState(HttpServletRequest request) {
		String state = (String) request.getSession().getAttribute(STATE_ATTR);
		
		if (state == null) {
			Safe.generateState(request);
			state = (String) request.getSession().getAttribute(STATE_ATTR);
		}
		
		String hh = "123";
		return state;
	}
	
	
}
