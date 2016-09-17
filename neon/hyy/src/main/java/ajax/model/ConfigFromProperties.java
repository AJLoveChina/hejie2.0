package ajax.model;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Properties;

public class ConfigFromProperties {
	public static String google_nigeerhuo_oauth_id = null;
	public static String google_nigeerhuo_oauth_key = null;
	public static String TABLE_TIME_FORMAT = null;
	
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
