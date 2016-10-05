package ajax.controller.spring;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
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
	public AjaxResponse<List<JobsList.JobInfo>> getJobsInfoList() throws SchedulerException {
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
		
		JobsList jobsList = new JobsList();
		List<JobInfo> list = jobsList.getJobs();
		
		for (JobInfo info : list) {
			if (info.name.equals(jobInfo.name) && info.group.equals(jobInfo.group)) {
				jobInfo = info;
				break;
			}
		}
		AjaxResponse<String> ar = new AjaxResponse<>();
		if (jobInfo.cls == null) {
			ar.setIsok(false);
			ar.setData("no cls");
			return ar;
		}
		
		Scheduler scheduler = SchedulerUtil.getInstance();

		scheduler.start();

		JobDetail job = newJob(jobInfo.cls).withIdentity(jobInfo.name, jobInfo.group).build();

		scheduler.scheduleJob(job, jobInfo.cls.newInstance().returnTrigger());
		
		ar.setIsok(true);
		ar.setData("OK");
		return ar;
	}
	
	@RequestMapping(value="/pause")
	@ResponseBody
	public AjaxResponse<String> pauseJob() {
		
		return null;
	}
	
}
