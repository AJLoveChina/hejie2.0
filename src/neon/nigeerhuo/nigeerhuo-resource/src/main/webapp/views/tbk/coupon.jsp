<%@page import="ajax.model.taobao.Coupon"%>
<%@ page language="java" import="java.util.*, ajax.model.*"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	
%>

<div class="coupon col-sm-2 col-xs-4">
	<div class="inside">
		<div class="img-wrap">
			<img class="img img-responsive" src="${coupon.getPict_url() }" />
		</div>
		<p class="title pad-10 font12">
			<a href="${coupon.getCoupon_link_slick() }" target="_blank" rel="nofollow me">
				${coupon.getTitle() }
			</a>
		</p>
		<p class="pad-10 font12 shopname">${coupon.getShopName()}</p>
		<div class="pad-10 font12 denomination">${coupon.getCoupon_denomination() }</div>
		<div class="user-callback">
			<div class="likes btn-click">
				<em class="b-icon glyphicon glyphicon-thumbs-up"></em>
				<span class="num font12">${coupon.getLikes() }</span>
			</div>
			<div class="dislikes btn-click">
				<em class="glyphicon glyphicon-thumbs-down"></em>
				<span class="num font-12">${coupon.getDislikes() }</span>
			</div>
		</div>
	</div>
</div>