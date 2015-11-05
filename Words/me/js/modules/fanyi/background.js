chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"/js/library/jquery.js"});
    chrome.tabs.executeScript(null,{file:"/js/modules/fanyi/mouse.js"});
});