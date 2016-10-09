package ajax.controller.spring.aspects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;

import ajax.model.AjaxResponse;
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
	
	@Pointcut("execution(** ajax.controller.spring.JobController.*(..))")
	public void JobsCut(){};
	
	@Pointcut("execution(** ajax.controller.spring.BlogsController.edit(..))")
	public void editBlogArea(){};
	
	@Pointcut("@within(ajax.model.annotations.EditorPointcut) || @annotation(ajax.model.annotations.EditorPointcut)")
	public void editorPointcut(){};
	
	@Pointcut("@within(ajax.model.annotations.EditorPointcutForAjax) || @annotation(ajax.model.annotations.EditorPointcutForAjax)")
	public void editorPointcutForAjax(){};
	
	
	@Around("AdmintCut()")
	public Object beforeTest(ProceedingJoinPoint proceedingJoinPoint) throws LimitsOfAuthorityException,Throwable {
		if(!User.isAdmin(request, response)) {
			
			request.setAttribute("model", "权限不足 (LimitsOfAuthorityException)");
			return "/views/error/error";
			
		} else {
			return proceedingJoinPoint.proceed();
		}
	}
	
	@Around("JobsCut()")
	public Object jobsCutAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		if (!User.isAdmin(request, response)) {
			request.setAttribute("model", "权限不足 (LimitsOfAuthorityException)");                                  
			return "/views/error/error";
		} else {
			return proceedingJoinPoint.proceed();
		}
	}
	
	@Around("editBlogArea()")
	public Object blogEditAuthority(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		
		User user = User.getLoginUser(request);
		if (user == null || !user.isCanSubmitBlog()) {
			request.setAttribute("model", "权限不足 (LimitsOfAuthorityException)");
			return "/views/error/error";
		} else {
			return proceedingJoinPoint.proceed();
		}
	}
	
	@Around("editorPointcut()")
	public Object editorPointcutAuthority(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		
		User user = User.getLoginUser(request);
		if (user == null || !user.isCanSubmitBlog()) {
			request.setAttribute("model", "权限不足 (LimitsOfAuthorityException)");
			return "/views/error/error";
		} else {
			return proceedingJoinPoint.proceed();
		}
	}
	
	@Around("editorPointcutForAjax()")
	public Object editorPointcutForAjaxAuthority(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		
		User user = User.getLoginUser(request);
		if (user == null || !user.isCanSubmitBlog()) {
			AjaxResponse<String> ar = new AjaxResponse<>();
			ar.setIsok(false);
			ar.setData("权限不足, 您没有博客权限");
			return ar;
		} else {
			return proceedingJoinPoint.proceed();
		}
	}
	
	
	
}
