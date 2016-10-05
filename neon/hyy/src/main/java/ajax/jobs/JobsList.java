package ajax.jobs;

import java.util.ArrayList;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.impl.matchers.GroupMatcher;

import ajax.tools.Tools;

public class JobsList {
	
	public interface AJob extends Job{
		Trigger returnTrigger();
		JobInfo returnJobInfo();
	}
	
	public class JobInfo{
		public String name;
		public String group;
		public String info;
		public String status;
		public transient Class<? extends AJob> cls;
		public JobInfo(String name, String group, String info, Class<? extends AJob> cls) {
			super();
			this.name = name;
			this.group = group;
			this.info = info;
			this.cls = cls;
		}
	}
	
	public List<JobInfo> getJobs() throws SchedulerException {
		List<JobInfo> list = new ArrayList<>();
		
		list.add(new HelloJob().returnJobInfo());
		Scheduler scheduler = SchedulerUtil.getInstance();
		
		for (JobInfo jobInfo : list) {
			JobKey jobKey = SchedulerUtil.getJobKey(scheduler, jobInfo);
			
			if (!scheduler.checkExists(jobKey)) {
				jobInfo.status = "not exist";
			} else {
				jobInfo.status = "exist";
			}
		}
		
		
		
		return list;
	}
	
	
}
