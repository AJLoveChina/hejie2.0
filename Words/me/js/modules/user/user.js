define(function (require, exports, module) {
    var app = angular.module('user', ['ngSanitize']),
        win = window,
        words = require("words"),
        container = $("#aj-sign-module"),
        user = Parse.User.current();

    app.controller("sign", function ($scope, $http) {
        $scope.denlu = {
            isAjax : false
        };
        $scope.zhuce = {
            isAjax : false
        };
        $scope.isSignin = true;
        $scope.isShowInside = false;
        $scope.name = "";
        $scope.words = [];
        $scope.whichOne = -1; // 展示单词本中哪个单词
        $scope.allWords = [];
        $scope.pages = [];      // 单词本分页
        $scope.page = 1;
        $scope.size = 8;

        if (user) {
            user.fetch().then(function(user){

                $scope.$apply(function () {
                    $scope.name = user.getUsername();
                    $scope.listWords();
                });

            }, function(err){});
        }
        
        $scope.listWords = function (page, size, bool) { // bool == true 强制刷新
            if ($scope.allWords.length === 0 || bool) {
                this.getAllWords();
            }
            page = page || $scope.page;
            size = size || $scope.size;
            $scope.words = $scope.allWords.slice((page -1) * size, page * size);

            $scope.pagination();
        };

        $scope.pagination = function () {
            var total = $scope.allWords.length,
                selected = false,
                pages = Math.ceil(total / $scope.size);
            $scope.pages = [];
            for(var i = 1; i <= pages; i++) {
                selected = i === $scope.page ? true : false;
                $scope.pages.push({
                    index : i,
                    selected : selected
                });
            }
        };

        $scope.goTo = function (page) {
            $scope.page = page;
            $scope.listWords();
        };

        $scope.refresh = function () {
            this.listWords(null, null, true);
        };

        $scope.sysnc = function () {
            words.sysnc();
        };

        $scope.getAllWords = function () {
            var list = words.getAll(),
                one,
                arr = [];
            list.forEach(function (item) {
                one = $.parseJSON(item);
                one.time = _.dateShow(one.date);
                arr.unshift(one);
            });
            $scope.allWords = arr;
        };


        $scope.signIn = function () {
            if ($scope.denlu.isAjax) {
                $scope.denlu.info = "正在登陆, 亲(づ￣3￣)づ╭❤～";
                return false;
            }
            $scope.denlu.isAjax = true;
            Parse.User.logIn($scope.denlu.name, $scope.denlu.pass, {
                success: function(user) {
                    $scope.$apply(function() {
                        $scope.denlu.info = "登陆成功";
                        $scope.denlu.isAjax = false;
                        $scope.name = $scope.denlu.name;
                        $scope.listWords();
                        console.log(user);
                    });
                },
                error: function(user, err) {
                    $scope.$apply(function() {
                        $scope.denlu.info = err.message;
                        $scope.denlu.isAjax = false;
                        console.log(err);
                    });
                }
            });
        };

        $scope.signUp = function () {
            if ($scope.zhuce.isAjax) {
                $scope.zhuce.info = "正在登陆, 亲(づ￣3￣)づ╭❤～";
                return false;
            }
            if ($scope.zhuce.pass !== $scope.zhuce.confirm) {
                $scope.zhuce.info = "密码俩次输入的不匹配";
                return false;
            }
            $scope.zhuce.isAjax = true;
            var user = new Parse.User();
            user.set("username", $scope.zhuce.name);
            user.set("password", $scope.zhuce.pass);

            user.signUp(null, {
                success: function(user) {
                    $scope.$apply(function() {
                        $scope.zhuce.info = "";
                        $scope.zhuce.isAjax = false;
                        $scope.name = $scope.zhuce.name;
                        $scope.listWords();
                        console.log(user);
                    });
                },
                error: function(user, err) {
                    $scope.$apply(function() {
                        $scope.zhuce.info = err.message;
                        $scope.zhuce.isAjax = false;
                        console.log(err);
                    });
                }
            });
        };
        
        $scope.logout = function () {
            Parse.User.logOut();
            $scope.name = "";
        }
    });

    angular.bootstrap(container, ['user']);
});