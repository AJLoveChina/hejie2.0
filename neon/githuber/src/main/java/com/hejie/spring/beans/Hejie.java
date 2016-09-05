package com.hejie.spring.beans;

public class Hejie implements Actor{
	private Ticket ticket;
	
	
	public Ticket getTicket() {
		return ticket;
	}
	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}
	public Hejie(Ticket ticket) {
		this.ticket = ticket;
	}
	@Override
	public void act() {
		System.out.println("Hejie is acting now...");
	}

}
