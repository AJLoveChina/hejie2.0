package ajax.test;

import java.util.List;

import ajax.model.pagesSeparate.ITaobaoItemsPagesSeparate;
import ajax.model.taobao.ITaobao;
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
		
//		ITaobaoItemsPagesSeparate iTaobaoItemsPagesSeparate = new ITaobaoItemsPagesSeparate();
//		List<ITaobao> iTaobaos = iTaobaoItemsPagesSeparate.getItemsByPageAndType(1);
//		System.out.println(iTaobaos);
		
		ITaobao iTaobao = new ITaobao();
		iTaobao.load(25L);
	}
	public static String getConfigFromTable() {
		Tools.setConfig("aj-just-a-test", "123");
		if (CONFIG_FROM_TABLE == null) {
			CONFIG_FROM_TABLE = Tools.getConfig("aj-just-a-test");
			
		}
		
		return CONFIG_FROM_TABLE;
		
	}
	

}
