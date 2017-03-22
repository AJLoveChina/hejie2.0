<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script>
$(function () {
	require(["main"], function () {
		require([], function () {
			var container = $("#coupons-container");
			var app = angular.module("coupons-app", []);
			
			app.controller("list", ["$scope", "$rootScope", function ($scope, $rootScope) {
				$scope.s = {};
				$scope.s.coupons = [];
				$scope.s.curPage = 1;
				$scope.s.isLoading = false;
				
				
				$rootScope.$on("aj.loadNextPage", function () {
					if ($scope.s.isLoading) return;
					$scope.s.isLoading = true;
					$.ajax({
						url : "/t/coupons_ajax",
						type : "GET",
						data : {page : $scope.s.curPage + 1},
						dataType : "json",
						success : function (ar) {
							if (ar.isok && ar.data.length > 0) {
								$scope.$apply(function () {
									$scope.s.coupons = $scope.s.coupons.concat(ar.data);
									$scope.s.curPage += 1;
									
									$rootScope.$emit("aj.loadOK");
								})
							}
						},
						error : function (err) {
							
						},
						complete : function () {
							$scope.$apply(function () {
								$scope.s.isLoading = false;
							})
						}
					})
				})
			}])
			
			app.controller("clickNext", ["$scope", "$rootScope", function ($scope, $rootScope) {
				$scope.s = {};
				$scope.s.isLoading = false;
				
				$scope.goNext = function () {
					if ($scope.s.isLoading) return;
					$scope.s.isLoading = true;
					$rootScope.$emit("aj.loadNextPage");
				}
				
				$rootScope.$on("aj.loadOK", function () {
					$scope.s.isLoading = false;
					$rootScope.$emit("aj.ajaxIncreasePage");
				})

				$rootScope.$on("aj.ajaxIncreasePage", function () {
					$(".ajs-page-choices-v4-ul").trigger("aj.ajaxIncreasePage");
				});
			}])
			
			angular.bootstrap(container, ["coupons-app"]);
		})
	})
})
</script>