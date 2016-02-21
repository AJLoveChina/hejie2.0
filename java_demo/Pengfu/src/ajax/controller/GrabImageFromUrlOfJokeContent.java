package ajax.controller;

import ajax.model.*;
import ajax.tools.Tools;

public class GrabImageFromUrlOfJokeContent {
	public static void main(String[] args) {
		int jokeId = 10581;
		Joke joke;
		for (; jokeId < 13308; jokeId++) {
			joke = Joke.getIns();
			
			
			joke.setJokeId(jokeId);
			joke.loadById();
			
			joke.cleanContent();
			
			System.out.println("ID == " + jokeId + " is grabed OK!");
			Tools.sleep(0.3);
		}
	}
}
