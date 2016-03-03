package com.meajax.controller;

import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.*;

public class Client {
	
	static void send(String data) {
		try {
			
			Socket s = new Socket("127.0.0.1", StartServer.port);
			OutputStream out = s.getOutputStream();
			out.write(data.getBytes());
			out.flush();
			out.close();
			s.close();
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static void deal(Object param) {
		String data = param.toString();
		send(data);
	}
	
	public static void main(String[] args) {
		
		deal("Shanghai");
		
	}
}
