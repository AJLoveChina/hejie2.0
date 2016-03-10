package ajax.model;

import java.io.*;
import java.net.*;
import java.sql.*;
import java.util.*;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.jsoup.Jsoup;
import org.jsoup.nodes.*;
import org.jsoup.select.*;

import ajax.tools.Mysql;
import ajax.tools.Tools;

public class Topic extends Entity{
	private int id;
	private String tname;
	private int watchIndex;
	private int dataId;
	private int rank;
	private String url;
	private int parentId = 0;
	
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
	
	public void save() {
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
			
			Mysql.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void readFromResultSet(ResultSet rs) {
		try {
			
			this.setId(rs.getInt("id"));
			this.setParentId(rs.getInt("parentId"));
			this.setDataId(rs.getInt("dataId"));
			this.setParentId(rs.getInt("parentId"));
			this.setRank(rs.getInt("rank"));
			this.setTname(rs.getString("tname"));
			this.setUrl(rs.getString("url"));
			this.setWatchIndex(rs.getInt("watchIndex"));
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
			
			Mysql.close();
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
	
	public static void sendPost() {
		
		HttpClient httpclient = HttpClients.createDefault();
		
		try {
			URI uri;
			uri = new URIBuilder()
			        .setScheme("https")
			        .setHost("www.zhihu.com")
			        .setPath("/node/TopicsPlazzaListV2")
			        .setParameter("method", "next")
			        .setParameter("params", "%7B%22topic_id%22%3A253%2C%22offset%22%3A20%2C%22hash_id%22%3A%22032639baed044864d59d4b309a44ea66%22%7D&_xsrf=2e4e8f9d60c4485b480892352f5d4aad")
			        .build();
			
			HttpPost httppost = new HttpPost(uri);
		
			HttpResponse response;
			response = httpclient.execute(httppost);
			HttpEntity entity = response.getEntity();

			if (entity != null) {
			    InputStream instream = entity.getContent();
			    try {
			       System.out.println(instream.toString());
			    } finally {
			        String s = Tools.readInputStream(instream);
			        System.out.println(s);
			    }
			}
			
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch(URISyntaxException e) {
			e.printStackTrace();
		}
	}
	
	
	public static void sendPost4() {
		String url = "https://www.zhihu.com/node/TopicsPlazzaListV2";

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);

		post.setHeader("Accept", "*/*");
		post.setHeader("Accept-Encoding", "gzip, deflate");
		post.setHeader("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,fr;q=0.4");
		post.setHeader("AlexaToolbar-ALX_NS_PH", "AlexaToolbar/alxg-3.3");
		post.setHeader("Cache-Control", "no-cache");
		post.setHeader("Connection", "keep-alive");
		post.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		post.setHeader("Host", "www.zhihu.com");
		post.setHeader("origin", "https://www.zhihu.com");
		post.setHeader("Pragma", "no-cache");
		post.setHeader("Referer", "https://www.zhihu.com/topics");
		post.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36");
		post.setHeader("X-Requested-With", "XMLHttpRequest");
		post.setHeader("cookie", "_za=d06117c9-2d79-4acc-b56d-0a175788ff38; _xsrf=2e4e8f9d60c4485b480892352f5d4aad; q_c1=10f32a16e6d043c49f922e655a6f8882|1457356546000|1446300662000; cap_id=YTMyNDRlOTdlMDFhNDRjMDk2MzI3ZjIwZTkxZWFkZDI=|1457437397|fbf86b2cf8fe373bd967d681330bb409fab1be42; z_c0=QUFBQU1iQkZBQUFYQUFBQVlRSlZUUmhJQmxjTDdDVHZrcDdhWlhQckV3OWlZZkFxdDRZQWdRPT0=|1457437464|5196062d88027703d3b7a0c2a6251efd94285ef7; udid=AABAqLNhlAmPTsppSN39oFUSihc1SdUfLj0=|1457522420; __utma=51854390.1120528287.1457615389.1457615389.1457615389.1; __utmb=51854390.4.10.1457615389; __utmc=51854390; __utmz=51854390.1457615389.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/topic; __utmv=51854390.100-1|2=registration_date=20141223=1^3=entry_date=20141223=1");

		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
		urlParameters.add(new BasicNameValuePair("method", "next"));
		urlParameters.add(new BasicNameValuePair("params", "%7B%22topic_id%22%3A253%2C%22offset%22%3A20%2C%22hash_id%22%3A%22032639baed044864d59d4b309a44ea66%22%7D&_xsrf=2e4e8f9d60c4485b480892352f5d4aad"));
		
		

		try {
			
			post.setEntity(new UrlEncodedFormEntity(urlParameters));
			HttpResponse response = client.execute(post);
			System.out.println("Response Code : " 
		                + response.getStatusLine().getStatusCode());

			BufferedReader rd = new BufferedReader(
			        new InputStreamReader(response.getEntity().getContent()));

			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			System.out.println(result.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


	}
	
	public static void main(String[] args) {
		sendPost4();
		
		
//		getOne();
//		
//		int id = 727;
//		int max = 759;
//		
//		for (; id <= max; id++) {
//			getTwoOf(id);
//			System.out.println(id + "OK");
//		}
		
		
	}
}
