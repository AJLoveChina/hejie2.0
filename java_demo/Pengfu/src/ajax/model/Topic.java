package ajax.model;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.*;
import java.util.*;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.*;
import org.jsoup.select.*;

import ajax.tools.Mysql;

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
		HttpPost httppost = new HttpPost("https://www.zhihu.com/topics#运动");


		//Execute and get the response.
		HttpResponse response;
		try {
			response = httpclient.execute(httppost);
			HttpEntity entity = response.getEntity();

			if (entity != null) {
			    InputStream instream = entity.getContent();
			    try {
			       System.out.println(instream.toString());
			    } finally {
			        instream.close();
			    }
			}
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) {
		sendPost();
		
		
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
