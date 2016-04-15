package ajax.model;


public class Config extends Entity<Config>{
	private int id;
	private String key;
	private String value;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	
	public Config() {
		
	}
	public Config(String key, String value) {
		
		this.key = key;
		this.value = value;
	}
}
