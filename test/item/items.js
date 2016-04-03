
var doc = document,
    body = doc.body;

function GitUser () {
    this.user = null;
    this.url = null;
}
GitUser.prototype = {
    bootstrap : function () {
        var container = $("#aj-gists");
        var app = angular.module("gists", ["ngSanitize"]);
        app.controller("gist-control", function ($scope, $http) {
            $scope.title = "Github Gists";
            $scope.totalNum = 4;
            $scope.interval = 5; // 5s
            $scope.canRoll = true;
            $scope.startSecond = 1;
            $scope.gists = [{
                title : "Welcome",
                content : "Hi, I'm AJ.<br>Welcome here.<br>Love code, love life."
            }];
            $scope.cur = 0;
            $scope.prev = function () {
                this.cur = --this.cur < 0 ? (this.gists.length - 1) : this.cur;
                $scope.startSecond = 1;
            };
            $scope.next = function () {
                this.cur = ++this.cur >= this.gists.length ? 0 : this.cur;
                $scope.startSecond = 1;
            };
            $scope.rolling = function () {
                setInterval(function () {
                    $scope.$apply(function () {
                        $scope.startSecond++;
                        if ($scope.canRoll && ($scope.startSecond % $scope.interval === 0)) {
                            $scope.next();
                            $scope.startSecond = 1;
                        }
                    });
                }, 1000);
            };
            $scope.rolling();

            $scope.getAllGists = function () {
                var Gist = Parse.Object.extend("gists");
                var query = new Parse.Query(Gist);
                query.limit(10);
                query.descending("createdAt");
                query.find({
                    success : function (results) {
                        $scope.$apply(function () {
                            _.each(results, function (item) {
                                $scope.gists.push({
                                    title : item.get("title"),
                                    content : item.get("content"),
                                    url : item.get("url")
                                });
                            });
                        });
                    },
                    error : function () {
                        $scope.gists.push({
                            title : "Error",
                            content : "如果你看到这条消息, 是因为Gists连接失败了, 很可能是你的网络不能连接到国外的服务器"
                        });
                    }
                });
            };
            $scope.getAllGists();
        });
        angular.bootstrap(container, ["gists"]);
    }
};
var temp_html = ["<style>",
    "    .aj-gists{",
    "        position: fixed;",
    "        top: 100px;",
    "        left: 740px;",
    "        width: 250px;",
    "        font-size: 12px;",
    "        display: none;",
    "    }",
    "    .aj-gists.show{",
    "        display: block;",
    "    }",
    "    .aj-gists .cursor{",
    "        cursor: pointer;",
    "    }",
    "    .aj-gists .cursor:hover{",
    "        opacity: 0.7;",
    "    }",
    "    .aj-gists .g-top{",
    "        position: relative;",
    "        height: 40px;",
    "        border-bottom: 1px solid #ccc;",
    "    }",
    "    .aj-gists .g-top .cutline{",
    "        width:0;height:20px;",
    "        position: absolute;",
    "        left: 20px;bottom: -10px;",
    "        border-left: 1px solid #aaa;",
    "    }",
    "    .aj-gists .g-top .cutline.left30{",
    "        left: 30px;",
    "    }",
    "    .aj-gists .g-top .top-title{",
    "        line-height: 40px;",
    "    }",
    "    .aj-gists .g-top .top-pagination{",
    "        position: absolute;",
    "        top: 0;right:0px;",
    "        display:block;",
    "        height:40px;",
    "        line-height: 40px;",
    "        float: right;",
    "        -webkit-user-select: none;",
    "    }",
    "    .aj-gists .g-mid{",
    "        padding-left: 10px;",
    "    }",
    "    .aj-gists .g-mid .mid-title{",
    "        height: 20px;line-height: 20px;overflow:hidden;",
    "    }",
    "    .aj-gists .g-mid .mid-content{",
    "        line-height: 20px;",
    "        max-height: 80px;",
    "        overflow: auto;",
    "        -ms-word-wrap: break-word;",
    "        word-wrap: break-word;",
    "        -ms-word-break: break-all;",
    "        word-break: break-all;",
    "    }",
    "</style>",
    "<div id=\"aj-gists\" class=\"aj-gists\" ng-class=\"{show : gists.length > 0}\" ng-controller=\"gist-control\">",
    "    <div class=\"g-top\">",
    "        <h3 class=\"top-title\" ng-bind=\"title\"></h3>",
    "        <span class=\"top-pagination\">",
    "            <span ng-class=\"{\'hyy-pause2\' : canRoll, \'hyy-play3\' : !canRoll}\" ng-click=\"canRoll = !canRoll\"></span>",
    "            <span class=\"cursor\" ng-click=\"prev();\">Prev</span>",
    "            <span ng-bind=\"cur + 1\"></span>",
    "            <span>/</span>",
    "            <span ng-bind=\"gists.length\"></span>",
    "            <span class=\"cursor\" ng-click=\"next()\">Next</span>",
    "        </span>",
    "        <div class=\"cutline\"></div>",
    "        <div class=\"cutline left30\"></div>",
    "    </div>",
    "    <div class=\"g-mid\">",
    "        <h4 class=\"mid-title\">",
    "            <a ng-bind-html=\"gists[cur].title\" target=\"_blank\" ng-href=\"{{gists[cur].url}}\"></a>",
    "            <a style=\"font-weight: normal;text-decoration: underline;color:#aaa;\" target=\"_blank\" ng-href=\"{{gists[cur].url}}\" ng-style=\"{display : gists[cur].url ? \'inline-block\': \'none\'}\">Go Github</a>",
    "        </h4>",
    "        <div class=\"mid-content\" ng-bind-html=\"gists[cur].content\"></div>",
    "    </div>",
    "</div>"].join("");


var gu = new GitUser();
gu.user = "ajlovechina";
gu.addComponents(function () {
    gu.bootstrap();
});