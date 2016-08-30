package com.hejie.task;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.impl.StdSchedulerFactory;

public class QuartzUtil {
	private static Scheduler scheduler = null;
	private final static QuartzUtil QUARTZ_UTIL = new QuartzUtil();
	
	public static synchronized Scheduler getScheduler() {
		if (scheduler == null) {
			try {
				scheduler = StdSchedulerFactory.getDefaultScheduler();
			} catch (SchedulerException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return scheduler;
	}
}
