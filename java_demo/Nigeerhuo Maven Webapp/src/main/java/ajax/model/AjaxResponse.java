package ajax.model;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class AjaxResponse<T> {
	private boolean isok;
	private T data;
	
	
	
	public boolean isIsok() {
		return isok;
	}
	public void setIsok(boolean isok) {
		this.isok = isok;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	
	public String toJson() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}
	
	public void flush(HttpServletResponse response) {
		PrintWriter out;
		try {
			out = response.getWriter();
			
			
			out.print(this.toJson());
			out.flush();
			out.close();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}
}
