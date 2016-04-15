package ajax.model;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class Pic extends Entity<Pic>{
	private int id;
	private String title;
	private String description;
	private String picUrl;
	private String url;
	private String ctime;
	
	
	
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		try {
			this.description = URLEncoder.encode(description, "UTF-8");
		}catch(Exception e) {
			this.description = description;
		}
		
	}
	
	public String getCtime() {
		return ctime;
	}
	public void setCtime(String ctime) {
		this.ctime = ctime;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		try {
			this.title = URLEncoder.encode(title, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			this.title = title;
		}
	}

	public String getPicUrl() {
		return picUrl;
	}
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	public static void main(String[] args) {
		
	}
}
