package com.hejie.spring.aspect;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Safe {
	
	@Pointcut("execution(** com.hejie.spring.beans.Hejie.act(..))")
	public void hejieAct(){};
	
	@Pointcut("execution(** com.hejie.spring.beans.Dandan.act(..))")
	public void dandanAct(){};
	
	@Before("hejieAct()")
	public void closeLantern() {
		System.out.println("Lantern is turned off..");
	}
	
	@Before("dandanAct()")
	public void closeLantern2() {
		System.out.println("Lantern is turned off..");
	}
	
	@AfterReturning("hejieAct()")
	public void applaud() {
		System.out.println("Audience is applauding..");
	}
}
