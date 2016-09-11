package ajax.controller.spring.aspects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;

import ajax.model.exception.LimitsOfAuthorityException;
import ajax.model.safe.User;

@Aspect
public class SafeAspect {
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	
	@Pointcut("execution(** ajax.controller.spring.AdminController.*(..))")
	public void AdmintCut(){};
	
	
	
	@Around("AdmintCut()")
	public Object beforeTest(ProceedingJoinPoint proceedingJoinPoint) throws LimitsOfAuthorityException,Throwable {
		if(!User.isAdmin(request, response)) {
			
			request.setAttribute("model", "权限不足 (LimitsOfAuthorityException)");
			return "/views/error/error";
			
		} else {
			return proceedingJoinPoint.proceed();
		}
	}
	
	
	
	
}
