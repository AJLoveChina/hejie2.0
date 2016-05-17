<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String model = (String)request.getAttribute("model");
	response.setContentType("text/json");
%>

<%=model %>