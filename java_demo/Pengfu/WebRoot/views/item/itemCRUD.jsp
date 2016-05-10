<%@page import="ajax.model.entity.Item"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Item item = (Item) request.getAttribute("item");
String json = item.toJson();
%>


<%=json %>
