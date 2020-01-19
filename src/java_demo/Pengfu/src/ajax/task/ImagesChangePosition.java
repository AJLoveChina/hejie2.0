package ajax.task;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.entity.ImagesContainer;
import ajax.model.entity.Info;
import ajax.model.entity.Item;
import ajax.model.entity.Page;

public class ImagesChangePosition {
	
	private static void copy(String oldPath, String newPath) {
		try {
		    // Create channel on the source
		    FileChannel srcChannel = new FileInputStream(oldPath).getChannel();

		    // Create channel on the destination
		    FileChannel dstChannel = new FileOutputStream(newPath).getChannel();

		    // Copy file contents from source to destination
		    dstChannel.transferFrom(srcChannel, 0, srcChannel.size());

		    // Close the channels
		    srcChannel.close();
		    dstChannel.close();
		} catch (IOException e) {
			Info info = new Info();
			info.setKey("images_change_position_error");
			info.setValue(oldPath);
			info.save();
		}
	}
	
	public static void main(String[] args) {
		
		int page = 1;
		List<Item> items = new ArrayList<Item>();
		do {
		
			items = Page.getPage(page);
			
			for (Item item : items) {
				String content = item.getContent();
				
				Document doc = Jsoup.parse(content);
				
				Elements eles = doc.select("img");
				
				for (Element ele : eles) {
					String lazy = ele.attr("data-lazy");
					
					if (lazy != "" && lazy != null) {
						// ImagesContainer ic = ImagesContainer.getBy("webPath", lazy, ImagesContainer.class);
						
						//if (ic != null) {
							copy("WebRoot/" + lazy, "WebRoot/images/" + lazy);
						//}
					} else {
						String src = ele.attr("src");
						
						copy("WebRoot/" + src, "WebRoot/images/" + src);
					}
				}
				
			}
		
			page ++;
		}while(items.size() >= 20 && page <= 20);
		
		System.out.println("Finish...");
	}
}
