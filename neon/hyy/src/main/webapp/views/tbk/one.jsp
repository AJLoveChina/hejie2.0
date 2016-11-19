<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/views/includes/header.jsp"></jsp:include>
<jsp:include page="/views/tbk/one_style.jsp"></jsp:include>
<jsp:include page="/views/item/pendant.jsp"></jsp:include>
<script>
	$(function () {
		var dom = $("#tbkitem-content-id");
		dom.find(".short-name").each(function () {
			$(this).html($(this).data("shopname").substr(0,2));
		})
	})
</script>
<div style="height:10px;"></div>
<div class="container-fluid">
<div class="row">
		<div class="col-sm-8 col-xs-12">
			
			<div id="tbkitem-content-id" class="tbkitem-content">
			
				<div class="row top">
					<div class="col-xs-5 img-wrap img-middle">
						<img src="${model.getPict_url() }" class="tbkitem-img img-responsive"/>
					</div>
					<div class="col-xs-7 info">
						<h1 class="title">${model.getTitle() }</h1>
						<span class="sp-line">
							<span class="short-name" data-shopname="${model.getShopName() }"></span>
							发布于 : 
							<span class="time_need_to_be_rendered">${model.getDateEnteredOfSave() }</span>
							(${model.getDateEnteredOfSave() })
						</span>
						<span class="sp-line">合作价格 : 
							<span class="price">¥${model.getZk_final_price() }</span></span>
						<span class="sp-line">合作商家 : ${model.getNick() }
						</span>
						<c:if test="${!model.isHasCoupon() }">
							<span class="sp-line" >
								Sorry, 我们木有要到卖家的优惠券/(ㄒoㄒ)/~~
							</span>
						</c:if>
						<c:if test="${model.isHasCoupon() }">
							<span class="sp-line" >
								Yes, 该商品还有优惠券哎,买之前要记得领优惠券哦~
								<a href="${model.getCoupon_link_slick() }" class="label label-warning">${model.getCoupon_denomination() }</a>
							</span>
						</c:if>
						<a href="${model.getClick_url() }" class="jump-link">链接|传送门</a>
					</div>
				</div>
				
				<p class="cut-of-alert alert alert-info">
					<em class="aj-icon aj-icon-dog"></em> 优惠商品详图
				</p>
				
				<c:forEach items="${model.getSmall_images().getString() }" var="imgSrc">
					<img src="${imgSrc }" />
				</c:forEach>
			</div>
			
			<jsp:include page="/views/item/itemsRecommend.jsp"></jsp:include>
	
			<div class="aj-comment-ui-area" data-grounp-id="${commentAreaId }"></div>
			
		</div>
		
		<div class="col-sm-4 col-xs-12">
			<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
			
			<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
			
			<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
		</div>
	</div>

	
	<div class="aj-body-right">
		<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
		
		<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
		
		<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
		
		<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
	</div>
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

<%@ include file="/views/includes/footer.jsp" %>