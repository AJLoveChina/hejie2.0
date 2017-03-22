package ajax.task;

import ajax.model.entity.Item;

public class ChangeItemOfPage {
	
	
	public static void main(String[] args) {
		int itemid = 955;
		int replaceid = 0;
		
		Item item = new Item();
		item.load(itemid);
		
		item.removeFromPage();
		
	}
}
