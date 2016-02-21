package ajax.tools;

public class Tools {
	
	public static void sleep(int seconds) {
		try {
			Thread.sleep(seconds * 1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		System.out.println(1);
		
		sleep(1);
		
		System.out.println(2);
	}
}
