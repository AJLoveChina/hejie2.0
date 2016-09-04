package com.hejie.instruments;

import org.springframework.stereotype.Component;

@Component
public class Piano implements Instrument{

	@Override
	public void play() {
		System.out.println("Ding ding ..");
	}
	
}
