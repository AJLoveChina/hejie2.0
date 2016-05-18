<%@ page language="java" import="java.util.*, ajax.model.*,ajax.model.entity.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Item item = (Item)request.getAttribute("item");
int previous = item.getId() - 1;
int next = item.getId() + 1;

request.setAttribute("title", item.getTitle());

%>



<jsp:include page="/views/includes/header.jsp"></jsp:include>

<jsp:include page="/views/item/pendant.jsp"></jsp:include>

<div class="aj-body-left">
	<div style="height:10px;"></div>
	
	<jsp:include page="/views/item/one.jsp"></jsp:include>
	
	<jsp:include page="/views/item/itemsRecommend.jsp"></jsp:include>

</div>

<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>


<script>
	$(function () {
		var btn = $("#aj-random-access-btn");
		btn.on("click", function () {
			var min = parseInt($(this).attr("min"));
			var max = parseInt($(this).attr("max"));
			
			var random = Math.floor(min + max * Math.random());
			location.href = "?id=" + random;
		})
	})
</script>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>