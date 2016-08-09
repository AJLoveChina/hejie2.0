<%@page import="ajax.model.safe.User"%>
<%@page import="ajax.model.entity.Item"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

boolean isLogin = User.isLogin(request, response);
List<Item> items = new ArrayList<Item>();



if (isLogin) {
	
	User u = User.getLoginUser(request);
	items = u.getCollections();
	
}

request.setAttribute("isLogin", isLogin);
request.setAttribute("items", items);

Integer pageIndex = (Integer)request.getAttribute("page");
%>




<jsp:include page="views/includes/header.jsp"></jsp:include>

<style>
	.my-collections{}
	.my-collections .no-collections{
		text-align: center;
		padding: 10px 0;
	}
	
	.my-collections .atop{
		border-bottom: 1px solid #e6e6e6;
		
	}
	.my-collections .atop .atitle{
		display:inline-block;
	    border-bottom: 2px solid #d74140;
	    font-size: 14px;
	    margin: 0;
	    height: 30px;
	    line-height: 30px;
	}
</style>

<div class="aj-body-left">
	
	<c:choose>
		<c:when test="${isLogin }">
			<div class="my-collections">
				<div class="atop">
					<h3 class="atitle">我的收藏</h3>
				</div>
				
				<div class="amid">
					<c:forEach items="${items }" var="item">
					
						<c:set scope="request" var="item" value="${item }" />
						
						<jsp:include page="views/item/oneZdm.jsp"></jsp:include>
					</c:forEach>
					
					<div class='no-collections'>
						你木有更多的收藏了
					</div>
				</div>
			</div>		
		</c:when>
		
		<c:otherwise>
			<div class="my-collections">
				<div class="atop"></div>
				
				<div class="amid">
					<div class='no-collections'>
						你还木有登陆啊, 亲(づ￣3￣)づ╭❤～
					</div>
				</div>
			</div>
		</c:otherwise>
	</c:choose>

	
</div>

<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
