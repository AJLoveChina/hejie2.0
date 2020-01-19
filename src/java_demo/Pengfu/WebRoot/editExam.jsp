<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>




<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<textarea class="aj-hide" id="aj-exam-json">
		<c:out value="${exam.toJson() }"></c:out>
	</textarea>
	
	<c:if test="${isAdmin}">
		<jsp:include page="views/huodong/examEditContainer.jsp"></jsp:include>
	</c:if>
</div>

<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
