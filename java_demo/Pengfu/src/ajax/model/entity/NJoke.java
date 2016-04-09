package ajax.model.entity;

public class NJoke extends Entity<NJoke>{
	private int id;
	private String title;
	private String content;
	private int jokeType;
	
	
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
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getJokeType() {
		return jokeType;
	}
	public void setJokeType(int jokeType) {
		this.jokeType = jokeType;
	}
	
}
