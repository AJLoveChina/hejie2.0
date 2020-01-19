package com.meajax.model;

import java.io.*;

public class HttpResponse {
	private OutputStream out;
	public OutputStream getOut() {
		return out;
	}

	public void setOut(OutputStream out) {
		this.out = out;
	}

	public HttpResponse(OutputStream out) {
		setOut(out);
	}
	
	public void write(String message) {
		PrintWriter out = new PrintWriter(this.getOut(), true);
		out.println(message);
	}
}
