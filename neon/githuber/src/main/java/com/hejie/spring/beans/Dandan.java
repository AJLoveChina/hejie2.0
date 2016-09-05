package com.hejie.spring.beans;

public class Dandan implements Actor{
	private Ticket ticket;
	
	public Ticket getTicket() {
		return ticket;
	}
	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}
	public Dandan(Ticket ticket) {
		this.ticket = ticket;
	}
	@Override
	public void act() {
		System.out.println("Hi I am dandan.");
	}

}
