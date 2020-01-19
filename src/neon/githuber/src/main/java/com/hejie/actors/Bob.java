package com.hejie.actors;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Bob implements Actor{

	@Override
	public void act() {
		System.out.println("Bob is acting...");
	}

	
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/hejie/actors/bean.xml");
		
		Actor actor = (Actor) ctx.getBean("Bob");
		
		actor.act();
	}
}
