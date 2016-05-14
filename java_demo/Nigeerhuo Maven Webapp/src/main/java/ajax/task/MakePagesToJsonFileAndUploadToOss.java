package ajax.task;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.commons.io.IOUtils;

import ajax.model.AjaxResponse;
import ajax.model.UrlRoute;
import ajax.model.entity.Item;
import ajax.model.entity.Page;
import ajax.tools.OssUtil;

public class MakePagesToJsonFileAndUploadToOss {
	public static void main(String[] args) {
		int max = Page.getNowMaxPage();
		
		int page = 1;
		
		do {
			Page p = Page.getByPage(page);
			
			List<Item> items = Item.get(p.get$items());
			
			for(Item item : items) {
				item.setContent("");
			}
			
			
			AjaxResponse<List<Item>> ar = new AjaxResponse<List<Item>>();
			
			ar.setIsok(true);
			ar.setData(items);
			
			String data = ar.toJson();
			
			InputStream in;
			try {
				in = new ByteArrayInputStream(data.getBytes("utf-8"));
				
				OssUtil.uploadToNigeerhuo(UrlRoute.OSS_STATIC.getUrl() + "pages/" + page + ".json", in);
				
				
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}while(++page <= max);
	}
}
