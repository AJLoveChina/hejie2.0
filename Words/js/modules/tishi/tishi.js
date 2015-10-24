define(function (require, exports, module) {
    // How to use ?
    // Tishi().show(val);
    function Tishi(div) {	//提示模块,提供各种提示功能
        if (this instanceof Tishi) {
            this.div = div;
            this.id = 'aj-tishi-div-style';
            this.initial();
        } else {
            return new Tishi(div);
        }
    }

    Tishi.prototype = {
        show: function (val) {
            var container = $('#' + this.id);
            if (container.length > 0) {
                container.html("<span>" + val + "</span>");
                $(container).slideDown();
                setTimeout(function () {
                    $(container).slideUp();
                }, 2000);
            } else {
                alert(val);
            }
        },
        initial: function () {
            if (document.getElementById(this.id)) {
                return false;
            }
            var div = document.createElement('div'),
                style = document.createElement('style');
            $(style).html("#" + this.id + "{position:fixed;top:50%;left:50%;width:300px;height:200px;margin-top:-100px;margin-left:-150px;" +
                "background-color:rgba(0,0,0,0.4);color:white;display:none;}#" + this.id + ":before{content:'';display:inline-block;width:0;height:100%;vertical-align:middle;}" +
                "#" + this.id + " span{display:inline-block;width:280px;word-wrap:break-word;padding:0 10px;vertical-align:middle;}");
            $(div).attr('id', this.id);
            $(document.head).append(style);
            $(document.body).append(div);
        }
    };
    module.exports = Tishi;
});