var cut,    // 二值化分割灰度值
    ctx;    // 原始图像画笔

var img = new Image();
img.src = 'img/ss.jpg'; // 加载一副图像

img.onload = function () {
    // 将图像绘制在原始画布上
    ctx.drawImage(img, 0, 0, 222, 269);

    // 获取图像所有点的像素信息组成的数组
    var px = ctx.getImageData(0, 0, 222, 269);

    var length = px.data.length;
    for (var i = 0; i < length; i += 4) {
        if (px.data[i] <= cut) {
            // 灰度小于阈值的点的灰度值置为 0
            px.data[i] = 0;
            px.data[i + 1] = 0;
            px.data[i + 2] = 0;
            px.data[i + 3] = 255;
        } else {
            // 灰度大于阈值的点的灰度值置为 255
            px.data[i] = 255;
            px.data[i + 1] = 255;
            px.data[i + 2] = 255;
            px.data[i + 3] = 255;
        }
    }

    // 重新绘制图像
    ctx.putImageData(px, 0, 0);
};