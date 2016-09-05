package com.hejie.actors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;

import com.hejie.instruments.Instrument;
import com.hejie.wiring.CDPlayerConfig;

public class Jack implements Actor{
	@Autowired
	@Qualifier("Piano")
	private Instrument instrument;
	
	@Override
	public void act() {
		System.out.println("Hi I am Jack");
		if (this.instrument != null) {
			System.out.println("I am going to play now..");
			this.instrument.play();
		}
	}
	
	public static void main(String[] args) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext("com/hejie/actors/bean.xml");
		
		Actor actor = new Jack();
		
		actor.act();
	}
	
	
}
