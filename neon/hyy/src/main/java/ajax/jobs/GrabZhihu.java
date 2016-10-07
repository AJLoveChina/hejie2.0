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

public class GrabZhihu implements AJob{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		List<Topic> topics = Topic.getSecondTopics(40);
		List<Item> items = new ArrayList<>();
		
		for (Topic topic : topics) {
			
			try {
				List<Source> sources = topic.getHotSourcesOfPage();
				
				if (sources != null && sources.size() > 0) {
					
					for (int i = 0; i < sources.size() && i < 4; i++) {
						Source source = sources.get(i);
						
						Item item = source.grabSelf();
						if (item != null) {
							items.add(item);
						}
					}
					
				}
			} catch(Exception ex){
				System.out.println(ex.getMessage());
			}
			
		}
		List<Integer> itemsFilter = new ArrayList<>();
		
		for (Item item : items) {
			if (item.getContent() != null && !item.getContent().equals("")) {
				try {
					if (item.save()) {
						itemsFilter.add(item.getId());
					}
				} catch(Exception ex) {
					System.out.println(ex.getMessage());
				}
			}
		}
		
		if (itemsFilter.size() < 40) {
			System.out.println("Grab all topics get less than 40 items finally, so return.");
			return;
		}

		
		List<Integer> idList = new ArrayList<>();
		Random rd = new Random();
		while(idList.size() < 40 && itemsFilter.size() > 40) {
			int id = itemsFilter.get(rd.nextInt(itemsFilter.size()));
			if (!idList.contains(id)) {
				idList.add(id);
			}
		}
		
		if (idList.size() != 40) {
			System.out.println("Grab all topics job, items != 40 return.");
		}
		
		try {
			Item.generateNewPageItems(idList.subList(0, 20));
			Item.generateNewPageItems(idList.subList(20, 40));
		} catch (Exception e) {
			System.out.println("Grab all topics job, Item.generateNewPageItems Error!");
		}
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
		return new JobsList().new JobInfo("GrabZhihu-jobinfo-name", "GrabZhihu-jobinfo-group", "GrabZhihu", GrabZhihu.class);
	}

	@Override
	public TriggerKey returnTriggerKey() {
		return new TriggerKey("GrabZhihu-trigger-name", "GrabZhihu-trigger-key");
	}
	
}
