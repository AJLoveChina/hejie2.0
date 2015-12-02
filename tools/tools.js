// css img script 链接
function deal() {
    (function (html) {
        var span = $(document.createElement("span"));
        span.html(html);
        span.find("*").each(function () {
            dealAssets(this);
            dealLink(this);
            removeSomeAttr(this);
            //replaceKeyWord(this);
        });

        dealComment(span);
        $("#result").val(span.html());
    })($("#container").val());
}

function dealAssets(tag) {
    tag = $(tag);
    var url,
        attr;
    if (tag.is("LINK")) {
        url = $(this).attr("href");
        attr = "href";
    } else if (tag.is("IMG")) {
        url = $(this).attr("src");
        attr = "src";
    } else if (tag.is("SCRIPT")) {
        url = $(this).attr("src");
        attr = "src";
    }

    if(url && needDeal(url)) {
        tag.attr(attr, fn(url));
    }

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
    function fn(url) {
        return "/html/p2p_v3/" + url;
    }
}

function dealLink(tag) {
    tag = $(tag);
    if (tag.is("A")) {
        tag.attr("href", "javascript:;");
        tag.removeAttr("onclick");
    }
}

function dealComment(root) {
    $(root).contents().each(function() {
        if(this.nodeType === Node.COMMENT_NODE) {
            $(this).remove();
        }
    });
}

function removeSomeAttr(tag) {
    tag = $(tag);
    tag.removeAttr("tppabs");
    tag.removeAttr("data-original");
    tag.removeAttr("data-href");
}

function replaceKeyWord(tag) {
    tag = $(tag);
    var reg = /(返利|什么值得买|新蛋|dealmoon|值得买)/g;
    tag.html(tag.html().replace(reg, "券妈妈"))
}
