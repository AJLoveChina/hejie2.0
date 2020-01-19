package ajax.spider.auto;

import java.util.ArrayList;
import java.util.List;

import ajax.model.entity.Item;
import ajax.model.entity.Source;

public class DealWithSource {
	
	private static void dealLists(List<Source> lists) {
		for (Source s : lists) {
			Item item = s.grabSelf();
			s.grabAndSaveToItemAndChangeSelfStatus();
		}
	}
	
	
	
	public static void main(String[] args) {
		Source s = new Source();
		int page = 1;
		int pageNum = 10;
		List<Source> lists = new ArrayList<Source>();  
		
		
		do {
			
			lists = s.getPage(page, pageNum);
			
			dealLists(lists);
			
			page ++;
			
			try {
				Thread.sleep(1);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}while(lists.size() > 0);
	}
}
