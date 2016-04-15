package ajax.model.safe;

/**
 * 登陆状态
 * @author ajax
 *
 */
public class SignStatus {
	private boolean isLogin;
	private User user;
	public boolean isLogin() {
		return isLogin;
	}
	public void setLogin(boolean isLogin) {
		this.isLogin = isLogin;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
