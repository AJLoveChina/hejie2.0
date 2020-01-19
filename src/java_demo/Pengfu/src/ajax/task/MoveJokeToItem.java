package ajax.task;

import java.util.ArrayList;
import java.util.List;

import ajax.model.Joke;
import ajax.model.JokeType;
import ajax.model.entity.Item;

public class MoveJokeToItem {
	public static void main(String[] args) {
		List<Joke> jokes = new ArrayList<Joke>();
		List<Item> items = new ArrayList<Item>();
		int page = 1;
		int pageNum = 20;
		
		do{
			items = new ArrayList<Item>();
			jokes = Joke.getJokesNotStaticImage(page, pageNum);
			
			for (Joke joke : jokes) {
				Item item = new Item();
				item.setTitle(joke.getTitle());
				item.setContent(joke.getContent());
				item.setUrl(joke.getUrl());
				item.setHasGetImage(joke.getHasGetImage() == 1);
				item.setItype(joke.get_jokeType().getId());
				
				item.save();
				joke.setHasMovedToItem(true);
				joke.update();
			}
			
			page ++;
		}while(jokes.size() > 0);
	}
}
