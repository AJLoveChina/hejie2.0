package com.hejie.spring.beans;

public class MusicTicket implements Ticket{

	@Override
	public void printInfo() {
		System.out.println("This is music ticket.");
	}

}
