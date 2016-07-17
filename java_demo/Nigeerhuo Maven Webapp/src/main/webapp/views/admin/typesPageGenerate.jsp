<%@page import="ajax.model.entity.Page"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

int num = Page.$num;

%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<div ng-controller="mainController" id="container">
		<p ng-show="info.isAjax">正在查询.. 请勿重复点击</p>
		1.<button class="btn btn-default" ng-click="generateAll()">全部种类递增一页</button>
		<p>你可以选择循环多少次</p>
		<input type="text" class="form-control" ng-model="info.loop"/>
		
	</div>
	
	<script>
		$(function () {
			var app = angular.module("typesPageGenerate", []);
			var container = $("#container");
			
			app.controller("mainController", function ($scope, $http) {
				$scope.info = {};
				$scope.info.isAjax = false;
				$scope.info.loop = 1;
			
				$scope.generateAll = function () {
					$scope.info.isAjax = true;
					$http({
						method : "post",
						headers: {'Content-Type': 'application/x-www-form-urlencoded'},
						data : $.param({
							loop : $scope.info.loop
						}),
						url : "/admin/typePages/generate"
					}).then(function (res) {
							var props = res.data.data;
							var strArr = [];
							for (var key in props) {
								if (props[key]) {
									strArr.push(key + "=" + props[key]);
								} else {
									strArr.push(key + "=" + "<span style='color:red'>" + props[key] + "</span>");
								}
							}
							
							aj.tishi(strArr.join("<br>"));
							$scope.info.isAjax = false;
					}, function (res) {
						console.log(res);
						aj.tishi("ERROR");
						$scope.info.isAjax = false;
					});
				}
			});
			
			angular.bootstrap(container, ["typesPageGenerate"]);
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
