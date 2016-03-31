package ajax.test;

import java.util.Iterator;

import ajax.model.entity.ImagesContainer;
import ajax.model.entity.Item;


public class Test01 {
	public static void testClass(){
		
		
	}
	
	public static void main(String[] args) {
		Iterator<Item> it = (new Item()).iterator();
		
		while(it.hasNext()) {
			Item item = it.next();
			
			String title = item.getTitle();
			title = title.replaceAll("\\?|？", "");
			item.setTitle(title);
			item.update();
			
			System.out.println(item.getTitle());
		}
		
		
	}

}
