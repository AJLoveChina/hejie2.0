<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String json = (String)request.getAttribute("model");
%>




<jsp:include page="/views/includes/header.jsp"></jsp:include>


<div class="aj-body-left">
	
<!-- BEGIN -->	
<style>
	body{
		background-image: url(/bg.jpg);
		background-position:728px 0;
		background-size: 1200px;
	}
	#game-team-editarea{
		position: relative;
		padding: 20px;
	}
	
	#game-team-editarea .one-card .icon{
		line-height: 100%;
		font-size:50px;
	}
	#game-team-editarea .one-card .info{
		padding: 0 10px;
	}
	#game-team-editarea .one-card .img-wrap{
		position:relative;
		height: 70%;
		width: 100%;
		padding: 10px;
		text-align: center;
	}
	
	#game-team-editarea .one-card .img{
		max-width: 100%;
		max-height: 100%;
	}
	#game-team-editarea .one-card{
		position: relative;
		width:100%;
		height: 400px;
		background-color:rgba(251, 251, 251, 0.3);
		border-radius: 2px;
		border:1px solid #999;
	}
</style>
<div id="game-team-editarea" ng-controller="mainController">
	<h3 ng-bind="title"></h3>
	
	<div class="in-wrap">
		<div class="one-card" ng-repeat="user in s.$users">
			<div class="img-wrap">
				<img class="img" src="/lol.jpg" />
			</div>
			<div class="info">
			
				<div class="input-group">
			      <span class="input-group-btn">
			        <button class="btn btn-default" type="button">昵称:</button>
			      </span>
			      <input class="form-control" ng-model="s.$users[$index].nick">
			    </div>
			    <div style="height:10px;"></div>
			    
				<div class="input-group">
			      <span class="input-group-btn">
			        <button class="btn btn-default" type="button">风格:</button>
			      </span>
			      <input class="form-control" ng-model="s.$users[$index].info">
			    </div>
				
			</div>
		</div>
		
		<div class="one-card">
			<span class="icon glyphicon glyphicon-plus"></span>
		</div>
	</div>
</div>	
<textarea style="display:none;" id="model"><%=json %></textarea>


<script>
	$(function () {
		var app = angular.module("gameTeam", []);
		var container = $("#game-team-editarea");
		var json = $("#model").val();
		app.controller("mainController", function ($scope) {
			$scope.title = "编辑面板";
			$scope.json = json;
			$scope.s = $.parseJSON(json);
			console.log($scope.s);
			
			
			$scope.bindEvent = function () {
				$("#game-team-editarea .in-wrap").slidesjs();
			}
			$scope.bindEvent();
			// AJ TODO
		});
		
		angular.bootstrap(container, ["gameTeam"]);
		
	})
	
</script>
	
	
<!-- END -->
</div>


<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
	
	<jsp:include page="/views/huodong/huodong.jsp"></jsp:include>
	
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
