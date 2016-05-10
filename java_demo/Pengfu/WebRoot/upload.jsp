<%@page import="ajax.model.entity.Item"%>
<%@page import="ajax.model.safe.User"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
Item item = (Item)request.getAttribute("item");
boolean isAdmin = User.isAdmin(request, response);

request.setAttribute("isAdmin", isAdmin);

%>

<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<c:choose>
		<c:when test="${isAdmin }">
			<jsp:include page="views/item/itemCRUD.jsp">
				<jsp:param value="<%=item %>" name="model"/>
			</jsp:include>
		</c:when>
		<c:otherwise>
			你木有权限使用upload功能
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
