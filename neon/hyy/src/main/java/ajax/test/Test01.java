package ajax.test;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import ajax.model.AjaxRequest;
import ajax.tools.Tools;


public class Test01 {
	
	public static final int i = count();
	public static String CONFIG_FROM_TABLE = null;
	
	public static int count() {
		return 3;
	}
	public static void testClass(){
		
	}
	
	public static void main(String[] args) {
		
		DecimalFormat formatter = new DecimalFormat("###,###,###.00");
		String s = formatter.format(4864.0245);
		System.out.println(s);
		
		
	}
	
	private static void do2() {
		//http://api2.juheapi.com/xiecheng/hotel/staticdetail
		AjaxRequest ar = new AjaxRequest();
		String url = "http://api2.juheapi.com/xiecheng/hotel/staticdetail";
		String key = "";
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("Key", key);
		map.put("HotelCodes", "[123]");
		String method = "POST";
		
		AjaxRequest.Config config = ar.new Config(url, map, method);
		String response = ar.getResponse(config);
		System.out.println(response);
	}
	public static String getConfigFromTable() {
		Tools.setConfig("aj-just-a-test", "123");
		if (CONFIG_FROM_TABLE == null) {
			CONFIG_FROM_TABLE = Tools.getConfig("aj-just-a-test");
			
		}
		
		return CONFIG_FROM_TABLE;
		
	}
	

}