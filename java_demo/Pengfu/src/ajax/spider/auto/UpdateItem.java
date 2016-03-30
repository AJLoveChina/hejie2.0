package ajax.spider.auto;

import ajax.model.entity.Item;

public class UpdateItem {
	public static void main(String[] args) {
		Item item = new Item();
		item.load(11);
		
		
		String newContent = item.grabImagesFromContent();
		item.setContent(newContent);
		item.setHasGetImage(true);
		item.update();
		
		System.out.println("OK");
	}
}
