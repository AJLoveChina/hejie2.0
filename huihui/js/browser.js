/**
 * Modified from https://github.com/cloudcome/alien/blob/master/src/core/navigator/shell.js
 * Thanks cloudcome
 * returns {ie xx, chrome, 360se, 360ee, liebao, sogou}
 * @modified by zhumeng
 * 2015.01.06:
 */
(function () {

    'use strict';

    var ieAX = window.ActiveXObject;
    var ieMode = document.documentMode;
    var ieVer = _getIeVersion() || ieMode || 0;
    var isIe = ieAX || ieMode;
    var chromiumType = _getChromiumType();

    // 助手目前支持的chrome内核浏览器有 {chrome, 360se, 360ee, liebao, [opera]}
    window.detectBrowserType = function () {
        return chromiumType;
    };

    /**
     * 检测 external 是否包含该字段
     * @param reg 正则
     * @param type 检测类型，0为键，1为值
     * @returns {boolean}
     * @private
     */
    function _testExternal(reg, type) {
        var external = window.external || {};

        for (var i in external) {
            if (reg.test(type ? external[i] : i)) {
                return true;
            }
        }

        return false;
    }


    /**
     * 获取 Chromium 内核浏览器类型
     * @link http://www.adtchrome.com/js/help.js
     * @link https://ext.chrome.360.cn/webstore
     * @link https://ext.se.360.cn
     * @return {String}
     *         360ie 360IE兼容模式，正常情况下不会出现
     *         360qihu ua包含360/qihu的浏览器
     *         360se 360安全浏览器
     *         liebao 猎豹浏览器
     *         chrome 谷歌浏览器
     *         notChromium 可以判断的非Chromium浏览器
     *         ''    无法判断
     */
    function _getChromiumType() {
        if (isIe || typeof window.scrollMaxX !== 'undefined') {
            return '';
        }

        var ua = navigator.userAgent;

        // 可识别的非Chromium浏览器
        if (/(firefox|opera|qqbrowser|tencenttraveler|bidubrowser|alibrowser|maxthon)/ig.test(ua) ||
            /se [0-9]\.x|greenbrowser|myie2|theworld|avast|comodo|avant/ig.test(ua) ||
            /(baidu|soso|sogou|youdao|jike|google|bing|msn|yahoo)/ig.test(ua)) {
            return "notChromium";
        }

        // 猎豹浏览器
        if (_testExternal(/^liebao/i, 0) || /lbbrowser/ig.test(ua)) {
            return 'liebao';
        }

        // 360浏览器的ua只在特殊网址下才出现该字段
        if (/(360|qihu)/ig.test(ua)) {
            return /MSIE/.test(ua) ? '360ie' : '360qihu';
        }

        // 目前区别360se/360ee/chrome没有较好较稳定的方法
        if (/chrome/ig.test(ua)) {
            return _isChrome() ? 'chrome' : '360se';
        } else {
            return '';
        }
    }

    function _isChrome() {
        try {
            return window.clientInformation.languages.length > 0;
        } catch (e) {
            return false;
        }
    }

    // 获得ie浏览器版本
    function _getIeVersion() {
        var v = 3,
            p = document.createElement('p'),
            all = p.getElementsByTagName('i');

        while (
            p.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]);

        return v > 4 ? v : 0;
    }

}());
