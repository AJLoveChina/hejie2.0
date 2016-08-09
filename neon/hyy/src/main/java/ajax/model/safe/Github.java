package ajax.model.safe;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;

import ajax.model.entity.Info;
import ajax.tools.Tools;

public class Github {
	
	public static String getToken(String code, String state) {
		//String url = "https://github.com/login/oauth/access_token";
		String url = "http://www.nigeerhuo.com";
		
		String clientId = Tools.getConfig("githubClientId");
		String clientSecret = Tools.getConfig("githubClientSecret");
		String redirectUri = "http://www.nigeerhuo.com";
		
		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);
		
		
		post.setHeader("Accept", "application/json");
		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
		urlParameters.add(new BasicNameValuePair("clientId", clientId));
		urlParameters.add(new BasicNameValuePair("clientSecret", clientSecret));
		urlParameters.add(new BasicNameValuePair("redirectUri", redirectUri));
		urlParameters.add(new BasicNameValuePair("code", code));
		
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
			
			Info info = new Info();
			info.setKey("Github");
			info.setValue(result.toString());
			info.save();
			
			return result.toString();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	
	public static void main(String[] args) {
		String token = Github.getToken("1", "1");
		System.out.println(token);
	}
	
}
