window.onload = function () {
    var notifyHtml, wrapper, depriceTmpl;

    var msgId = decodeURIComponent((window.location.search).match(/^\?id\=([0-9]*)/)[1]);
    var msgs = JSON.parse(localStorage["deprice.msgs"]);
    wrapper = document.getElementById("doc1");
    depriceTmpl = document.getElementById("depriceTmpl");
    notifyHtml = tmpl(depriceTmpl.innerHTML, {shop: msgs[msgId]});
    wrapper.innerHTML = notifyHtml;
    sendLog(["action=DEPRICE_MESSAGE_POPUP", "type=ARMANI_EXTENSION_POPUP"]);
}
