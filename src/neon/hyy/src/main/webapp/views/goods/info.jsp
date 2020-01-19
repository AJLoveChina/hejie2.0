<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>

<jsp:include page="/views/goods/style.jsp"></jsp:include>


<style>
	.aj-goods-one-container{
		position:relative;
	}
	.aj-goods-one-container .img{
		width:200px;height:200px;
		position: absolute;
		top:0;left:0;
		font-size: 0;
	}
	.aj-goods-one-container .img:before{
		content:"";
		position: relative;
		vertical-align: middle;
		width:0;
	}
	.aj-goods-one-container .img img {
		max-width: 100%;
		max-height: 100%;
	}
	.aj-goods-one-container .info{
		padding-left:210px;
		height: 200px;
		overflow: hidden;
	}
	.aj-goods-one-container .info .title{
		font-size: 20px;
	    line-height: 30px;
	    font-weight: normal;
	    border-bottom: 1px dashed #ccc;
	    padding-bottom: 10px;
	}
	.aj-goods-one-container .info .price{
		color:#d62222;
		font-weight: bold;
		font-size: 14px;
	}
	.aj-goods-one-container .desc{
		padding-top: 10px;
	}
</style>

<div class="aj-body-left">

	<div class="aj-goods-one-container">
		<div class="img">
			<img alt="" src="${model.getHomeImg() }">
		</div>
		<div class="info">
			<p class="title">
				<c:out value="${model.getName() }"></c:out>
			</p>
			<p class="price">
				价格 : <c:out value="${model.getPrice() }"></c:out> 元
			</p>
		</div>
		
		<div class="desc">
			<c:out value="${model.getDesc() }"></c:out>
		</div>
	</div>

</div>




<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>