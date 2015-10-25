define(function (require, exports, module) {
    var app = angular.module('user', ['ngSanitize']),
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

        if (user) {
            user.fetch().then(function(user){
                $scope.$apply(function () {
                    $scope.name = user.getUsername();
                });
                name = user.getUsername();
            }, function(err){});
        }


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