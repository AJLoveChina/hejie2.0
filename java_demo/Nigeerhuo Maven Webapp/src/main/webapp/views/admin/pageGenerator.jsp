<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
	<div id="aj-generate-new-page-container" ng-controller="mainController">
		<button class="btn btn-default" ng-bind="s.title" ng-click="generate()">Confirm Dialog</button>
		
		<div ng-bind="s.response"></div>
    
	</div>
	
	
	<script type="text/javascript">
		$(function () {
		
				var container = $("#aj-generate-new-page-container");
			
				var app = angular.module("app", []);
				
				app.controller("mainController", function ($scope, $http) {
					$scope.s = {};
					$scope.s.title = "生成新的一页";
					
					$scope.s.response = "";
					
					$scope.generate = function () {
						$http({
							"method" : "GET",
							"url" : "/generate"
						}).then(function (response) {
							
							$scope.s.response = response.data.data;
							
						}, function (err) {
							$scope.s.response = "Error occurs!";
						});
					}
					   	
				});
		
				angular.bootstrap(container, ["app"]);
				
				
			try {
				
			
			
			}catch(e) {
				console.log(e);
			
			}
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
