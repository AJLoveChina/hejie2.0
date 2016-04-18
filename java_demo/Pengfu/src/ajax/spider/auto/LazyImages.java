package ajax.spider.auto;

import java.util.List;

import ajax.model.entity.Item;
import ajax.model.entity.Page;

public class LazyImages {
	
	private static void do1() {
		int MaxPage = Page.getNowMaxPage();
		
		int page = 1;
		do {
			List<Item> items = Page.getPage(page);
			
			
			for (Item item : items) {
				item.lazyImage();
			}
			
			System.out.println(page);
		}while(++page <= 20);
	}
	
	public static void main(String[] args) {
		do1();
	}
}
