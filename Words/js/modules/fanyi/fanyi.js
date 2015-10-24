/**
 * Created by ajax on 2015/10/24.
 */
define(function (require, exports, module) {
    var container = $("#aj-container"),
        ajax = require("youdao").ajax,
        params = {
            url: 'http://openapi.baidu.com/public/2.0/bmt/translate'
        };
    var app = angular.module('fanyi', []);
    var url = "http://openapi.baidu.com/public/2.0/bmt/translate?&client_id=s7C9XO8kYGOOh5AgeTrjyxAG&from=auto&to=auto";
    app.controller('fanyi', function ($scope, $http) {
        $scope.q = "Apple";
        $scope.results = [];
        $scope.isajax = false;
        $scope.keydown = function (e) {
            if (e.keyCode === 13) {
                $scope.query();
            }
        };
        $scope.query = function () {
            $scope.isajax = true;
            $http.get(url + "&q=" + encodeURIComponent($scope.q)).success(function (res) {
                var json = angular.fromJson(res);
                $scope.results = json.trans_result;
                $scope.isajax = false;
            });
        };
    });
    angular.bootstrap(container, ['fanyi']);

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === "fanyi") {
            $.ajax({
                url : url + "&q=" + encodeURIComponent(message.word),
                dataType : 'json',
                async : false,  // 这地方必须同步, 异步content_script 获取不到返回值
                success : function (json) {
                    sendResponse(json);
                }
            });
        }
    });

    chrome.tabs.executeScript(null, {
        file: "/js/library/jquery.js"
    });
    chrome.tabs.executeScript(null, {
        file: "/js/modules/fanyi/mouse.js"
    });
});