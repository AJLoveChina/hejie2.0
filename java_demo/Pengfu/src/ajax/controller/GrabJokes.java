package ajax.controller;


import ajax.model.*;

public class GrabJokes {
	public static void main(String[] args){
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
}
