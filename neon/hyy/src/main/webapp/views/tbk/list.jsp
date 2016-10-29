<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/views/includes/headerV2.jsp"></jsp:include>
<%@ include file="/views/tbk/style.jsp" %>
<%@ include file="/views/tbk/script.jsp" %>

<div style="height:20px;"></div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-8 col-xs-12">
			<div style="height:500px;"></div>
		</div>
		<div class="col-sm-4 col-xs-12">
			<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
			
			<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12 col-xs-12">
		
			<div id="goods-type-roll" ng-controller="mainController" ng-cloak>
				
				<div class="gt-list-fix">
					<ul>
						<li class="li" ng-repeat="item in s.goodsTypeList" ng-class="{selected : (s.index == $index)}"}>
							<em ng-class="['aj-icon', item.icon]"></em>
							<span title="{{item.name}}" ng-click="changeTo($index)">{{item.shortName}}</span>
						</li>
					</ul>
				</div>
				
				<div id="gt-list-content">
					<div id="gt-one-block-{{$index}}" class="gt-one" ng-repeat="item in s.goodsTypeList" ng-class="{selected : (s.index == $index)}"}>
						<div class="gt-o-top">
							<em class="aj-icon aj-icon-jietijiangli"></em>
							<span class="floor">
								{{$index + 1}}
							</span>
							<span class="name">
								{{item.shortName}}
							</span>
							<a class="more" href="">更多>></a>
						</div>
						<!-- content -->
						<div class="gt-o-content clearfix">
							<div ng-switch="getStatus($index)">
								<div ng-switch-when="1">
									<p class="text-center">正在初始化...</p>
								</div>
							  	<div ng-switch-when="2">
							  		<p class="text-center">木有更多了</p>
							  	</div>
							  	
							  	<div ng-switch-when="3">
							  		<!-- goods loop -->
							  		<div class="tbkitem-one col-sm-3" ng-repeat="tbkitem in s.tbkItems['key' + $index]">
										<div class="border-wrap container-fluid">
											<div class="img-wrap">
												<a href="{{tbkitem.js_detail_url}}">
													<img src="{{tbkitem.pict_url}}" class="img-responsive"/>
												</a>
											</div>
											<div class="title">
												<a href="{{tbkitem.js_detail_url}}">
													{{tbkitem.title}}
												</a>
											</div>
											<div class="row shop-line">
												<span class="col-sm-8 col-xs-8 max-height-20 overflow-hidden">{{tbkitem.nick}}</span>
												<span class="col-sm-4 col-xs-4 text-right max-height-20 overflow-hidden">{{tbkitem.js_time}}</span>
											</div>
											<div class="row">
												<div class="old-price col-sm-12">原价 : {{tbkitem.reserve_price}}</div>
												<div class="new-price col-sm-12">
													折扣后 : ¥{{tbkitem.zk_final_price}}
												</div>
											</div>
											<div class="row">
												<div class="col-sm-12 btn-group btn-group-justified btn-group-xs btn-options  center-block">
													<a target="_blank" href="{{tbkitem.click_url}}" class="btn btn-danger">直达链接</a>
													<a href="{{tbkitem.js_detail_url}}" class="btn btn-warning">点击详情</a>
												</div>
											</div>
										</div>
									</div>
									<!-- goods loop -->
							  	</div>
							</div>
						</div>
						<!-- content -->
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>
<div style="height:10px;"></div>
<jsp:include page="/views/includes/footer.jsp"></jsp:include>