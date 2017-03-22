package ajax.task;

import java.util.List;

import ajax.model.entity.Item;
import ajax.model.entity.Page;

public class UploadDataToOss {
	private static void updateImgsOfItemsInPagesToOss() {
		int max = Page.getNowMaxPage();
		
		int page = 1;
		
		do {
			List<Item> items = Page.getPage(page);
			
			for (Item item : items) {
				if (item.isHasImageUploadedToOss()) {
					System.out.println("忽略 : 已经上传到oss了");
				} else {
					item.uploadImagesToOss();
				}
			}
			
		}while(++page <= max);
		
	}
	
	
	private static void do2() {
		int max = Page.getNowMaxPage();
		
		do {
			
			
			List<Item> items = Page.getPage(max);
			
			System.out.println(items);
			
		}while(--max > 0);
	}
	
	private static void do1() {

		Item item = new Item();
		item.load(831);
		
		item.uploadImagesToOss();
		
	}
	
	public static void main(String[] args) {
		
		// updateImgsOfItemsInPagesToOss();
		
		do2();
		
	}
}
