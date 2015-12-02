// css img script 链接
function deal() {
    (function (html, fn) {
        var span = $(document.createElement("span"));
        span.html(html);
        span.find("*").each(function () {
            var url,
                attr;
            if (this.tagName.toUpperCase() === "LINK") {
                url = $(this).attr("href");
                attr = "href";
            } else if (this.tagName.toUpperCase() === "IMG") {
                url = $(this).attr("src");
                attr = "src";
            } else if (this.tagName.toUpperCase() === "SCRIPT") {
                url = $(this).attr("src");
                attr = "src";
            }

            if(url && needDeal(url)) {
                $(this).attr(attr, fn(url));
            }
        });
        function needDeal(url) {
            var bool = true,
                url = url.toLowerCase();
            if (url.indexOf("http") === 0) {
                bool = false;
            }
            if (url.indexOf("//") === 0) {
                bool = false;
            }
            return bool;
        }
        console.log(span.html());
    })($("#container").val(), function (url) {
        return "/html/p2p_v3/" + url;
    });
}

function dealAssets(tag) {
    tag = $(tag);
    
}

function dealLink(tag) {
    tag = $(tag);
    if (tag.is("A")) {
        tag.attr("href", "javascript:;");
        tag.removeAttr("onclick");
    }
}


