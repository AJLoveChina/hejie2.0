define(function (require, exports, module) {
    // 弹幕 分 string  与 object 俩种类型
    // object 目前只给自己发表弹幕时,加粗高亮显示给自己看的
    function Text(prop) {
        if (this instanceof Text) {
            var divBox = prop.div.getBoundingClientRect(),
                canvasHeight = $(prop.div).height(),
                canvasWidth = $(prop.div).width();
            this.prop = prop;
            this.div = prop.div;
            this.source = prop.source;
            this.canvas = document.createElement('canvas');
            this.canvas.setAttribute('width', canvasWidth);
            //this.canvas.setAttribute( 'height', (divBox.bottom-divBox.top)<=100 ? 100 : (divBox.bottom-divBox.top) );
            this.canvas.setAttribute('height', canvasHeight);
            this.canvas.setAttribute('style', 'position:absolute;top:0;left:0;z-index:10;');
            this.canvas.setAttribute('class', 'danmu-canvas');
            this.div.appendChild(this.canvas);
            this.suduOffset = 6;//初始速度偏移量,reduce to 1 eventually

            this.ctx = this.canvas.getContext('2d');
            this.box = this.canvas.getBoundingClientRect();
            this.width = this.box.right - this.box.left;
            this.height = this.box.bottom - this.box.top;
            this.background = prop.background || 'white';
            this.fontsize = prop.fontsize || 20;
            this.ctx.font = this.fontsize + 'px Arial';
            this.ctx.strokeStyle = prop.strokeStyle || 'green';
            this.ctx.fillStyle = prop.fillStyle || 'blue';
            this.ctx.lineWidth = 1;
            this.mouse = {};            	//mouse attributes all here~!
            this.mouse.down = {};
            this.mouse.move = {};
            this.mouse.up = {};
            this.mouse.anxia = false;//默认鼠标没有按下
            this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);
            this.stop = false;
            this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);
            this.wsudu = Math.PI / 90;
        } else {
            return new Text(prop);
        }
    }

    Text.prototype = {
        scrollHorizon: function (config) {	//config.stop to control draw and refresh
            var that = this,
                arr = this.source || ['弹幕加载失败，这些只是示例', 'HTML', '前端', '后台', '算法', '数据结构', '游戏',
                        'HTML5', 'Canvas', 'Jquery', 'IE', 'Firefox', 'chrome', 'Safari',
                        'Lincoln', 'Akon', 'Javascript', 'PHP', 'CSS', 'Photoshop'],
                prop = [],//FROM
                show = [],//TO
                suduTimer,
                then = c.requestNextAnimationFrame(),
                ctx = this.ctx,
                i;
            for (i = 0; i < 20; i++) {
                defineDanmu(i);
            }
            suduTimer = setInterval(function () {
                that.suduOffset -= 0.1;
                if (that.suduOffset <= 0) {
                    clearInterval(suduTimer);
                }
            }, 1000 / 10);
            function auto() {
                if (!config.stop) {
                    refresh();
                    draw();
                }
                then(auto);
            }

            auto();
            function refresh() { //更新comment的位置
                var i;
                for (i = prop.length - 1; i >= 0; i--) {
                    prop[i].left -= prop[i].sudu + that.suduOffset;
                    if (prop[i].left <= -ctx.measureText(prop[i].word).width) {
                        defineDanmu(i);
                    }
                }
            }

            function draw() {//绘制
                ctx.putImageData(that.imgData, 0, 0);
                for (var i = 0; i < prop.length; i++) {
                    ctx.save();
                    ctx.fillStyle = prop[i].color;
                    ctx.font = prop[i].size + 'px Arial';
                    ctx.fillText(prop[i].word, prop[i].left, prop[i].top);
                    ctx.restore();
                }
            }
            function defineDanmu(index) {
                var i = index,
                    danmu = getWord(),
                    isString = (typeof danmu == 'string'),
                    top;
                prop[i] = {};
                if (isString) {
                    prop[i].word = danmu;
                } else if (typeof danmu == 'object'){
                    prop[i].word = danmu.word;
                } else {
                    prop[i].word = danmu;
                }
                prop[i].index = i;
                top = Math.random() * (that.height - 20);
                prop[i].top = top <= 20 ? 20 : top;
                prop[i].left = that.width * (1 + Math.random());
                prop[i].sudu = Math.random() + 1;
                if (isString) {
                    prop[i].color = 'rgba(0,0,0,' + (Math.random() / 4 + 0.4) + ')';
                    prop[i].size = Math.random() * 10 + 10;
                } else {
                    prop[i].color = danmu.color;
                    prop[i].size = 20;
                }
            }
            function getWord() {
                var shift,
                    random;
                if (arr.length > 0) {
                    shift = arr.shift();
                    if (typeof shift == 'string') {
                        show.push(shift);
                    } else if (typeof shift == 'object'){
                        show.push(shift.word);
                    } else {
                        show.push(shift);
                    }
                    if (show.length > 200) {//防止内存占用过多
                        show.shift();
                    }
                } else {
                    random = c.num.rand(0, show.length -1);
                    shift = show[random];
                }
                return shift;
            }
        },
        textScroll: function () {
            var that = this;
            var arr = ['Teemo', 'VN', 'Ezreal', 'Osk', 'Jax', 'YUi',
                'Kpois', 'Opera', 'IE', 'Firefox', 'chrome', 'Safari',
                'Lincoln', 'Akon', 'Javascript', 'PHP', 'CSS'];
            var prop = [],
                ctx = this.ctx;
            for (var i = 0; i < arr.length; i++) {
                prop[i] = {};
                prop[i].word = arr[i];
                prop[i].index = i;
                prop[i].angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
                prop[i].width = Math.random() * 50 + 100;
            }
            auto();
            function auto() {
                refresh();
                draw();
                setTimeout(auto, 1000 / 24)
            }

            function refresh() {
                for (var i = 0; i < arr.length; i++) {
                    prop[i].angle += that.wsudu;
                    prop[i].size = Math.cos(prop[i].angle) * 10 + 10;
                    prop[i].opacity = Math.cos(prop[i].angle) * 0.3 + 0.5;
                    prop[i].height = (Math.sin(prop[i].angle) + 1) * (5 * arr.length) + 20;
                }
            }

            function draw() {
                var obj;
                ctx.putImageData(that.imgData, 0, 0);
                for (var i = 0; i < prop.length; i++) {
                    obj = prop[i];
                    ctx.save();
                    ctx.fillStyle = 'rgba(0,0,0,' + obj.opacity + ')';
                    ctx.font = prop[i].size + 'px Arial';
                    ctx.fillText(obj.word, obj.width, obj.height);
                    ctx.restore();
                }
            }
        },
        slowDownWhenMouseover: function () {
            var that = this;
            var oldSudu = that.wsudu;
            c.addEvent(this.canvas, 'mouseover', (function () {
                that.wsudu = Math.PI / 140;
            }));
            c.addEvent(this.canvas, 'mouseout', (function () {
                that.wsudu = oldSudu;
            }));
        },
    };
    module.exports = Text;
});