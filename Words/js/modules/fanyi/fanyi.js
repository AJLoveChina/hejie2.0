/**
 * Created by ajax on 2015/10/24.
 */
define(function (require, exports, module) {
    var container = $("#aj-container"),
        ajax = require("youdao").ajax,
        params = {
            url: 'http://openapi.baidu.com/public/2.0/bmt/translate',
        };
    var app = angular.module('fanyi', []);

    app.controller('fanyi', function ($scope, $http) {
        var url = "http://openapi.baidu.com/public/2.0/bmt/translate?&client_id=s7C9XO8kYGOOh5AgeTrjyxAG&from=auto&to=auto";
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

    chrome.tabs.executeScript(null, {
        file: "/js/library/jquery.js"
    });
    chrome.tabs.executeScript(null, {
        file: "/js/modules/fanyi/mouse.js"
    });
});