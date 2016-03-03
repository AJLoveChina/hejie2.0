package com.meajax.model;

import java.io.*;

import com.meajax.tools.Tools;


public class HttpRequest {
	
	private InputStream in;
	public InputStream getIn() {
		return in;
	}
	public void setIn(InputStream in) {
		this.in = in;
	}
	
	public HttpRequest(InputStream in) {
		this.setIn(in);
	}
	
	public String getParameter(String key) {
		return "This method Not finished!";
	}
	
	public void print() {
		Tools.printInputStream(getIn());
	}
	public String getData() {
		return Tools.getStringFromInputStream(getIn());
	}
}
