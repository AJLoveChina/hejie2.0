<%@ page language="java"  pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>





<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
	<div id="changepage-container" ng-controller="mainController">
		<h3 ng-bind="s.title"></h3>
		<div>
			要被删除item的id
			<input type="text" class="form-control" ng-model="s.id1"/>
		</div>
		
		<div>
			替换删除item的新item的id
			<input type="text" class="form-control" ng-model="s.id2"/>
		</div>
		
		<button class="btn btn-error" ng-click="submit()">确认修改</button>
	</div>
	
	<script>
		var container = $("#changepage-container");
		
		var app = angular.module("app", []);
		
		app.controller("mainController", function ($scope) {
			$scope.s = {};
			$scope.s.title = "将一个item从它现在的页面删除, 并用另一个item替换它";
			$scope.s.id1 = "";
			$scope.s.id2 = "";
			
			$scope.submit = function () {
				$.ajax({
					url : "/admin/item/changepage/ajax",
					type : "POST",
					data : {
						id1 : $scope.s.id1,
						id2 : $scope.s.id2
					},
					success : function (json) {
						try {
							aj.Tishi(json.data);
						}catch(ex) {
							aj.Tishi("JSON 解析错误.");	
						}
					},
					error : function (err) {
						aj.Tishi(err);
					}
				})
			}
		
		})
		angular.bootstrap(container, ["app"]);
	</script>
	
	
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<jsp:include page="/views/includes/footer.jsp"></jsp:include>
