package ajax.model;

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
}
