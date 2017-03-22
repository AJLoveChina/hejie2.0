<%@page import="ajax.model.entity.Blog"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

List<Blog> blogs = (List<Blog>)request.getAttribute("blogs");

%>


<jsp:include page="/views/includes/header.jsp"></jsp:include>

<jsp:include page="/views/blogs/style.jsp"></jsp:include>
<script>
$(function () {
	$(".blogs-list").on("click", ".show-detail", function () {
		if ($(this).siblings(".content").is(":hidden")) {
			$(this).find(".d-info").text("Hide Detail");
		} else {
			$(this).find(".d-info").text("Show Detail");
		}
		$(this).siblings(".content").toggle();
	})
	
	/* var container = $(document.body);
	var app = angular.module("blogModule", ["ngRoute"]);
	var path = location.pathname;
	if (path === "/") {
		path = "";
	}
	app.constant("prePath", path);
	app.config(function ($routeProvider, $locationProvider, prePath) {
		$locationProvider.html5Mode(true);
		
		$routeProvider.when(prePath + "/#/page/:page",{
			templateUrl : "/views/blogs/blog-one.html"
		})
		$routeProvider.otherwise({
			templateUrl : "/views/blogs/blog-one.html"
		});
		
	}).controller("listController", function ($scope, $location, $routeParams) {
		$scope.s = {};
		$scope.s.title = "Hello";
		$scope.changePage = function (page) {
			$location.path("/#/page/" + page);
		}
		$scope.$on("$routeChangeSuccess", function () {
			if ($location.path().indexOf("/#/page/") == 0) {
				var page = $routeParams["page"];
				console.log(page);
			}
		});
	}); */
	//angular.bootstrap(container, ["blogModule"]);
	
});
</script>
<div class="row" ng-controller="listController">
	<div class="col-md-8 col-xs-12">
		
		<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
		<div class="blogs-list">
			
			<c:if test="${blogs.size() == 0 }">
				<p style="text-align:center;">亲, 木有更多了...</p>
			</c:if>
			<c:forEach var="blog" items="${blogs }">
				<c:set scope="request" var="item" value="${blog }" />
				<c:import url="/views/blogs/blog_iterator.jsp"></c:import>
			</c:forEach>
			
			<div ng-view></div>
		</div>
		
		<jsp:include page="/views/includes/PageChoice_v4.jsp"></jsp:include>
	</div>
	
	
	<div class="col-md-4 col-xs-12">
		<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
		
		<div class="aj-bloger-info">
		
			<div class="panel panel-default">
			  <div class="panel-heading">关于我:</div>
			  <div class="panel-body">
			  	<img src="http://nigeerhuo-public.img-cn-shanghai.aliyuncs.com/images/blogs/hejie.jpg@!w190" />
			  	<div style="text-align:center;font-size:12px;padding:5px 0;">
			  		北冥有鱼, 其名为鲲. 鲲之大, 不知其千里.
			  	</div>
			   	<div class="icons">
					<a href="https://github.com/AJLoveChina" target="_blank" title="我的Github">
						<span class="aj-icon aj-icon-github"></span>
					</a>
					
					<a href="https://www.zhihu.com/people/he-jie-37-25" target="_blank" title="我的知乎">
						<span class="aj-icon aj-icon-zhihu" style="position:relative;top:2px;"></span>
					</a>
				</div>
			  </div>
			</div>
					
			<div class="panel panel-default">
			  <div class="panel-heading">项目经历:</div>
			  <div class="panel-body">
			   <ul class="list-group my-projects">
				  <li class="list-group-item list-group-item-success">
				  	<a href="http://nigeerhuo.com" target="_blank">你个二货(业余时间和同学合作开发, 我负责前端架构与服务端爬虫模块)</a>
				  </li>
				  <li class="list-group-item list-group-item-info">
				  	<a href="http://oshjf.com" target="_blank">老爸店铺的网站(独立开发)</a>
				  </li>
				</ul>
			  </div>
			</div>
			
		</div>
		
		
		<div class="aj-comment-ui-area" data-grounp-id="ajax.model.entity.Blog-comments-of-hejie" data-title-value="说点什么吧:"></div>
		
	</div>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
