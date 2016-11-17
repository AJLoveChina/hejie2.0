<%@ page language="java" import="java.util.*, ajax.model.*"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<div class="coupon">
	<div class="inside">
		<div class="img-wrap">
			<img class="img" src="${coupon.getPict_url() }" />
		</div>
		<span class="shopname">${coupon.getShopName()}</span>
		<p class="denomination">${coupon.getCoupon_denomination() }</p>
	</div>
</div>