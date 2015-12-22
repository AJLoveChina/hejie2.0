var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var audios = [];

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function Audio(dom) {
    this.dom = dom;
    this.initStatus = this.dom.paused;
}
Audio.prototype = {
    isPaused : function () {
        return this.dom.paused;
    },
    pause : function () {
        this.dom.pause();
    },
    backInit : function () {
        if (this.initStatus) {
            this.dom.parse();
        } else {
            this.dom.play();
        }
    }
};

function handleClick(state) {
    var tags = document.getElementsByTagName("audio"),
        audios = [];
    for(var i = 0; i < tags.length; i++) {
        audios.push(new Audio(tags[i]));
    }

    if (isPlayingMusic()) {
        turnOff();
    } else {
        backInit();
    }
}

function isPlayingMusic () {
    var bool = false;
    audios.forEach(function (audio) {
        if (!audio.isPaused()) {
            bool = true;
        }
    });
    return bool;
}

function turnOff() {
    audios.forEach(function (audio) {
        audio.pause();
    });
}

function backInit() {
    audios.forEach(function (audio) {
        audio.backInit();
    });
}

