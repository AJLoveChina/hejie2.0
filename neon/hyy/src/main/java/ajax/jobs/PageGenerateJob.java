package ajax.jobs;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.Date;

import org.junit.Test;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Trigger;
import org.quartz.TriggerKey;

import ajax.jobs.JobsList.AJob;
import ajax.jobs.JobsList.JobInfo;
import ajax.model.entity.Item;
import ajax.model.exception.AJRunTimeException;

public class PageGenerateJob implements AJob {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			Item.generateNewPageItems();
		} catch (AJRunTimeException e) {
			System.out.println("page generate fail.." + e.getMessage());
		}
	}
	

	@Test
	public void do1() throws AJRunTimeException {
		Item.generateNewPageItems();
	}
	

	@Override
	public Trigger returnTrigger() {
		Date date = new Date();
		int seconds = 3600 * 3;
		date.setTime(date.getTime() + seconds * 1000);
		return newTrigger().withIdentity(this.returnTriggerKey().getName(), this.returnTriggerKey().getGroup()).startNow()
				.withSchedule(simpleSchedule().withIntervalInSeconds(seconds).repeatForever()).build();
	}

	@Override
	public JobInfo returnJobInfo() {
		return new JobsList().new JobInfo("PageGenerateJob-jobinfo-name", "PageGenerateJob-jobinfo-group", "PageGenerateJob", PageGenerateJob.class);
	}

	@Override
	public TriggerKey returnTriggerKey() {
		return new TriggerKey("PageGenerateJob-trigger-name", "PageGenerateJob-trigger-key");
	}

}
