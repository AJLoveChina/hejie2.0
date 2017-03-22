package ajax.model;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Properties;

/**
 * only getters, without setters
 * @author ajax
 *
 */
public class ConfigFromProperties {
	
	private static  String google_nigeerhuo_oauth_id = null;
	private static  String google_nigeerhuo_oauth_key = null;
	private static  String TABLE_TIME_FORMAT = null;
	private static  String WEIXIN_NIGEERHUO_APPID = null;
	private static  String WEIXIN_NIGEERHUO_APPSECRET = null;
	
	private static String YIQIFA_SITE_OWNER_ID = null;
	private static String YIQIFA_SITE_ID = null;
	private static String YIQIFA_SITE_PASS = null;
	
	public static String getGoogle_nigeerhuo_oauth_id() {
		return google_nigeerhuo_oauth_id;
	}
	public static String getGoogle_nigeerhuo_oauth_key() {
		return google_nigeerhuo_oauth_key;
	}
	public static String getTABLE_TIME_FORMAT() {
		return TABLE_TIME_FORMAT;
	}
	public static String getWEIXIN_NIGEERHUO_APPID() {
		return WEIXIN_NIGEERHUO_APPID;
	}
	public static String getWEIXIN_NIGEERHUO_APPSECRET() {
		return WEIXIN_NIGEERHUO_APPSECRET;
	}
	
	public static String getYIQIFA_SITE_OWNER_ID() {
		return YIQIFA_SITE_OWNER_ID;
	}
	public static String getYIQIFA_SITE_ID() {
		return YIQIFA_SITE_ID;
	}
	public static String getYIQIFA_SITE_PASS() {
		return YIQIFA_SITE_PASS;
	}




	static {
		Properties properties = new Properties();
		try {
			properties.load(ConfigFromProperties.class.getResourceAsStream("/nigeerhuo-config-safe.properties"));
			
			Field[] fields = ConfigFromProperties.class.getDeclaredFields();
			
			for (Field field : fields) {
				field.set(null, properties.get(field.getName()));
			}
			System.out.println("Config from properties init OK!");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
