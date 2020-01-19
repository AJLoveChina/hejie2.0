package ajax.model.safe;

/**
 * 登陆状态
 * @author ajax
 *
 */
public class SignStatus {
	private boolean success;
	private User user;
	private String info;
	
	
	
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}

	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
