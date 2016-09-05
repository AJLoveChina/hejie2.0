package com.hejie.people;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Audience {
	@Pointcut("execution(** com.hejie.actors.Actor.act(..))")
	public void act() {}
	
	@Before("act()")
	public void takeSeats() {
		System.out.println("Looking for seat..");
	}
	
	@Before("act()")
	public void turnOffCellPhones() {
		System.out.println("Turn off cellphones");
	}
	
	@AfterReturning("act()")
	public void applaud() {
		System.out.println("CLAP ...");
	}
	
	@AfterThrowing("act()")
	public void demandRefund() {
		System.out.println("What a terrible show...");
	}
}
