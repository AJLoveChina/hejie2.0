<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>

<%@ include file="/views/goods/style.jsp" %>


<div class="aj-body-left">
	
	<ul class="leftWrap discovery_list">
		<c:forEach var="item" items="${model }">
			<c:set scope="request" var="item" value="${item }" />
			<c:import url="/views/goods/tbkItemOne.jsp" ></c:import>
		</c:forEach>
	</ul>
	
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>