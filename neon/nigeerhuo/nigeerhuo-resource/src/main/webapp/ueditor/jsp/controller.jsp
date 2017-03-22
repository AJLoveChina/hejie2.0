<%@page import="ajax.model.safe.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
	if (User.isAdmin(request, response)) {
		request.setCharacterEncoding( "utf-8" );
		response.setHeader("Content-Type" , "text/html");
		
		String rootPath = application.getRealPath( "/" );
		
		out.write( new ActionEnter( request, rootPath ).exec() );
	}
	
%>