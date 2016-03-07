package ajax.tools;

import java.sql.*;

public class Mysql {
	
	private static Connection conn = null;
	public static Connection getConn(){
		if (Mysql.conn != null) {
			return Mysql.conn;
		}
		
		String url = "jdbc:mysql://127.0.0.1:3306/meajax?useUnicode=true&characterEncoding=utf8";
		String name = "root";
		String pass = "";
		
		Connection conn = null;
		
		try {
			Class.forName("org.gjt.mm.mysql.Driver");
			conn = DriverManager.getConnection(url, name, pass);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Mysql.conn = conn;
		return conn;
	}
	
	
	public static Statement getStat(){
		Connection conn = getConn();
		Statement stat = null;
		
		try {
			stat = conn.createStatement();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return stat;
	}
	
	public static void close() {
		try {
			Mysql.conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Mysql.conn = null;
	}
}
