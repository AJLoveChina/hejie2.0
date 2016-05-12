package ajax.model;

public class AuthException extends Exception{
	
	public AuthException(String message) {
		super(message);
	}
	
	public AuthException() {
		super("权限不足!");
	}
	
}
