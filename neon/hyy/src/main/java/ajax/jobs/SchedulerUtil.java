package ajax.jobs;

import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.matchers.GroupMatcher;

import ajax.jobs.JobsList.JobInfo;


public class SchedulerUtil {
	private static final SchedulerFactory SCHEDULER_FACTORY = new StdSchedulerFactory();
	private static Scheduler scheduler = null;
	
	private static final Object LOCK = SchedulerUtil.class;
	
	public static Scheduler getInstance() throws SchedulerException {
		synchronized(LOCK) {
			if (scheduler == null) {
				scheduler = SCHEDULER_FACTORY.getScheduler();
			}
			return scheduler;
		}
	}

	/**
	 * return null if not found
	 * @param scheduler
	 * @param jobInfo
	 * @return
	 * @throws SchedulerException 
	 */
	public static JobKey getJobKey(Scheduler scheduler, JobInfo jobInfo) throws SchedulerException {
		for (String group : scheduler.getJobGroupNames()) {
			for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.groupEquals(jobInfo.group))) {
				if (jobInfo.name.equals(jobKey.getName())) {
					return jobKey;
				}
			}
		}
		return null;
	}
	
}
