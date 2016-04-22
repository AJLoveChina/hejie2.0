<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<div ng-controller="pendant-controller" id="aj-pendant" class="aj-pendant clearfix aj-hide-when-phone">
    <div class="aitems">
        <span ng-repeat="item in items">
            <a ng-if="item.link" href="{{item.link}}" class="aitem" ng-class="item.class">
                <span class="icon" ng-class="item.icon"></span>
                <h4 class="title" ng-bind="item.title"></h4>
            </a>
            <a ng-if="!item.link" href="javascript:;" class="aitem" ng-click="dealATagWithoutHref(item)"  ng-class="item.class">
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
    <img src="http://images.nigeerhuo.com/images/web/pic/dot.jpg" data-lazy="web/pic/erweima.png" class="aj-lazy" alt="微信二维码"/>
</div>

<textarea id="aj-baidu-share-script" style="display: none;">
    window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
</textarea>


<script>
    $(function () {
	    	aj.Try(function () {
	    	var app = angular.module("pendant", []);
	        var pendant = $("#aj-pendant");
	        var body = $("#aj-body"),
	            bodyWidth = body.width();
	        var collectKey = "aj-collect-id-list";
	
	        app.controller("pendant-controller", function ($scope) {
	
				// class 是应用给 a 标签的 class 值
	            $scope.items = [
	                {
	                    "icon" : "glyphicon glyphicon-home",
	                    "title" : "首页",
	                    "link" : "/",
	                    "class" : ""
	                },
	                {
	                	"icon" : "glyphicon glyphicon-chevron-up gotop",
	                    "title" : "回顶部",
	                    "class" : ""
	                },
	                {
	                	"icon" : "collect glyphicon glyphicon-heart",
	                    "title" : "收藏",
	                    "class" : ""
	                }
	            ]
	            $scope.isCollect = false;
	            
	            // 对于木有href(值为 javascript:;)的a标签, 我们给它自定义click事件
	            $scope.dealATagWithoutHref = function (item) {
	            	// 当title变成已收藏的时候, 点击就不会重新发送请求了
	            	if (item.title == "收藏") {
	            		$scope.shoucang();
	            	}
	            	
	            	if (item.icon.indexOf("gotop") != -1) {
	            		goTop();
	            	}
	            }
	            
	            function goTop() {
	            	$(document.body).animate({
	            		"scrollTop" : 0
	            	});
	            }
	            
	            $scope.shoucang = function() {
	            	var u = new aj.User();
	            	if (!u.isLogin()) {
	            		aj.Tishi("亲, 需要先登录才能收藏哦~~");
	            		return;
	            	}
	            	
	            	$(document).trigger("aj.tellme-item-id", [callback]);
	            	
	            	function callback(id) {
	            		$.ajax({
	            			url : "/shoucang?id=" + id,
	            			type : "GET",
	            			dataType : "json",
	            			success : function (json) {
	            				aj.Tishi(json.data);
	            				
	            				$scope.$apply(function () {
	            					$scope.shoucangPush(id);
	            					
	            					
	            					$scope.doSomethingIfCollect();
	            				});
	            				
	            				
	            			},
	            			error : function (err) {
	            				aj.Tishi("服务器罢工了, 无法收藏~~~待会试试看");
	            			}
	            		});
	            	}
	            }
	            

	            
	            $scope.checkCollect = function (fn) {
	            	$(document).trigger("aj.tellme-item-id", [callback]);
	            	
	            	function callback(id) {
	            		var userid = (new aj.User()).getUserid();
	            		var collect = getCollectArr();
	            		var bool = false;
	            		
	            		var userCollect = collect[userid];
	            		
	            		if (userCollect) {
	            			for (var i = 0; i < userCollect.length; i++) {
		            			if (userCollect[i] == id) {
		            				bool = true;
		            			}
		            		}
	            		}
	            		
	            		fn(bool);
	            	}
	            }
	            
	            $scope.doSomethingIfCollect = function () {
		            $scope.checkCollect(function (isCollect) {
		            	//console.log(isCollect);
		            	if (isCollect) {
		            		for (var i = 0; i < $scope.items.length; i++) {
		            			if ($scope.items[i].icon.indexOf("collect") != -1) {
		            				$scope.items[i].title = "已收藏";
		            			}
		            		}
		            		$scope.isCollect = true;
		            	}
		            })	            	
	            }

	            $scope.doSomethingIfCollect();
	            
	            function getCollectArr() {
	            	var collect = localStorage.getItem(collectKey);
	            	if (collect == null || collect == "") {
	            		return {};
	            	} else {
	            		return JSON.parse(collect);
	            	}
	            }
	            // 收藏 id 存在到本地
	            $scope.shoucangPush = function (id) {
	            	
	            	try {
						var collect = localStorage.getItem(collectKey);
		            	var userid = (new aj.User()).getUserid();
		            	var list;
		            	var bool = false;
		            	var collectJson;
		            	
		            	
		            	if (collect == null || collect == "") { // 之前木有任何账户在此浏览器上收藏过item
		            		list = [];
		            		list.push(id);
		            		collectJson = {};
		            	} else {	
		            		collectJson = JSON.parse(collect);
		            		
		            		if (collectJson[userid]) {
		            			//list = collectJson[userid].split(",");
		            			list = collectJson[userid];
		            			
		            			for (var i = 0; i < list.length; i++) {
			            			if (list[i] == id) {
			            				bool = true;
			            			}
			            		}
			            		if (!bool) {
			            			list.push(id);
			            		}
		            		} else {
		            			list = [];
		            			list.push(id);
		            		}
		            	}
		           		collectJson[userid] = list;
		            	localStorage.setItem(collectKey, JSON.stringify(collectJson));
	            	
	            	}catch(ex) {
	            		// 恢复
	            		localStorage.removeItem(collectKey);
	            	}
	            	
	            }
	
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
    	
    	});
        

       
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
  transition:all 0.3s;
  background-color: white;
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



<!-- 用户提示  -->

<div class="modal" id="aj-gobal-tishi-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">二货提示 : </h4>
			</div>
			<div class="modal-body">
			
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>