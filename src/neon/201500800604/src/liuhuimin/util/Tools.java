package liuhuimin.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;

public class Tools {
	public static String readInputStream(InputStream in) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		byte[] bytes = new byte[1024];
		int len;

		try {
			while ((len = in.read(bytes)) != -1) {
				out.write(bytes, 0, len);
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return out.toString();
	}
	
	public static String readFile(File file) {
		FileInputStream fin;

		try {

			fin = new FileInputStream(file);

			String data = readInputStream(fin);

			return data;

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

		return "";
	}
	
	public static void writeDataToFile(String data, File file) {
		FileWriter fw;
		try {

			fw = new FileWriter(file);
			fw.write(data);

			fw.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void appendDataToFile(String data, File file) {
		String copy = readFile(file);

		writeDataToFile(copy + data, file);

	}
}
