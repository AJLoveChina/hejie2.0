<%@page import="ajax.model.UrlRoute"%>
<%@ page language="java"  pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
<div id="admin-list-container" ng-controller="listController">

	<ol class="list-group" ng-cloak>
		<li ng-repeat="item in s.list" class="list-group-item">
			<span>{{$index + 1}}.</span>
			<a href="{{item['href']}}">{{item["text"]}}</a>
		</li>
	</ol>

</div>
	
</div>

<script>
	$(function () {
		require(["main"], function () {
			require(["tools/tools"], function (tools) {
				
				var container = $("#admin-list-container")
				var app = angular.module("admin-list", []);
				
				app.controller("listController", function ($scope) {
					
					$scope.s = {};
					$scope.s.list = [{
						href : "<%=UrlRoute.ADMIN_HOME_ROLLADS_MANAGEMENT_URL.getUrl() %>",
						text : "首页滚动广告管理"
					}, {
						href : "/admin/homeNavThree",
						text : "首页三个侧栏广告"
					}, {
						href : "/admin/upload",
						text : "上传新的Item/编辑已有的item"
					}, {
						href : "/admin/item/changepage",
						text : "将某一个item从页面中删除, 并用另一个item替换"
					}, {
						href : "/admin/linksToBaidu",
						text : "提交链接给百度"
					}, {
						href : "/admin/pageGenerator",
						text : "生成新的页面"
					}, {
						href : "http://www.iconfont.cn/users/27262/project?spm=a313x.7781069.0.0.pVMM8tr",
						text : "font icons图标管理"	
					}, {
						href : "http://v3.bootcss.com/components/",
						text : "Bootstrap icon图标管理"
					}, {
						href : "/admin/typePages",
						text : "Type pages generate"
					}, {
						href : "<%=UrlRoute.ADMIN_TBKITEMS_MANAGEMENT_URL.getUrl() %>",
						text : "Tbk items change to Item"
					}, {
						href : "<%=UrlRoute.ADMIN_ITAOBAO_MANAGEMENT_URL.getUrl() %>",
						text : "ITaobao items change to Item"
					}, {
						href : "<%=UrlRoute.ADMIN_GAME_TEAM_GENERATE_URL.getUrl() %>",
						text : "ADMIN_GAME_TEAM_GENERATE_UR"
					}, {
						href : "/jobs/list",
						text : "jobs/list"
					}, {
						href : "/admin/views/auto/ajAddComment",
						text : "aj add comment"
					}, {
						href : "/admin/views/auto/readTbkItemsFromExcel_VIEW",
						text : "readTbkItemsFromExcel_VIEW"
					}];
				});
				
				
				angular.bootstrap(container, ["admin-list"]);
				
			});
		});
	});
</script>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
