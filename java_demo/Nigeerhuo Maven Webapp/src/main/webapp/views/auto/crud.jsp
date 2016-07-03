<%@page import="com.google.gson.Gson"%>
<%@page import="ajax.model.entity.Page"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

int num = Page.$num;
CRUDPage cp = (CRUDPage)request.getAttribute("model");

Gson gson = new Gson();
String json = gson.toJson(cp);

%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>

<script type="text/javascript">
	$(function () {
		try {
			var json = $("#aj-crud-textarea").val();
			
			var container = $("#aj-crud-container");
			var app = angular.module("app", []);
			app.controller("mainController", function ($scope, $http) {
				$scope.s = {};
				$scope.s = $.parseJSON(json);
			
			
				$scope.save = function () {
					
					$.ajax({
						type : "POST",
						url  : "/admin/crudForTable",
						data : {
							data : JSON.stringify($scope.s),
							"className" : $.trim($scope.s.className)
						},
						dataType : "json",
						success : function  (json) {
							aj.Tishi("Success");
						},
						error : function () {
							aj.Tishi("Error!");
						}
					});
				}
			});
			
			angular.bootstrap(container, ["app"]);
		
		}catch(ex) {}
	
	});

</script>


<div class="aj-body-left">
	<div ng-controller="mainController" id="aj-crud-container">
		<table class="table">
			<tr>
				<th ng-repeat="(key, value) in s.list[0]">
					<span ng-bind="key"></span>
				</th>
			</tr>
			<tr ng-repeat="item in s.list"  ng-init="sectionIndex = $index">
				<td ng-repeat="(key,value) in item">
					<input class="form-control" ng-model="s.list[sectionIndex][key]"/>
				</td>
			</tr>		
		</table>
		
		<button class="btn btn-default" ng-click="save()">Save</button>
	</div>
	
	<textarea id="aj-crud-textarea" style="display: none;">
		<%=json %>
	</textarea>

</div>


	
	
<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>
