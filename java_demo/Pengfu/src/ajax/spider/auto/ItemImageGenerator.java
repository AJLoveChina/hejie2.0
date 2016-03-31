package ajax.spider.auto;

import ajax.model.entity.Item;

/**
 * 生成一条Item的缩略图, 从content图片中选择一张
 * @author ajax
 *
 */
public class ItemImageGenerator {
	
	public static void main(String[] args) {
		Item item = new Item();
		item.load(11);
		
		item.generateItemImage();
	}
}
