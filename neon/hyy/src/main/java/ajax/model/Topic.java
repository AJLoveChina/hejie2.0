package ajax.model;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import ajax.model.entity.Entity;
import ajax.model.entity.Source;
import ajax.spider.rules.RulesTag;
import ajax.tools.Mysql;
import ajax.tools.Tools;

public class Topic extends Entity<Topic>{
	private int id;
	private String tname;
	private int watchIndex;
	private int dataId;
	private int rank;
	private String url;
	private int parentId = 0;
	private int isDelete;
	private int jokeType;
	
	public static String tableName = "topic";
	
	private enum TopicRank{
		ONE(1, "一级"),
		TWO(2, "2级");
		
		final int rank;
		final String info;
		private TopicRank(int rank, String info) {
			this.rank = rank;
			this.info = info;
		}
	}
	
	private class TopicJson{
		String href;
		String tname;
		String desc;
		int parentDataId;
		int parentId;
		int rank;
		
		void save() {
			Topic t = new Topic();
			t.setParentId(this.parentId);
			t.setRank(this.rank);
			t.setTname(this.tname);
			t.setUrl(this.href);
			
			t.save();
		}
		
	}
	
	
	public int getJokeType() {
		return jokeType;
	}
	public void setJokeType(int jokeType) {
		this.jokeType = jokeType;
	}
	public int getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getDataId() {
		return dataId;
	}
	public void setDataId(int dataId) {
		this.dataId = dataId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public int getWatchIndex() {
		return watchIndex;
	}
	public void setWatchIndex(int watchIndex) {
		this.watchIndex = watchIndex;
	}
	
	public boolean update() {
		Connection conn = Mysql.getConn();
		String sql = String.format("UPDATE %s SET tname = ?, watchIndex = ?, dataId = ?, rank = ?, "
				+ "url = ?, parentId = ?, isDelete = ? , jokeType = ? WHERE id = ? LIMIT 1", tableName);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, this.getTname());
			ps.setInt(2, this.getWatchIndex());
			ps.setInt(3, this.getDataId());
			ps.setInt(4, this.getRank());
			ps.setString(5, this.getUrl());
			ps.setInt(6, this.getParentId());
			ps.setInt(7, this.getIsDelete());
			ps.setInt(8, this.getJokeType());
			ps.setInt(9, this.getId());
			
			ps.execute();
			
			return true;
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	public boolean save() {
		Connection conn = Mysql.getConn();
		String sql = String.format("INSERT INTO %s (tname, watchIndex, dataId, rank, url, parentId) VALUES(?, ?, ?, ?, ?, ?) ", tableName);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, this.getTname());
			ps.setInt(2, this.getWatchIndex());
			ps.setInt(3, this.getDataId());
			ps.setInt(4, this.getRank());
			ps.setString(5, this.getUrl());
			ps.setInt(6, this.getParentId());
			
			ps.execute();
			return true;
		} catch (SQLException e) {
			return false;
		}
	}
	
	public void readFromResultSet(ResultSet rs) {
		try {
			
			this.setId(rs.getInt("id"));
			this.setParentId(rs.getInt("parentId"));
			this.setDataId(rs.getInt("dataId"));
			this.setRank(rs.getInt("rank"));
			this.setTname(rs.getString("tname"));
			this.setUrl(rs.getString("url"));
			this.setWatchIndex(rs.getInt("watchIndex"));
			this.setIsDelete(rs.getInt("isDelete"));
			this.setJokeType(rs.getInt("jokeType"));
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void load() {
		this.get();
	}
	
	public void get() {
		Connection conn = Mysql.getConn();
		String sql = String.format("SELECT * FROM %s WHERE id = %d", tableName, this.getId());
		try {
			Statement stat = conn.createStatement();
			
			ResultSet rs = stat.executeQuery(sql);
			
			if (rs.next()) {
				this.readFromResultSet(rs);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	
	public static void getOne() {
		String url = "https://www.zhihu.com/topics";
		try {
			Document doc = Jsoup.connect(url).get();
			Elements oneTopics = doc.select("body > div.zg-wrap.zu-main.clearfix > div.zu-main-content > div > div > ul > li[data-id]");
			
			for (Element ele : oneTopics) {
				Topic t = new Topic();
				t.setDataId(Integer.parseInt(ele.attr("data-id")));
				t.setTname(ele.text().trim());
				//t.setWatchIndex();
				t.setRank(TopicRank.ONE.rank);
				t.setUrl("https://www.zhihu.com/topics#" + ele.text().trim());
				t.save();
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void getTwoOf(int id) {
		Topic t = new Topic();
		t.setId(id);
		t.get();
		
		try {
			Document doc = Jsoup.connect(t.getUrl()).get();
			
			Elements eles = doc.select("body > div.zg-wrap.zu-main.clearfix > div.zu-main-content > div > div > div.zm-topic-cat-sub > div > div.item");
			
			for (Element ele : eles) {
				Elements atag = ele.select("div.blk > a[href^=/topic]");
				Elements tname = ele.select("div.blk > a > strong");
				Elements desc = eles.select("div.blk > p");
				
				Topic tt = new Topic();
				tt.setParentId(t.getId());
				tt.setRank(TopicRank.TWO.rank);
				tt.setUrl("https://www.zhihu.com" + atag.get(0).attr("href").trim());
				tt.setTname(tname.get(0).text().trim());
				
				tt.save();
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public static String getPost(int id, int offset) {
		String url = "https://www.zhihu.com/node/TopicsPlazzaListV2";

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);

		
		post.setHeader("Host", "www.zhihu.com");
		post.setHeader("origin", "https://www.zhihu.com");
		post.setHeader("referer", "https://www.zhihu.com/topics");
		
		
		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
		urlParameters.add(new BasicNameValuePair("method", "next"));
		urlParameters.add(new BasicNameValuePair("params", "{\"topic_id\":" + id + ",\"offset\":" + offset + ",\"hash_id\":\"\"}"));
		urlParameters.add(new BasicNameValuePair("_xsrf", "23d6db084e55cf13a36b93c2fbb7e88b"));
		
		
		StringBuffer result = new StringBuffer();
		
		try {
			
			post.setEntity(new UrlEncodedFormEntity(urlParameters));
			HttpResponse response = client.execute(post);

			BufferedReader rd = new BufferedReader(
			        new InputStreamReader(response.getEntity().getContent()));

			
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result.toString();
	}
	
	public static ArrayList<String> getMsg(String jsonString) {
		JSONObject jsonObject = new JSONObject(jsonString);
        JSONArray msg = jsonObject.getJSONArray("msg");
        
        
        Iterator<Object> it = msg.iterator();
        
        ArrayList<String> arr = new ArrayList<String>();
        while(it.hasNext()) {
        	arr.add((String)it.next());
        }
        return arr;
	}
	
	public static ArrayList<TopicJson> getTopicJsons(ArrayList<String> arr, int parentId) {
		
		ArrayList<TopicJson> result = new ArrayList<Topic.TopicJson>();
		
		
		for (int i = 0; i < arr.size(); i ++) {
			Document doc = Jsoup.parse(arr.get(i));
			TopicJson tj = (new Topic()).new TopicJson();
			tj.href = "https://www.zhihu.com" + doc.select("a[href^=/topic]").get(0).attr("href").trim();
			tj.tname = doc.select("a strong").get(0).text().trim();
			tj.desc = doc.select("p").get(0).text().trim();
			tj.parentId = parentId;
			tj.rank = TopicRank.TWO.rank;
			
			result.add(tj);
		}
		
		return result;
	}
	
	
	public static void do1() {
		// 获取每个一级分类的  部分热门子类
		
		String sqlCmd = String.format("SELECT * FROM %s WHERE rank = %d && id > 727", Topic.tableName, TopicRank.ONE.rank);
		
		Statement stat = Mysql.getStat();
		try {
			
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			while(rs.next()) {
				Topic t = new Topic();
				
				t.readFromResultSet(rs);
				
				getRankTwo(t.getId(), t.getDataId(), 0);
			}
			
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void getRankTwo(int parentId, int parentDataId, int offset) {
		String jsonString = getPost(parentDataId, offset);
		ArrayList<String> msg = getMsg(jsonString);
		
		ArrayList<TopicJson> result = getTopicJsons(msg, parentId);
		
		for (int i = 0; i < result.size(); i ++) {
			
			TopicJson tj = result.get(i);
			tj.save();
			System.out.println(tj.tname + " saved!");
			
		}
	}
	
	public static void do2() {
		Statement stat = Mysql.getStat();
		String sqlCmd = String.format("SELECT * FROM %s WHERE rank = %d && watchIndex = 0", Topic.tableName, TopicRank.TWO.rank);
		
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			while(rs.next()) {
				Topic t = new Topic();
				t.readFromResultSet(rs);
				
				t.grabWatchIndex();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static ArrayList<Topic> do3() {
		// 统计topic的优先级
		Statement stat = Mysql.getStat();
		
		String sqlCmd = String.format("SELECT * FROM %s WHERE rank = %d ORDER BY watchIndex DESC", tableName, TopicRank.TWO.rank);
		
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			
			ArrayList<Topic> topics = new ArrayList<Topic>();
			while(rs.next()) {
				Topic t = new Topic();
				t.readFromResultSet(rs);
				topics.add(t);
			}
			
			return topics;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public void grabWatchIndex() {
		String url = this.getUrl();
		try {
			Document doc = Jsoup.connect(url).get();
			
			Element ele = doc.select("#zh-topic-side-head > div > strong").get(0);
			
			int watcheIndex = Integer.parseInt(ele.text().trim());
			
			this.setWatchIndex(watcheIndex);
			this.update();
			
			
			System.out.println("Grab OK : " + this.getTname());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void saveTopicsToFile(List<Topic> topics) {
		File file = new File("src/data/topTopics.html");
		
		List<Topic> cut = new ArrayList<Topic>();
		String data = "";
		StringBuilder sb = new StringBuilder();
		
		for (int i = 0, len = topics.size(); i < len; i += 10) {
			if (i + 10 < len) {
				cut = topics.subList(i, i + 10);
			} else {
				cut = topics.subList(i, len);
			}
			
			data = "";
			for (int j = 0; j < cut.size(); j++) {
				data += "<tr>";
				data += "<td><a href='" + cut.get(j).getUrl() + "'>" + cut.get(j).getTname() + "</a></td> <td>" + cut.get(j).getWatchIndex() + "<td>\n";
				data += "</tr>";
			}
			//Tools.appendDataToFile(data, file);
			sb.append(data);
		}
		
		data = "<!DOCTYPE html>"
				+ "<html>"
				+ "<head>"
				+ "<meta charset = 'UTF-8' />"
				+ "<style>body{font-family:Microsoft Yahei;}</style>"
				+ "</head>"
				+ "<body>"
				+ "<table>"
				+ "<thead>"
				+ "<th>话题</th>"
				+ "<th>关注度</th>"
				+ "</thead>"
				+ sb.toString()
				+ "</table>"
				+ "</body>"
				+ "</html>";
		
		Tools.appendDataToFile(data, file);
	}
	
	public static List<Topic> filterList(List<Topic> topics) {
		Map<String, Topic> map = new HashMap<String, Topic>();
		
		for (int i = 0, len = topics.size(); i < len; i++) {
			map.put(topics.get(i).getTname(), topics.get(i));
		}
		
		List<Topic> lists = new ArrayList<Topic>();
		Set<String> keys = map.keySet();
		
		Iterator<String> it = keys.iterator();
		while(it.hasNext()) {
			lists.add(map.get(it.next()));
		}
		

		Collections.sort(lists, new Comparator<Topic>() {
			@Override
			public int compare(Topic t1, Topic t2){
				return -(t1.getWatchIndex() - t2.getWatchIndex());
			}
		});
		return lists;
	}
	
	
	
	/**
	 * 根据关注度从高到低排序, 获取前limit个二级话题
	 * @param limit
	 * @return
	 */
	public static List<Topic> getSecondTopics(int limit) {
		// 获取 limit 个一级主题
		
		//id, tname, watchIndex, dataid, rank, url, parentId, lastScan
		String sqlCmd = String.format("SELECT * FROM %s WHERE rank = %d && isDelete = 0 ORDER BY watchIndex DESC LIMIT %d",
				tableName, TopicRank.TWO.rank, limit);
		
		return getListBySqlCmd(sqlCmd);
	}
	
	public static List<Topic> getSecondTopics(int page, int pageNum) {
		// 获取 limit 个一级主题
		
		
		//id, tname, watchIndex, dataid, rank, url, parentId, lastScan
		String sqlCmd = String.format("SELECT * FROM %s WHERE rank = %d && isDelete = 0 ORDER BY watchIndex DESC LIMIT %d, %d",
				tableName, TopicRank.TWO.rank, (page - 1) * pageNum, pageNum);
		
		return getListBySqlCmd(sqlCmd);
	}
	
	private static List<Topic> getListBySqlCmd(String sqlCmd) {
		ResultSet rs;
		Statement stat = Mysql.getStat();
		List<Topic> lists = new ArrayList<Topic>();
		try {
			rs = stat.executeQuery(sqlCmd);
			
			
			while(rs.next()) {
				Topic t = new Topic();
				t.readFromResultSet(rs);
				lists.add(t);
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return lists;
	}
	
	class DeleteDuplicateEntry{
		boolean isDuplicate;
		Topic t;
		public boolean isDuplicate() {
			return isDuplicate;
		}
		public void setDuplicate(boolean isDuplicate) {
			this.isDuplicate = isDuplicate;
		}
		public Topic getT() {
			return t;
		}
		public void setT(Topic t) {
			this.t = t;
		}
		
		public DeleteDuplicateEntry(Topic t) {
			this.t = t;
		}
		
		
	}
	public static void deleteDuplicateEntryOfUrl() {
		Statement stat = Mysql.getStat();
		String sqlCmd = String.format("SELECT * FROM %s", tableName);
		
		try {
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			List<Topic> topics = new ArrayList<Topic>();
			while(rs.next())  {
				Topic t = new Topic();
				t.readFromResultSet(rs);
				topics.add(t);
			}
			
			List<DeleteDuplicateEntry> rows = new ArrayList<Topic.DeleteDuplicateEntry>();
			
			Topic tt = new Topic();
			
			for (Topic t : topics) {
				rows.add(tt.new DeleteDuplicateEntry(t));
			}
			
			ArrayList<String> exitedUrls = new ArrayList<String>();
			
			for (DeleteDuplicateEntry dd : rows) {
				String url = dd.getT().getUrl();
				
				if (exitedUrls.contains(url)) {
					dd.setDuplicate(true);
				} else {
					dd.setDuplicate(false);
					exitedUrls.add(url);
				}
			}
			
			for (DeleteDuplicateEntry dd : rows) {
				if (dd.isDuplicate()) {
					dd.getT().setIsDelete(1);
					dd.getT().update();
				}
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public static void calculateJokeTypeForTopics() {
		// 获取一级主题的jokeType
		String sqlCmd = String.format("SELECT * FROM %s WHERE rank = %d", tableName, TopicRank.ONE.rank);
		
		Statement stat = Mysql.getStat();
		List<Topic> topics = new ArrayList<Topic>();
		try {
			
			ResultSet rs = stat.executeQuery(sqlCmd);
			
			while(rs.next()) {
				Topic t = new Topic();
				t.readFromResultSet(rs);
				topics.add(t);
			}
			
			for (Topic t : topics){
				String tname = t.getTname();
				JokeType jt = JokeType.getJokeTypeByInfo(tname);
				
				t.setJokeType(jt.getId());
				
				t.update();
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void calculateJokeTypeForSecondTopicRank() {
		List<Topic> topics = new ArrayList<Topic>();
		int page = 1;
		int pageNum = 30;
		
		do {
			topics = Topic.getSecondTopics(page, pageNum);
			
			for (Topic t : topics) {
				Topic parent = new Topic();
				parent.setId(t.getParentId());
				parent.load();
				
				t.setJokeType(parent.getJokeType());
				t.update();
			}
			
			page++;
		}while(topics.size() > 0);
	}
	
	
	
	public static void main(String[] args) {
		
		calculateJokeTypeForSecondTopicRank();
		
	}
	
	/**
	 * 获取该话题下(top-answers), 第page页面的全部问题
	 * @param i
	 * @return null if exception occurs
	 */
	public List<Source> getSourcesOfPage(int page) {
		String url = this.getUrl() + "/top-answers?page=" + page;
		List<Source> list = new ArrayList<>();
		
		try {
			Document doc = Jsoup.connect(url).get();
			
			Elements questions = doc.select("#zh-topic-top-page-list > div.feed-item");
			
			for (Element ele : questions) {
				ajax.model.entity.Source s = new ajax.model.entity.Source();
				
				String href = ele.select(".entry-body .zm-item-rich-text").get(0).attr("data-entry-url");
				
				href = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(href, "http://www.zhihu.com/topic");
				
				s.setItype(JokeType.getJokeTypeByInfo(this.getTname()).getId());
				s.setRulestagid(RulesTag.ZHIHU_ANSWER.getId());
				s.setUrl(href);
				s.setLikes(Tools.parseInt(ele.select(".entry-body .zm-item-vote-count").get(0).attr("data-votecount")));
				
				list.add(s);
			}
			
			return list;
		} catch (IOException e) {
			return null;
		}
	}
	
	/**
	 * 抓取该话题下, hot answers
	 * @return
	 */
	public List<Source> getHotSourcesOfPage() {
		String url = this.getUrl() + "/hot";
		List<Source> list = new ArrayList<>();
		
		try {
			Document doc = Jsoup.connect(url).get();
			
			Elements questions = doc.select("#zh-topic-feed-list > div.feed-item");
			
			for (Element ele : questions) {
				Source s = new ajax.model.entity.Source();
				
				String href = ele.select(".zm-item-rich-text").get(0).attr("data-entry-url");
				
				href = Tools.getRelativeUrlToAbsoluteUrlByCurrentAbsoluteUrl(href, "http://www.zhihu.com/topic");
				
				s.setItype(JokeType.getJokeTypeByInfo(this.getTname()).getId());
				s.setRulestagid(RulesTag.ZHIHU_ANSWER.getId());
				s.setUrl(href);
				s.setLikes(Tools.parseInt(ele.select("a.zm-item-vote-count").text()));
				
				list.add(s);
			}
			
			return list;
		} catch (IOException e) {
			return null;
		}
	}
	
	
}



