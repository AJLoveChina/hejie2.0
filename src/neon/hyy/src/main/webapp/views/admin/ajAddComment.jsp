<%@page import="ajax.model.entity.Page"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<div ng-controller="mainController" id="add-comm-container">
		<h4>GroupId:</h4>
		<input type="text" ng-model="s.groupid" class="form-control"/>
		<h4>Userid:</h4>
		<input type="text" ng-model="s.userid" class="form-control"/>
		<h4>Content:</h4>
		<textarea ng-model="s.content" class="form-control"></textarea>
		<button class="btn btn-default" ng-click="submit()">submit</button>
		
	</div>
	
	<script>
		$(function () {
			require(["main"], function () {
				require(["tools/tools"], function (tools) {
					var container = $("#add-comm-container"),
					app = angular.module("addCommMoudle", []);
				
					app.controller("mainController", function ($scope) {
						$scope.s = {
								groupid : "",
								userid : "",
								content : ""
						};
						
						$scope.submit = function () {
							$.ajax({
								url : "/admin/ajAddComment",
								data : $scope.s,
								type : "POST",
								dataType : "JSON",
								success : function (ar) {
									tools.tishi(ar.data);
								},
								error : function (err) {
									tools.tishi("error : " + err);
								}
							});
						}
						
					})
					
					angular.bootstrap(container, ["addCommMoudle"]);
				})
			})
		})
	</script>
</div>

<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>
