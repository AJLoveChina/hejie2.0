// 	2014-09-30  BY AJ 
//	IE11 or firefox support you to use function getImageData on your local computer
//	instead of using localhost or 127.0.0.1
//	But 360,chrome do not support
//	So click http://www.oshjf.com/blog/iframe/dip/index.html 
window.onload = function () {
    main2();	//基于阈值的图像分割
    main3();	//大津阈值法
}


function main2() {
    var oBtn = aj('huidubtn');
    var oVal = aj('huidu');
    var canvas = aj('can'),
        canvas0 = aj('can0'),
        ctx = canvas.getContext('2d'),
        ctx2 = canvas0.getContext('2d');

    hideText(oVal);
    var img = new Image();
    img.src = 'img/ss.jpg';
    img.onload = function () {
        ctx.drawImage(img, 0, 0, 222, 269);
        var px = ctx.getImageData(0, 0, 222, 269);
        getZhifangtu(ctx2, px); //draw zhifangtu
        oBtn.onclick = function () {
            var curTime = +new Date();
            var value = parseInt(oVal.value);
            checkValue(value);
            ctx.drawImage(img, 0, 0, 222, 269);
            var px = ctx.getImageData(0, 0, 222, 269);
            var length = px.data.length;
            for (var i = 0; i < length; i += 4) {
                if (px.data[i] <= value) {
                    px.data[i] = 0;
                    px.data[i + 1] = 0;
                    px.data[i + 2] = 0;
                    px.data[i + 3] = 255;
                } else {
                    px.data[i] = 255;
                    px.data[i + 1] = 255;
                    px.data[i + 2] = 255;
                    px.data[i + 3] = 255;
                }
            }
            ctx.putImageData(px, 0, 0);
            console.log("二值化 : " + ((new Date()) - curTime) + "ms");
        }
    }
}
function main3() {
    var oBtn = aj('dajin');
    var canvas = aj('can'),
        ctx = canvas.getContext('2d');
    var img = new Image();
    var TEXT = aj('GMAXYUZHI');
    img.src = 'img/ss.jpg';
    oBtn.onclick = function () {
        var M = 222, N = 269;
        ctx.drawImage(img, 0, 0, M, N);
        px = ctx.getImageData(0, 0, M, N);
        var LENGTH = px.data.length;
        var arr = [];
        var GMAXYUZHI;                 //G最大时的阈值
        var Gold = 0;
        for (var i = 0; i < 256; i++) {
            arr[i] = i;
        }
        TEXT.innerHTML = '<span style="font-size:12px;">正在计算中...(请勿移动鼠标)</span>';
        (function () {
            var curTime = + new Date();
            // 计算最佳阈值 Begin
            for (var xx in arr) {          //遍历0-255的每个灰度值下的G值，求出最佳分割点
                var W0 = 0, W1 = 0, NUM0 = 0, NUM1 = 0, U0 = 0, U1 = 0, U, Gnow = 0;
                var T = xx;				//NUM0，小于阈值灰度的总和；U0平均灰度
                var N0 = 0, N1 = 0;         //N0小于阈值的像素个数
                for (var i = 0; i < LENGTH; i += 4) {
                    if (px.data[i] <= T) {
                        N0 += 1;
                        NUM0 += px.data[i];
                    } else {
                        N1 += 1;
                        NUM1 += px.data[i];
                    }
                }
                W0 = numberFormat(N0 / (M * N), 2);
                //W1=numberFormat(N1/(M*N),2);
                W1 = numberFormat(1 - W0, 2);
                U0 = (N0 == 0) ? 0 : (NUM0 / N0);
                U1 = (N1 == 0) ? 0 : (NUM1 / N1);
                U = NUM0 / (M * N) + NUM1 / (M * N);
                Gnow = W0 * Math.pow((U0 - U), 2) + W1 * Math.pow((U1 - U), 2);
                if (Gnow > Gold) {
                    Gold = Gnow;
                    GMAXYUZHI = T;
                }
            }
            TEXT.innerHTML = GMAXYUZHI;
            // 计算最佳阈值 END

            // 分割图像
            for (var i = 0; i < LENGTH; i += 4) {
                if (px.data[i] <= GMAXYUZHI) {
                    px.data[i] = 0;
                    px.data[i + 1] = 0;
                    px.data[i + 2] = 0;
                    px.data[i + 3] = 255;
                } else {
                    px.data[i] = 255;
                    px.data[i + 1] = 255;
                    px.data[i + 2] = 255;
                    px.data[i + 3] = 255;
                }
            }
            ctx.putImageData(px, 0, 0);
            console.log("大津阈值法 : " + (+ new Date() - curTime) + "ms");
        })();
    }
}


function aj(id) {   //选择id元素
    return document.getElementById(id);
}
function HistogramEqualization(src) {
    /*
     *	直方图均衡化
     *	src 为图像的绝对地址 或 相对index.js的地址
     */
    var canvas = aj('canvas'),
        ctx = canvas.getContext('2d'),
        WIDTH = 150, HEIGHT = 175; //图片宽度150px，高度175px

    var img = new Image();
    img.src = src;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);	//先绘制图像到canvas
        var px6 = ctx.getImageData(0, 0, WIDTH, HEIGHT);
        //获取每个像素的R,G,B,Opacity值
        var xx = px6.data.length,
            arr1 = [],  	   		//保存每个灰度值的个数
            cdf = [],    			//保存每个灰度值的累积出现次数
            add = 0,
            CDFmin = 0;
        initializeArray(arr1, 256); 	//初始化数组，全部元素为0
        //key=>value : key为灰度值，value为该灰度值出现的次数
        //例如： arr[125] = 780; 表示有780个点灰度值为125
        for (var i = 0; i < xx; i += 4) {		//统计每个灰度出现的次数
            arr1[px6.data[i]] += 1;
        }
        for (var i = 0; i < arr1.length; i++) {
            add += arr1[i];
            cdf[i] = add;
        }
        var test = findCDFmin(arr1);
        CDFmin = test.value;
        for (var i = 0; i < xx; i += 4) {
            var px = px6.data[i];     //当下要处理的像素灰度
            var value = Math.round(((cdf[px] - CDFmin) / (WIDTH * HEIGHT - CDFmin)) * 255);
            //计算当下处理像素直方图均衡化后的灰度
            px6.data[i] = value;      //R
            px6.data[i + 1] = value;	//G
            px6.data[i + 2] = value;	//B
            px6.data[i + 3] = 255;		//Opacity
        }
        ctx.putImageData(px6, 0, 0);  //重新绘制图像
    }
}
function findCDFmin(arr) {
    var xx = arr.length;
    for (var i = 0; i < xx; i++) {
        if (arr[i] != 0) {
            return {'index': i, 'value': arr[i]};
        }
    }
}
function checkValue(value) {
    if (value > 255 || value < 0) {
        alert('灰度值应当在0-255之间');
        return false;
    }
}
function initializeArray(arr, length) {
    for (var i = 0; i < length; i++) {
        arr[i] = 0;
    }
}
function getZhifangtu(ctx2, px) {
    var arr = new Array();
    var MAX = 0;
    var length = px.data.length;
    initializeArray(arr, 256);
    for (var i = 0; i < length; i += 4) {
        arr[px.data[i]] += 1;
    }
    for (var i = 0; i < arr.length; i++) {
        MAX = arr[i] > MAX ? arr[i] : MAX;
    }
    for (var i = 0; i < arr.length; i++) {
        ctx2.moveTo(i, 100);
        ctx2.lineTo(i, 100 - (arr[i] / MAX) * 100);
        ctx2.stroke();
    }
    ctx2.font = '10px Arial';
    ctx2.fillStyle = 'white';
    for (var i = 0; i < 256; i += 20) {
        ctx2.fillText(i, i, 100);
    }
}
function hideText(obj) {
    obj.onfocus = function () {
        if (this.value == '请输入灰度值') {
            this.value = '';
        }
    }
    obj.onblur = function () {
        if (this.value == '' || /\s/.test(this.value)) {
            this.value = '请输入灰度值';
        }
    }
}
function numberFormat(val, num) {
    var value = parseInt(val * Math.pow(10, num));
    return value / (Math.pow(10, num));
}
