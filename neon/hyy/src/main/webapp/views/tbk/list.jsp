<%@page import="ajax.model.entity.Goods"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


%>

<jsp:include page="/views/includes/header.jsp"></jsp:include>
<style>
	#goods-type-roll{}
	#goods-type-roll .gt-list-fix{
		position:fixed;
		top:40%;
		left:20px;
	}
	#goods-type-roll .gt-list-fix .li{
		display:block;
		max-width:70px;
		height:30px;
		overflow:hidden;
		line-height:30px;
		font-size:12px;	
		cursor:pointer;
		color:#666;
	}
	#goods-type-roll .gt-list-fix .li:hover{
		color:#333;
	}
	#goods-type-roll .gt-list-fix .li.selected{
		color:#c81623;
	}
	
	#gt-list-content{}
	#gt-list-content .gt-one{
		position:relative;
	}
	#gt-list-content .gt-one.selected .aj-icon,#gt-list-content .gt-one.selected .floor{
		color:#c81623;
	}
	#gt-list-content .gt-one .gt-o-top{
		height:35px;
		line-height:35px;
		border-bottom:1px solid #c81623;
		position:relative;
	}
	#gt-list-content .gt-one .gt-o-top .name{
		font-size:16px;
		height:35px;
		float:left;
		line-height:42px;
	}
	#gt-list-content .gt-one .gt-o-top .floor{
		position:absolute;
		top:6px;
		left:16px;
	}
	#gt-list-content .gt-one .gt-o-top .aj-icon{
		font-size:35px;
		float:left;
	}
	#gt-list-content .gt-one .gt-o-top .more{
		float:right;
		font-size:12px;
		color:#333;
	}
	#gt-list-content .gt-one .gt-o-content{
		height:400px;
	}
</style>

<div class="aj-body-left">

	<div id="goods-type-roll" ng-controller="mainController" ng-cloak>
		
		<div class="gt-list-fix">
			<ul>
				<li class="li" ng-repeat="item in s.goodsTypeList" ng-class="{selected : (s.index == $index)}"}>
					<em ng-class="['aj-icon', item.icon]"></em>
					<span title="{{item.name}}" ng-click="changeTo($index)">{{item.shortName}}</span>
				</li>
			</ul>
		</div>
		
		<div style="height:680px"></div>
		
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
				<div class="gt-o-content">
					
				</div>
			</div>
		</div>
	</div>
	
	<script>
		$(function () {
			require(["main"], function () {
				require(["tools/tools", "model/Goods"], function (tools, Goods) {
					
					var container = $("#goods-type-roll");
					var app = angular.module("goodsTypeRollApp", []);
					
					app.controller("mainController", function ($scope) {
						$scope.s = {};
						$scope.s.goodsTypeList = [];
						$scope.s.index = 0;
						
						Goods.getGoodsTypeList(function (res) {
							$scope.$apply(function () {
								$scope.s.goodsTypeList = res.data;
							})
						});
						
						$scope.changeTo = function (index) {
							$scope.s.index = index;
							$scope.scrollIntoView(index);
						}
						
						$scope.scrollIntoView = function (index) {
							var id = "#gt-one-block-" + index;
							var one = $(id);
							$("html,body").animate({
								scrollTop : one.offset().top - $(window).height() / 2 + one.height() / 2
							})
						}
						
						$scope.reCalculatePositionOfFixedBar = function () {
							var bar = container.find(".gt-list-fix");
							
							bar.animate({
								top : ($(window).height() - 260) / 2,
								left : ($(window).width() - 1050) / 2 - 80
							})
						}
						$scope.reCalculatePositionOfFixedBar();
						
						$(window).on("aj.resize", function () {
							$scope.reCalculatePositionOfFixedBar();
						})
						
					})
					
					angular.bootstrap(container, ["goodsTypeRollApp"])
				});
			})
		})
	</script>
</div>

<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>