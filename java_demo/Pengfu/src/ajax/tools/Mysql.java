package ajax.tools;

import java.sql.*;

public class Mysql {
	public static Connection getConn(){
		String url = "jdbc:mysql://127.0.0.1:3306/meajax?useUnicode=true&characterEncoding=utf8";
		String name = "name";
		String pass = "123";
		
		Connection conn = null;
		
		try {
			Class.forName("org.gjt.mm.mysql.Driver");
			conn = DriverManager.getConnection(url, name, pass);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
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
}
