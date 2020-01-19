package com.hejie.task;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.impl.StdSchedulerFactory;

public class Fun implements Job{

	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		System.out.println("Fun!");
	}
	
	
	public static void run() {
		try {
			Scheduler scheduler = QuartzUtil.getScheduler();
			
			scheduler.start();
			
			JobDetail jobDetail = newJob(Fun.class)
					.withIdentity("job2", "group1")
					.build();
			Trigger trigger = newTrigger().withIdentity("trigger2", "group1")
					.startNow()
					.withSchedule(simpleSchedule().withIntervalInSeconds(5).repeatForever())
					.build();
				
			scheduler.scheduleJob(jobDetail, trigger);		
					
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	

}
