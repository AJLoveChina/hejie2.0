<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<style>
.aj-joke-roll {
  position: relative;
  width: 100%;
  color: #666;
}
.aj-joke-roll a {
  color: #666;
  text-decoration: none;
}
.aj-joke-roll a:hover {
  color: #333;
}
.aj-joke-roll .control {
  position: absolute;
  height: 30px;
  line-height: 30px;
  top: 0;
  right: 0;
  font-size: 12px;
}
.aj-joke-roll .head {
  line-height: 30px;
  height: 30px;
  font-size: 20px;
}
.aj-joke-roll .cutline-x {
  position: relative;
  border-bottom: 1px solid #ccc;
  margin: 5px 0;
}
.aj-joke-roll .culine-y {
  position: absolute;
  left: 20px;
  top: -10px;
  height: 20px;
  border-left: 1px solid #ccc;
}
.aj-joke-roll .culine-y.offset {
  left: 30px;
}
.aj-joke-roll .title {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}
.aj-joke-roll .content {
  word-break: break-all;
  max-height: 120px;
  height: 120px;
  line-height: 20px;
  overflow: auto;
}

</style>

<div id="aj-joke-switch" class="aj-joke-roll" ng-controller="myCtrl">

    <h3 class="head" ng-bind="head"></h3>
    <div class="control">
    	<span ng-show="isLoding" class="animated pulse infinite">加载中</span>
    	<span ng-click="toggleStop()" ng-class="stop ? 'glyphicon glyphicon-play' : 'glyphicon glyphicon-pause'" title="{{stop ? '点击开始滚动' : '点击取消滚动'}}"></span>
        <a href="javascript:;" ng-click="prev()">Prev</a>
        <span ng-bind="cur + 1"></span>
        <span>/</span>
        <span ng-bind="items.length"></span>
        <a href="javascript:;" ng-click="next()">Next</a>
    </div>
    <div class="cutline-x">
        <div class="culine-y"></div>
        <div class="culine-y offset"></div>
    </div>

    <h5 class="title" ng-bind="items[cur].title"></h5>
    <div class="content" ng-bind-html="items[cur].content" ng-mouseenter="end()"></div>
    <div class="aj-shadow"></div>
</div>

<script>
    $(function () {
        var app = angular.module('myApp', ['ngSanitize']);
        var conatiner = $("#aj-joke-switch");

        app.controller('myCtrl', function($scope, $timeout, $http) {
            $scope.head = "开心麻花";
            $scope.isLoding = false;
            $scope.items = [
                {
                    "title" : "Nigeerhuo",
                    "content" : "生活处处是精彩.."
                }
            ];
            $scope.stop = false;
            $scope.interval = 3000 * 3;
            $scope.cur = 0;
            $scope.page = 1;
            $scope.pagesHasGet = [];

            
            $scope.toStop = function () {
            	$(window).on("aj.scroll", function () {
            		
            		if ($scope.stop === true) {
                		return;
                	}
            		
            		if ($(window).scrollTop() > (conatiner.offset().top + conatiner.height())) {
            			$scope.$apply(function () {
            				$scope.stop = true;
            			});
            		}
            	});	
            }
            $scope.toStop();
            
            $scope.prev = function () {
                var prev = $scope.cur - 1;
                if(prev < 0) {
                    prev =  $scope.items.length - 1;
                }
                $scope.cur = prev;
            };

            $scope.next = function () {
                var next = $scope.cur + 1;
                if (next >= $scope.items.length) {
                    $scope.isLoding = true;
                    $scope.page++;
                    $scope.getPage($scope.page, function () {
                    	$scope.isLoding = false;
                    })
                } else {
                	$scope.cur = next;
                }
            };
            
            $scope.end = function () {
            	$scope.stop = true;
            }
            $scope.run = function () {
            	$scope.stop = false;
            }
            $scope.toggleStop = function () {
            	$scope.stop = !$scope.stop;
            }
            

            $scope.roll = function () {

                $timeout(function () {
                    if (!$scope.stop) {
                        $scope.next();
                    }
                    $scope.roll();
                }, this.interval);

            };
            $scope.roll();
            
            
            
            $scope.getPage = function (page, fn) {
            	var min = 1, max = 433;
            	var random = Math.floor((max - min) * Math.random()) + min;
            	var tries = 1;
            	
            	while($scope.pagesHasGet.indexOf(random) != -1) {
            		random = Math.floor((max - min) * Math.random()) + min;
            		tries ++;
            		if (tries >= 400) {
            			break;
            		}
            	}
            	var prefix = "http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static/joke/",
            		path = prefix + random + ".txt";
            		
            		
            	$http({
            		url : path,
            		method : "GET",
            		headers: {
					  	'Content-Type': "text/json"
					},
            	}).then(function (data) {
            		var json = data.data;
            		if (json.isok) {
            			for (var i = 0; i < json.data.length; i++) {
            				$scope.items.push({
            					"title" : json.data[i].title,
            					"content" : json.data[i].content,
            				})
            			}
            			fn && fn();
            		}
            	});
            }
            
            $scope.init = function () {
            	$scope.getPage($scope.page, function() {
            		$scope.next();
            	});
            }
            $scope.init();
            
            
        });
        

        angular.bootstrap(conatiner, ['myApp']);
    })
</script>

