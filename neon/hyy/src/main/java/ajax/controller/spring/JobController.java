package ajax.controller.spring;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import ajax.jobs.HelloJob;
import ajax.jobs.JobsList;
import ajax.jobs.SchedulerUtil;
import ajax.jobs.JobsList.AJob;
import ajax.jobs.JobsList.JobInfo;
import ajax.model.AjaxRequest;
import ajax.model.AjaxResponse;
import ajax.tools.Tools;

@Controller
@RequestMapping(value="/jobs")
public class JobController {
	
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private Gson gson;
	
	@RequestMapping(value="/list")
	public String listJobs() {
		
		return "views/jobs/list";
		
	}
	
	@RequestMapping(value="/jobsInfo/list")
	@ResponseBody
	public AjaxResponse<List<JobsList.JobInfo>> getJobsInfoList() throws SchedulerException, InstantiationException, IllegalAccessException {
		JobsList jobsList = new JobsList();
		
		AjaxResponse<List<JobsList.JobInfo>> ar = new AjaxResponse<>();
		ar.setIsok(true);
		ar.setData(jobsList.getJobs());
		return ar;
	}
	
	@RequestMapping(value="/resume")
	@ResponseBody
	public AjaxResponse<String> resumeJob(@RequestParam("data") String data) throws SchedulerException, InstantiationException, IllegalAccessException {
		JobInfo jobInfo = gson.fromJson(data, JobInfo.class);
		
		jobInfo = JobsList.getJobInfoByJobInfoFromClient(jobInfo);
		
		AjaxResponse<String> ar = new AjaxResponse<>();
		if (jobInfo == null) {
			ar.setIsok(false);
			ar.setData("no cls");
			return ar;
		}
		
		
		Scheduler scheduler = SchedulerUtil.getInstance();

		scheduler.start();
		JobKey jobKey = SchedulerUtil.getJobKey(scheduler, jobInfo);
		
		if (scheduler.checkExists(jobKey)) {
			
			scheduler.resumeJob(jobKey);
			
		} else {
			JobDetail job = newJob(jobInfo.cls).withIdentity(jobInfo.name, jobInfo.group).build();

			scheduler.scheduleJob(job, jobInfo.cls.newInstance().returnTrigger());
		}

		ar.setIsok(true);
		ar.setData("OK");
		return ar;
	}
	
	@RequestMapping(value="/pause")
	@ResponseBody
	public AjaxResponse<String> pauseJob(@RequestParam("data") String data) throws SchedulerException, InstantiationException, IllegalAccessException {
		JobInfo jobInfo = gson.fromJson(data, JobInfo.class);
		
		jobInfo = JobsList.getJobInfoByJobInfoFromClient(jobInfo);
		AjaxResponse<String> ar = new AjaxResponse<>();
		
		try {
			JobsList.pauseJobByJobInfo(jobInfo);
			
			ar.setIsok(true);
			ar.setData("pause ok");
			
		} catch (Exception e) {
			ar.setIsok(false);
			ar.setData(e.getMessage());
		}
		
		return ar;
	}
	
}
