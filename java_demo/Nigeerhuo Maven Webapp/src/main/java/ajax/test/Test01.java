package ajax.test;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.json.*;

import com.google.gson.Gson;

import ajax.model.entity.Exam;
import ajax.model.entity.ImagesContainer;
import ajax.model.entity.Item;
import ajax.tools.Tools;


public class Test01 {
	
	public static final int i = count();
	public static String CONFIG_FROM_TABLE = null;
	
	public static int count() {
		return 3;
	}
	public static void testClass(){
		
	}
	
	public static void main(String[] args) {
		
		System.out.println(i);
		
	}
	public static String getConfigFromTable() {
		Tools.setConfig("aj-just-a-test", "123");
		if (CONFIG_FROM_TABLE == null) {
			CONFIG_FROM_TABLE = Tools.getConfig("aj-just-a-test");
			
		}
		
		return CONFIG_FROM_TABLE;
		
	}

}
