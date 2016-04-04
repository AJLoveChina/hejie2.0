<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<div id="aj-joke-switch" class="aj-joke-roll" ng-controller="myCtrl">

    <h3 class="head" ng-bind="head"></h3>
    <div class="control">
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
    <div class="content" ng-bind="items[cur].content"></div>
</div>

<script>
    $(function () {
        var app = angular.module('myApp', []);

        app.controller('myCtrl', function($scope, $timeout) {
            $scope.head = "开心麻花";
            $scope.items = [
                {
                    "title" : "Nigeerhuo",
                    "content" : "生活处处是精彩.."
                },
                {
                    "title" : "读书",
                    "content" : "有人拿据传是钱（钟书）老年轻时评价三位老师的话来洗地"
                }
            ];
            $scope.stop = false;
            $scope.interval = 3000 * 2;
            $scope.cur = 0;

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
                    next = 0;
                }
                $scope.cur = next;
            };

            $scope.roll = function () {

                $timeout(function () {
                    if (!$scope.stop) {
                        $scope.next();
                    }
                    $scope.roll();
                }, this.interval);

            };
            $scope.roll();


        });

        angular.bootstrap($("#aj-joke-switch"), ['myApp']);
    })
</script>

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
  max-height: 80px;
  line-height: 20px;
}

</style>