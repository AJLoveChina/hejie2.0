<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Integer pageIndex = (Integer)request.getAttribute("page");
%>




<jsp:include page="views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<style>
		.aj-joke-list-one{}
		.aj-joke-list-one .panel-body{
			font-size:14px;
			line-height:26px;
		}
		.aj-joke-list-one img {
			display: none;
		}
	</style>
	
	
	<div class="aj-joke-list-one-js aj-joke-list-one panel panel-default">
	    <div class="panel-heading">
	    	<a style="color:#333;" href='<c:out value="${joke.getOneJokeUrlById() }"></c:out>'>
	    		<c:out value="${joke.getTitle() }"></c:out>
	    	</a>
	    </div>
	    <div class="panel-body" style="word-wrap:break-word;">
	    	<c:if test="${joke.hasAuthor()}">
	    		<div style="font-size:12px;padding:0 0 10px;">
		    		作者 : 
		    		<a href='<c:out value="${joke.getUserPersonalPageUrl() }"></c:out>'>
		    			<c:out value="${joke.getUsername() }"></c:out>
		    		</a>
	    		</div>
	    	</c:if>
	        <c:out value="${joke.getContent() }" escapeXml="false"></c:out>
	    </div>
	</div>	
</div>

<script>
	$(function () {
		try {
			$(".aj-joke-list-one-js").find("img").each(function () {
				$(this).attr("src","http://images.nigeerhuo.com/images/" + $(this).attr("src"));
				$(this).fadeIn();
			});
		}catch(ex){
			console.log(ex);
		}
	});
</script>


<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
