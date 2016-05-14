package ajax.task;

import java.util.ArrayList;
import java.util.List;

import ajax.model.JokeType;
import ajax.model.entity.Item;
import ajax.model.entity.Page;
/**
 * 重新生成一条item的类型
 * @author ajax
 *
 */
public class GenerateItemType {
	
	private static void do1() {
		int maxPage = Page.getNowMaxPage();
		int limit = 20;
		
		int page = 1;
		List<Item> items = new ArrayList<Item>();
		
		do {
			items = Page.getPage(page);
			
			for (Item item : items) {
				
				item.generateType();
			}
			
		}while(++page <= 2);
	}
	
	private static void do2() {
		Item item = new Item();
		
		item.load(1471);
		item.generateType();
		
	}
	
	public static void main(String[] args) {
		do1();
	}
}
