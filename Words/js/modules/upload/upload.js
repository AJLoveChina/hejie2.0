/**
 * Created by ajax on 2015/10/22.
 */
define(function (require, exports, module) {
    var app = angular.module("upload", []);
    app.controller('init', function ($scope) {
        $scope.title = "123";
        $scope.desc = "";
        $scope.content = "";
        $scope.types = [];
        require.async("blogs", function (obj) {
            var key,
                arr = [];
            for (key in obj.map) {
                arr.push({
                    key: key,
                    val: obj.map[key]
                });
            }
            $scope.types = arr;
        });
    });
    angular.bootstrap($('#aj-upload'), ["upload"]);
});