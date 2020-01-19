package com.hejie.task;

import java.util.List;

import org.quartz.Scheduler;
import org.quartz.SchedulerException;

public class QuartzTest {

	
	private static void do1() throws SchedulerException {
		Scheduler scheduler = QuartzUtil.getScheduler();
		List<String> jobs = scheduler.getJobGroupNames();
		System.out.println(jobs);

	}
    public static void main(String[] args) {

        HelloJob.run();
        
        Fun.run();
        
    	try {
			do1();
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}