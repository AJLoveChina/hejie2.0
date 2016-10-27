<%@page import="ajax.model.taobao.model.TbkItem"%>
<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


%>

<jsp:include page="/views/includes/header.jsp"></jsp:include>
<jsp:include page="/views/tbk/one_style.jsp"></jsp:include>

<div style="height:20px;"></div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-8 col-xs-12">
			
			<div class="tbkitem-content">
			
				<div class="row top">
					<div class="col-sm-5 img-wrap">
						<img src="${model.getPict_url() }" class="img-responsive"/>
					</div>
					<div class="col-sm-7 info">
						<h1 class="title">${model.getTitle() }</h1>
						<p>更新时间: <span class="time_need_to_be_rendered">${model.getDateEnteredOfSave() }</span></p>
						<p>合作商家: ${model.getNick() }</p>
					</div>
				</div>
				
				
				<c:forEach items="${model.getSmall_images().getString() }" var="imgSrc">
					<img src="${imgSrc }" />
				</c:forEach>
			</div>
			
		</div>
		
		<div class="col-sm-4 col-xs-12">
			<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
			
			<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
			
			<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
		</div>
	</div>
</div>
<div style="height:10px;"></div>
<jsp:include page="/views/includes/footer.jsp"></jsp:include>