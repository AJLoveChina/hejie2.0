package ajax.jobs;

import java.util.ArrayList;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.Trigger.TriggerState;
import org.quartz.TriggerKey;
import org.quartz.impl.matchers.GroupMatcher;

import ajax.jobs.JobsList.JobInfo;
import ajax.tools.Tools;

public class JobsList {
	
	public interface AJob extends Job{
		Trigger returnTrigger();
		JobInfo returnJobInfo();
		TriggerKey returnTriggerKey();
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
	private static List<JobInfo> jobs = null;
	
	
	public synchronized static List<JobInfo> getJobs() throws SchedulerException, InstantiationException, IllegalAccessException {
		if (JobsList.jobs == null) {
			List<JobInfo> list = new ArrayList<>();
			
			list.add(new HelloJob().returnJobInfo());
			list.add(new PageGenerateJob().returnJobInfo());
			list.add(new GrabZhihu().returnJobInfo());
			
			JobsList.jobs = list;
		}
		
		Scheduler scheduler = SchedulerUtil.getInstance();
		for (JobInfo jobInfo : JobsList.jobs) {
			JobKey jobKey = SchedulerUtil.getJobKey(scheduler, jobInfo);
			
			if (!scheduler.checkExists(jobKey)) {
				jobInfo.status = "not exist";
			} else {
				jobInfo.status = getTriggerState(jobInfo).toString();
			}
		}
		
		return JobsList.jobs;
	}
	
	/**
	 * return null if not found
	 * @param jobInfo
	 * @return
	 * @throws SchedulerException 
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 */
	public static JobInfo getJobInfoByJobInfoFromClient(JobInfo jobInfo) throws SchedulerException, InstantiationException, IllegalAccessException {
		List<JobInfo> list = JobsList.getJobs();
		
		for (JobInfo info : list) {
			if (info.name.equals(jobInfo.name) && info.group.equals(jobInfo.group)) {
				return info;
			}
		}
		return null;
	}

	public static void pauseJobByJobInfo(JobInfo jobInfo) throws SchedulerException {
		
		Scheduler scheduler = SchedulerUtil.getInstance();
		scheduler.start();
		
		for (String group : scheduler.getJobGroupNames()) {
			for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.groupEquals(jobInfo.group))) {
				if (jobKey.getName().equals(jobInfo.name)) {
					
					scheduler.pauseJob(jobKey);
					
				}
			}
		}
	}
	
	public static TriggerState getTriggerState(JobInfo jobInfo) throws SchedulerException, InstantiationException, IllegalAccessException {
		TriggerState triggerState = SchedulerUtil.getInstance().getTriggerState(jobInfo.cls.newInstance().returnTriggerKey());
		
		return triggerState;
	}
	
	
	
}
