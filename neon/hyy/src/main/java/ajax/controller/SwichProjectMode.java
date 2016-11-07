package ajax.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import ajax.tools.Tools;

public class SwichProjectMode {
	public static void main(String[] args) throws Exception {
		//switchToServerMode();
		switchToDebugModel();
	}

	private static void switchToDebugModel() throws IOException {
		Runtime.getRuntime().exec("cmd /c start G:\\XAMPP\\htdocs\\Github\\meAjax\\neon\\hyy\\src\\main\\webapp\\WEB-INF\\build-require-modules-for-debug.bat");
		changeResourceServerJSP(true);
	}

	private static void switchToServerMode() throws IOException {
		Runtime.getRuntime().exec("cmd /c start G:\\XAMPP\\htdocs\\Github\\meAjax\\neon\\hyy\\src\\main\\webapp\\WEB-INF\\build-require-modules.bat");
		changeResourceServerJSP(false);
	}

	/**
	 * Resource_server.jsp 会根据是否debug模式有不同的内容
	 * @param isDebug
	 * @throws IOException
	 */
	private static void changeResourceServerJSP(boolean isDebug) throws IOException {
		
		String filePath = "G:\\XAMPP\\htdocs\\Github\\meAjax\\neon\\hyy\\src\\main\\webapp\\views\\includes\\resource_server.jsp";
		BufferedReader bf = new BufferedReader( new FileReader( new File(filePath)));
		
		StringBuilder sb = new StringBuilder();
		String line = "";
		while( (line  = bf.readLine() )  != null ) {
			if (line.matches(".*third\\-party\\-js\\-all\\.min\\.txt.*")) {
				if (isDebug) {
					line = "<!--" + line + "-->";
				} else {
					line = line.replaceAll("<!--.*<script", "<script");
					line = line.replaceAll("</script>.*-->", "</script>");
				}
			}
			
			if (line.matches(".*third\\-party\\-js\\-all\\.txt.*" )) {
				if (!isDebug) {
					line = "<!--" + line + "-->";
				} else {
					line = line.replaceAll("<!--.*<script", "<script");
					line = line.replaceAll("</script>.*-->", "</script>");
				}
			}
			
			sb.append(line);
			sb.append(System.getProperty("line.separator"));
		}
		
		Tools.writeDataToFile(sb.toString(), new File(filePath), "UTF8");
	}
	
	
	
}
