/**
 * Created by ajax on 2016/1/25.
 */
define(function () {
    var start = 1471163;
    setInterval(function () {

    }, 1000);

    auto();
    function auto() {
        var copy = start;
    	var url = "GetJokes.do?id=" + copy;
        
        $.ajax({
            url : url,
            type : "GET",
            contentType : "text/html;charset=utf-8",
            success : function (res) {
                var dom = $(decodeURIComponent(res));
                console.log(dom);
                var Joke = {
                		urlId : copy,
                		title : dom.find("#ctl01 > section > div.text > section.textdl > h3").html()
                };
                console.log(Joke);
            },
            error : function () {

            }
        });
    }
});