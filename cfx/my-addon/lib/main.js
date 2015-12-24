var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var worker;

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick //handleClick
});


function handleClick(state) {
    if (!worker) {
        worker= tabs.activeTab.attach({
            contentScriptFile: self.data.url("mute.js")
        });
    }
    worker.port.emit("mute");
}

// PPS : 因为没找到 firefox 扩展关于音频的 API, 所以用HTML5音频的API来替代了, 不过和要求有点出入...  囧
