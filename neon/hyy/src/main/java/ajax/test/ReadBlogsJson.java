package ajax.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;

import com.google.gson.Gson;

import ajax.model.ConfigFromProperties;
import ajax.model.entity.Blog;
import ajax.model.pagesSeparate.RealTimePagination;
import ajax.tools.Tools;

public class ReadBlogsJson {

	private class A{
		public List<B> results;
	}
	
	private class B{
		public String content;
		public String createdAt;
		public String desc;
		public boolean hasContent;
		public String stamps;
		public String title;
	}
	
	
	
	
	public static void main(String[] args) throws ParseException {
//		String json = Tools.readInputStream(ReadBlogsJson.class.getResourceAsStream("blogs.json"));
//		
//		Gson gson = new Gson();
//		A a = gson.fromJson(json, A.class);
//		
//		
//		
//		Collections.sort(a.results, new Comparator<B>() {
//
//			@SuppressWarnings("deprecation")
//			@Override
//			public int compare(B o1, B o2) {
//				try {
//					Date d1 = new SimpleDateFormat("yyyy-MM-dd").parse(o1.createdAt.substring(0, 10));
//					
//					Date d2 = new SimpleDateFormat("yyyy-MM-dd").parse(o2.createdAt.substring(0, 10));
//					
//					return d1.compareTo(d2);
//				} catch (ParseException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//				return -1;
//			}
//
//			
//		});
//		
//		for (B b : a.results) {
//			Blog blog = new Blog();
//			blog.setContent(b.content);
//			blog.setDesc(b.desc);
//			blog.setStamps(b.stamps);
//			blog.setTitle(b.title);
//			blog.setDateEnteredOfSave(new SimpleDateFormat(ConfigFromProperties.getTABLE_TIME_FORMAT()).format(new SimpleDateFormat("yyyy-MM-dd").parse(b.createdAt.substring(0, 10))));
//			
//			RealTimePagination<Blog> rp = new RealTimePagination<>();
//			if (!rp.save("ajax.model.entity.Blog-2", blog)) {
//				System.out.println(123);
//			}
//		}
		
		List<Blog> blogs = Blog.get(1, 100, Blog.class);
		for (Blog blog : blogs) {
			blog.setDesc(do1(blog.getDesc()));
			blog.setContent(do1(blog.getContent()));
			blog.update();
		}
	}
	
	private static String do1(String data) {
		Document doc = Jsoup.parse(data);
		
		Elements eles = doc.select("img");
		
		for (Element ele : eles) {
			if (ele.attr("src").startsWith("/ueditor")) {
				ele.attr("src", "http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/images" + ele.attr("src"));
			}
		}

		return doc.body().html();
	}
	
}
