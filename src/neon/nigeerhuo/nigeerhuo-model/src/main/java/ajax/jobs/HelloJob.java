package ajax.jobs;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Trigger;
import org.quartz.TriggerKey;

import ajax.jobs.JobsList.AJob;
import ajax.jobs.JobsList.JobInfo;


public class HelloJob implements AJob {
	private static boolean stop = false;

	public HelloJob() {
	}

	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println(123);
	}

	@Override
	public Trigger returnTrigger() {
		return newTrigger().withIdentity(this.returnTriggerKey().getName(), this.returnTriggerKey().getGroup()).startNow()
		.withSchedule(simpleSchedule().withIntervalInSeconds(2).repeatForever()).build();
	}

	@Override
	public JobInfo returnJobInfo() {
		return new JobsList().new JobInfo("helloWorld", "group1", "hello world", HelloJob.class);
	}

	@Override
	public TriggerKey returnTriggerKey() {
		return new TriggerKey("helloWorld-trigger", "group1");
	}

}
