package com.meajax.tools;

import java.io.*;

public class Tools {
	public static void printInputStream(InputStream in) {
		System.out.println(getStringFromInputStream(in));
	}
	
	public static String getStringFromInputStream(InputStream in) {
		ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		byte[] buf = new byte[1024];
		int len;
		
		try {
			while((len = in.read(buf)) > -1) {
				bytes.write(buf, 0, len);
			}
			in.close();
			return bytes.toString();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
		return "";
	}
}
