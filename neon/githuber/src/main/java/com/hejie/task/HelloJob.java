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

public class HelloJob implements Job{

	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		System.out.println("Hello World!");
	}
	
	public static void run() {
		try {
            // Grab the Scheduler instance from the Factory
            Scheduler scheduler =  QuartzUtil.getScheduler();

            // and start it off
            scheduler.start();

            JobDetail job = newJob(HelloJob.class)
            	      .withIdentity("job1", "group1")
            	      .build();

            	  // Trigger the job to run now, and then repeat every 40 seconds
	    	  Trigger trigger = newTrigger()
	    	      .withIdentity("trigger1", "group1")
	    	      .startNow()
	    	            .withSchedule(simpleSchedule()
	    	              .withIntervalInSeconds(10)
	    	              .repeatForever())            
	    	      .build();
	
	    	  // Tell quartz to schedule the job using our trigger
	    	  scheduler.scheduleJob(job, trigger);
	    	  
           // scheduler.shutdown();

        } catch (SchedulerException se) {
            se.printStackTrace();
        }
	}
	
}
