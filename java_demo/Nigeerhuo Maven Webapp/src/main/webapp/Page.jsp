<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Integer pageIndex = (Integer)request.getAttribute("page");
%>




<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<jsp:include page="views/includes/jokeTypeChoice.jsp"></jsp:include>
	<jsp:include page="views/huodong/homeImagesRoll.jsp"></jsp:include>
	
	
	<jsp:include page="views/item/PageChoice_v3.jsp"></jsp:include>
	
	<div class="aj-rows-wrap">
		<c:forEach items="${items }" var="item">
		 	<c:set scope="request" var="item" value="${item }" />
			<jsp:include page="views/item/oneZdm.jsp"></jsp:include>
		</c:forEach>
	</div>
	
	<div style="height:10px;"></div>
	<jsp:include page="views/item/PageChoice_v3.jsp"></jsp:include>
		 
</div>

<style>

</style>
<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
