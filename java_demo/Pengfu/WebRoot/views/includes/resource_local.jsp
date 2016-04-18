
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


<script src="bower_components/jquery/jquery.js"></script>
<script src="web/js/includes/jquery.lazyload.js"></script>
<script src="web/js/includes/angular.min.js"></script>
<script src="web/js/includes/angular-sanitize.min.js"></script>
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css"/>
<link rel="stylesheet" href="http://apps.bdimg.com/libs/animate.css/3.0.0/animate.min.css"/>
<link rel="stylesheet" href="web/css/index.css"/>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="web/js/base.js"></script>
<script type="text/javascript" src="web/js/main.js"></script>
