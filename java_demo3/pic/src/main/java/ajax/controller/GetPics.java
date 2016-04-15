package ajax.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HttpContext;

import com.google.gson.Gson;

import ajax.model.Pic;
import ajax.tools.Tools;

public class GetPics {
	
	private static String BAIDU_APIKEY = Tools.getConfig("BAIDU_APIKEY");
	
	private static void do1() {
		PrintWriter out = null;
		BufferedReader rd = null;
		String result = "";
		
		try {
			
			URL url = new URL("http://apis.baidu.com/txapi/mvtp/meinv");
			
			
			URLConnection conn = url.openConnection();
			
			conn.setRequestProperty("accept", "application/json");
			conn.setRequestProperty("Accept-Charset", "UTF-8");
			conn.setDoOutput(true);
			conn.setDoInput(true);
	
			
			out = new PrintWriter(conn.getOutputStream());
			
			out.print("num=20&apikey=" + BAIDU_APIKEY);
			out.flush();
			
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			String line;
			
			while((line = rd.readLine()) != null) {
				result += line;
			}
			
			System.out.println(result);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	private static void do2() {
		
		HttpClient client = HttpClientBuilder.create().build();
		
		HttpPost post = new HttpPost("http://apis.baidu.com/txapi/mvtp/meinv");
		
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		params.add(new BasicNameValuePair("num", "20"));
		params.add(new BasicNameValuePair("apikey", BAIDU_APIKEY));
		
		StringBuffer sb = new StringBuffer();
		try {
			post.setEntity(new UrlEncodedFormEntity(params));
			
			HttpResponse response = client.execute(post);
			
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
			
			String line = "";
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			
			System.out.println(sb.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	class Json{
		int code;
		String msg;
		List<Pic> newslist = new ArrayList<Pic>();
	}
	
	private static void do3() {
		String httpUrl = "http://apis.baidu.com/txapi/mvtp/meinv";
		String httpArg = "num=100";
		String jsonResult = request(httpUrl, httpArg);
		
		Gson gson = new Gson();
		Json jj = gson.fromJson(jsonResult, Json.class);
		
		System.out.println(jj);
		
		for (Pic pic : jj.newslist) {
			Pic pic2 = Pic.getBy("picUrl", pic.getPicUrl(), Pic.class);
			
			if (pic2 == null) {
				pic.setTitle(pic.getTitle());
				pic.setDescription(pic.getDescription());
				pic.save();
			} else {
				System.out.println("重复 : " + pic.getTitle());
			}
			
		}
		
	}
	
	/**
	 * @param urlAll
	 *            :请求接口
	 * @param httpArg
	 *            :参数
	 * @return 返回结果
	 */
	public static String request(String httpUrl, String httpArg) {
	    BufferedReader reader = null;
	    String result = null;
	    StringBuffer sbf = new StringBuffer();
	    httpUrl = httpUrl + "?" + httpArg;

	    try {
	        URL url = new URL(httpUrl);
	        HttpURLConnection connection = (HttpURLConnection) url
	                .openConnection();
	        connection.setRequestMethod("GET");
	        
	        connection.setRequestProperty("apikey",  BAIDU_APIKEY);
	        connection.connect();
	        InputStream is = connection.getInputStream();
	        reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	        String strRead = null;
	        while ((strRead = reader.readLine()) != null) {
	            sbf.append(strRead);
	            sbf.append("\r\n");
	        }
	        reader.close();
	        result = sbf.toString();
	    } catch (Exception e) {
	    	System.out.println(e.getMessage());
	    }
	    return result;
	}	
	
	public static void main(String[] args) {
		
		while(true) {
			do3();
		}
		
	}
}
