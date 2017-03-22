package ajax.spider.auto;

import java.util.List;

import ajax.model.entity.Item;
import ajax.model.entity.Page;

public class PageGenerator {
	
	public static void generate() {
		int maxPage = Page.getNowMaxPage();
		int nextPage = maxPage + 1;
		
		int num = Page.$num;
		
		Page page = new Page();
		page.setPage(nextPage);
		
		while(num > 0) {
			Item item = Item.getOneItemWhichIsNotInPage();
			page.addOneItem(item);
			
			item.setPage(nextPage);
			item.update();
			
			item.betterThanBetter();
			
			num--;
		}
		
		page.save();
		System.out.println("Page " + nextPage + " generated OK!");
	}
	
	public static void deal2() {
		int maxPage = Page.getNowMaxPage();
		int nowPage = 1;
		
		List<Item> items;
		do {
			items = Page.getPage(nowPage);
			
			for (Item item : items) {
				item.betterThanBetter();
			}
			nowPage++;
			System.out.println(nowPage + "/" + maxPage);
		}while(nowPage < maxPage);
	}
	
	public static void main(String[] args) {
//		int pages =  1000;
//		
//		
//		while(pages-- > 0) {
//			generate();
//		}
		
		deal2();
	}
}
