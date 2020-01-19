package ajax.jobs;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.Date;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Trigger;
import org.quartz.TriggerKey;

import ajax.jobs.JobsList.AJob;
import ajax.jobs.JobsList.JobInfo;
import ajax.model.entity.Item;

public class GenerateHomeRollImagesAreaJob implements AJob{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Item.GenerateHotItems();
	}

	@Override
	public Trigger returnTrigger() {
		int seconds = 3600;
		return newTrigger().withIdentity(this.returnTriggerKey().getName(), this.returnTriggerKey().getGroup()).startNow()
				.withSchedule(simpleSchedule().withIntervalInSeconds(seconds).repeatForever()).build();
	}

	@Override
	public JobInfo returnJobInfo() {
		return new JobsList().new JobInfo("GenerateHomeRollImagesAreaJob-name", "GenerateHomeRollImagesAreaJob-group", "GenerateHomeRollImagesAreaJob", GenerateHomeRollImagesAreaJob.class);
	}

	@Override
	public TriggerKey returnTriggerKey() {
		return new TriggerKey("GenerateHomeRollImagesAreaJob-trigger-name", "GenerateHomeRollImagesAreaJob-trigger-key");
	}

}
