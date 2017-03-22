package ajax.model;

public interface Callback<In, Out> {
	
	public Out deal(In in);
	
	
}
