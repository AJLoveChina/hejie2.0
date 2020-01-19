package ajax.controller;


import ajax.model.*;

public class GrabJokes {
	
	public static void do1() {
		String id = "1471134"; //1471134
		
		try {
			
			while(true) {
				Thread.sleep(1000);
				Joke.getFromPengfuAndSaveToSqlByUrlId(id);
				id = Integer.parseInt(id) - 1 + "";
			}
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public static void do2() {
		// 给笑话分类
		int i = 18;
		int max_id = 13308;
		for (; i < max_id; i++) {
			System.out.println("Mark type of id " + i);
			Joke.getTypeForJokeOf(i);
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				//e.printStackTrace();
			}
		}
	}
	public static void main(String[] args){
		Joke joke = Joke.getOneByIdFromSQL(18);
		
		System.out.println(joke);
	}
}



