<%@page import="ajax.tools.Tools"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getRequestURL().toString();
	String title = (String)request.getAttribute("title");
	
	if (title == null || title.equals("")) {
		title = "你个二货, 二货的俱乐部.电影, 旅行, 美食, 笑话...木有什么不知道";
	}
	boolean isLocal = Tools.isLocal(path);
	request.setAttribute("isLocal", isLocal);
 %>
<!DOCTYPE html>
<html>
<head lang="en">
	<link rel="dns-prefetch" href="http://images.nigeerhuo.com">
	<link rel="dns-prefetch" href="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="你个二货, 二货的俱乐部.电影, 旅行, 美食, 笑话...木有什么不知道">
    <meta name="keywords" content="知乎精选,电影,旅行,美食,健身,体育,运动,互联网,汽车,法律,税务,医疗,音乐,阅读,健康,生活方式,恋爱,社会现象,历史,摄影,文学,游戏,科技,故事">
    <link rel="shortcut icon" type="image/x-icon" href="http://images.nigeerhuo.com/images/web/pic/favicon.ico" />
    <meta property="qc:admins" content="7712403257661755205763757" />
    <meta name="mobile-agent" content="format=html5;url=http://wap.nigeerhuo.com">
    <title><%=title %></title>
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
            		 <img src="<%=UrlRoute.OSS_PUBLIC.getUrl() %>images/web/pic/dot.jpg" data-lazy="web/pic/logo.PNG" class="aj-lazy" height="70px " alt="你个二货"/>
            	</a>
            </div>
           	<div class="navbar-text">你个二货</div>
        </div>
        <div style="float:left;line-height: 50px;padding-top: 11px;margin-left: 10px;display: none;">
        	<script type="text/javascript">(function(){document.write(unescape('%3Cdiv id="bdcs"%3E%3C/div%3E'));var bdcs = document.createElement('script');bdcs.type = 'text/javascript';bdcs.async = true;bdcs.src = 'http://znsv.baidu.com/customer_search/api/js?sid=10544642492958301713' + '&plate_url=' + encodeURIComponent(window.location.href) + '&t=' + Math.ceil(new Date()/3600000);var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bdcs, s);})();</script>
        </div>
    </div>
</nav>

<div style="height: 50px;"></div>

<jsp:include page="/views/item/tishi.jsp"></jsp:include>
<div id="aj-body" class="clearfix">