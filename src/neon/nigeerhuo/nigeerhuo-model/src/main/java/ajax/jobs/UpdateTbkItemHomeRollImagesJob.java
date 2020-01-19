package ajax.jobs;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;

import ajax.jobs.JobsList.AJob;
import ajax.jobs.JobsList.JobInfo;
import ajax.model.taobao.model.TbkItem;

public class UpdateTbkItemHomeRollImagesJob implements AJob {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		TbkItem.updateHomeRollTbkItems();
	}

	@Override
	public Trigger returnTrigger() {
		return TriggerBuilder.newTrigger().withIdentity(this.returnTriggerKey().getName(), this.returnTriggerKey().getGroup())
				.startNow()
				.withSchedule(simpleSchedule().withIntervalInHours(2).repeatForever())
				.build();
	}

	@Override
	public JobInfo returnJobInfo() {
		return new JobsList().new JobInfo("UpdateTbkItemHomeRollImagesJob-jobinfo-name", 
				"UpdateTbkItemHomeRollImagesJob-jobinfo-group", 
				"UpdateTbkItemHomeRollImagesJob-jobinfo", 
				UpdateTbkItemHomeRollImagesJob.class);
	}

	@Override
	public TriggerKey returnTriggerKey() {
		return new TriggerKey("UpdateTbkItemHomeRollImagesJob-trigger-name",
				"UpdateTbkItemHomeRollImagesJob-trigger-key");
	}
	
}
