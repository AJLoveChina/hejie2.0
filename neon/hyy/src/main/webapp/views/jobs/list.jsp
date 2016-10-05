<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
	<div id="jobs-list-container" ng-controller="mainController" ng-cloak>
		<h3>{{s.title}}</h3>
		<table class="table">
			<tr>
				<th>name</th>
				<th>group</th>
				<th>info</th>
				<th>Status</th>
				<th>Options</th>
			</tr>
			<tr ng-repeat="item in s.list">
				<td>{{item["name"]}}</td>
				<td>{{item["group"]}}</td>
				<td>{{item["info"]}}</td>
				<td>{{item["status"]}}</td>
				<td>
					<a class="btn" ng-click="startJob($index)">Start</a>
					<a class="btn">pause</a>
				</td>
			</tr>
		</table>
	</div>
	
	<script>
		$(function () {
			var container = $("#jobs-list-container");
			var app = angular.module("jobs-app", []);
			
			app.controller("mainController", function ($scope, $http) {
				$scope.s = {};
				$scope.s.title = "Jobs List";
				$scope.s.list = [];
				
				$scope.refreshList = function () {
					$http({
						method : "GET",
						url : "/jobs/jobsInfo/list"
					}).then(function (response) {
						if (response.data.isok) {
							$scope.s.list = response.data.data;
						}
					});
				}
				$scope.refreshList();
				
				$scope.startJob = function (i) {
					
					$.ajax({
						type : "POST",
						url : "/jobs/resume",
						data : {
							data : JSON.stringify($scope.s.list[i])
						},
						success : function () {
							
						}
					});
				}
				
			});
			
			angular.bootstrap(container, ["jobs-app"]);
			
		});
	</script>
		
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
