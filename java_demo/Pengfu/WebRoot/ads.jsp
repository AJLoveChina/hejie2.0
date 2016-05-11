<%@page import="com.google.gson.Gson"%>
<%@page import="ajax.model.entity.ItemsRoll"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";


Integer pageIndex = (Integer)request.getAttribute("page");

List<ItemsRoll> itemsRolls = ItemsRoll.getList();

Gson gson = new Gson();
String json = gson.toJson(itemsRolls);

request.setAttribute("json", json);
request.setAttribute("itemsRolls", itemsRolls);
%>

<jsp:include page="views/includes/header.jsp"></jsp:include>

<style>
	#aj-ads-itemsRoll {
		position: relative;
		
	}
	#aj-ads-itemsRoll textarea{
		width:80px;
		height: 150px;
	}
	#aj-ads-itemsRoll .table {
		
	}
</style>

<div class="aj-body-left">

	<textarea id="item-json-data" class="aj-hide">
		<c:out value="${json }"></c:out>
	</textarea>
	
	
	<div id="aj-ads-itemsRoll" ng-controller="mainController">
		
		<button class="btn btn-default" ng-click="add()">添加</button>
		<table class="table">
			<tr>
				<td>ID</td>
				<td>title</td>
				<td>src</td>
				<td>itemId</td>
				<td>deleted</td>
				<td>rank</td>
				<td>Actions</td>
			</tr>
			<tr ng-repeat="one in s.list">
				<td>
					<textarea ng-model="one.id" disabled="disabled"></textarea>
				</td>
				<td>
					<textarea ng-model="one.title"></textarea>
				</td>
				<td>
					<textarea ng-model="one.src"></textarea>
				</td>
				<td>
					<textarea ng-model="one.itemId"></textarea>
				</td>
				<td>
					<textarea ng-model="one.deleted"></textarea>
				</td>
				<td>
					<textarea ng-model="one.rank"></textarea>
				</td>
				<td>
					<a href="javascript:;" ng-click="remove(one)">Delete</a><br>
					<a href="javascript:;" ng-click="update(one)">UPDATE</a><br>
					<a href="javascript:;" ng-click="save(one)" ng-if="one.id == 0">Save</a>
					
				</td>
			</tr>
		</table>
	</div>
	
	
	
	<script>
		$(function () {
			try {
				var app = angular.module("ads-itemRoll", []);
				var container = $("#aj-ads-itemsRoll");
				var list = JSON.parse($("#item-json-data").val());
				var url = "/ads";
				
				app.controller("mainController", function ($scope) {
					$scope.s = {};
					$scope.s.title = "Hello World!";
					$scope.s.list = list;
					
					
					$scope.remove = function (one) {
						one.deleted = true;
						
						$.ajax({
							url : url + "?action=delete",
							data : {
								model : JSON.stringify(one)
							},
							dataType : "json",
							type : "POST",
							success : function (data) {
								if(data.isok) {
									location.reload();
								} else {
									aj.Tishi(data.data);
								}
							},
							error : function (err) {
								console.log(err);
							}
						});
					}
					
					$scope.update = function (one) {
						$.ajax({
							url : url + "?action=update",
							data : {
								model : JSON.stringify(one)
							},
							type : "POST",
							dataType : "json",
							success : function (data) {
								if(data.isok) {
									location.reload();
								} else {
									aj.Tishi(data.data);
								}
							},
							error : function (err) {
								console.log(err);
							}
						});
					}
					
					$scope.save = function (one) {
						$.ajax({
							url : url + "?action=save",
							data : {
								model : JSON.stringify(one)
							},
							type : "POST",
							dataType : "json",
							success : function (data) {
								if(data.isok) {
									location.reload();
								} else {
									aj.Tishi(data.data);
								}
							},
							error : function (err) {
								console.log(err);
							}
						});
					}
					
					$scope.add = function () {
						$scope.s.list.unshift({
							id : 0,
							title : "",
							src : "",
							itemId : "",
							deleted : false,
							rank : 1
						});
					}
				});
				
				angular.bootstrap(container, ["ads-itemRoll"]);
			}catch(ex) {
				console.log(ex);
			}
		})
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
