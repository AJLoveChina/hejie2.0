<%@page import="ajax.model.entity.Blog"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

List<Blog> blogs = (List<Blog>)request.getAttribute("blogs");
System.out.println(blogs.size());

%>

<jsp:include page="/views/includes/header.jsp"></jsp:include>

<<jsp:include page="/views/blogs/style.jsp"></jsp:include>
<div class="aj-body-left">
	<div class="blogs-list">
		
		<c:forEach var="blog" items="${blogs }">
			<c:set scope="request" var="item" value="${blog }" />
			<c:import url="/views/blogs/blog_iterator.jsp"></c:import>
		</c:forEach>
		
	</div>
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
	
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
