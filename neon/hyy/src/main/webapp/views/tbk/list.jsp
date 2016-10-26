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
					<div ng-switch="getStatus($index)">
						<div ng-switch-when="1">
							正在初始化...
						</div>
					  	<div ng-switch-when="2">
					  		木有更多了
					  	</div>
						<div ng-switch-default>
							<div ng-repeat="tbkitem in s.tbkItems[$index]">
								<div ng-bind="tbkitem.title"></div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
	</div>
	
	<script>
		$(function () {
			require(["main"], function () {
				require(["tools/tools", "model/Goods"], function (tools, Goods) {
					"use strict";
					var container = $("#goods-type-roll");
					var app = angular.module("goodsTypeRollApp", []);
					
					app.controller("mainController", function ($scope) {
						$scope.s = {};
						$scope.s.goodsTypeList = [];
						/**
						* 是否处于点击后的滚动状态
						*/
						$scope.s.isAnimateNow = false;
						/**
						* 保存每个goodsType区域当前展示的商品列表所对应的查询对象
						*/
						$scope.s.curQueryParams = {};
						/**
						* 表示某个区域是否已经初始化加载
						*/
						$scope.s.isInit = {};
						/**
						*只保存某一区域当前显示的tbkitems集合
						*形如 :
						* {
						*	key : List<TbkItem>
						* }
						*/
						$scope.s.tbkItems = {};
						$scope.s.index = 0;
						
						Goods.getGoodsTypeList(function (res) {
							$scope.$apply(function () {
								$scope.s.goodsTypeList = res.data;
							})

							$scope.calculateWhichIndexNowWhenScroll();
						});
						
						$scope.changeTo = function (index) {
							$scope.s.index = index;
							$scope.scrollIntoView(index);
						}
						
						$scope.scrollIntoView = function (index) {
							var id = "#gt-one-block-" + index;
							var one = $(id);
							
							$scope.initBlock(index);
							$scope.s.isAnimateNow = true;
							
							$("html,body").animate({
								scrollTop : one.offset().top - $(window).height() / 2 + one.height() / 2
							}, function () {
								$scope.$apply(function () {
									$scope.s.isAnimateNow = false;
								});
							})
						};
						
						$scope.reCalculatePositionOfFixedBar = function () {
							var bar = container.find(".gt-list-fix");
							
							bar.animate({
								top : ($(window).height() - 260) / 2,
								left : ($(window).width() - 1050) / 2 - 80
							});
						};
						$scope.reCalculatePositionOfFixedBar();
						
						/**
						* 计算滚动到哪一个区域了
						*/
						$scope.calculateWhichIndexNowWhenScroll = function () {
							var gtOneList = $("#gt-list-content .gt-one"),
								scrollTop = 0,
								i,
								offsetTop;
							$(window).on("aj.scroll", function () {
								calculate();
							})
							calculate();
							function calculate() {
								scrollTop = $(window).scrollTop();
								
								for (i = 0; i < gtOneList.length; i++) {
									offsetTop = gtOneList.eq(i).offset().top;
									if ((offsetTop < (scrollTop + $(window).height() / 2)) && (offsetTop + gtOneList.eq(i).height() > (scrollTop + $(window).height() / 2))) {
										$scope.$apply(function () {
											$scope.s.index = i + 0;
											$(window).trigger("aj.tbkitems.list.calculatePageOK");
										})
										break;
									}
								}
							}
						};
						
						var lastTimeChangePageDate = + new Date();
						$(window).on("aj.tbkitems.list.calculatePageOK", function () {
							// 防止快速滚动造成的多区域同时加载
							if (+ new Date() - lastTimeChangePageDate > 500) {
								lastTimeChangePageDate = + new Date();
								$scope.initBlock($scope.s.index);
							}
						})
						
						/**
						* 初始化某一个区域
						*/
						$scope.initBlock = function (index) {
							if (!$scope.isInit(index) && !$scope.s.isAnimateNow) {
								$scope.s.isInit["init" + index] = true;
								$scope.loadTbkItems(index, 1);
							}
						}
						/**
						* 判断某一个区域是否已经初始化
						*/
						$scope.isInit = function (index) {
							return $scope.s.isInit["init" + index] === true;
						}
						
						/**
						* 设置指定index区域当前显示的tbkitems集合
						*/
						$scope.setTbkItemsList = function (index, list) {
							$scope.s.tbkItems["key" + index] = list;
						}
						/**
						* 返回指定index区域当前显示的tbkitems集合
						*/
						$scope.getTbkItemsList = function (index) {
							var list = $scope.s.tbkItems["key" + index];
							return list === undefined ? [] : list;
						}
						
						/**
							1=>未初始化, 2=>已初始化,但是木有数据  3=>正常
						*/
						$scope.getStatus = function (index) {
							var list = $scope.s.tbkItems["key" + index];
							if (list === undefined) {
								return 1;
							} else {
								if (list.length === 0) {
									return 2;
								} else {
									return 3;
								}
							}
						}
						
						/**
						* 加载第index(from 0)区域, 并指定加载的页码
						*/
						$scope.loadTbkItems = function (index, page) {
							
							var goodsType = $scope.s.goodsTypeList[index],
								platform,
								data;
							if (tools.isWap()) {
								platform = 2;
							} else {
								platform = 1;
							}
							
							var params = $scope.s.curQueryParams[index];
							if (!params) {
								data = {
									plateForm :  platform,
									page : page,
									goodsTypeId : goodsType.id
								}
								$scope.s.curQueryParams[index] = data;
							}
							
							$.ajax({
								url : "/t/tbkQuery",
								data : {
									data : JSON.stringify(data)
								},
								type : "POST",
								dataType : "JSON",
								success : function (ar) {
									if (ar.isok) {
										console.log($scope.s.index);
										$scope.$apply(function () {
											$scope.setTbkItemsList(index, ar.data);
										})
									} else {
										tools.tishi("二货君出了一点点小问题,正在极力抢救~");
									}
								},
								error : function (err) {
									tools.tishi("加载商品出错~");
									console.log(err);
								}
							});
						};
						
						$(window).on("aj.resize", function () {
							$scope.reCalculatePositionOfFixedBar();
						});
						
					});
					
					angular.bootstrap(container, ["goodsTypeRollApp"]);
				});
			});
		});
	</script>
</div>

<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>