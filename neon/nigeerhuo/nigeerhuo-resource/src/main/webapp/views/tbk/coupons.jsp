<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" import="java.util.*, ajax.model.*"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<jsp:include page="/views/includes/headerV2.jsp"></jsp:include>

<div style="height: 20px;"></div>
<div class="container-fluid">
	
	<div class="row">
		<p class="coupons-title alert alert-info">
			<em class="aj-icon aj-icon-biaoqian"></em> 全部优惠券 <a href="javascript:;"
				class="label label-primary float-right">欢迎来到优惠券大陆</a>
		</p>
		<div class="coupons clearfix" id="coupons-container">
			<%@ include file="/views/tbk/coupon-style.jsp"%>
			<c:forEach items="${coupons }" var="coupon">
				<c:set var="coupon" value="${coupon }" scope="request"></c:set>
				<jsp:include page="/views/tbk/coupon.jsp"></jsp:include>
			</c:forEach>


			<span ng-controller="list" ng-cloak ng-init="s.curPage = ${pageChoice.getCurPage() }">
				<div class="coupon col-sm-2 col-xs-4" ng-repeat="coupon in s.coupons">
					<div class="inside">
						<div class="img-wrap">
							<img class="img img-responsive" ng-src="{{coupon.pict_url}}" />
						</div>
						<p class="title pad-10 font12">
							<a href="{{coupon.coupon_link_slick}}">
								{{coupon.title}} </a>
						</p>
						<p class="pad-10 font12 shopname">{{coupon.shopName}}</p>
						<div class="pad-10 font12 denomination">{{coupon.coupon_denomination}}</div>
						<div class="user-callback">
							<div class="likes btn-click">
								<em class="b-icon glyphicon glyphicon-thumbs-up"></em> <span
									class="num font12">123</span>
							</div>
							<div class="dislikes btn-click">
								<em class="glyphicon glyphicon-thumbs-down"></em> <span
									class="num font-12">25</span>
							</div>
						</div>
					</div>
				</div>
			</span>
			

			<div ng-controller="clickNext" class="coupon col-sm-2 col-xs-4 click-show-more">
				<div class="inside" ng-click="goNext()">
					<div class="icon-info" ng-class="{'animated shake infinite' : s.isLoading}">
						<em class="aj-icon aj-icon-lab"></em>
					</div>
					<div class="click-info">
						<p>20张优惠券</p>
						<b>点击加载更多</b>
					</div>
				</div>
			</div>
			
			<%@ include file="/views/tbk/coupons_ajax_load_script.jsp" %>
		</div>
	</div>
	
	<div style="display:none;">
		<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
	</div>

</div>
<div style="height: 10px;"></div>
<jsp:include page="/views/includes/footer.jsp"></jsp:include>