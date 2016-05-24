package com.meajax.Tools;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


public class Tools {
	
	
	
	public static <T> String join(List<T> list, String delimeter) {
		StringBuilder sb = new StringBuilder();
		sb.append(list.get(0));
		for (int i = 1; i < list.size(); i++) {
			sb.append(delimeter);
			sb.append(list.get(i));
		}
		return sb.toString();
	}
	
}
