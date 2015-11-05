/**
 * Created by ajax on 2015/10/24.
 */
define(function (require, exports, module) {
    var container = $("#aj-container"),
        words = require('words'),
        win = window,
        youdao = require("youdao"),
        params = {
            url: 'http://openapi.baidu.com/public/2.0/bmt/translate'
        };
    var app = angular.module('fanyi', ['ngSanitize']);
//    var url = "http://openapi.baidu.com/public/2.0/bmt/translate?&client_id=s7C9XO8kYGOOh5AgeTrjyxAG&from=auto&to=auto";
    var url = 'http://dict.youdao.com/fsearch?client=deskdict&keyfrom=chrome.extension&pos=-1&doctype=xml&xmlVersion=3.2&dogVersion=1.0&vendor=unknown&appVer=3.1.17.4208&le=eng'

    app.controller('fanyi', function ($scope, $http) {
        $scope.q = "歪歪词典^_^";
        $scope.results = [];
        $scope.isajax = false;
        $scope.content = '';
        $scope.hasAdded = false;
        $scope.isShowContent = true;

        // methods
        $scope.keydown = function (e) {
            if (e.keyCode === 13) {
                $scope.query();
            }
        };// 回车键搜索

        $scope.query = function () {
            $scope.isajax = true;
            if ($scope.q === '') {
                return false;
            }
            var inlocal = this.inLocal($scope.q);
            if (inlocal) {
                this.querySuccess(inlocal);
                $scope.hasAdded = true;
            } else {
                $http.get(url + "&q=" + encodeURIComponent($scope.q)).success(function (res) {
                    var xml = $.parseXML(res);
                    var html = youdao.translateXML(xml);
                    $scope.querySuccess(html);
                    $scope.hasAdded = false;
                });
            }
        }; // 获取一个单词的解释
        $scope.querySuccess = function (html) {
            $scope.content = html;
            $scope.isajax = false;
            this.isShowContent = true;
        };

        $scope.add = function () {
            if (words.add($scope.q, $scope.content)) {
                $scope.hasAdded = true;
            }
        }; // 保存一个词的内容到本地

        $scope.getWords = function () {
            return words.getAll();
        }; // 获取本地缓存的词 array类型

        $scope.inLocal = function (word) {
            return words.inLocal(word);
        }; // 判断一个词是否在本地 是返回这个词相关的内容, 不是返回 null

    });
    angular.bootstrap(container, ['fanyi']);

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log(message.word);
        if (message.action === "fanyi") {
            $.ajax({
                url : url + "&q=" + encodeURIComponent(message.word),
                dataType : 'html',
                async : false,  // 这地方必须同步, 异步content_script 获取不到返回值
                success : function (res) {
                    var xml = $.parseXML(res);
                    var html = youdao.translateXML(xml)
                    sendResponse(html);
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