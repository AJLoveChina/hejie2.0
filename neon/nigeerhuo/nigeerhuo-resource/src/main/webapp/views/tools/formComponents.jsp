<%@page import="ajax.model.taobao.model.TbkItem"%>
<%@page import="ajax.model.entity.Item"%>
<%@page import="ajax.model.safe.User"%>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String json  = (String) request.getAttribute("formComponentsJson");
%>

<jsp:include page="/views/includes/header.jsp"></jsp:include>
<script type="text/javascript" src="/ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="http://apps.bdimg.com/libs/ueditor/1.4.3.1/ueditor.all.min.js"></script>

<div class="aj-body-left">


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
	<div class="block" ng-repeat="(key, component) in s.components" style="padding: 5px 0;">
		
		<div ng-switch on="component.type.toUpperCase()">
		    <div ng-switch-when="TEXT" ng-show="{{!component.isHidden}}">
		        <div class="title">
		        	<span ng-bind="component.desc || component.name"></span>
		        </div>
				<input type="text" ng-disabled="component.isDisabled" class="form-control" ng-model="component.value" name="component.name" />
		    </div>
		    
		    <div ng-switch-when="TEXTAREA">
		        <div class="title">
		        	<span ng-bind="component.desc || component.name"></span>
		        </div>
				<textarea rows="" cols="" ng-disabled="component.isDisabled" class="form-control" ng-model="component.value" name="component.name"></textarea>
		    </div>
		    
		    <div ng-switch-when="UEDITOR">
		        <div class="title">
		        	<span ng-bind="component.desc || component.name"></span>
		        </div>
		        <span ng-show="!component.hasLoaded">
		        	您的超级无敌编辑器正在初始化~~
		        </span>
				<textarea style="display:none;" rows="" cols="" ng-disabled="component.isDisabled" class="form-control" ng-model="component.value" name="component.name"></textarea>
				<script id="{{getUeditorIDValueByName(component.name)}}" name="content" type="text/plain"></script>
		    </div>
		    
		    <div ng-switch-when="LINK">
		        <div class="title">
		        	<span ng-bind="component.desc || component.name"></span>
		        </div>
		        <a ng-href="{{component.value}}" target="_blank" ng-bind="component.value"></a>
		    </div>
		    
		    <div ng-switch-when="IMAGE">
		        <div class="title">
		        	<span ng-bind="component.desc || component.name"></span>
		        </div>
		        <img ng-src="{{component.value}}" style="max-width:300px;max-height:300px;"/>
		    </div>
		    
		    <div ng-switch-default>
		        <div class="title">
		        	<span ng-bind="component.desc || component.name"></span>
		        </div>
				<input type="text" ng-disabled="component.isDisabled" ng-model="component.value" class="form-control" name="component.name" />
		    </div>
		</div>

	</div>
	
	<button class="btn btn-success" ng-click="submit()">提交或更新</button>
	<button class="btn btn-danger" ng-click="remove()" ng-if="s.id > 0">删除</button>
	<span ng-show="isAjax">正在发送请求,请勿重复点击..</span>
</div>



<script>
	$(function () {
		require(["main"], function () {
			require(["tools/tools"], function (tools) {
				var item = JSON.parse($("#item-json").val());
				
				console.log(item);
				var app = angular.module("item-modify-m", []);
				var div = $("#aj-item-modify");
				//var ue = UE.getEditor('content-container');
				
				
				/* ue.ready(function() {
				    ue.setContent(item.content);
				    var html = ue.getContent();
				    var txt = ue.getContentTxt();
				}); */

				app.controller("mainController", function ($scope, $http) {
					$scope.s = {};
					$scope.s = item;
					$scope.isAjax = false;
					
					
					$scope.getUeditorIDValueByName = function (name) {
						return "content-container-" + name;
					}
					
					$scope.dealUEDITORComponent = function () {
						for (var i = 0; i < $scope.s.components.length; i++) {
							if ($scope.s.components[i].type.toUpperCase() === "UEDITOR") {
								(function (index) {
									var id = $scope.getUeditorIDValueByName($scope.s.components[i].name);
									var ue = UE.getEditor(id, {
										toolbars: [
										    [
										        'anchor', //锚点
										        'undo', //撤销
										        'redo', //重做
										        'bold', //加粗
										        'indent', //首行缩进
										        'italic', //斜体
										        'underline', //下划线
										        'strikethrough', //删除线
										        'subscript', //下标
										        'superscript', //上标
										        'formatmatch', //格式刷
										        'source', //源代码
										        'blockquote', //引用
										        'pasteplain', //纯文本粘贴模式
										        'selectall', //全选
										        'horizontal', //分隔线
										        'removeformat', //清除格式
										        'insertcode', //代码语言
										        'simpleupload' //单图上传
										    ],
										    [
										    	'emotion', //表情
										        'spechars', //特殊字符
										        'justifyleft', //居左对齐
										        'justifyright', //居右对齐
										        'justifycenter', //居中对齐
										        'justifyjustify', //两端对齐
										        'forecolor', //字体颜色
										        'insertorderedlist', //有序列表
										        'insertunorderedlist', //无序列表
										        'fullscreen', //全屏
										        'directionalityltr', //从左向右输入
										        'directionalityrtl', //从右向左输入
										        'insertvideo' //视频
										    ]
										]
									});
									var value = $scope.s.components[i].value;
									ue.ready(function () {
										$scope.$apply(function () {
											$scope.s.components[index].hasLoaded = true;
										});
										ue.setContent(value);
									});
									
									ue.addListener("selectionchange", function(){
										$scope.$apply(function () {
											$scope.s.components[index].value = ue.getContent();
										});
									})
								})(i);
							}
						}
					}
					$scope.dealUEDITORComponent();
					
					$scope.submit = function () {
						if ($scope.isAjax) {
							tools.tishi("请勿重复点击");
							return;
						}
						
						var entity = {};
						
						for (var i = 0; i < $scope.s.components.length; i++) {
							entity[$scope.s.components[i].name] = $scope.s.components[i].value;
						}
						
						// $scope.s.content = ue.getContent();
						$scope.isAjax = true;
						$.ajax({
							url : $scope.s.urlSubmit, 
							data : {
								entity :  JSON.stringify(entity),
								item : JSON.stringify($scope.s)
							},
							type : "POST",
							dataType : "json",
							success : function (data) {
								if (data.isok) {
									tools.tishi(data.data);
								} else {
									tools.tishi("Error" + data.data);
								}
							},
							error : function (er) {
								tools.tishi("Http Error" + er);
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
							tools.tishi("请勿重复点击");
							return;
						}
						if (window.confirm("确定删除")) {
							$scope.isAjax = true;
							$.ajax({
								url : $scope.s.urlRemove, 
								data : {
									item : JSON.stringify($scope.s)
								},
								type : "POST",
								dataType : "json",
								success : function (data) {
									tools.tishi(data.data);
								},
								error : function (er) {
									tools.tishi("服务端异常~~");
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
			});
		});
		
	})
</script>


</div>

<style>

</style>
<div class="aj-body-right">
	<jsp:include page="/views/includes/userLogin.jsp"></jsp:include>
	
	<jsp:include page="/views/includes/allJokeTypesForHomePage.jsp"></jsp:include>
	
	<jsp:include page="/views/joke/jokesSwitch.jsp"></jsp:include>
</div>

<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>