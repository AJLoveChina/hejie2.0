package ajax.test;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import org.json.*;

import ajax.model.entity.ImagesContainer;
import ajax.model.entity.Item;


public class Test01 {
	public static void testClass(){
		
	}
	
	public static void main(String[] args) {
		
		
		try {
			
			File file = new File("WebRoot/test/pp/tt"); 
			if (!file.exists()) {
				file.mkdirs();
			} else {
				System.out.println("yicun zai");
			}
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
		} 
		
	}

}
