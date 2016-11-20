<%@page import="ajax.model.taobao.model.TbkItem"%>
<%@page import="ajax.model.entity.Page"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	<h3>请将excel文件放在C盘   <code><%=TbkItem.EXCEL_FILE_PATH_PREFIX %></code> 目录下, 并提供文件名(文件名不要出现中文等), 程序将自动读取并保存里面的优惠券和单品信息.</h3>
	<p>提交后请不要操作, 因为数据量较大(10000条tbkitempc, tbkitemwap以及coupon, 对于每条信息还要想taobao还要http请求一次获取更多信息,所以请关闭页面就好, 或者不关闭等待执行结果(这可能需要一杯咖啡的时间))</p>
	<div id="container" ng-controller="mainController">
		
		
		文件名: <input type="text" class="form-control" ng-model="filename">
		<button class="btn btn-default" ng-click="submit()">提交</button>
		
		<h3 ng-if="isAjax">is loading now, do not click again.!!</h3>
	</div>
	<script>
		$(function () {
			var container = $("#container"),
				app = angular.module("tbkItemExcel", []);
			app.controller("mainController", function ($scope) {
				$scope.isAjax = false;
				$scope.filename = "";
				
				$scope.submit = function() {
					if ($scope.isAjax) return;
					$scope.isAjax = true;
					$.ajax({
						url : "/admin/readTbkItemsFromExcel",
						type : "GET",
						data : {
							filename : $scope.filename
						},
						success : function (res) {
							console.log(res);
						},
						error : function (err) {
							console.log(err);
						},
						complete : function () {
							$scope.$apply(function () {
								$scope.isAjax = false;
							})
						}
					})
				}
			})
			angular.bootstrap(container, ["tbkItemExcel"]);
		})
	</script>
	
</div>

<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>
