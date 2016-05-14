<%@page import="ajax.model.safe.User"%>
<%@page import="ajax.model.safe.SignStatus"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
boolean isAdmin = User.isAdmin(request, response);
boolean isLogin = User.isLogin(request, response);
String nickname = "";

if (isLogin) {
	nickname = User.getLoginUser(request).getUsername();
}

request.setAttribute("isAdmin", isAdmin);
request.setAttribute("isLogin", isLogin);

%>




<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<c:choose>
		<c:when test="${isAdmin }">
			你是admin<%=nickname %>
		</c:when>
		
		<c:when test="${isLogin }">
			你已经登陆 <%=nickname %>
		</c:when>
		
		<c:otherwise>
			你不是admin <%=nickname %>
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
