<%@ page language="java" pageEncoding="UTF-8"%>
<script>
	if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function (searchElement) {
	        if (this == null) {
	            throw new TypeError();
	        }
	        var n=0, k, t = Object(this),
	            len = t.length >>> 0;
	        if (len === 0) return -1;
	        if (arguments.length > 1) {
	            n = Number(arguments[1]);
	            if (n != n) n = 0;
	            else if (n != 0 && n != Infinity && n != -Infinity) n = (n > 0 || -1) * Math.floor(Math.abs(n));
	        }
	        if (n >= len) return -1;
	        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
	            if (k in t && t[k] === searchElement) return k;
	        }
	        return -1;
	    };
	}
	// 全局变量, 如果要暴露接口请包涵在该作用域内
	var aj = {};
</script>

<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
<link rel="stylesheet" href="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static/css/third-party-css-all.min.css.txt?ts=20160921" />
<!-- 下行css不可合并,和icon font相关,需要实时更新 -->
<link rel="stylesheet" href="//at.alicdn.com/t/font_1477236053_4645548.css"/>
<link rel="stylesheet" href="/web/css/index.css?ts=20160725"/>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<!-- <script type="text/javascript" src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static/js/third-party-js-all.min.txt?ts=20160928"></script> -->
<script type="text/javascript" src="/web/js/third-party-js-all.txt"></script>

<script>
	require.config({
		baseUrl : "/web/js/modules",
		paths : {
			main : "requirejs-main-built"
		}
	});
	
	require(["main"], function () {
		require(["ui/comment"], function (a) {
			a.render();
		});
	});
	
</script>
