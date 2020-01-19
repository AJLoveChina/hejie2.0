package ajax.test;

import java.io.File;
import java.lang.reflect.Type;
import java.util.List;

import ajax.model.AjaxResponse;
import ajax.model.entity.Item;
import ajax.model.entity.Page;
import ajax.tools.Tools;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class GsonTest {	
	
	private static void toJson() {
		Item item = new Item();
		item.load(11);
		
		Gson gs = new Gson();
		
		String json = gs.toJson(item);
		
		System.out.println(json);
	}
	
	private static void fromJson() {
		String data = Tools.readFile(new File("src/ajax/test/GsonData.txt"));
		
		Gson gs = new Gson();
		
		Item item = gs.fromJson(data, Item.class);
		System.out.println(item);
	}
	
	private static void arrTojson() {
		List<Item> items = Page.getPage(1);
		
		Gson gs = new Gson();
		
		String s = gs.toJson(items);
		
		Tools.writeDataToFile(s, new File("src/ajax/test/GsonData.txt"));
	}
	
	
	private static void response() {
		AjaxResponse<List> ar = new AjaxResponse<List>();
		
		
		List<Item> items = Page.getPage(1);
		ar.setIsok(true);
		ar.setData(items);
		
		Gson gs = new Gson();
		
		String s = gs.toJson(ar);
		
		Tools.writeDataToFile(s, new File("src/ajax/test/GsonData.txt"));
	}
	
	
	private static void dealResponse() {
		String data = Tools.readFile(new File("src/ajax/test/GsonData.txt"));
		
		Gson gs = new Gson();
		
		
		// Good! reflect!
		Type fooType = new TypeToken<AjaxResponse<List<Item>>>() {}.getType();
		
		AjaxResponse<List<Item>> ar = gs.fromJson(data, fooType);
		System.out.println(ar);
	}
	
	public static void main(String[] args) {
		
		dealResponse();
		
	}
}
