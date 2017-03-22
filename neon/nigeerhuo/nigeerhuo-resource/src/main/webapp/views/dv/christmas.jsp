<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" import="java.util.*, ajax.model.*" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

Integer pageIndex = (Integer)request.getAttribute("page");
%>


<%
	request.setAttribute("title", "圣诞节知多少?");
%>
<div style="width:0;height:0;opacity:0;">
	<img src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/images/web/pic/logo350x350.png"/>
</div>
<jsp:include page="/views/includes/header.jsp"></jsp:include>
<style>
	.no .choice{
	 color:red;
	}
	.no .answer{
	 color:green;
	}
	.no .title{
		color:red!important;
	}
	.no .icon {
	 color:red;
	}
	.yes .icon{
		color:green;
	}
</style>
<script>
	$(function() {
		var data = [{
			"q" : "圣诞节这个名称是什么的缩写?",
			"choices" : ["耶路撒冷", "基督弥撒"],
			"a" : 1
		}, {
			"q" : "什么时候圣诞塔和伊甸园树合称为圣诞树?",
			"choices" : ["14世纪", "16世纪", "21世纪"],
			"a" : 1
		}, {
			"q" : "近代圣诞树起源于哪个国家？",
			"choices" : ["中国", "美国", "德国"],
			"a" : 2
		}, {
			"q" : "圣诞老人的原名是什么？",
			"choices" : ["权志龙", "金钟国", "尼古拉"],
			"a" : 2
		}, {
			"q" : "圣诞节时，在澳大利亚是什么季节？",
			"choices" : ["热不可耐的仲夏季节", "秋天", "苹果春"],
			"a" : 0
		}, {
			"q" : "是谁下令把《平安夜》作为圣诞节必唱歌曲？",
			"choices" : ["一个傻逼", "普鲁士国王威廉四世", "英国女王六世"],
			"a" : 1
		}, {
			"q" : "火鸡的名字在英文中叫什么？",
			"choices" : ["土耳其", "魔力红", "比伯"],
			"a" : 0
		}, {
			"q" : "圣诞必点歌曲《平安夜》是谁作曲?",
			"choices" : ["周杰伦", "摩尔", "肖邦"],
			"a" : 1
		}, {
			"q" : "在丹麦，圣诞晚餐开始时，人们必须先吃什么，然后才能开始吃别的东西？",
			"choices" : ["杏仁布丁", "巧克力", "瓜子"],
			"a" : 0
		}, {
			"q" : "你觉得你明年圣诞节还是一个人过么?",
			"choices" : ["是", "不是"],
			"a" : 0
		}];
		
		
		var container = $("#aj-container");
		var app = angular.module("app", []);
		app.controller("main", function($scope){
			$scope.s = {};
			$scope.s.index = 0;
			$scope.s.data = data;
			$scope.s.title = "圣诞节知多少?";
			$scope.s.end = false;
			
			
			$scope.choose = function (sindex, aindex) {
				var next = $scope.s.index + 1;
				$scope.s.data[sindex].aa = aindex;
				if (next < $scope.s.data.length) {
					
					$scope.s.index = next;

					
				} else {
					$scope.s.end = true;
					console.log($scope.s.data);
				}
			}
			
			$scope.getPJ = function () {
				var total = $scope.s.data.length;
				var right = 0;
				$.each($scope.s.data, function (i, item) {
					if (item.a === item.aa) right ++;
				})
				
				if (right / total < 0.6) {
					return "哇,你太水了.一共" + total + "道题,你错了" + (total - right) + "道, 你肯定单身汪~~";
				} else {
					return "厉害啊," + total + "道题, 答对了" + right +"道,一看就知道你不是单身汪~~";
				}
			}
		});
		angular.bootstrap(container, ["app"]);
		
	})
</script>
<div class="aj-body-left container">
	<div class="row">
		<div id="aj-container" ng-controller="main" class="col-xs-12" ng-cloak>
		<h2 ng-bind="s.title" style="font-size:16px;font-weight:bold;color:#333;text-align: center;padding: 10px 0;"></h2>
		
		<span ng-if="!s.end">
			<h3 ng-bind="(s.index + 1) + '.' + s.data[s.index].q" style="font-size:12px;color:#333;padding:10px 3px;"></h3>
			<ul class="list-group">
				<li ng-repeat="item in s.data[s.index].choices"
					ng-click="choose(s.index, $index)"
					class="list-group-item">
					<input type="radio" />
					<span ng-bind="item"></span>
				</li>
			</ul>
		</span>
		
		<span ng-if="s.end">
			<span style="font-weight:bold;" ng-bind="getPJ()"></span><br>
			<span ng-repeat="item in s.data" ng-class="item.a === item.aa ? 'yes' : 'no'">
				<span class="title" ng-bind="($index + 1) + '.' + item.q" style="font-size:12px;color:#333;padding:10px 3px;"></span>
				<em class="icon" ng-class="{'glyphicon glyphicon-ok' : item.a === item.aa, 'glyphicon glyphicon-remove' : item.a !== item.aa}"></em>
				<ul class="list-group">
					<li ng-repeat="tt in item.choices"
						class="list-group-item">
						<span ng-bind="tt" ng-class="{'choice' : item.aa == $index, 'answer':item.a == $index}"></span>
					</li>
				</ul>
			</span>
		</span>
	</div>	
	</div>
</div>


<div style="height:10px;"></div>

<%@ include file="/views/includes/footer.jsp" %>
