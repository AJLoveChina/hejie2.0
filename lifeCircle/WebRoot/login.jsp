<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'login.jsp' starting page</title>
    
	<meta charset="utf-8" />
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  	<%
  		request.setCharacterEncoding("utf-8");
  		String name = request.getParameter("name");
  		String[] favorites = request.getParameterValues("favorite");
  		
  		out.print(name);
  		response.sendRedirect("index.jsp");
  	 %>
  	 
  	 <%
  	 	if (favorites != null){
  	 		for (int i = 0; i < favorites.length; i++) {
  	 			out.print(favorites[i]);
  	 		}
  	 	}
  	  %>
    <form action="login.jsp" enctype="application/x-www-form-urlencoded" method="POST">
    	<input type="text" name="name" />
    	<input type="checkbox" name="favorite" value="read"/>read
    	<input type="checkbox" name="favorite" value="write"/>write
    	<input type="checkbox" name="favorite" value="run"/>run
    	<input type="submit" value="submit"/>
    </form>
    
    <a href="login.jsp?name=中文">URl传递参数</a>
    
  </body>
</html>
