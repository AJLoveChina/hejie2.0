package ajax.test;

import java.util.Iterator;

import org.json.*;


import ajax.model.entity.ImagesContainer;
import ajax.model.entity.Item;


public class Test01 {
	public static void testClass(){
		
	}
	
	public static void main(String[] args) {
		
		
		Item item = new Item();
		item.load(11);
		
		System.out.println(item.toJSONString());
		
	}

}
