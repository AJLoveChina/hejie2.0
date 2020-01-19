package com.meajax.model;

import java.io.*;
import java.net.*;
import java.util.*;

import com.meajax.tools.Tools;

public class Query implements Runnable{

	private Socket incoming;
	
	public Socket getIncoming() {
		return incoming;
	}

	public void setIncoming(Socket incoming) {
		this.incoming = incoming;
	}

	public Query(Socket incoming) {
		this.setIncoming(incoming);
	}
	@Override
	public void run() {
		
		try {
			Socket s = this.getIncoming();
			InputStream inStream = s.getInputStream();
			OutputStream outStream = s.getOutputStream();
			
			
			HttpRequest req = new HttpRequest(inStream);
			HttpResponse res = new HttpResponse(outStream);
			
//			Scanner scan = new Scanner(inStream);
//			while(scan.hasNextLine()){
//				String line = scan.nextLine();
//				System.out.println(line);
//			}
			
			
			String data = req.getData();
			String result = "Hello " + data + " !";
			System.out.println(result);
			res.write(result);
			
			s.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
