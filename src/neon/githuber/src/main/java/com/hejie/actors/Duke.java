package com.hejie.actors;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.hejie.instruments.Instrument;

public class Duke implements Actor{
	private int age;
	private Instrument instrument;
	
	@Override
	public void act() { 
		System.out.println("This is actor about " + age + " years old, He is acting...");
		System.out.println("He is playing");
		this.instrument.play();
	}
	
	public Duke(int age, Instrument instrument) {
		this.age = age;
		this.instrument = instrument;
	}
	
	
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/hejie/actors/bean.xml");
		
		Actor actor = (Actor) ctx.getBean("Duke");
		
		actor.act();
	}

}
