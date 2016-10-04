package ajax.jobs;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.quartz.InterruptableJob;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.UnableToInterruptJobException;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ajax.controller.spring.SpringConfig;
import ajax.tools.Tools;

import static org.quartz.JobBuilder.*;
import static org.quartz.TriggerBuilder.*;
import static org.quartz.SimpleScheduleBuilder.*;

public class HelloJob implements Job,InterruptableJob{
	 	private static boolean stop = false;
	    public HelloJob() {
	    }

	   
	    public void execute(JobExecutionContext context)
	        throws JobExecutionException {
	    	System.out.println(123);
	    }
	    
	   
	  private static SchedulerFactory schedulerFactory = new StdSchedulerFactory();
	    
	    
	   public static void main(String[] args) throws SchedulerException {
		// Grab the Scheduler instance from the Factory
           Scheduler scheduler = schedulerFactory.getScheduler();

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
           	              .withIntervalInSeconds(2)
           	              .repeatForever())            
           	      .build();

           	  // Tell quartz to schedule the job using our trigger
           	  scheduler.scheduleJob(job, trigger);
           	  System.out.println(scheduler.getSchedulerName());
           	for(String group: scheduler.getJobGroupNames()) {
           	    // enumerate each job in group
           	    for(JobKey jobKey : scheduler.getJobKeys(GroupMatcher.groupEquals("group1"))) {
           	        System.out.println("Found job identified by: " + jobKey);
           	        if (jobKey.getName().equals("job1")) {
           	        	Tools.sleep(5);
						System.out.println("interrupt");
						schedulerFactory.getScheduler("MyScheduler").pauseJob(jobKey);
						
						Tools.sleep(5);
						schedulerFactory.getScheduler("MyScheduler").resumeJob(jobKey);
           	        }
           	    }
           	}
	}

	@Override
	public void interrupt() throws UnableToInterruptJobException {
		System.out.println("interrupt");
	}
	    
}
