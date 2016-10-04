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


Integer pageIndex = (Integer)request.getAttribute("page");

List<ItemsRoll> itemsRolls = ItemsRoll.getList();
List<Fragment> fragments = Fragment.getFragments(Type.HOME_PAGE_THREE_ADS);


Gson gson = new Gson();
String json = gson.toJson(itemsRolls);

request.setAttribute("json", json);
request.setAttribute("itemsRolls", itemsRolls);
request.setAttribute("fragments", fragments);


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
	
	<textarea id="fragments-json-data" rows="" cols="" class="aj-hide">
		<c:out value="${fragments }"></c:out>
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
			require(["main"], function () {
				require(["tools/tools"], function (tools) {
					
					var app = angular.module("ads-itemRoll", []);
					var container = $("#aj-ads-itemsRoll");
					var list = JSON.parse($("#item-json-data").val());
					var url = "/admin/ads";
					
					app.controller("mainController", function ($scope) {
						$scope.s = {};
						$scope.s.title = "Hello World!";
						$scope.s.list = list;
						
						
						$scope.remove = function (one) {
							one.deleted = true;
							
							$.ajax({
								url : url + "/delete",
								data : {
									model : JSON.stringify(one)
								},
								dataType : "json",
								type : "POST",
								success : function (data) {
									if(data.isok) {
										location.reload();
									} else {
										tools.tishi(data.data);
									}
								},
								error : function (err) {
									console.log(err);
								}
							});
						}
						
						$scope.update = function (one) {
							$.ajax({
								url : url + "/update",
								data : {
									model : JSON.stringify(one)
								},
								type : "POST",
								dataType : "json",
								success : function (data) {
									if(data.isok) {
										location.reload();
									} else {
										tools.tishi(data.data);
									}
								},
								error : function (err) {
									console.log(err);
								}
							});
						}
						
						$scope.save = function (one) {
							$.ajax({
								url : url + "/save",
								data : {
									model : JSON.stringify(one)
								},
								type : "POST",
								dataType : "json",
								success : function (data) {
									if(data.isok) {
										location.reload();
									} else {
										tools.tishi(data.data);
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
					
				});
			});
		})
	</script>
	
</div>

<style>

</style>
<div class="aj-body-right">
	<jsp:include page="views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
