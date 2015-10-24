/**
 * Created by ajax on 2015/10/24.
 */
define(function (require, exports, module) {
    var params = {
        url : 'http://openapi.baidu.com/public/2.0/bmt/translate'
    };
    $('.aj-fanyi-form').submit(function (e) {
        e.preventDefault();
        console.log(1);
        var data = $(this).serialize();
        $.ajax({
            url : params.url,
            data : data,
            dataType : '',
            success : function (json) {
                console.log(json);
            },
            error : function(err) {
                console.log(err);
            },
            complete : function () {
                console.log("complete!");
            }
        });
    });
});