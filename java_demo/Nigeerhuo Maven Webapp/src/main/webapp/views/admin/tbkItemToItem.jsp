<%@page import="ajax.model.taobao.TbkItem"%>
<%@page import="ajax.model.entity.Item"%>
<%@page import="ajax.model.safe.User"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%

String path = request.getContextPath();
TbkItem item = (TbkItem)request.getAttribute("item");

%>

<jsp:include page="/views/includes/header.jsp"></jsp:include>

<div class="aj-body-left">
	<c:set var="model" value="${item }" scope="request"></c:set>
	<jsp:include page="/views/admin/tbkitems_crud.jsp" />
</div>

<style>

</style>
<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>