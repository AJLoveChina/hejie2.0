package ajax.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;

public class Lock {
	private static final Map<String, Boolean> LOCK_MAP = new HashMap<String, Boolean>();
	private static final List<String> LIST = new ArrayList<String>();
	private static final Lock LOCK_EX = new Lock();
	
	/**
	 * 设置最大写锁 1024个
	 */
	private static final int TOTAL = 1024;
	/**
	 * 如果存满了TOTAL个, 一次删除头部50个
	 */
	private static final int DELETE_NUM = 50;
	
	/**
	 * 对某个字符串进行锁定, 如果已经锁定相同的字符串,返回false<br>
	 * 该方法会对 Lock.LOCK_EX写锁,防止多个servlet同时对某一个字符串锁定
	 * @param key
	 * @return
	 */
	public static boolean lock(String key) {
		synchronized (LOCK_EX) {
			if (Lock.LOCK_MAP.containsKey(key)) {
				return false;
			} else {
				Lock.LOCK_MAP.put(key, true);
				Lock.LIST.add(key);
				
				if (Lock.LIST.size() > TOTAL) {
					Lock.deleteHead();
				}
				return true;
			}	
		}
	}
	
	/**
	 * 是否某个字符串已经被锁定
	 * @param key
	 * @return
	 */
	public static boolean isLock(String key) {
		return Lock.LOCK_MAP.containsKey(key);
	}
	
	
	private static void deleteHead() {
		int i = Lock.DELETE_NUM;
		while(i-- > 0){
			String key = Lock.LIST.remove(0);
			Lock.LOCK_MAP.remove(key);
		}
	}
}
