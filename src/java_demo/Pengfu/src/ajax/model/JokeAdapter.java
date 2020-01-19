package ajax.model;

public interface JokeAdapter {
	
	public String adaptedUrl();
	public String adaptedTitle();
	public String adaptedContent();
	public String adaptedStamps();
	public int adaptedLikes();
	public int adaptedDislike();
	public int adaptedhasGetImage();
	public String adaptedDateEntered();
	public String adaptedUsername();
	public String adaptedUserPersonalPageUrl();
	public JokeStatus adaptedJokeStatus();
	public String adaptedBackgroundInformation();
	public JokeType adapted_JokeType();
	
}
