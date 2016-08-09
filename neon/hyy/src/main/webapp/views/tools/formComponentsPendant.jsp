<%@page import="com.google.gson.Gson"%>
<%@page import="ajax.model.FormComponents"%>
<%@page import="ajax.model.taobao.TbkItem"%>
<%@page import="ajax.model.entity.Item"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String json = (String)request.getAttribute("model");
%>


