<%@page import="ajax.model.entity.Fragment.Type"%>
<%@page import="ajax.model.entity.Fragment"%>
<%@page import="ajax.model.safe.User"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="ajax.model.entity.ItemsRoll"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";



%>

<jsp:include page="views/includes/header.jsp"></jsp:include>



<div class="aj-body-left">
	<div ng-controller="mainController" id="container">
		<h3 ng-bind="s.title"></h3>
		<textarea rows="20"  style="border:1px solid #ccc;width:100%;" ng-model="s.content"></textarea>
		
		<button class="btn btn-default" ng-click="parse()">Parse</button>
		<button class="btn btn-default" ng-click="back()">BackUp</button>
		<button class="btn btn-success" ng-click="submit()">Submit</button>
		
		<div>
			支持javascript代码
		</div>
	</div>
	
	<script>
		var app = angular.module("linksToBaidu", []);
		var container = $("#container");
		
		app.controller("mainController", function ($scope) {
			$scope.s = {};
			$scope.s.title = "提交链接给百度";
			$scope.s.content = "";
			$scope.s.backup = "";
			
			$scope.parse = function () {
				var val = $scope.s.content;
				
				$scope.s.backup = val;
				$scope.s.content = eval(val);
				
			}
			
			$scope.back = function () {
				$scope.s.content = $scope.s.backup;
			}
			
			$scope.submit = function () {
				var arr = $scope.s.content.split("\n");
				
				arr = arr.filter(function (val) {
					return $.trim(val) != "";
				});
				
				var data = {
					links : []
				};
				
				arr.forEach(function (link) {
					data.links.push(link);
				});
				
				
				
				$.ajax({
					url : "/admin/linksToBaidu/submit",
					type : "POST",
					data : {
						"data" : JSON.stringify(data)
					},
					dataType : "json",
					success : function (json) {
						console.log(json);
					},
					error : function (err) {
						console.log(err);
					}
				});
			}
			
			
		});
		
		angular.bootstrap(container, ["linksToBaidu"]);
	</script>
	
</div>

<style>

</style>
<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="views/includes/footer.jsp"></jsp:include>
