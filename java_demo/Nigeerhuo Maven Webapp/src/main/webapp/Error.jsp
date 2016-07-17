<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%

String error = (String) request.getAttribute("error");

if (error == null) {
	error = "发生错误";
}
%>




<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<%=error %>
</div>

<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
