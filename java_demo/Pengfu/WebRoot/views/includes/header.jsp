<%@page import="ajax.tools.Tools"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getRequestURL().toString();
	boolean isLocal = Tools.isLocal(path);
	request.setAttribute("isLocal", isLocal);
 %>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="你个二货, 二货的俱乐部.电影, 旅行, 美食, 笑话...木有什么不知道">
    <link rel="shortcut icon" type="image/x-icon" href="web/pic/favicon.ico" />
    <meta property="qc:admins" content="7712403257661755205763757" />
    <title>你个二货</title>
</head>
<body>

<c:choose>
	<c:when test="${isLocal }">
		<jsp:include page="resource_local.jsp"></jsp:include>
	</c:when>
	
	<c:otherwise>
		<jsp:include page="resource_server.jsp"></jsp:include>
	</c:otherwise>
</c:choose>



<nav id="aj-header" class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <div style="display: inline-block;height: 50px;overflow: hidden;float:left;">
            	<a href="<%=UrlRoute.HOME%>">
            		 <img src="http://www.nigeerhuo.com:8888/images/web/pic/dot.jpg" data-lazy="web/pic/logo.PNG" class="aj-lazy" height="70px " alt="你个二货"/>
            	</a>
            </div>
           	<div class="navbar-text">你个二货</div>
        </div>
    </div>
</nav>

<div style="height: 50px;"></div>
<div id="aj-body" class="clearfix">




