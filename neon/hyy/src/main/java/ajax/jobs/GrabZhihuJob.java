package ajax.jobs;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.hibernate.Session;
import org.junit.Test;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Trigger;
import org.quartz.TriggerKey;

import ajax.jobs.JobsList.AJob;
import ajax.jobs.JobsList.JobInfo;
import ajax.model.Question;
import ajax.model.Topic;
import ajax.model.entity.Item;
import ajax.model.entity.Page;
import ajax.model.entity.Source;
import ajax.model.exception.AJRunTimeException;
import ajax.tools.HibernateUtil;

public class GrabZhihuJob implements AJob{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		Item.grabMoreItemsByTopicFromZhihu();
		
//		if (itemsFilter.size() < 40) {
//			System.out.println("Grab all topics get less than 40 items finally, so return.");
//			return;
//		}
//
//		
//		List<Integer> idList = new ArrayList<>();
//		Random rd = new Random();
//		while(idList.size() < 40 && itemsFilter.size() > 40) {
//			int id = itemsFilter.get(rd.nextInt(itemsFilter.size()));
//			if (!idList.contains(id)) {
//				idList.add(id);
//			}
//		}
//		
//		if (idList.size() != 40) {
//			System.out.println("Grab all topics job, items != 40 return.");
//		}
//		
//		try {
//			Item.generateNewPageItems(idList.subList(0, 20));
//			Item.generateNewPageItems(idList.subList(20, 40));
//		} catch (Exception e) {
//			System.out.println("Grab all topics job, Item.generateNewPageItems Error!");
//		}
	}
	
	@Test
	public void test() {
		Item.grabMoreItemsByTopicFromZhihu();
	}
	

	@Override
	public Trigger returnTrigger() {
		Date date = new Date();
		int seconds = 3600 * 24;
		date.setTime(date.getTime() + seconds * 1000);
		return newTrigger().withIdentity(this.returnTriggerKey().getName(), this.returnTriggerKey().getGroup()).startNow()
				.withSchedule(simpleSchedule().withIntervalInSeconds(seconds).repeatForever()).build();
	}

	@Override
	public JobInfo returnJobInfo() {
		return new JobsList().new JobInfo("GrabZhihu-jobinfo-name", "GrabZhihu-jobinfo-group", "GrabZhihu", GrabZhihuJob.class);
	}

	@Override
	public TriggerKey returnTriggerKey() {
		return new TriggerKey("GrabZhihu-trigger-name", "GrabZhihu-trigger-key");
	}
	
}
