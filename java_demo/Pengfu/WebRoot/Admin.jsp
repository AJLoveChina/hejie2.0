<%@page import="ajax.model.safe.User"%>
<%@page import="ajax.model.safe.SignStatus"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
boolean isAdmin = User.isAdmin(request, response);
request.setAttribute("isAdmin", isAdmin);

%>




<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<c:choose>
		<c:when test="${isAdmin }">
			你是admin
		</c:when>
		
		<c:otherwise>
			你不是admin
		</c:otherwise>
	</c:choose>
		 
</div>

<style>

</style>
<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
