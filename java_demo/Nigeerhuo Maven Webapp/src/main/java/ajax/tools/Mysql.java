package ajax.tools;

import java.sql.*;

public class Mysql {
	
	private static Connection conn = null;
	private static int count = 0;
	
	public static Connection getConn(){
		count ++;
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
			count--;
			if (count == 0) {
				// if count != 0, it shows some other code is using sql connection, so it can't be destroied!
				Mysql.conn.close();
				Mysql.conn = null;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
