package ajax.task;

import java.io.ByteArrayInputStream;
import java.util.List;

import com.aliyun.oss.OSSClient;

import ajax.model.entity.Item;
import ajax.model.entity.Page;
import ajax.tools.OssUtil;

public class UploadDataToOss {
	private static void updateImgsOfItemsInPagesToOss() {
		int max = Page.getNowMaxPage();
		
		int page = 1;
		
		do {
			List<Item> items = Page.getPage(1);
			
		}while(++page <= max);
		
		
		
		
	}
	
	private static void do1() {
		OSSClient client = OssUtil.getOssClient();
		
		
//		String key = "images/web/pic/MyObjectKey";
//		String content = "Thank you for using OSS SDK for Java";
//		client.putObject("nigeerhuo-public", key, new ByteArrayInputStream(content.getBytes()));
		
		
		
		
		OssUtil.close(client);
	}
	
	public static void main(String[] args) {
		
		do1();
	}
}
