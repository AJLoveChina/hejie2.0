<%@ page language="java"  pageEncoding="UTF-8"%>

</div>
<!-- Close div#aj-body -->


<script>
// Baidu Tongji
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?856364b2b0c4165c1b51c0d4d3845595";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

$(function () {
	// Google Analysis
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-70087663-2', 'auto');
	  ga('send', 'pageview');
});

</script>

<div class="aj-miaobao">
	<div class="inside-wrap">
		<div class="logo-huaixiao">
			<img src="http://nigeerhuo-public.oss-cn-shanghai.aliyuncs.com/images/web/pic/logo-huaixiao.png" alt="你个二货坏笑logo"/>
		</div>
		
		<div class="text-info">
			生活不该只有眼前的苟且, 向更好的自己致敬! --你个二货
		</div>
	</div>
</div>
<footer id="aj-footer" role="contentinfo">

	<div class="container">
		<ul class="bs-docs-footer-links">
			<li><a href="https://github.com/AJLoveChina">GitHub</a></li>
			<li><a href="http://www.meajax.com/">Blog</a></li>
			<li><a href="http://www.oshjf.com">Shop</a></li>
		</ul>
		<p>
			Designed and built By AJ. This is for my little sister HYY, wish her happy forever.
		</p>
		<p>
			Code licensed MIT docs CC BY 3.0
		</p>
	</div>
</footer>

<jsp:include page="/views/includes/if_admin.jsp"></jsp:include>
<%@ include file="/views/tools/tishi.jsp" %>
</body>
</html>