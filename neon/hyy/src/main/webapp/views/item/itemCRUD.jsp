<%@page import="ajax.model.entity.Item"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Item item = (Item) request.getAttribute("model");
String json = item.toJson();
%>


<textarea id="item-json" class="aj-hide">
	<%=json %>
</textarea>

<style>
	textarea{
		border:1px solid #ccc;
		width:100%;padding: 10px;
		min-height: 100px;
		max-height: 500px;
	}
	#aj-item-modify .title{
		line-height: 25px;
		font-size: 20px;
		
	}
</style>

<div id="aj-item-modify" ng-controller="mainController">
	<div class="block" ng-repeat="(key, value) in s" style="padding: 5px 0;">
		
		<div ng-switch on="key">
		    <div ng-switch-when="content">
		        <div class="title">
		        	<span ng-bind="key"></span>
		        	该内容编辑请点击<a href="#content-container">这里</a>
		        </div>
				<textarea disabled rows="" cols="" ng-model="s[key]"></textarea>
		    </div>
		    
		    <div ng-switch-when="backgroundInformation">
		        <div class="title">
		        	<span ng-bind="key"></span>
		        </div>
				<textarea rows="" cols="" ng-model="s[key]"></textarea>
		    </div>
		    
		    <div ng-switch-when="itype">
		    	<div class="title">
		        	<span ng-bind="key"></span>
		        </div>
		    	<select ng-model="s[key]">
		    		<c:forEach items="${jokeTypes }" var="jokeType">
		    			<option value="${jokeType.getId() }">
		    				${jokeType.getRealName() }
		    			</option>
		    		</c:forEach>
		    	</select>
		    </div>
		    
		    
		    <div ng-switch-default>
		       	<div class="title" ng-bind="key"></div>
		       	<input type="text" class="form-control" ng-model="s[key]" />
		    </div>
		</div>

	</div>
	
	<button class="btn btn-success" ng-click="submit()">提交或更新</button>
	<button class="btn btn-danger" ng-click="remove()" ng-if="s.id > 0">删除</button>
	<span ng-show="isAjax">正在发送请求,请勿重复点击..</span>
</div>

<h2>内容编辑</h2>
<script id="content-container" name="content" type="text/plain"></script>

<script type="text/javascript" src="/ueditor/ueditor.config.js"></script>
<!-- <script type="text/javascript" src="/xxx/ueditor/ueditor.config.js"></script> -->

<script type="text/javascript" src="http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js"></script>



<script>
	$(function () {
		try {
			var item = JSON.parse($("#item-json").val());
			
			var app = angular.module("item-modify-m", []);
			var div = $("#aj-item-modify");
			var ue = UE.getEditor('content-container');
			
			
			ue.ready(function() {
			    ue.setContent(item.content);
			    var html = ue.getContent();
			    var txt = ue.getContentTxt();
			});

			app.controller("mainController", function ($scope, $http) {
				$scope.s = {};
				$scope.s = item;
				$scope.isAjax = false;
				
				
			
				$scope.submit = function () {
					if ($scope.isAjax) {
						aj.tishi("请勿重复点击");
						return;
					}
					$scope.s.content = ue.getContent();
					$scope.isAjax = true;
					$.ajax({
						url : "/admin/upload/submit", 
						data : {
							item : JSON.stringify($scope.s)
						},
						type : "POST",
						dataType : "json",
						success : function (data) {
							if (data.isok) {
								aj.tishi(data.data);
							} else {
								aj.tishi("Error" + data.data);
							}
						},
						error : function (er) {
							aj.tishi("Http Error" + er);
						},
						complete : function () {
							$scope.$apply(function () {
								$scope.isAjax = false;
							});
						}
					});
				}
				
				$scope.remove = function () {
					if ($scope.isAjax) {
						aj.tishi("请勿重复点击");
						return;
					}
					if (window.confirm("确定删除")) {
						$scope.isAjax = true;
						$.ajax({
							url : "/admin//upload/remove", 
							data : {
								item : JSON.stringify($scope.s)
							},
							type : "POST",
							dataType : "json",
							success : function (data) {
								console.log(data);
							},
							error : function (er) {
								console.log(er);
							},
							complete : function () {
								$scope.$apply(function () {
									$scope.isAjax = false;
								});
							}
						});
					}
					
				}
			})
			angular.bootstrap(div, ["item-modify-m"]);
		}catch(ex) {
			console.log(ex);
		}
	})
</script>