package ajax.model;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;
import java.security.URIParameter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

import org.apache.commons.httpclient.NameValuePair;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.client.utils.URLEncodedUtils;

import ajax.tools.Tools;

public enum PageType {
	PREV(1, "previous page"),
	CUR(2, "Current Page"),
	NEXT(3, "Next Page"),
	
	UNKNOW(10, "未知", false, null),
	FILE(11, "电影", true, JokeType.FILM.getTypeHref()),
	FOOD(12, "美食", true, JokeType.FOOD.getTypeHref()),
	JIUKUAIJIU(13, "九块九", true, "/goods/tbkitems"),
	HOME(99, "首页", true, UrlRoute.HOME.getUrl(), 10);
	
	private int id;
	private String info;
	private boolean showOnNavBar;
	private String href;
	private int rank;
	
	private static List<PageType> PAGE_TYPES = null;
	
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	
	public boolean isShowOnNavBar() {
		return showOnNavBar;
	}
	public void setShowOnNavBar(boolean showOnNavBar) {
		this.showOnNavBar = showOnNavBar;
	}
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
	}
	
	
	private PageType(int id, String info) {
		this(id, info, false, null);
	}
	
	private PageType(int id, String info, boolean showOnNavBar, String href) {
		this(id, info, showOnNavBar, href, 0);
	}
	private PageType(int id, String info, boolean showOnNavBar, String href,
			int rank) {
		this.id = id;
		this.info = info;
		this.showOnNavBar = showOnNavBar;
		try {
			this.href = new URIBuilder(href).setParameter(QueryParams.Parameters.PAGE_TYPE.getKey(), id + "").build().toString();
		} catch (Exception e) {
			this.href = href;
		}
		this.rank = rank;
	}
	
	public static <T> List<PageType> getPageTypeShowOnNavBar() {
		if (PAGE_TYPES != null) {
			return PAGE_TYPES;
		}
		
		List<PageType> pageTypes = new ArrayList<PageType>();
		for (PageType pageType : PageType.values()) {
			if (pageType.isShowOnNavBar()) {
				pageTypes.add(pageType);
			}
		}
		Collections.sort(pageTypes, new Comparator<PageType>() {

			@Override
			public int compare(PageType o1, PageType o2) {
				return o2.getRank() - o1.getRank();
			}
		});
		
		PAGE_TYPES = pageTypes;
		
		return PAGE_TYPES;
	}
	
	/**
	 * 
	 * @param url
	 * @return HOME if can not find
	 */
	public static PageType getCurrentPage(String url) {
		try {
			String value = Tools.getParameterValueFromUrl(url, QueryParams.Parameters.PAGE_TYPE.getKey());
			
			if (value != null) {
				int id = Integer.parseInt(value);
				for (PageType pageType : PageType.values()) {
					if (pageType.getId() == id) {
						return pageType;
					}
				}
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return PageType.UNKNOW;
	}
	
	public static void main(String[] args) {
//		try {
//			String url = new URIBuilder("http://nigeerhuo.com/item?id2=12").addParameter("id2", "13").setParameter("id", "adc").build().toString();
////			
//			System.out.println(url);
////			String url = UrlBuilder.fromString("http://www.google.com/")
////		    .addParameter("q", "charlie brown")
////		    .toString();
//		    
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		try {
			String id = Tools.getParameterValueFromUrl("http://nigeerhuo.com/item?id=12", "id");
			

			System.out.println(id);
			
			int i = 10000;
			
			while(i-- > 0) {
				System.out.println(Tools.getParameterValueFromUrl("http://nigeerhuo.com/item?id=" + new Random().nextInt(100), "id"));
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}
}
