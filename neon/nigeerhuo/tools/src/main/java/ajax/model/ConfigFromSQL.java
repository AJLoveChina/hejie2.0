package ajax.model;

import ajax.model.entity.Config;

public class ConfigFromSQL {
	private static boolean NIGEERHUO_IS_DEBUG_MODE = false;
	private static boolean NIGEERHUO_IS_LOCAL_MODE = false;

	public static boolean isNIGEERHUO_IS_DEBUG_MODE() {
		return NIGEERHUO_IS_DEBUG_MODE;
	}
	
	public static boolean isNIGEERHUO_IS_LOCAL_MODE() {
		return NIGEERHUO_IS_LOCAL_MODE;
	}

	static {
		System.out.println("Now init config from SQL..");
		
		Config config1 = Config.getBy(Config.class, "key", "NIGEERHUO_IS_DEBUG_MODE");
		
		if (config1 != null && "1".equals(config1.getValue())) {
			NIGEERHUO_IS_DEBUG_MODE = true;
		}
		
		Config config2 = Config.getBy(Config.class, "key", "NIGEERHUO_IS_LOCAL_MODE");
		if (config2 != null && "1".equals(config2.getValue())) {
			NIGEERHUO_IS_LOCAL_MODE = true;
		}
	}
	
}
