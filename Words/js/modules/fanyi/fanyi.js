/**
 * Created by ajax on 2015/10/24.
 */
define(function (require, exports, module) {
    var params = {
        url : 'http://openapi.baidu.com/public/2.0/bmt/translate'
    };
    var submit = $("#submit"),
        form = $("#submit-form"),
        info = form.find('.result');

    var app = angular.module('fanyi', []);
    app.controller('fanyi', function($scope) {
        $scope.info = + new Date();
        $scope.q = "";
        
        $scope.ajax = function () {
            this.info = $scope.q;
        }
    });
    angular.bootstrap(form, ['fanyi']);
});