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
	
	
	<jsp:include page="views/item/PageChoice_v2.jsp"></jsp:include>
	
	<c:if test="${!hasCurrentPage }">
		<p style="font-size:14px;text-align: center;line-height: 30px;">
			亲~二货君很抱歉,你获取的页码不存在,现在展示的是最后一页...对不起,我还爱你(づ￣3￣)づ╭❤～
		</p>
	</c:if>
	<div class="aj-rows-wrap">
		<c:forEach items="${items }" var="item">
		 	<c:set scope="request" var="item" value="${item }" />
			<jsp:include page="views/item/oneZdm.jsp"></jsp:include>
		</c:forEach>
	</div>
	
	<div style="height:10px;"></div>
	<jsp:include page="views/item/PageChoice_v2.jsp"></jsp:include>
	<c:if test="${!hasCurrentPage }">
		<p style="font-size:14px;text-align: center;line-height: 30px;">
			亲~二货君很抱歉,你获取的页码不存在,现在展示的是最后一页...对不起,我还爱你(づ￣3￣)づ╭❤～
		</p>
	</c:if>
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

<%@ include file="/views/includes/footer.jsp" %>
