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
                var dom = $(res);
                console.log(dom);
                var Joke = {
                		urlId : copy,
                		title : $.trim(dom.find(".textdl h3 a").html()),
                		content : $.trim(dom.find(".textdl .tex1").html()),
                		like : parseInt(dom.find(".textdl span[id*=Support] em").text()),
                		dislike : parseInt(dom.find(".textdl span[id*=Oppose] em").text())
                };

                $.ajax({
                	url : "SaveJoke.do",
                	type : "POST",
                	data : Joke,
                	success : function () {
                		
                	},
                	error : function () {
                		
                	}
                });
            },
            error : function () {

            }
        });
    }
});