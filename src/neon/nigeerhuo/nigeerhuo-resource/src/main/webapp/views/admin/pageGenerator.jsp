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
	
	<div id="aj-generate-new-page-container" ng-controller="mainController">
		<span ng-show="s.isajax">正在发送请求,请勿重复点击...</span>
	
		<h2>1.系统随机生成<%=num %>个item组成的页面</h2>
		<button class="btn btn-default" ng-bind="s.title" ng-click="generate()">Confirm Dialog</button>
		
		
    	<h2>2.手动提供几个item的id, 不足<%=num %>个,系统自动补齐</h2>
    	<p ng-bind="s.tishi"></p>
    	<input ng-model="s.textarea" class="form-control" />
    	<br>
    	<button class="btn btn-default" ng-click="generate2()">生成新的一页</button>
    	
    	
    	<div ng-bind="s.response"></div>
	</div>
	
	
	<script type="text/javascript">
		$(function () {
		
			require(["main"], function () {
				require(["tools/tools"], function (tools) {
					var container = $("#aj-generate-new-page-container");
					
					var app = angular.module("app", []);
					
					app.controller("mainController", function ($scope, $http) {
						$scope.s = {};
						$scope.s.title = "生成新的一页";
						$scope.s.tishi = "请以逗号分开";
						$scope.s.isajax = false;
						
						$scope.s.response = "";
						
						$scope.generate = function () {
							if ($scope.s.isajax) {
								tools.tishi("请求正在执行中,请勿重复点击");
								return;
							}
						
							$scope.s.isajax = true;
							
							
							$http({
								"method" : "GET",
								"url" : "/admin/pageGenerator/generate"
							}).then(function (response) {
								
								$scope.s.response = response.data.data;
								
								$scope.s.isajax = false;
								
							}, function (err) {
								$scope.s.response = "Error occurs!";
								$scope.s.isajax = false;
							});
						}
						
						$scope.generate2 = function () {
						
							if ($scope.s.isajax) {
								tools.tishi("请求正在执行中,请勿重复点击");
								return;
							}
						
							$scope.s.isajax = true;
							
							var arr = $.trim($scope.s.textarea).split(",");
							
							arr.forEach(function (item, index, list) {
								list[index] =  $.trim(item);
							});
							
							$http({
								"method" : "GET",
								"url" : "/admin/pageGenerator/generate",
								"params" : {
									data : JSON.stringify(arr)
								}
							}).then(function (response) {
							
								$scope.s.response = response.data.data;
								$scope.s.isajax = false;
								
							}, function (err) {
								console.log(err);
								$scope.s.isajax = false;
								tools.tishi("Error!");
							});
						}
						   	
					});
			
					angular.bootstrap(container, ["app"]);	
				})
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
