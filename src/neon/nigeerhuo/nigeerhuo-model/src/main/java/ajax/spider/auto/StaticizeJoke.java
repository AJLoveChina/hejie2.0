package ajax.spider.auto;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.google.gson.Gson;

import ajax.model.AjaxResponse;
import ajax.model.JokeStatus;
import ajax.model.JokeType;
import ajax.model.entity.NJoke;
import ajax.tools.HibernateUtil;
import ajax.tools.Tools;

public class StaticizeJoke {
	
	
	
	public static void main(String[] args) {
		int page = 53;
		int size = 20;
		List<NJoke> jokes = new ArrayList<NJoke>();
		
		do {
			Session session = HibernateUtil.getSession();
			
			Criteria cr =session.createCriteria(NJoke.class);
			cr.add(Restrictions.ne("jokeStatus", JokeStatus.STATIC.getId()));
			cr.add(Restrictions.eq("jokeType", JokeType.ONLY_WORD.getId()));
			cr.setMaxResults(size);
			
			jokes = cr.list();
			
			AjaxResponse<List<NJoke>> ar = new AjaxResponse<List<NJoke>>();
			
			ar.setIsok(true);
			ar.setData(jokes);
			Gson gs = new Gson();
			String json = gs.toJson(ar);
			
			String fileName = "WebRoot/static/joke/" + page + ".txt";
			
			Tools.writeDataToFile(json, new File(fileName));
			
			for (NJoke joke : jokes) {
				joke.setJokeStatus(JokeStatus.STATIC.getId());
				joke.update();
			}
			page ++;
			System.out.println(fileName);
			HibernateUtil.closeSession(session);
		}while(jokes.size() >= size);
	}
}
