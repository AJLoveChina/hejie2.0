/**
 * Created by ajax on 2015/10/24.
 */
define(function (require, exports, module) {
    var container = $("#aj-container"),
        youdao = require("youdao"),
        params = {
            url: 'http://openapi.baidu.com/public/2.0/bmt/translate'
        };
    var app = angular.module('fanyi', ['ngSanitize']);
//    var url = "http://openapi.baidu.com/public/2.0/bmt/translate?&client_id=s7C9XO8kYGOOh5AgeTrjyxAG&from=auto&to=auto";
    var url = 'http://dict.youdao.com/fsearch?client=deskdict&keyfrom=chrome.extension&pos=-1&doctype=xml&xmlVersion=3.2&dogVersion=1.0&vendor=unknown&appVer=3.1.17.4208&le=eng'

    app.controller('fanyi', function ($scope, $http) {
        $scope.q = "Hyy";
        $scope.results = [];
        $scope.isajax = false;
        $scope.content = '';
        $scope.hasAdded = false;
        // methods
        $scope.keydown = function (e) {
            if (e.keyCode === 13) {
                $scope.query();
            }
        };

        $scope.query = function () {
            $scope.isajax = true;
            var words = this.getWords(),
                keys =
            if (words[$scope.q]) {
                $scope.content = $.parseJSON(words[$scope.q]).content;
                $scope.isajax = false;
            } else {
                $http.get(url + "&q=" + encodeURIComponent($scope.q)).success(function (res) {
                    var xml = $.parseXML(res);
                    var html = youdao.translateXML(xml);
                    $scope.content = html;
                    $scope.isajax = false;
                    console.log(html);
                });
            }
        };

        $scope.add = function () {
            var words = localStorage.getItem("aj-words"),
                results = [];
            var item = {
                word : $scope.q,
                content : $scope.content,
                is_sysnc : false,
                date : + new Date()
            };
            if (words) {
                results = $.parseJSON(words);
            }
            results.push(JSON.stringify(item));
            localStorage.setItem('aj-words', JSON.stringify(results));
        };
        $scope.getWords = function () {
            var words = localStorage.getItem("aj-words"),
                results = [];
            if (words) {
                results = results.concat($.parseJSON(words));
            }
            return results;
        }
        $scope.inLocal = function (word) {
            var words = $scope.getWords();

        }
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