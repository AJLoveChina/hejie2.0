<%@page import="ajax.model.safe.User"%>
<%@page import="ajax.tools.Tools"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getRequestURL().toString();
	String title = (String)request.getAttribute("title");
	String description = (String) request.getAttribute("description");
	String keywords = (String) request.getAttribute("keywords");
	
	if (title == null || title.equals("")) {
		title = "你个二货, 二货的俱乐部.生活不该只有眼前的苟且-你个二货,礼物の物语";
	} else {
		title += "-你个二货,礼物の物语";
	}
	
	if (description == null || description.equals("")) {
		description = "二货君与上千家店铺合作每天推出物美价廉的礼物,礼物在于情谊不在贵重.我们每天精挑细选生日礼物,情侣礼物,创意礼物,用最低的价格购买最心仪的礼物.对的,生活不会只有眼前的苟且,二货君与你同在.";
	}
	
	if (keywords == null || keywords.equals("")) {
		keywords = "礼物,生日礼物,情侣礼物,情人节礼物,母亲节礼物,父亲节礼物,生日礼物送什么,生日礼物女生,创意礼物,儿童节礼物,七夕礼物,圣诞节礼物,中秋节礼物,万圣节礼物,平安夜礼物,元旦礼物,春节礼物";
	}
 %>
<!DOCTYPE html>
<html>
<head lang="en">
	<link rel="dns-prefetch" href="http://images.nigeerhuo.com">
	<link rel="dns-prefetch" href="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="description" content="<%=description%>">
    <meta name="keywords" content="<%=keywords %>">
    <link rel="shortcut icon" type="image/x-icon" href="http://images.nigeerhuo.com/images/web/pic/favicon.ico" />
    <meta property="qc:admins" content="7712403257661755205763757" />
    <meta name="google-signin-client_id" content="724523861492-9q9uh77mcrajedcgggb90qva3u3j7sm8.apps.googleusercontent.com">
    <meta name="mobile-agent" content="format=html5;url=http://wap.nigeerhuo.com/">
    <title><%=title %></title>
    <%@ include file="/views/includes/resource_server.jsp" %>
</head>
<body>

<div id="aj-headerV2" class="aj-hd-v2">
    <div id="aj-hd-v2-top" class="top">
    	<div class="container" style="width:1050px;">
    		<div class="row clearfix">
    			<div class="col-sm-2">
    				<a href="/">
    					<img class="img-responsive img" src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/images/web/pic/logoV2200x80.png" />
    				</a>
    			</div>
    			<div class="col-sm-4 search-area" ng-controller="searchController">
    				<div class="input-wrap">
    					<span class="glyphicon glyphicon-search icon" ng-click="searchV2()"></span>
    					<input ng-keyup="keyup($event)" class="search-input" ng-model="s.keyWord" placeholder="二货在手 好货我有">
    				</div>
    				<div class="keyword-line"></div>
    				<ul ng-cloak>
    					<li class="li" ng-repeat="item in s.list">
    						<a href="javascript:;" ng-click="search(item)">{{item}}</a>
    					</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    </div>
    <div id="aj-hd-v2-fixednav" class="nav-bar" ng-controller="listGoodsTypeController">
    	<div class="container" style="width:1050px;">
    		<ul ng-cloak>
	    		<li class="li" ng-repeat="item in s.list">
	    			<a href="{{getHref(item)}}">{{item.name}}</a>
	    		</li>
	    	</ul>
	    	<div id="aj-mobile-sign-area" class="aj-mobile-sign-area">
		    	<a href="javascript:;" class="aj-show-sign-panel">登陆</a>
		    	<a href="javascript:;" class="aj-u-img-show">
		    		<img src="" />
		    	</a>
		    </div>
    	</div>
    </div>
</div>

<script>
	$(function () {
		require(["main"], function () {
			require(["model/Goods"], function (goods) {
				
				$("#aj-hd-v2-fixednav").affix({
	    			offset : {
	    				top : 0
	    			}
	    		})
	    		
				var container = $("#aj-headerV2"),
					app = angular.module("header-app", []);
				app.controller("listGoodsTypeController", function ($scope) {
					$scope.s = {};
					$scope.s.list = [{
						name : "精选",
						id : 110
					}, {
						name : "九块九",
						id : 120
					}, {
						name : "家用电器",
						id : 10
					}, {
						name : "办公数码",
						id : 30
					}, {
						name : "个护美妆",
						id : 50
					}, {
						name : "服饰箱包",
						id : 60
					}, {
						name : "母婴玩具",
						id : 80
					}, {
						name : "食品饮料",
						id : 90
					}, {
						name : "图书音像",
						id : 100
					}];
					
					
					$scope.getHref = function (item) {
						var params = {
								plateForm : goods.getPlatForm(),
								page : 1,
								goodsTypeId : item.id
						};
						return goods.getGoodsTypeHref(params);
					}
					
				})
				
				app.controller("searchController", function ($scope) {
					$scope.s = {};
					$scope.s.keyWord = "";
					
					$scope.s.list = ["英雄联盟", "玩偶", "男生礼物", "万圣节搞怪", "双11", "冬季大衣", "埃菲尔铁塔"];
					
					$scope.search = function (keyword) {
						var data = {
								page : 1,
								size : 40,
								keyword : keyword,
								plateForm : goods.getPlatForm()
						}
						var newForm = $('<form>', {
					        'action': '/t/tbkSearch',
					        'target': '_self'
					    }).append(jQuery('<input>', {
					        'name': 'data',
					        'value': encodeURIComponent(JSON.stringify(data)),
					        'type': 'hidden'
					    }));
					    newForm.submit();
					}
					$scope.searchV2 = function () {
						if ($.trim($scope.s.keyWord) === "") return;
						$scope.search($scope.s.keyWord);
					}
					
					$scope.keyup = function (ev) {
						if (event.keyCode === 13) {
							$scope.searchV2();
						}
					}
				})
				
				angular.bootstrap(container, ["header-app"]);
			})
		})
	})
</script>
<div id="aj-body" class="clearfix">