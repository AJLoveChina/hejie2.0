<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<div ng-controller="pendant-controller" id="aj-pendant" class="aj-pendant clearfix">
    <div class="aitems">
        <span ng-repeat="item in items">
            <a ng-if="item.link" href="{{item.link}}" class="aitem" >
                <span class="icon" ng-class="item.icon"></span>
                <h4 class="title" ng-bind="item.title"></h4>
            </a>
            <a ng-if="!item.link" href="javascript:;" class="aitem" >
                <span class="icon" ng-class="item.icon"></span>
                <h4 class="title" ng-bind="item.title"></h4>
            </a>
        </span>
        <div class="bdsharebuttonbox aitem" style="position:relative;">
            <span class="icon glyphicon glyphicon-share"></span>
            <h4 class="title">分享</h4>
            <a href="#" class="bds_more" data-cmd="more"></a>
        </div>
    </div>
    <div style="height: 10px"></div>
    <img src="http://localhost/web/pic/erweima.png" alt="微信二维码"/>
</div>

<textarea id="aj-baidu-share-script" style="display: none;">
    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
</textarea>


<script>
    $(function () {
        var app = angular.module("pendant", []);
        var pendant = $("#aj-pendant");
        var body = $("#aj-body"),
            bodyWidth = body.width();

        app.controller("pendant-controller", function ($scope) {

            $scope.items = [
                {
                    "icon" : "glyphicon glyphicon-home",
                    "title" : "首页",
                    "link" : "/",
                    "class" : ""
                }
            ]

        });

        var timeout;
        $(window).on("resize", function () {
            if (!timeout) {
                timeout = setTimeout(function () {
                    resize();
                    timeout = 0;

                }, 1000 / 24);
            }
        });
        resize();

        function resize() {
            var docWidth = $(document).width(),
                winHeight = $(window).height();
            pendant.css({
                "left" : (docWidth - bodyWidth) / 2 - pendant.width() - 10 + "px",
                "top" : (winHeight - pendant.height()) / 2 + "px"
            })
        }

        addBaiduShare();
        function addBaiduShare() {
            var area = $("#aj-baidu-share-script");
            var script = document.createElement("script");

            script.innerText = area.val();
            $(document.body).append(script)
        }
        angular.bootstrap(pendant, ["pendant"]);
    })
</script>

<style>
.aj-pendant {
  position: fixed;
  top: 50%;
  left: 0;
  width: 50px;
  font-size: 12px;
  color: #666;
}
.aj-pendant a {
  text-decoration: none;
  color: #666;
}
.aj-pendant .aitems .aitem {
  display: block;
  width: 100%;
  height: 49px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
  margin-top: -1px;
  text-decoration: none;
}
.aj-pendant .aitems .aitem:hover {
  background-color: #f04848;
  color: white;
  border-color: #f04848;
}
.aj-pendant .aitems .icon {
  padding-top: 5px;
  display: block;
  height: 25px;
  line-height: 25px;
  font-size: 15px;
}
.aj-pendant .aitems .title {
  display: block;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin: 0;
}
.aj-pendant .aitems .bds_more {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 9;
  opacity: 0;
  filter: alpha(opacity=0);
}
</style>