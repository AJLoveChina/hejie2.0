package ajax.spider.auto;

import java.util.List;

import ajax.model.entity.Item;
import ajax.model.entity.Page;

public class LazyImages {
	public static void main(String[] args) {
		int MaxPage = Page.getNowMaxPage();
		
		int page = 1;
		do {
			List<Item> items = Page.getPage(page);
			
			
			for (Item item : items) {
				item.lazyImage();
			}
			
			System.out.println(page);
		}while(++page < MaxPage);
	}
}
