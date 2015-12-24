var page;

function Audio(dom) {   // 每一个Audio的实例对应页面上的 一个 audio 标签, 负责其相应的逻辑
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
    play : function () {
        this.dom.play();
    },
    backInit : function () {
        console.log(this.initStatus);
        if (this.initStatus) {
            this.dom.pause();
        } else {
            this.dom.play();
        }
    }
};

function Page() {   // Page的实例负责一个html页面的一些逻辑
    this.audios = null; // Audio实例组成的数组
    this.initBgColor = getComputedStyle(document.body)["backgroundColor"];
}
Page.prototype = {
    mute : function () {    // 静音
        this.audios.forEach(function (audio) {
            audio.pause();
        });
        document.body.style.backgroundColor = "lightblue";
    },
    backInit : function () {    // 将所有 audio 恢复初始状态
        this.audios.forEach(function (audio) {
            audio.backInit();
        });
    },
    isPlaying : function () {   // 页面是否有音频在播放
        var bool = false;
        this.audios.forEach(function (audio) {
            if (!audio.isPaused()) {
                bool = true;
            }
        });
        return bool;
    },
    play : function () {
        this.audios.forEach(function (audio) {
            audio.play();
        });
        console.log(this.initBgColor);
        document.body.style.backgroundColor = this.initBgColor;
    }
};


function handleClick(state) {
    var tags = document.getElementsByTagName("audio"),
        audios = [];
    for(var i = 0; i < tags.length; i++) {
        audios.push(new Audio(tags[i]));
    }

    if (!page) {
        page = new Page();
        page.audios = audios;
    }

    // 用户点击的时候
    // 如果页面在播放声音, 则关闭所有声音; 否则将所有audio置为初始状态
    if (page.isPlaying()) {
        page.mute();
    } else {
        page.backInit();
    }
}


self.port.on("mute", function() {
    handleClick();
});

// PPS : 因为没找到 firefox 扩展关于音频的 API, 所以用上面的代码来实现静音. 但这并不是真正的静音.
