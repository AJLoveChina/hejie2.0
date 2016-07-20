<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
 %>

<script>
	// 全局变量, 如果要暴露接口请包涵在该作用域内
	var aj = {};
	aj.Try = function (fn) {
		try {
			fn();
		}catch(ex) {
			console.log(ex);
		}
	}
</script>

<script>
// Baidu Tongji
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?856364b2b0c4165c1b51c0d4d3845595";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

// Google Analysis
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-70087663-2', 'auto');
  ga('send', 'pageview');


</script>


<!-- <link rel="stylesheet" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.css"/> -->
<!-- <link rel="stylesheet" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap-theme.min.css"/> -->
<!-- <link rel="stylesheet" href="http://apps.bdimg.com/libs/animate.css/3.0.0/animate.min.css"/> -->
<!-- <link rel="stylesheet" href="http://apps.bdimg.com/libs/angular-material/0.9.6/angular-material.min.css"/> -->

<link rel="stylesheet" href="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static/css/third-party-css-all.min.css" />
<!-- 下行css不可合并,和icon font相关,需要实时更新 -->
<link rel="stylesheet" href="//at.alicdn.com/t/font_1468635774_056464.css"/>
<link rel="stylesheet" href="/web/css/index.css"/>


<!-- <script src="http://apps.bdimg.com/libs/jquery/1.10.0/jquery.min.js"></script> -->
<!-- <script src="http://apps.bdimg.com/libs/jquery-lazyload/1.9.5/jquery.lazyload.min.js"></script> -->
<!-- <script src="http://apps.bdimg.com/libs/angular.js/1.2.9/angular.min.js"></script> -->
<!-- <script src="http://apps.bdimg.com/libs/angular.js/1.2.9/angular-sanitize.min.js"></script> -->
<!-- <script src="http://apps.bdimg.com/libs/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->

<script type="text/javascript" src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/static/js/third-party-js-all.min.js"></script>
<script type="text/javascript" src="<%=path %>/web/js/main.js"></script>