window.onload = function () {
    var pubTime, imgTag, titleTag,
        subTitleTag, summeryTag, toSeeTag, snd, searchQuery, pubTime;

    pubTime = decodeURIComponent((window.location.search).match(/^\?id\=([0-9]*)/)[1]);
    var thisMsg = JSON.parse(localStorage["push.Disc." + pubTime]);

    imgTag = document.querySelector(".img-wrapper img");
    titleTag = document.querySelector(".content h3 a");
    imgWrapTag = document.querySelector(".img-wrapper a");
    subTitleTag = document.querySelector(".content .sub-title");
    summeryTag = document.querySelector(".content .summary");
    toSeeTag = document.querySelector(".to-see");
    thisMsg.link = (thisMsg.link).indexOf("?") > 0 ?
        thisMsg.link + "&keyfrom=pushpopup" :
        thisMsg.link + "?keyfrom=pushpopup";
    var defautImage = chrome.extension.getURL("/images/icon-huihui.png");
    var imgUrl = thisMsg.imageUrl || defautImage;
    imgTag.setAttribute("src", imgUrl);
    imgTag.setAttribute("alt", thisMsg.title);
    titleTag.setAttribute("href", thisMsg.link);
    toSeeTag.setAttribute("href", thisMsg.link);
    imgWrapTag.setAttribute("href", thisMsg.link);
    summeryTag.innerHTML = thisMsg.summary;
    subTitleTag.innerText = thisMsg.subTitle;
    titleTag.innerText = thisMsg.title;
    var channelName = thisMsg.channel || "NOCHANNEL";
    var msgType = thisMsg.type || "NOTYPE";
    titleTag.setAttribute("log-msgtype", msgType);
    titleTag.setAttribute("log-channel", channelName);
    toSeeTag.setAttribute("log-msgtype", msgType);
    toSeeTag.setAttribute("log-channel", channelName);
    sendLog(["action=CHROMEPUSH_DISC_POPUP",
            "channel=" + channelName,
            "msgtype=" + msgType,
            "type=ARMANI_EXTENSION_POPUP"]);
    localStorage.removeItem("push.Disc." + pubTime);
}
