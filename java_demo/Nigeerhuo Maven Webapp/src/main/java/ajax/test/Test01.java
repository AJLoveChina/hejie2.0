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


public class Test01 {
	public static void testClass(){
		
	}
	
	public static void main(String[] args) {
		
		Item item = new Item();
		item.load(814);
		
		item.removeFromPage();
		
	}

}
