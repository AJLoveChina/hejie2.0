package ajax.task;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import ajax.model.safe.User;
import ajax.tools.Tools;

public class GenerateNewEditors {
	
	private Map<String, String> map = new HashMap<String, String>();
	
	public GenerateNewEditors(String filePath) {
		
		String data = Tools.readInputStream(this.getClass().getResourceAsStream(filePath));
		String lineSeparator = System.getProperty("line.separator", "\n");
		String[] arr = data.split(lineSeparator);
		
		for (String s : arr) {
			this.map.put(s, "");
		}
	}
	
	private void addUser() {
		Set<String> set = this.map.keySet();
		for (String s : set) {
			if (User.getBy(User.class, "username", s) != null) {
				System.out.println("same username");
				continue;
			}
			
			User user = new User();
			user.setNickname(s);
			user.setUsername(s);
			user.setUserRights(User.UserRights.OFFICIAL_EDITOR.getId());
			user.setSex(User.Sex.GIRL.getId());
			user.save();
		}
	}
	
	
	
	public static void main(String[] args) {
		GenerateNewEditors generateNewEditors = new GenerateNewEditors("/data/users-nickname-from-wangyi.txt");
		generateNewEditors.addUser();
		
	}
}
