package com.hejie.actors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.hejie.instruments.Instrument;

public class Jack implements Actor{
	@Autowired
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
		Actor actor = new Jack();
		
		actor.act();
	}
	
	
}
